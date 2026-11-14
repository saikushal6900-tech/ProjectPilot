# ProjectPilot app

A responsive, local-first project management app based on the ProjectPilot design package, with a local GitHub integration backed by the authenticated GitHub CLI.

## Run it

Run the local server from this folder:

```sh
python3 server.py
```

Then visit `http://127.0.0.1:8787`. Sign in first if needed with `gh auth login`.

## What works

- Overview dashboard with project progress, tasks, deadlines, and weekly activity
- Projects list, project details, editable project information, and new project creation
- Task list with filters and completion toggles
- Kanban board with drag-and-drop task status updates
- Calendar month navigation and selectable dates
- Workspace-aware assistant responses generated from the local project and task data
- Reports with a downloadable CSV summary
- GitHub page listing repositories accessible to the signed-in GitHub account, with repository details, recent commits, open pull requests, and project links
- Per-repository progress calculated from GitHub milestone issue completion; repositories without milestones show their activity and open issue/PR counts instead
- Assistant can fetch live commits, open issues, pull requests, and milestone progress across all accessible repositories when asked about GitHub or project changes
- Sync all accessible repositories into ProjectPilot as tracked projects
- Remove a tracked project only after typing its exact name; this never deletes the remote GitHub repository
- Profile, workspace, and notification preference settings
- Responsive desktop and mobile layouts
- Local persistence in the browser with a reset-to-demo option

No build step or package install is needed. The sample workspace and repository-to-project links are stored in this browser’s local storage. The assistant uses local rules and demo data; it does not call an external AI service. The local Python server uses `gh` for GitHub requests, so credentials stay in GitHub CLI’s keyring and are never sent to browser JavaScript.

The original SVG compositions are included in `design-reference/` for handoff and future design iteration. They are reference files; the live app UI is implemented in the HTML, CSS, and JavaScript files above.
