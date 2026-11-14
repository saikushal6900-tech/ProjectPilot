"""Local ProjectPilot server. GitHub requests use the authenticated gh CLI keyring."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, unquote
import json
import shutil
import subprocess
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parent


def gh_api(endpoint):
    if not shutil.which("gh"):
        raise RuntimeError("GitHub CLI (gh) is not installed.")
    args = ["gh", "api"]
    if endpoint.startswith("/user/repos?"):
        args += ["--paginate", endpoint, "--jq", ".[]"]
    else:
        args.append(endpoint)
    result = subprocess.run(
        args,
        capture_output=True, text=True, timeout=45,
    )
    if result.returncode:
        message = result.stderr.strip() or "GitHub request failed. Run gh auth login and try again."
        raise RuntimeError(message)
    output = result.stdout.strip()
    if not output:
        return []
    if endpoint.startswith("/user/repos?"):
        return [json.loads(line) for line in output.splitlines() if line.strip()]
    return json.loads(output)


def repo_activity(repo):
    full_name = repo["full_name"]
    base = f"/repos/{full_name}"
    milestones, commits, issues, pulls = [], [], [], []
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(gh_api, f"{base}/milestones?state=all&per_page=100"),
                   pool.submit(gh_api, f"{base}/commits?per_page=3"),
                   pool.submit(gh_api, f"{base}/issues?state=open&per_page=5&sort=updated"),
                   pool.submit(gh_api, f"{base}/pulls?state=open&per_page=5")]
        milestones, commits, issues, pulls = [future.result() for future in futures]
    milestones = [m for m in milestones if m.get("state") != "closed" or m.get("open_issues", 0) + m.get("closed_issues", 0)]
    opened = sum(m.get("open_issues", 0) for m in milestones)
    closed = sum(m.get("closed_issues", 0) for m in milestones)
    progress = round(100 * closed / (opened + closed)) if opened + closed else None
    return {"full_name": full_name, "milestone_progress": progress, "milestone_open": opened,
            "milestone_closed": closed, "milestones": [{"title":m.get("title"),"state":m.get("state"),"open_issues":m.get("open_issues",0),"closed_issues":m.get("closed_issues",0),"due_on":m.get("due_on")} for m in milestones[:8]],
            "commits": [{"message":(c.get("commit",{}).get("message","").split("\n")[0]),"author":c.get("commit",{}).get("author",{}).get("name"),"date":c.get("commit",{}).get("author",{}).get("date"),"url":c.get("html_url")} for c in commits],
            "issues": [{"number":i.get("number"),"title":i.get("title"),"url":i.get("html_url"),"updated_at":i.get("updated_at")} for i in issues if "pull_request" not in i],
            "pulls": [{"number":p.get("number"),"title":p.get("title"),"url":p.get("html_url"),"updated_at":p.get("updated_at")} for p in pulls]}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, code, payload):
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/github/status":
            try:
                user = subprocess.run(["gh", "api", "user", "--jq", "{login:.login,name:.name,avatar_url:.avatar_url}"], capture_output=True, text=True, timeout=20)
                if user.returncode:
                    raise RuntimeError(user.stderr.strip() or "Run gh auth login to connect GitHub.")
                self.send_json(200, {"connected": True, "user": json.loads(user.stdout)})
            except Exception as exc:
                self.send_json(503, {"connected": False, "error": str(exc)})
            return
        if path == "/api/github/repos":
            try:
                repos = gh_api("/user/repos?per_page=100&visibility=all&affiliation=owner,collaborator,organization_member&sort=updated")
                fields = ("id", "name", "full_name", "private", "description", "html_url", "updated_at", "pushed_at", "default_branch", "stargazers_count", "open_issues_count", "language", "owner")
                self.send_json(200, [{k: repo.get(k) for k in fields if k in repo} for repo in repos])
            except Exception as exc:
                self.send_json(503, {"error": str(exc)})
            return
        if path == "/api/github/overview":
            try:
                repos = gh_api("/user/repos?per_page=100&visibility=all&affiliation=owner,collaborator,organization_member&sort=updated")
                with ThreadPoolExecutor(max_workers=5) as pool:
                    activity = list(pool.map(repo_activity, repos))
                self.send_json(200, activity)
            except Exception as exc:
                self.send_json(503, {"error": str(exc)})
            return
        if path == "/api/github/inspect":
            try:
                repos = gh_api("/user/repos?per_page=100&visibility=all&affiliation=owner,collaborator,organization_member&sort=updated")
                output = []
                with ThreadPoolExecutor(max_workers=4) as pool:
                    future_map = {pool.submit(inspect_repository, repo): repo for repo in repos}
                    for future, repo in future_map.items():
                        try: output.append(future.result())
                        except Exception as exc: output.append({"full_name": repo["full_name"], "error": str(exc)})
                self.send_json(200, output)
            except Exception as exc:
                self.send_json(503, {"error": str(exc)})
            return
        if path.startswith("/api/github/repos/"):
            parts = [unquote(p) for p in path[len("/api/github/repos/"):].split("/") if p]
            if len(parts) != 2:
                self.send_json(400, {"error": "Use /api/github/repos/{owner}/{repo}."})
                return
            owner, repo = parts
            try:
                base = f"/repos/{owner}/{repo}"
                details = gh_api(base)
                commits = gh_api(f"{base}/commits?per_page=5")
                issues = gh_api(f"{base}/issues?state=open&per_page=5")
                pulls = gh_api(f"{base}/pulls?state=open&per_page=5")
                self.send_json(200, {"repository": details, "commits": commits, "issues": [x for x in issues if "pull_request" not in x], "pulls": pulls})
            except Exception as exc:
                self.send_json(503, {"error": str(exc)})
            return
        return super().do_GET()


def inspect_repository(repo):
    """Summarize GitHub source tree and recent history without cloning or writing."""
    full_name = repo["full_name"]
    base = f"/repos/{full_name}"
    branch = repo.get("default_branch") or "main"
    tree = gh_api(f"{base}/git/trees/{branch}?recursive=1")
    files = [entry["path"] for entry in tree.get("tree", []) if entry.get("type") == "blob"]
    source_ext = (".py", ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".java", ".swift", ".kt", ".rb", ".php", ".html", ".css", ".sql")
    source = [name for name in files if name.lower().endswith(source_ext) and not any(part in name.lower() for part in ("node_modules/", "vendor/", "dist/", "build/", ".min."))]
    docs = [name for name in files if name.lower().endswith(("readme.md", "todo.md", "roadmap.md", "plan.md", "changelog.md", "agents.md"))]
    selected = []
    for name in docs[:8] + source[:20]:
        try:
            content = gh_api(f"{base}/contents/{name}?ref={branch}")
            if content.get("encoding") == "base64":
                import base64
                decoded = base64.b64decode(content.get("content", "")).decode("utf-8", "replace")
                selected.append({"path": name, "text": decoded[:5000]})
        except Exception:
            continue
    commits = gh_api(f"{base}/commits?per_page=15")
    open_issues = gh_api(f"{base}/issues?state=open&per_page=100")
    all_issues = gh_api(f"{base}/issues?state=all&per_page=100&sort=updated")
    pulls = gh_api(f"{base}/pulls?state=all&per_page=30&sort=updated")
    milestones = gh_api(f"{base}/milestones?state=all&per_page=100")
    plain_open = [i for i in open_issues if "pull_request" not in i]
    plain_all = [i for i in all_issues if "pull_request" not in i]
    closed = sum(1 for i in plain_all if i.get("state") == "closed")
    issue_progress = round(100 * closed / len(plain_all)) if plain_all else None
    milestone_open = sum(m.get("open_issues", 0) for m in milestones)
    milestone_closed = sum(m.get("closed_issues", 0) for m in milestones)
    milestone_progress = round(100 * milestone_closed / (milestone_open + milestone_closed)) if milestone_open + milestone_closed else None
    readme = next((item["text"] for item in selected if item["path"].lower().endswith("readme.md")), "")
    todo_hits = []
    for item in selected:
        for line_no, line in enumerate(item["text"].splitlines(), 1):
            if any(token in line.lower() for token in ("todo", "fixme", "not implemented", "coming soon", "placeholder")):
                todo_hits.append({"path": item["path"], "line": line_no, "text": line.strip()[:220]})
                if len(todo_hits) >= 30: break
        if len(todo_hits) >= 30: break
    return {"full_name": full_name, "branch": branch, "files_count": len(files), "source_files_count": len(source),
            "source_files": source[:80], "docs": docs[:20], "readme_excerpt": readme[:3000],
            "issue_progress": issue_progress, "issues_open": len(plain_open), "issues_closed_sample": closed,
            "milestone_progress": milestone_progress, "milestones": [{"title":m.get("title"),"state":m.get("state"),"open":m.get("open_issues",0),"closed":m.get("closed_issues",0),"due_on":m.get("due_on")} for m in milestones[:20]],
            "open_issues": [{"number":i.get("number"),"title":i.get("title"),"assignees":[a.get("login") for a in i.get("assignees",[])],"milestone":(i.get("milestone") or {}).get("title"),"updated_at":i.get("updated_at"),"url":i.get("html_url")} for i in plain_open[:30]],
            "pulls": [{"number":p.get("number"),"title":p.get("title"),"state":p.get("state"),"draft":p.get("draft"),"updated_at":p.get("updated_at"),"url":p.get("html_url"),"body":(p.get("body") or "")[:1200]} for p in pulls[:20]],
            "commits": [{"message":c.get("commit",{}).get("message","").split("\n")[0],"date":c.get("commit",{}).get("author",{}).get("date"),"url":c.get("html_url")} for c in commits[:15]],
            "todo_hits": todo_hits}


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8787), Handler)
    print("ProjectPilot running at http://127.0.0.1:8787")
    print("GitHub access stays in the authenticated gh CLI keyring.")
    server.serve_forever()
