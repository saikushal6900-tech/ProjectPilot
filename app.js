/* ProjectPilot — self-contained, local-first demo workspace. */
(() => {
  const STORAGE_KEY = 'projectpilot.workspace.v1';
  const app = document.getElementById('app');
  const iconPaths = {
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/>',
    projects: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4V2h8v2M3 10h18M9 10v10"/>',
    tasks: '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4m8-4v4M8 11h8m-8 4h5"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 9h18m-13 4h2m4 0h2m-8 4h2"/>',
    ai: '<path d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z"/>',
    reports: '<path d="M4 19V5m0 14h17M8 15l3-4 3 2 5-7"/><path d="M17 6h2v2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a7.7 7.7 0 0 1-1.7 1L16 21h-2.8l-.4-2.1a7.7 7.7 0 0 1-1.8-.7l-1.7.8-1.4-2.4 1.4-1.2a7.7 7.7 0 0 1 0-2l-1.4-1.2 1.4-2.4 1.7.8a7.7 7.7 0 0 1 1.8-.7L13.2 8H16l.4 2.1a7.7 7.7 0 0 1 1.7 1l1.7-.8 1.4 2.4-1.4 1.2a7.7 7.7 0 0 1-.4 1.1Z"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    trend: '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.9M16 3.2a4 4 0 0 1 0 7.6"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>',
    flag: '<path d="M5 21V4m0 0c6-4 8 4 14 0v12c-6 4-8-4-14 0"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    calendarCheck: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 9h18m3 5-2 2-1-1"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.6 1.3c-.8 1-2.2 1.4-2.2 3m0 3h.01"/>',
    logout: '<path d="M10 17l5-5-5-5m5 5H3m10-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    lightbulb: '<path d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.7c.6.4 1 1 1 1.8h6c0-.8.4-1.4 1-1.8A7 7 0 0 0 12 2Z"/>',
    bolt: '<path d="m13 2-3 8h7l-6 12 2-9H6l7-11Z"/>',
    checkSquare: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>',
    paperclip: '<path d="m21.4 11.1-8.5 8.5a5 5 0 0 1-7.1-7.1l9.2-9.2a3.5 3.5 0 0 1 5 5l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.2a5.6 5.6 0 0 0-1.5-3.9 5.2 5.2 0 0 0-.1-3.9s-1.2-.4-4 1.5a13.7 13.7 0 0 0-7.2 0C5.2.1 4 .5 4 .5a5.2 5.2 0 0 0-.1 3.9 5.6 5.6 0 0 0-1.5 3.9c0 5.6 3.5 6.8 6.8 7.2a3.4 3.4 0 0 0-1 2.6V22"/>',
  };
  const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.spark}</svg>`;
  const iso = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const dateFromIso = (value) => {
    const [y, m, d] = value.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const addDays = (date, days) => { const d = new Date(date); d.setDate(d.getDate() + days); return d; };
  const today = new Date();
  const todayISO = iso(today);
  const plusDate = (days) => iso(addDays(today, days));
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const shortDate = (value, options = { month: 'short', day: 'numeric' }) => value ? dateFromIso(value).toLocaleDateString(undefined, options) : 'No date';
  const dateLong = (value) => value ? dateFromIso(value).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'No date set';
  const initial = (name) => (name || 'M').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const colors = ['purple', 'blue', 'orange', 'green'];

  function seedData() {
    const projects = [
      { id: 'portfolio', name: 'Portfolio Website', category: 'Personal', description: 'A personal portfolio to showcase projects, skills and experience.', color: 'purple', due: plusDate(15), created: plusDate(-11), notes: 'Keep the experience fast, accessible and responsive on all devices.', owner: 'Max' },
      { id: 'study', name: 'AI Study Companion', category: 'Side project', description: 'A focused study companion that turns learning goals into a clear daily plan.', color: 'blue', due: plusDate(21), created: plusDate(-20), notes: 'Ship a thoughtful first version for a small group of learners.', owner: 'Max' },
      { id: 'finance', name: 'Mobile Finance App', category: 'Work', description: 'A simple mobile experience for understanding spending and saving.', color: 'orange', due: plusDate(29), created: plusDate(-17), notes: 'Prioritize clarity, trust and easy navigation.', owner: 'Max' },
      { id: 'travel', name: 'Travel Planner', category: 'Personal', description: 'A lightweight itinerary planner for memorable trips.', color: 'green', due: plusDate(-3), created: plusDate(-45), notes: 'The first release is ready to share.', owner: 'Max' },
    ];
    const definitions = {
      portfolio: [
        ['Define portfolio goals', 'done', 'low', -10], ['Collect inspiration', 'done', 'low', -9], ['Write audience notes', 'done', 'low', -9], ['Map site information architecture', 'done', 'medium', -8], ['Choose portfolio direction', 'done', 'medium', -8], ['Create visual identity', 'done', 'medium', -7], ['Build design tokens', 'done', 'low', -7], ['Design desktop homepage', 'done', 'high', -6], ['Design project gallery', 'done', 'medium', -6], ['Design contact page', 'done', 'low', -5], ['Review mobile layouts', 'done', 'medium', -5], ['Set up repository', 'done', 'low', -4], ['Create app shell', 'done', 'medium', -4], ['Build project cards', 'done', 'medium', -3], ['Add project detail layout', 'done', 'medium', -3], ['Write about page content', 'done', 'low', -2], ['Add accessible color states', 'done', 'high', -2], ['Create first responsive pass', 'done', 'high', -1],
        ['Finish authentication UI', 'inprogress', 'high', 0], ['Review homepage layout', 'review', 'medium', 0], ['Finalize landing page', 'todo', 'high', 0], ['Test responsive navigation', 'inprogress', 'medium', 1], ['Write project documentation', 'todo', 'low', 1], ['Connect contact form', 'todo', 'medium', 3], ['Final QA and launch', 'inprogress', 'high', 15],
      ],
      study: [
        ['Set learning goals', 'done', 'low', -14], ['Interview early learners', 'done', 'medium', -13], ['Outline study flow', 'done', 'medium', -12], ['Create visual direction', 'done', 'low', -11], ['Set up app shell', 'done', 'medium', -10], ['Design study dashboard', 'done', 'high', -8], ['Build course list', 'done', 'medium', -6], ['Create prompt library', 'done', 'low', -4], ['Add onboarding flow', 'done', 'medium', -2],
        ['Connect API endpoints', 'inprogress', 'high', 4], ['Design review', 'review', 'medium', 7], ['Add study session timer', 'todo', 'medium', 8], ['Build flashcards', 'todo', 'high', 10], ['Add progress summary', 'inprogress', 'medium', 11], ['Test empty states', 'todo', 'low', 13], ['Add accessibility labels', 'todo', 'medium', 14], ['Invite beta learners', 'todo', 'low', 16], ['Review feedback', 'todo', 'medium', 18], ['Polish responsive layout', 'todo', 'medium', 19], ['Prepare first release', 'todo', 'high', 21],
      ],
      finance: [
        ['Confirm core app goals', 'done', 'low', -10], ['Sketch account overview', 'done', 'medium', -8], ['Review transaction patterns', 'inprogress', 'high', 5], ['Create wireframes', 'todo', 'high', 8], ['Design spending summary', 'todo', 'medium', 10], ['Build transaction list', 'todo', 'medium', 14], ['Add monthly insights', 'todo', 'low', 17], ['Test navigation', 'todo', 'medium', 21], ['Refine account settings', 'todo', 'low', 24], ['Prepare product review', 'todo', 'high', 29],
      ],
      travel: [
        ['Choose first trip flow', 'done', 'low', -40], ['Design itinerary view', 'done', 'medium', -30], ['Add place bookmarks', 'done', 'medium', -22], ['Test on mobile', 'done', 'high', -12], ['Share planner with friends', 'done', 'low', -4],
      ],
    };
    const projectTasks = [];
    Object.entries(definitions).forEach(([projectId, items]) => items.forEach(([title, status, priority, dueOffset], index) => {
      projectTasks.push({
        id: `${projectId}-${index + 1}`,
        projectId,
        title,
        status,
        priority,
        due: plusDate(dueOffset),
        completedAt: status === 'done' ? plusDate(Math.min(-1, dueOffset)) : null,
      });
    }));
    return {
      projects,
      tasks: projectTasks,
      displayName: 'Max',
      workspace: 'Personal workspace',
      page: 'overview',
      selectedProjectId: 'portfolio',
      projectFilter: 'all',
      taskFilter: 'all',
      calendarMonth: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`,
      calendarDate: todayISO,
      focusRunning: false,
      messages: [
        { role: 'assistant', text: 'Hi Max! I can review your projects and deadlines. You have 4 tasks due soon across 3 projects. I’d start with the authentication UI because it blocks the next milestone on Portfolio Website.', time: 'Just now' },
      ],
      preferences: { emailUpdates: true, deadlineReminders: true, weeklySummary: false, compactMode: false },
      githubLinks: {},
    };
  }

  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.projects) && Array.isArray(saved.tasks)) return { ...seedData(), ...saved };
    } catch (_) { /* Ignore damaged local state and restore the demo workspace. */ }
    return seedData();
  }
  let state = loadData();
  let modal = null;
  let toastTimer = null;
  let searchValue = '';
  let taskSearch = '';
  let boardProjectFilter = 'all';
  let activeSettingsTab = 'profile';
  let mobileDrawerOpen = false;
  let githubRepos = null;
  let githubOverview = null;
  let githubOverviewLoading = false;
  let githubError = '';
  let githubLoading = false;
  let selectedGithubRepo = '';
  let githubDetails = null;

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* The app remains usable without storage. */ }
  }
  const getProject = (id) => state.projects.find((project) => project.id === id);
  const tasksForProject = (id) => state.tasks.filter((task) => task.projectId === id);
  const projectProgress = (id) => {
    const list = tasksForProject(id);
    return list.length ? Math.round((list.filter((task) => task.status === 'done').length / list.length) * 100) : 0;
  };
  const projectStatus = (project) => projectProgress(project.id) >= 100 ? 'Completed' : 'In Progress';
  const projectOpenTasks = (id) => tasksForProject(id).filter((task) => task.status !== 'done').length;
  const getTask = (id) => state.tasks.find((task) => task.id === id);
  const tasksForDate = (value) => state.tasks.filter((task) => task.due === value && task.status !== 'done');
  const daysUntil = (value) => value ? Math.round((dateFromIso(value) - dateFromIso(todayISO)) / 86400000) : 99999;
  const statusLabel = (status) => ({ todo: 'To do', inprogress: 'In progress', review: 'In review', done: 'Completed' }[status] || status);
  const statusClass = (status) => ({ todo: '', inprogress: 'active', review: 'attention', done: 'done' }[status] || '');

  function projectAvatar(project, size = '') {
    const color = project?.color || 'purple';
    const letter = project?.name?.[0] || 'P';
    return `<span class="project-avatar ${color} ${size}" aria-hidden="true">${escapeHtml(letter)}</span>`;
  }
  function statusPill(project) {
    const status = projectStatus(project);
    return `<span class="status-pill ${status === 'Completed' ? 'done' : 'active'}">${status}</span>`;
  }
  function priorityDot(priority) { return `<span class="priority-dot ${escapeHtml(priority || 'low')}" title="${escapeHtml((priority || 'low') + ' priority')}"></span>`; }
  function taskRow(task, options = {}) {
    const project = getProject(task.projectId);
    const complete = task.status === 'done';
    const dueLabel = task.due === todayISO ? 'Today' : task.due === plusDate(1) ? 'Tomorrow' : shortDate(task.due);
    return `<div class="task-item ${complete ? 'is-done' : ''}">
      <button class="check-button ${complete ? 'checked' : ''}" data-action="toggle-task" data-id="${escapeHtml(task.id)}" aria-label="${complete ? 'Mark as incomplete' : 'Complete task'}">${complete ? icon('check', 12) : ''}</button>
      <div class="task-main"><div class="task-name">${escapeHtml(task.title)}</div><div class="task-sub">${escapeHtml(project?.name || 'Workspace')}${options.showDate ? ` · ${dueLabel}` : ''}${options.showStatus ? ` · ${statusLabel(task.status)}` : ''}</div></div>
      ${!complete ? priorityDot(task.priority) : ''}
    </div>`;
  }
  function projectCard(project, compact = false) {
    const progress = projectProgress(project.id);
    const tasks = tasksForProject(project.id);
    const done = tasks.filter((task) => task.status === 'done').length;
    const color = project.color === 'green' ? 'green' : '';
    return `<article class="project-card" data-action="view-project" data-id="${escapeHtml(project.id)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(project.name)}">
      ${compact ? '' : `<div class="project-cover ${escapeHtml(project.color)}">${icon('folder', 38)}</div>`}
      <div class="project-card-top">${projectAvatar(project)}<button class="more-button" data-action="project-menu" data-id="${escapeHtml(project.id)}" aria-label="Project options">${icon('more', 16)}</button></div>
      <h3>${escapeHtml(project.name)}</h3><div class="project-category">${escapeHtml(project.category)}</div>
      <div class="progress-row"><span class="muted">Progress</span><strong>${progress}%</strong></div><div class="progress-track"><div class="progress-fill ${color}" style="width:${progress}%"></div></div>
      <div class="project-footer"><span>${done} / ${tasks.length} tasks</span><span>${compact ? statusPill(project) : `${icon('calendar', 12)} ${shortDate(project.due)}`}</span></div>
    </article>`;
  }
  const navItems = [
    ['overview', 'Overview', 'home'], ['projects', 'Projects', 'projects'], ['tasks', 'Tasks', 'tasks'], ['calendar', 'Calendar', 'calendar'], ['assistant', 'AI Assistant', 'ai'], ['reports', 'Reports', 'reports'], ['github', 'GitHub', 'github'],
  ];
  function navButton(page, label, iconName, mobile = false) {
    const active = page === state.page || (page === 'projects' && state.page === 'project-detail');
    return `<button class="${mobile ? 'mobile-nav-item' : 'nav-item'} ${active ? 'active' : ''}" data-page="${page}">${icon(iconName, 18)}<span>${label}</span></button>`;
  }
  function renderSidebar() {
    return `<aside class="sidebar">
      <div class="brand"><span class="brand-mark">${icon('spark', 21)}</span><div><div class="brand-name">ProjectPilot</div><div class="brand-caption">Everything in progress.</div></div></div>
      <div class="nav-label">Workspace</div><nav class="nav-list" aria-label="Main navigation">${navItems.map((item) => navButton(...item)).join('')}</nav>
      <div class="nav-label" style="margin-top:16px">Manage</div><nav class="nav-list">${navButton('settings', 'Settings', 'settings')}</nav>
      <div class="sidebar-spacer"></div>
      <button class="workspace-card" data-action="go-profile"><span class="avatar">${escapeHtml(initial(state.displayName))}</span><span style="text-align:left"><span class="workspace-name">${escapeHtml(state.workspace)}</span><span class="workspace-plan">Personal plan</span></span><span class="workspace-arrow">${icon('down', 15)}</span></button>
    </aside>`;
  }
  function currentTitle() {
    if (state.page === 'project-detail') return getProject(state.selectedProjectId)?.name || 'Project details';
    if (state.page === 'profile') return 'Your profile';
    return ({ overview: 'Overview', projects: 'Projects', tasks: 'Tasks', board: 'Task board', calendar: 'Calendar', assistant: 'AI Assistant', reports: 'Reports & insights', github: 'GitHub repositories', settings: 'Settings' }[state.page] || 'Overview');
  }
  function renderTopbar() {
    return `<header class="topbar">
      <div class="topbar-left"><button class="mobile-menu" data-action="open-menu" aria-label="Open navigation">${icon('menu', 18)}</button><div><div class="crumb">${state.page === 'project-detail' ? 'Projects / Project details' : state.workspace}</div><div class="topbar-title">${escapeHtml(currentTitle())}</div></div></div>
      <div class="topbar-actions"><div class="search-wrap" id="search-wrap"><label class="search-box" aria-label="Search workspace">${icon('search', 16)}<input id="global-search" type="search" placeholder="Search projects, tasks..." value="${escapeHtml(searchValue)}" autocomplete="off"/><span class="sr-only">Search workspace</span></label><div class="search-results" id="search-results"></div></div>
        <button class="icon-button" data-action="notifications" aria-label="Notifications">${icon('bell', 17)}<span class="notification-dot"></span></button>
        <button class="primary-button" data-action="new-task">${icon('plus', 16)} New task</button>
      </div>
    </header>`;
  }
  function renderMobileNav() {
    return `<nav class="mobile-bottom-nav" aria-label="Mobile navigation">${[['overview','Home','home'],['projects','Projects','projects'],['tasks','Tasks','tasks'],['calendar','Calendar','calendar'],['profile','Profile','profile']].map(([p,l,i]) => navButton(p,l,i,true)).join('')}</nav>`;
  }
  function pageHeading(title, subtitle, actions = '') {
    return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
  }
  function renderOverview() {
    const open = state.tasks.filter((task) => task.status !== 'done');
    const dueSoon = open.filter((task) => daysUntil(task.due) >= 0 && daysUntil(task.due) <= 7);
    const completed = state.tasks.filter((task) => task.status === 'done');
    const activeProjects = state.projects.filter((project) => projectProgress(project.id) < 100);
    const topProjects = activeProjects.slice(0, 3);
    const nextDeadlines = open.slice().sort((a,b) => a.due.localeCompare(b.due)).slice(0, 4);
    const myTasks = open.slice().sort((a,b) => a.due.localeCompare(b.due)).slice(0, 4);
    const week = [4, 6, 5, 8, 7, 12, 9];
    const bars = week.map((n, i) => `<div class="chart-day"><div class="chart-bars"><span class="chart-bar secondary" style="height:${Math.max(14,n*5-12)}px"></span><span class="chart-bar" style="height:${n*6}px"></span></div><span>${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span></div>`).join('');
    const actions = `<button class="secondary-button" data-page="projects">View projects ${icon('arrowUpRight',14)}</button>`;
    return `${pageHeading(`Good morning, ${escapeHtml(state.displayName)} 👋`, 'Here’s what’s happening across your projects.', actions)}
      <section class="stat-grid" aria-label="Workspace summary">
        <article class="card stat-card"><div class="stat-top"><span class="stat-label">Total projects</span><span class="stat-icon">${icon('folder',16)}</span></div><div class="stat-value">${String(state.projects.length).padStart(2,'0')}</div><div class="stat-meta"><span class="meta-positive">+2</span> this month</div></article>
        <article class="card stat-card"><div class="stat-top"><span class="stat-label">In progress</span><span class="stat-icon blue">${icon('target',16)}</span></div><div class="stat-value">${String(activeProjects.length).padStart(2,'0')}</div><div class="stat-meta">${dueSoon.length} tasks due this week</div></article>
        <article class="card stat-card"><div class="stat-top"><span class="stat-label">Completed tasks</span><span class="stat-icon green">${icon('checkSquare',16)}</span></div><div class="stat-value">${String(completed.length).padStart(2,'0')}</div><div class="stat-meta"><span class="meta-positive">Great work!</span> keep it going</div></article>
        <article class="card stat-card"><div class="stat-top"><span class="stat-label">Due soon</span><span class="stat-icon orange">${icon('calendar',16)}</span></div><div class="stat-value">${String(dueSoon.length).padStart(2,'0')}</div><div class="stat-meta">Next: ${nextDeadlines[0] ? shortDate(nextDeadlines[0].due) : 'All clear'}</div></article>
      </section>
      <div class="dashboard-grid"><div class="stack">
        <section class="card section-card"><div class="card-title-row"><div><h2 class="card-title">Active projects</h2><div class="small-text muted" style="margin-top:4px">A quick look at what you’re moving forward</div></div><button class="link-button" data-page="projects">View all ${icon('right',13)}</button></div><div class="project-grid">${topProjects.length ? topProjects.map((project) => projectCard(project, true)).join('') : `<div class="empty-state"><strong>All caught up</strong>Every project is complete.</div>`}</div></section>
        <section class="card activity-card"><div class="card-title-row"><div><h2 class="card-title">Weekly activity</h2><div class="small-text muted" style="margin-top:4px">Tasks completed this week</div></div><div class="small-text muted"><span class="legend-dot"></span>This week</div></div><div class="activity-chart">${bars}</div><div class="chart-note"><span>A steady week. You’re making progress across ${activeProjects.length} projects.</span><span>${icon('trend',14)}</span></div></section>
      </div><div class="stack">
        <section class="card section-card"><div class="card-title-row"><h2 class="card-title">Upcoming deadlines</h2><button class="link-button" data-page="calendar">Calendar ${icon('right',13)}</button></div><div class="deadline-list">${nextDeadlines.length ? nextDeadlines.map((task) => { const project = getProject(task.projectId); const d = dateFromIso(task.due); return `<div class="deadline-item"><div class="date-badge"><b>${d.toLocaleDateString(undefined,{month:'short'}).toUpperCase()}</b><span>${d.getDate()}</span></div><div class="deadline-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(project?.name || '')}</span></div><span class="deadline-time">${task.due === todayISO ? 'Today' : `${Math.max(0,daysUntil(task.due))}d`}</span></div>`; }).join('') : `<div class="empty-state">No upcoming deadlines.</div>`}</div></section>
        <section class="card section-card"><div class="card-title-row"><div><h2 class="card-title">My tasks</h2><div class="small-text muted" style="margin-top:4px">${open.length} pending</div></div><button class="link-button" data-page="tasks">See all ${icon('right',13)}</button></div><div class="task-list">${myTasks.map((task) => taskRow(task,{showDate:true})).join('')}</div></section>
      </div></div>`;
  }
  function renderProjects() {
    let projects = state.projects.slice();
    if (state.projectFilter === 'active') projects = projects.filter((project) => projectProgress(project.id) < 100);
    if (state.projectFilter === 'completed') projects = projects.filter((project) => projectProgress(project.id) >= 100);
    const actions = `${githubRepos ? `<button class="secondary-button" data-action="sync-github">${icon('github',14)} Sync GitHub repos</button>` : ''}<button class="primary-button" data-action="new-project">${icon('plus',15)} New project</button>`;
    return `${pageHeading('Projects', 'Everything you’re working on, all in one place.', actions)}
      <div class="toolbar-row"><div class="segmented" role="tablist"><button class="segment ${state.projectFilter==='all'?'active':''}" data-action="project-filter" data-value="all">All projects</button><button class="segment ${state.projectFilter==='active'?'active':''}" data-action="project-filter" data-value="active">Active</button><button class="segment ${state.projectFilter==='completed'?'active':''}" data-action="project-filter" data-value="completed">Completed</button></div><span class="small-text muted">${projects.length} ${projects.length === 1 ? 'project' : 'projects'}</span></div>
      <div class="projects-grid">${projects.length ? projects.map((project) => projectCard(project)).join('') : `<div class="card empty-state"><strong>No projects here yet</strong>Create a project to start planning your next milestone.<button class="primary-button" style="margin-top:14px" data-action="new-project">${icon('plus',15)} New project</button></div>`}</div>`;
  }
  function renderTasks() {
    let tasks = state.tasks.slice();
    if (state.taskFilter === 'today') tasks = tasks.filter((task) => task.status !== 'done' && task.due <= todayISO);
    else if (state.taskFilter === 'upcoming') tasks = tasks.filter((task) => task.status !== 'done' && task.due > todayISO);
    else if (state.taskFilter === 'completed') tasks = tasks.filter((task) => task.status === 'done');
    else tasks = tasks.filter((task) => task.status !== 'done');
    if (taskSearch) tasks = tasks.filter((task) => task.title.toLowerCase().includes(taskSearch.toLowerCase()) || getProject(task.projectId)?.name.toLowerCase().includes(taskSearch.toLowerCase()));
    tasks.sort((a,b) => a.due.localeCompare(b.due));
    const todayTasks = tasks.filter((task) => task.due <= todayISO && task.status !== 'done');
    const upcomingTasks = tasks.filter((task) => task.due > todayISO && task.status !== 'done');
    const doneTasks = tasks.filter((task) => task.status === 'done');
    const tabs = [['all','All open'],['today','Today'],['upcoming','Upcoming'],['completed','Completed']];
    const group = (title, list) => list.length ? `<section class="task-group"><div class="task-group-heading">${title}<span class="group-count">${list.length}</span></div><div class="task-list">${list.slice(0, state.taskFilter === 'all' ? 12 : 28).map((task) => taskRow(task,{showDate:true})).join('')}</div></section>` : '';
    return `${pageHeading('My tasks', 'Keep the next action clear and keep momentum going.', `<button class="secondary-button" data-action="open-board">${icon('projects',14)} Open board</button>`)}
      <div class="task-page-grid"><section class="card task-panel"><div class="toolbar-row"><div class="segmented">${tabs.map(([value,label]) => `<button class="segment ${state.taskFilter===value?'active':''}" data-action="task-filter" data-value="${value}">${label}</button>`).join('')}</div><label class="filter-select" style="display:flex;gap:7px;align-items:center">${icon('search',13)}<input id="task-search" type="search" value="${escapeHtml(taskSearch)}" placeholder="Filter tasks" style="border:0;outline:0;width:95px;font-size:10px;background:transparent"></label></div>
        ${state.taskFilter === 'completed' ? group('Completed',doneTasks) : state.taskFilter === 'today' ? group('Due today',todayTasks) : state.taskFilter === 'upcoming' ? group('Coming up',upcomingTasks) : `${group('Due today',todayTasks)}${group('Coming up',upcomingTasks)}`}
        ${!tasks.length ? `<div class="empty-state"><strong>You’re all caught up</strong>No tasks match this view. Create a task or switch the filter.</div>` : ''}</section>
        <aside class="stack"><section class="card focus-card"><div class="eyebrow" style="color:#eeeaff">Focus time</div><div class="focus-time">25 <span style="font-size:13px;font-weight:500">min</span></div><div class="muted small-text">A short focus sprint for your next task.</div><div class="focus-progress"><span style="width:${state.focusRunning ? '30%' : '0%'}"></span></div><button class="secondary-button" data-action="toggle-focus">${state.focusRunning ? 'Finish focus session' : 'Start a focus session'}</button></section>
        <section class="card task-panel"><h2 class="card-title">Your task snapshot</h2><div class="mini-stat-row"><div class="mini-stat"><b>${todayTasks.length}</b><span>Due today</span></div><div class="mini-stat"><b>${upcomingTasks.length}</b><span>Upcoming</span></div></div><div class="small-text muted" style="line-height:1.6;margin-top:13px">Small, steady progress adds up. Check off a task when it’s done.</div></section></aside></div>`;
  }
  function renderBoard() {
    const columns = [['todo','To do'],['inprogress','In progress'],['review','In review'],['done','Completed']];
    const tasks = state.tasks.slice().sort((a,b) => a.due.localeCompare(b.due));
    return `${pageHeading('Task board', 'Move work forward, one task at a time.', `<button class="secondary-button" data-page="tasks">${icon('tasks',14)} My tasks</button><button class="primary-button" data-action="new-task">${icon('plus',15)} Add task</button>`)}
      <div class="toolbar-row"><span class="small-text muted">Drag cards between columns to update their status.</span><select class="filter-select" id="board-project-filter"><option value="all" ${boardProjectFilter==='all'?'selected':''}>All projects</option>${state.projects.map((project) => `<option value="${project.id}" ${boardProjectFilter===project.id?'selected':''}>${escapeHtml(project.name)}</option>`).join('')}</select></div>
      <div class="board-scroll"><div class="board">${columns.map(([status,label]) => {
        let list = tasks.filter((task) => task.status === status);
        if (boardProjectFilter !== 'all') list = list.filter((task) => task.projectId === boardProjectFilter);
        if (status === 'done') list = list.slice(-8);
        return `<section class="board-column" data-status="${status}"><div class="board-column-head"><div class="board-column-title"><span class="column-dot"></span>${label}</div><span class="column-count">${list.length}</span></div>${list.length ? list.map((task) => { const project=getProject(task.projectId); return `<article class="board-card" draggable="true" data-task-id="${escapeHtml(task.id)}"><h3>${escapeHtml(task.title)}</h3><div class="board-project">${escapeHtml(project?.name || '')}</div><div class="board-card-foot"><span class="status-pill ${task.priority==='high'?'overdue':task.priority==='medium'?'attention':'active'}">${task.priority} priority</span><span class="board-due">${icon('calendar',12)} ${shortDate(task.due)}</span></div></article>`; }).join('') : `<div class="small-text muted" style="padding:8px 3px">Nothing here yet.</div>`}</section>`;
      }).join('')}</div></div>`;
  }
  function eventColor(task) { return ({ portfolio:'', study:'blue', finance:'orange', travel:'green' }[task.projectId] || ''); }
  function renderCalendar() {
    const [year, month] = state.calendarMonth.split('-').map(Number);
    const first = new Date(year, month - 1, 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(year, month - 1, 1 - offset);
    const totalDays = 42;
    const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const days = Array.from({length:totalDays},(_,i) => {
      const d=addDays(start,i), value=iso(d), inMonth=d.getMonth()===month-1;
      const dayTasks=tasksForDate(value).slice(0,2);
      return `<button class="calendar-day ${inMonth?'':'outside'} ${state.calendarDate===value?'selected':''} ${value===todayISO?'today':''}" data-action="select-date" data-date="${value}"><span class="day-number">${d.getDate()}</span>${dayTasks.map((task) => `<span class="calendar-event ${eventColor(task)}">${escapeHtml(task.title)}</span>`).join('')}</button>`;
    }).join('');
    const monthName = new Date(year,month-1,1).toLocaleDateString(undefined,{month:'long',year:'numeric'});
    const upcoming = state.tasks.filter((task) => task.status !== 'done' && task.due >= todayISO).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
    const selectedTasks = tasksForDate(state.calendarDate);
    return `${pageHeading('Calendar', 'See deadlines and milestones across your workspace.', `<button class="secondary-button" data-action="select-today">Today</button>`)}
      <div class="calendar-layout"><section class="card calendar-card"><div class="calendar-head"><div class="calendar-month">${monthName}</div><div class="calendar-controls"><button class="icon-button" data-action="month-prev" aria-label="Previous month">${icon('left',14)}</button><button class="icon-button" data-action="month-next" aria-label="Next month">${icon('right',14)}</button></div></div><div class="calendar-grid-wrap"><div class="calendar-grid">${weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`).join('')}${days}</div></div><div class="calendar-selection"><h4>${dateLong(state.calendarDate)}</h4><div class="small-text muted">${selectedTasks.length ? `${selectedTasks.length} ${selectedTasks.length === 1 ? 'task' : 'tasks'} due on this day` : 'No deadlines on this day.'}</div>${selectedTasks.map((task)=>`<div class="deadline-item" style="padding-bottom:0"><div class="deadline-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(getProject(task.projectId)?.name || '')}</span></div>${priorityDot(task.priority)}</div>`).join('')}</div></section>
        <aside class="card upcoming-card"><div class="card-title-row"><h2 class="card-title">Upcoming deadlines</h2><span class="status-pill active">${upcoming.length} ahead</span></div><div class="deadline-list">${upcoming.map((task)=>{ const date=dateFromIso(task.due); return `<button class="deadline-item" data-action="select-date" data-date="${task.due}" style="width:100%;text-align:left;border-left:0;border-right:0;border-top:0;background:transparent"><span class="upcoming-date">${date.toLocaleDateString(undefined,{month:'short'}).toUpperCase()}<b>${date.getDate()}</b></span><span class="deadline-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(getProject(task.projectId)?.name || '')}</span></span></button>`; }).join('')}</div></aside></div>`;
  }
  function assistantReply(prompt) {
    const q = prompt.toLowerCase();
    const open = state.tasks.filter((task) => task.status !== 'done').sort((a,b) => a.due.localeCompare(b.due));
    const overdue = open.filter((task) => task.due < todayISO);
    const thisWeek = open.filter((task) => daysUntil(task.due) >= 0 && daysUntil(task.due) <= 7);
    const priorities = open.filter((task) => task.priority === 'high').slice(0, 3);
    if (githubOverview?.length && /repo|repository|commit|pull request|milestone|github|change|progress/.test(q)) {
      const ordered=githubOverview.slice().sort((a,b)=>(b.commits?.[0]?.date||'').localeCompare(a.commits?.[0]?.date||''));
      const commits=ordered.filter((r)=>r.commits?.length).slice(0,4).map((r)=>`• ${r.full_name}: ${r.commits[0].message} (${shortDate((r.commits[0].date||'').slice(0,10))})`);
      const progress=githubOverview.filter((r)=>r.milestone_progress!==null).sort((a,b)=>a.milestone_progress-b.milestone_progress);
      const prs=githubOverview.reduce((n,r)=>n+(r.pulls?.length||0),0);
      const issues=githubOverview.reduce((n,r)=>n+(r.issues?.length||0),0);
      return `I checked ${githubOverview.length} accessible repositories. I found ${prs} open pull requests and ${issues} recently updated open issues in the activity sample.\n\n${commits.length?`Recent changes:\n${commits.join('\n')}`:'No recent commits were returned.'}\n\n${progress.length?`Milestone progress (repos with milestones):\n${progress.slice(0,5).map(r=>`• ${r.full_name}: ${r.milestone_progress}% (${r.milestone_closed}/${r.milestone_open+r.milestone_closed} milestone issues closed)`).join('\n')}`:'No repository milestones are configured, so GitHub does not provide a milestone-based completion percentage yet.'}`;
    }
    if (/overdue|late|past due/.test(q)) return overdue.length ? `I found ${overdue.length} overdue ${overdue.length===1?'task':'tasks'}:\n${overdue.slice(0,4).map((task)=>`• ${task.title} — ${getProject(task.projectId)?.name}`).join('\n')}\n\nI’d start with the one that is blocking the next milestone, then update the remaining due dates.` : 'You have no overdue tasks right now. Nice work keeping things moving.';
    if (/week|remain|coming up|deadline/.test(q)) return thisWeek.length ? `Here’s what’s due over the next 7 days:\n${thisWeek.slice(0,5).map((task)=>`• ${task.title} — ${task.due===todayISO?'today':shortDate(task.due)} (${getProject(task.projectId)?.name})`).join('\n')}\n\nA good plan is to finish today’s items first, then reserve a short review block for the next milestone.` : 'Your next 7 days look clear. You could use the time to move a larger milestone forward.';
    if (/risk|at risk|behind/.test(q)) {
      const risks = state.projects.filter((project)=>projectProgress(project.id)<60 && daysUntil(project.due)<14);
      return risks.length ? `These projects may need a closer look:\n${risks.map((project)=>`• ${project.name} — ${projectProgress(project.id)}% complete, due ${shortDate(project.due)}`).join('\n')}\n\nConsider moving one milestone or trimming scope before the due date.` : 'I don’t see a project that is both close to its due date and below 60% complete. AI Study Companion has open API work, so keep an eye on that dependency.';
    }
    if (/summar|progress|done|completed/.test(q)) return `You’ve completed ${state.tasks.filter((task)=>task.status==='done').length} tasks across ${state.projects.length} projects. ${state.projects.filter((p)=>projectProgress(p.id)>=100).map((p)=>p.name).join(', ') || 'Your projects are moving forward'} ${state.projects.filter((p)=>projectProgress(p.id)>=100).length ? 'is complete.' : 'are still in progress.'} Your next high-priority actions are ${priorities.slice(0,2).map((task)=>task.title).join(' and ') || 'already under control'}.`;
    return priorities.length ? `Based on your deadlines, I’d focus on “${priorities[0].title}” for ${getProject(priorities[0].projectId)?.name}. It’s high priority and due ${priorities[0].due===todayISO?'today':shortDate(priorities[0].due)}.${priorities[1] ? ` After that, take on “${priorities[1].title}”.` : ''}\n\nI’m using the project and task information saved in this browser to make this suggestion.` : 'You have a little room to plan ahead. Pick one project milestone and break it into a small task you can finish today.';
  }
  function messageHtml(message) {
    return `<div class="chat-message ${message.role==='user'?'user':''}">${message.role==='user' ? `<span class="avatar">${escapeHtml(initial(state.displayName))}</span>` : `<span class="ai-mark">${icon('spark',14)}</span>`}<div class="bubble">${escapeHtml(message.text)}<small>${escapeHtml(message.time || 'Just now')}</small></div></div>`;
  }
  function renderAssistant() {
    const suggested = ['What remains this week?','Which project is at risk?','Summarize my progress','What should I focus on today?'];
    const dueTasks = state.tasks.filter((task)=>task.status!=='done' && daysUntil(task.due)>=0).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,3);
    return `${pageHeading('AI Assistant', 'Your project context, one conversation away.', '')}
      <div class="assistant-layout"><section class="card chat-card"><div class="chat-head"><span class="ai-mark">${icon('spark',19)}</span><div><div class="card-title">ProjectPilot AI</div><div class="small-text muted" style="margin-top:4px">Workspace-aware helper</div></div><span class="status-pill done" style="margin-left:auto">Ready</span></div><div class="chat-log" id="chat-log">${state.messages.map(messageHtml).join('')}</div><div class="suggestions">${suggested.map((prompt)=>`<button class="prompt-chip" data-action="use-prompt" data-value="${escapeHtml(prompt)}">${escapeHtml(prompt)}</button>`).join('')}</div><form class="composer" id="assistant-form"><textarea id="assistant-input" name="prompt" rows="1" placeholder="Ask about your projects..." required></textarea><button class="send-button" type="submit" aria-label="Send message">${icon('send',16)}</button></form></section>
        <aside class="assistant-aside"><section class="card aside-card"><h3>Coming up</h3>${dueTasks.length ? dueTasks.map((task)=>`<div class="insight-row"><span class="insight-icon">${icon('calendar',13)}</span><div><strong style="display:block;font-size:10px">${escapeHtml(task.title)}</strong><span class="muted">${shortDate(task.due)} · ${escapeHtml(getProject(task.projectId)?.name || '')}</span></div></div>`).join('') : `<div class="small-text muted">No upcoming tasks.</div>`}</section><section class="card aside-card"><h3>Suggested prompts</h3>${suggested.map((prompt)=>`<button class="profile-action" data-action="use-prompt" data-value="${escapeHtml(prompt)}" style="padding:9px 0">${icon('spark',14)}<span>${escapeHtml(prompt)}</span>${icon('right',13)}</button>`).join('')}</section><section class="card aside-card"><div class="assistant-disclaimer">This local demo assistant uses your saved task and project data to draft suggestions. It does not call an external AI service.</div></section></aside></div>`;
  }
  function renderReports() {
    const completed = state.tasks.filter((task)=>task.status==='done').length;
    const total = state.tasks.length;
    const finished = state.projects.filter((project)=>projectProgress(project.id)>=100).length;
    const open = state.tasks.filter((task)=>task.status!=='done');
    const onTimeCount = state.tasks.filter((task)=>task.status==='done' && task.completedAt && task.completedAt <= task.due).length;
    const onTime = completed ? Math.round((onTimeCount/completed)*100) : 0;
    const chart = [4,6,5,8,7,12].map((n,i)=>`<div class="bar-week"><div class="bar-pair"><span style="height:${Math.max(9,n*12)}px"></span><span style="height:${Math.max(7,(n-2)*11)}px"></span></div><span>W${i+1}</span></div>`).join('');
    return `${pageHeading('Reports & insights', 'A clear picture of your progress over time.', `<button class="secondary-button" data-action="export-report">${icon('arrowUpRight',14)} Export summary</button>`)}
      <section class="report-stat-grid"><article class="card report-stat"><div class="stat-top"><span class="stat-label">Tasks completed</span><span class="stat-icon green">${icon('checkSquare',16)}</span></div><div class="report-value">${completed}</div><div class="stat-meta">of ${total} tasks across your workspace</div></article><article class="card report-stat"><div class="stat-top"><span class="stat-label">On-time completion</span><span class="stat-icon blue">${icon('target',16)}</span></div><div class="report-value">${onTime}%</div><div class="stat-meta">Based on completed task due dates</div></article><article class="card report-stat"><div class="stat-top"><span class="stat-label">Projects finished</span><span class="stat-icon orange">${icon('flag',16)}</span></div><div class="report-value">${String(finished).padStart(2,'0')}</div><div class="stat-meta">${open.length} tasks still in progress</div></article></section>
      <div class="dashboard-grid"><section class="card report-chart-card"><div class="card-title-row"><div><h2 class="card-title">Completion trend</h2><div class="small-text muted" style="margin-top:4px">Tasks completed per week</div></div><span class="small-text muted">Last 6 weeks</span></div><div class="bar-chart">${chart}</div><div class="chart-note"><span><span class="legend-dot"></span>This period</span><span>Steady progress</span></div></section>
      <section class="card section-card"><div class="card-title-row"><h2 class="card-title">Project health</h2><button class="link-button" data-page="projects">View all</button></div><div class="health-list">${state.projects.map((project)=>{ const progress=projectProgress(project.id); const attention=progress<50 && daysUntil(project.due)<21; return `<div class="health-row"><div class="health-name">${projectAvatar(project)}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(project.name)}</span></div><span class="status-pill ${progress>=100?'done':attention?'attention':'active'}">${progress>=100?'Complete':attention?'Needs attention':'On track'}</span></div>`; }).join('')}</div></section></div>`;
  }
  function renderGithub() {
    const actions = githubRepos ? `<button class="secondary-button" data-action="sync-github">${icon('github',14)} Sync all ${githubRepos.length} repos</button>` : '';
    const heading = pageHeading('GitHub repositories', 'Browse repositories available to your signed-in GitHub account.', actions);
    if (githubLoading) return `${heading}<section class="card empty-state"><strong>Connecting to GitHub…</strong>Using your existing GitHub CLI sign-in.</section>`;
    if (githubError) return `${heading}<section class="card empty-state"><strong>GitHub connection needed</strong>${escapeHtml(githubError)}<div><button class="primary-button" data-action="github-retry" style="margin-top:14px">Try again</button></div><div class="small-text muted" style="margin-top:12px">Sign in on this machine with <code>gh auth login</code>, then refresh this page.</div></section>`;
    if (!githubRepos) return `${heading}<section class="card empty-state"><strong>Loading repositories…</strong></section>`;
    const selected = githubRepos.find((repo)=>repo.full_name===selectedGithubRepo);
    const detail = selected && githubDetails?.repository ? `<section class="card section-card" style="margin-bottom:15px"><div class="card-title-row"><div>${projectAvatar({name:selected.name,color:'purple'})}<h2 class="card-title" style="display:inline-block;margin-left:9px;vertical-align:middle">${escapeHtml(selected.full_name)}</h2><div class="small-text muted" style="margin:7px 0 0 44px">${escapeHtml(selected.description||'No description')}</div></div><a class="secondary-button" href="${escapeHtml(selected.html_url)}" target="_blank" rel="noopener noreferrer">Open on GitHub ${icon('arrowUpRight',14)}</a></div><div class="repo-metrics"><span>${icon('flag',14)} ${selected.default_branch||'main'}</span><span>${icon('reports',14)} ${selected.language||'No language'}</span><span>${icon('spark',14)} ${selected.stargazers_count||0} stars</span><span>${icon('tasks',14)} ${githubDetails.issues?.length||0} open issues loaded</span><span>${icon('github',14)} ${githubDetails.pulls?.length||0} open PRs loaded</span></div><div class="repo-link-row"><label class="small-text">Link to ProjectPilot project</label><select class="filter-select" data-action="link-repo" data-repo="${escapeHtml(selected.full_name)}"><option value="">Not linked</option>${state.projects.map((project)=>`<option value="${project.id}" ${state.githubLinks?.[project.id]===selected.full_name?'selected':''}>${escapeHtml(project.name)}</option>`).join('')}</select></div><div class="repo-columns"><div><h3 class="card-title">Recent commits</h3>${(githubDetails.commits||[]).map((commit)=>`<div class="repo-row"><strong>${escapeHtml(commit.commit?.message?.split('\n')[0]||'Commit')}</strong><span>${escapeHtml(commit.commit?.author?.name||'')}</span></div>`).join('')||'<div class="small-text muted">No recent commits returned.</div>'}</div><div><h3 class="card-title">Open pull requests</h3>${(githubDetails.pulls||[]).slice(0,5).map((pr)=>`<a class="repo-row repo-anchor" href="${escapeHtml(pr.html_url)}" target="_blank" rel="noopener noreferrer"><strong>#${pr.number} ${escapeHtml(pr.title)}</strong><span>${escapeHtml(pr.user?.login||'')}</span></a>`).join('')||'<div class="small-text muted">No open pull requests.</div>'}</div></div></section>` : '';
    return `${heading}${detail}<div class="repo-grid">${githubRepos.map((repo)=>{const progress=githubOverview?.find(r=>r.full_name===repo.full_name);return `<button class="card repo-card ${selectedGithubRepo===repo.full_name?'selected':''}" data-action="select-repo" data-repo="${escapeHtml(repo.full_name)}"><div class="repo-card-head"><span class="repo-mark">${icon('github',17)}</span><span class="repo-visibility">${repo.private?'Private':'Public'}</span></div><strong>${escapeHtml(repo.full_name)}</strong><span class="repo-description">${escapeHtml(repo.description||'No description provided.')}</span>${progress?.milestone_progress!==null&&progress?.milestone_progress!==undefined?`<span class="repo-meta">Milestone progress · ${progress.milestone_progress}% (${progress.milestone_closed}/${progress.milestone_open+progress.milestone_closed} issues closed)</span><span class="progress-track"><span class="progress-fill" style="display:block;width:${progress.milestone_progress}%"></span></span>`:`<span class="repo-meta">No milestones · ${repo.open_issues_count||0} open issues / PRs</span>`}<span class="repo-meta">${escapeHtml(repo.language||'No language')} · ${repo.stargazers_count||0} stars · pushed ${shortDate((repo.pushed_at||repo.updated_at||'').slice(0,10))}</span>${Object.values(state.githubLinks||{}).includes(repo.full_name)?'<span class="status-pill active">Linked to a project</span>':''}</button>`}).join('')}</div>`;
  }
  async function loadGithub() {
    if (githubLoading || githubRepos) return;
    githubLoading=true; githubError=''; render();
    try {
      const response=await fetch('/api/github/repos');
      const data=await response.json();
      if(!response.ok) throw new Error(data.error||'Unable to load repositories.');
      githubRepos=data; if(!selectedGithubRepo&&githubRepos.length) selectedGithubRepo=githubRepos[0].full_name;
      if(selectedGithubRepo) await loadGithubDetails(selectedGithubRepo,false);
      loadGithubOverview();
    } catch(error) { githubError=error.message; }
    githubLoading=false; render();
  }
  async function loadGithubOverview() {
    if(githubOverviewLoading||githubOverview) return;
    githubOverviewLoading=true;
    try { const response=await fetch('/api/github/overview'); const data=await response.json(); if(!response.ok) throw new Error(data.error||'Unable to load GitHub progress.'); githubOverview=data; }
    catch(error) { githubError=error.message; }
    githubOverviewLoading=false; if(state.page==='github') render();
  }
  async function loadGithubDetails(fullName, redraw=true) {
    selectedGithubRepo=fullName; githubDetails=null;
    if(redraw) render();
    try { const response=await fetch(`/api/github/repos/${fullName.split('/').map(encodeURIComponent).join('/')}`); const data=await response.json(); if(!response.ok) throw new Error(data.error||'Could not load repository details.'); githubDetails=data; }
    catch(error) { githubError=error.message; }
    if(redraw||!githubLoading) render();
  }
  function syncGithubProjects() {
    if(!githubRepos?.length) return;
    state.githubLinks=state.githubLinks||{};
    let added=0, updated=0;
    githubRepos.forEach((repo)=>{
      let project=state.projects.find((item)=>state.githubLinks[item.id]===repo.full_name);
      if(project) { updated++; }
      else { project={id:`github-${repo.id}`,name:repo.name,category:repo.owner?.login||'GitHub',description:repo.description||'',color:colors[state.projects.length%colors.length],due:null,created:todayISO,owner:state.displayName,notes:`GitHub repository · ${repo.full_name}`}; state.projects.push(project); added++; }
      state.githubLinks[project.id]=repo.full_name;
      project.name=repo.name; project.category=repo.owner?.login||'GitHub'; project.description=repo.description||'';
    });
    save(); render(); showToast(`Synced ${githubRepos.length} GitHub repos · ${added} added, ${updated} updated`);
  }
  function renderProjectDetail() {
    const project = getProject(state.selectedProjectId) || state.projects[0];
    if (!project) return renderProjects();
    const tasks = tasksForProject(project.id);
    const done = tasks.filter((task)=>task.status==='done').length;
    const open = tasks.filter((task)=>task.status!=='done').sort((a,b)=>a.due.localeCompare(b.due));
    const percent = projectProgress(project.id);
    const milestoneGroups = [
      { title: 'Planning & research', list: tasks.slice(0, Math.min(5,tasks.length)) },
      { title: 'Design & development', list: tasks.slice(5, Math.min(10,tasks.length)) },
      { title: 'Testing & launch', list: tasks.slice(Math.max(10,tasks.length-4)) },
    ].filter((group)=>group.list.length);
    const repoName=state.githubLinks?.[project.id]; const linkedRepo=githubRepos?.find((repo)=>repo.full_name===repoName);
    return `<div class="detail-breadcrumb"><button class="link-button" data-page="projects">${icon('left',13)} All projects</button></div><div class="detail-layout"><div class="stack"><section class="card detail-hero"><div class="detail-title-row"><div class="detail-title">${projectAvatar(project)}<div><h1>${escapeHtml(project.name)}</h1><p>${escapeHtml(state.workspace)} / Projects / ${escapeHtml(project.name)}</p></div></div><div class="heading-actions"><button class="secondary-button" data-action="edit-project" data-id="${escapeHtml(project.id)}">${icon('edit',14)} Edit project</button><button class="danger-button" data-action="remove-project" data-id="${escapeHtml(project.id)}">${icon('close',14)} Remove</button></div></div><p class="detail-description">${escapeHtml(project.description || 'A project in your workspace.')}</p>${linkedRepo?`<div class="repo-link-row"><span class="small-text">${icon('github',14)} Tracking <strong>${escapeHtml(repoName)}</strong></span><button class="link-button" data-page="github">View GitHub activity ${icon('right',13)}</button></div>`:''}<div class="detail-progress"><div class="card-title-row"><span class="card-title" style="font-size:11px">Overall progress</span><strong style="font:700 13px 'Manrope',sans-serif">${percent}%</strong></div><div class="progress-track" style="margin-top:10px"><div class="progress-fill ${percent===100?'green':''}" style="width:${percent}%"></div></div><div class="detail-metrics"><div class="detail-metric"><b>${done} / ${tasks.length}</b><span>Tasks completed</span></div><div class="detail-metric"><b>${project.due?Math.max(0,daysUntil(project.due)):'—'}</b><span>Days remaining</span></div><div class="detail-metric"><b>${escapeHtml(project.category)}</b><span>Category</span></div></div></div></section>
        <section class="card section-card"><div class="card-title-row"><div><h2 class="card-title">Tasks & milestones</h2><div class="small-text muted" style="margin-top:4px">${open.length} open · ${done} completed</div></div><button class="primary-button" data-action="new-task" data-project="${escapeHtml(project.id)}">${icon('plus',14)} Add task</button></div><div class="task-list">${open.slice(0,8).map((task)=>taskRow(task,{showDate:true,showStatus:true})).join('') || `<div class="empty-state">Everything is complete. Great work!</div>`}</div><button class="link-button" data-action="open-board" style="margin-top:9px">Open task board ${icon('right',13)}</button></section></div>
      <aside class="stack"><section class="card section-card"><div class="card-title-row"><h2 class="card-title">Project details</h2>${statusPill(project)}</div><div class="deadline-list"><div class="deadline-item"><div class="insight-icon">${icon('profile',14)}</div><div class="deadline-copy"><span>Owner</span><strong>${escapeHtml(project.owner || state.displayName)}</strong></div></div><div class="deadline-item"><div class="insight-icon">${icon('calendar',14)}</div><div class="deadline-copy"><span>Due date</span><strong>${dateLong(project.due)}</strong></div></div><div class="deadline-item"><div class="insight-icon">${icon('folder',14)}</div><div class="deadline-copy"><span>Category</span><strong>${escapeHtml(project.category)}</strong></div></div></div><div style="margin-top:16px"><div class="eyebrow">Project notes</div><div class="small-text" style="line-height:1.65;margin-top:7px;color:#696e82">${escapeHtml(project.notes || 'Add a note to keep the team aligned.')}</div></div></section>
        <section class="card section-card"><h2 class="card-title">Milestones</h2>${milestoneGroups.map((group)=>{ const complete=group.list.filter((task)=>task.status==='done').length; return `<div class="milestone"><span class="milestone-check ${complete===group.list.length?'done':''}">${complete===group.list.length?icon('check',11):''}</span><div style="flex:1"><strong>${escapeHtml(group.title)}</strong><span>${complete} / ${group.list.length} tasks complete</span><div class="progress-track" style="margin-top:7px;height:4px"><div class="progress-fill ${complete===group.list.length?'green':''}" style="width:${Math.round(complete/group.list.length*100)}%"></div></div></div></div>`; }).join('')}</section></aside></div>`;
  }
  function renderSettings() {
    const tabs = [['profile','Profile'],['preferences','Preferences'],['workspace','Workspace']];
    const body = activeSettingsTab === 'preferences' ? `<h2>Preferences</h2><p>Choose what you’d like ProjectPilot to keep you updated on.</p>${[['emailUpdates','Email updates','Get a short note when something important changes.'],['deadlineReminders','Deadline reminders','A nudge when a task is coming up.'],['weeklySummary','Weekly summary','A recap of your projects at the end of each week.'],['compactMode','Compact layout','Use a denser layout for lists and boards.']].map(([key,title,copy])=>`<div class="preference-row"><div><strong>${title}</strong><span>${copy}</span></div><input class="switch" type="checkbox" data-preference="${key}" ${state.preferences?.[key]?'checked':''} aria-label="${title}"></div>`).join('')}`
      : activeSettingsTab === 'workspace' ? `<h2>Workspace</h2><p>Change the name and reset the local demo data.</p><form id="workspace-form"><div class="form-grid"><div class="form-field full"><label for="workspace-name">Workspace name</label><input id="workspace-name" name="workspace" value="${escapeHtml(state.workspace)}" required maxlength="50"></div></div><div class="modal-actions"><button class="primary-button" type="submit">Save workspace</button></div></form><div style="border-top:1px solid var(--line);margin-top:22px;padding-top:18px"><div class="card-title">Demo data</div><p style="margin-bottom:12px">Restore the original ProjectPilot sample projects and tasks.</p><button class="danger-button" data-action="reset-data">${icon('close',14)} Reset demo workspace</button></div>`
      : `<h2>Profile details</h2><p>Update the name shown around your workspace.</p><form id="profile-form"><div class="form-grid"><div class="form-field"><label for="display-name">Your name</label><input id="display-name" name="displayName" value="${escapeHtml(state.displayName)}" required maxlength="40"></div><div class="form-field"><label for="profile-email">Email</label><input id="profile-email" name="email" type="email" value="max@example.com"></div></div><div class="modal-actions"><button class="primary-button" type="submit">Save changes</button></div></form>`;
    return `${pageHeading('Settings', 'Make ProjectPilot feel like your workspace.', '')}<div class="settings-layout"><nav class="card settings-menu" aria-label="Settings sections">${tabs.map(([key,label])=>`<button class="settings-tab ${activeSettingsTab===key?'active':''}" data-action="settings-tab" data-value="${key}">${label}</button>`).join('')}</nav><section class="card settings-card">${body}</section></div>`;
  }
  function renderProfile() {
    const actions = [['settings','Account details','settings'],['settings','Notifications','bell'],['settings','Appearance','sun'],['assistant','AI Assistant','ai'],['reports','Reports & insights','reports']];
    return `${pageHeading('Your profile', 'Manage your workspace.', '')}<section class="card profile-card" style="max-width:650px"><div class="profile-hero"><span class="avatar">${escapeHtml(initial(state.displayName))}</span><div><h2>${escapeHtml(state.displayName)}</h2><p>${escapeHtml(state.workspace)}</p></div><button class="secondary-button" style="margin-left:auto" data-page="settings">${icon('edit',14)} Edit profile</button></div>${actions.map(([page,label,iconName])=>`<button class="profile-action" data-page="${page}">${icon(iconName,16)}<span>${label}</span>${icon('chevron',14)}</button>`).join('')}<button class="profile-action" data-action="reset-data">${icon('logout',16)}<span>Reset demo workspace</span>${icon('chevron',14)}</button></section>`;
  }
  function renderPage() {
    switch (state.page) {
      case 'projects': return renderProjects();
      case 'tasks': return renderTasks();
      case 'board': return renderBoard();
      case 'calendar': return renderCalendar();
      case 'assistant': return renderAssistant();
      case 'reports': return renderReports();
      case 'github': return renderGithub();
      case 'project-detail': return renderProjectDetail();
      case 'settings': return renderSettings();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  }

  function searchResultsHtml(query) {
    const q = query.trim().toLowerCase();
    if (!q) return '';
    const matches = [];
    state.projects.filter((project)=>project.name.toLowerCase().includes(q)).slice(0,4).forEach((project)=>matches.push({label:project.name,detail:'Project',icon:'folder',page:'project-detail',id:project.id}));
    state.tasks.filter((task)=>task.title.toLowerCase().includes(q)).slice(0,5).forEach((task)=>matches.push({label:task.title,detail:`Task · ${getProject(task.projectId)?.name || ''}`,icon:'checkSquare',page:'tasks'}));
    if (!matches.length) return `<div class="search-empty">No projects or tasks found for “${escapeHtml(query)}”.</div>`;
    return matches.map((item)=>`<button class="search-result" data-action="search-result" data-page="${item.page}" data-id="${item.id || ''}"><span class="result-icon">${icon(item.icon,14)}</span><span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.detail)}</small></span></button>`).join('');
  }
  function modalHtml() {
    if (!modal) return '';
    if (modal.type === 'mobile-menu') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal" style="width:min(360px,100%);margin-left:0;margin-right:auto;min-height:100vh;border-radius:0 17px 17px 0" data-modal-content><div class="brand" style="padding:0 2px 24px"><span class="brand-mark">${icon('spark',21)}</span><span class="brand-name">ProjectPilot</span><button class="modal-close" style="margin-left:auto" data-action="close-modal">${icon('close',14)}</button></div><div class="nav-label">Workspace</div>${navItems.map(([p,l,i])=>navButton(p,l,i)).join('')}<div class="nav-label" style="margin-top:15px">Manage</div>${navButton('settings','Settings','settings')}</div></div>`;
    if (modal.type === 'remove-project') { const p=getProject(modal.id); return p?`<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-content><div class="modal-head"><div><h2 id="modal-title">Remove project from ProjectPilot?</h2><p>This removes the project and its local task tracking.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close',15)}</button></div><div class="remove-warning"><strong>${escapeHtml(p.name)}</strong><p>The linked GitHub repository will not be changed or deleted. You can sync it again later.</p></div><form id="remove-project-form" data-id="${escapeHtml(p.id)}"><div class="form-field"><label for="confirm-project-name">Type <strong>${escapeHtml(p.name)}</strong> to confirm</label><input id="confirm-project-name" name="confirmName" autocomplete="off" required></div><div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button id="confirm-remove-button" type="submit" class="danger-button" disabled>Remove from ProjectPilot</button></div></form></section></div>`:''; }
    const project = modal.type === 'edit-project' ? getProject(modal.id) : null;
    const isProject = modal.type === 'new-project' || modal.type === 'edit-project';
    const title = modal.type === 'new-project' ? 'Create a project' : modal.type === 'edit-project' ? 'Edit project' : 'Add a task';
    const subtitle = isProject ? 'Give your next piece of work a home.' : 'Capture the next step and keep moving.';
    let fields = '';
    if (isProject) fields = `<div class="form-grid"><div class="form-field full"><label for="project-name">Project name</label><input id="project-name" name="name" value="${escapeHtml(project?.name || '')}" placeholder="e.g. New website" required maxlength="80"></div><div class="form-field"><label for="project-category">Category</label><input id="project-category" name="category" value="${escapeHtml(project?.category || 'Personal')}" placeholder="Personal, Work..." maxlength="40"></div><div class="form-field"><label for="project-due">Target date</label><input id="project-due" name="due" type="date" value="${escapeHtml(project?.due || plusDate(14))}" required></div><div class="form-field full"><label for="project-description">Description</label><textarea id="project-description" name="description" placeholder="What does success look like?">${escapeHtml(project?.description || '')}</textarea></div><div class="form-field full"><label for="project-notes">Project note</label><input id="project-notes" name="notes" value="${escapeHtml(project?.notes || '')}" placeholder="A reminder for future you"></div></div>`;
    else fields = `<div class="form-grid"><div class="form-field full"><label for="task-title">Task name</label><input id="task-title" name="title" placeholder="What needs to get done?" required maxlength="100"></div><div class="form-field"><label for="task-project">Project</label><select id="task-project" name="projectId" required>${state.projects.map((item)=>`<option value="${escapeHtml(item.id)}" ${(modal.projectId || state.selectedProjectId)===item.id?'selected':''}>${escapeHtml(item.name)}</option>`).join('')}</select></div><div class="form-field"><label for="task-due">Due date</label><input id="task-due" name="due" type="date" value="${todayISO}" required></div><div class="form-field"><label for="task-priority">Priority</label><select id="task-priority" name="priority"><option value="medium">Medium</option><option value="high">High</option><option value="low">Low</option></select></div><div class="form-field"><label for="task-status">Status</label><select id="task-status" name="status"><option value="todo">To do</option><option value="inprogress">In progress</option><option value="review">In review</option></select></div></div>`;
    return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-content><div class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close',15)}</button></div><form id="${isProject?'project-form':'task-form'}" data-mode="${modal.type}" data-id="${modal.id || ''}">${fields}<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button type="submit" class="primary-button">${modal.type==='edit-project'?'Save changes':modal.type==='new-project'?'Create project':'Add task'}</button></div></form></section></div>`;
  }
  function render() {
    document.title = `ProjectPilot — ${currentTitle()}`;
    app.innerHTML = `${renderSidebar()}<div class="main-column">${renderTopbar()}<main class="page-content">${renderPage()}</main></div>${renderMobileNav()}${modalHtml()}`;
    const searchResults = document.getElementById('search-results');
    if (searchResults && searchValue) { searchResults.innerHTML = searchResultsHtml(searchValue); searchResults.classList.add('open'); }
    const chatLog = document.getElementById('chat-log');
    if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
    if (state.page === 'github' && !githubRepos && !githubError) loadGithub();
  }
  function setPage(page) {
    state.page = page;
    modal = null;
    mobileDrawerOpen = false;
    save(); render(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function showToast(message) {
    document.querySelector('.toast')?.remove();
    const el = document.createElement('div');
    el.className = 'toast'; el.innerHTML = `${icon('check',15)}<span>${escapeHtml(message)}</span>`;
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>el.remove(), 2700);
  }
  function openModal(type, extra = {}) { modal = {type,...extra}; render(); setTimeout(()=>document.querySelector('.modal input, .modal textarea')?.focus(),20); }
  function toggleTask(id) {
    const task=getTask(id); if(!task) return;
    if(task.status==='done') { task.status='todo'; task.completedAt=null; }
    else { task.status='done'; task.completedAt=todayISO; }
    save(); render(); showToast(task.status==='done'?'Task completed':'Task moved back to To do');
  }
  async function submitAssistant(prompt) {
    const value=prompt.trim(); if(!value) return;
    state.messages.push({role:'user',text:value,time:'Just now'});
    state.messages.push({role:'assistant',text:'Checking your projects and GitHub activity…',time:'Just now'});
    const replyIndex=state.messages.length-1; save(); render();
    if(/repo|repository|commit|pull request|milestone|github|change|progress/.test(value.toLowerCase())) {
      try { const response=await fetch('/api/github/overview'); const data=await response.json(); if(response.ok) githubOverview=data; else throw new Error(data.error||'GitHub request failed'); }
      catch(error) { state.messages[replyIndex]={role:'assistant',text:`I couldn’t reach GitHub just now: ${error.message}. Check that the local server is running and GitHub CLI is signed in.`,time:'Just now'}; save(); render(); return; }
    }
    state.messages[replyIndex]={role:'assistant',text:assistantReply(value),time:'Just now'};
    if(state.messages.length>24) state.messages=state.messages.slice(-24);
    save(); render();
    setTimeout(()=>document.getElementById('assistant-input')?.focus(),0);
  }

  app.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) { modal=null; render(); return; }
    if (event.target.closest('.search-box') && window.matchMedia('(max-width: 920px)').matches) {
      const wrap=document.getElementById('search-wrap'); wrap?.classList.add('focused');
      setTimeout(()=>document.getElementById('global-search')?.focus(),0);
      return;
    }
    const target = event.target.closest('button, [data-action="view-project"], [data-page], .calendar-day');
    if (!target) {
      if (!event.target.closest('.search-wrap')) document.getElementById('search-results')?.classList.remove('open');
      return;
    }
    if (target.closest('[data-modal-content]') && target.dataset.action === 'close-modal') { modal=null; render(); return; }
    const page = target.dataset.page;
    if (page) { if(page==='project-detail') state.selectedProjectId=target.dataset.id; setPage(page); return; }
    const action=target.dataset.action;
    if (!action) {
      if (target.classList.contains('calendar-day')) return;
      return;
    }
    event.preventDefault();
    switch(action) {
      case 'view-project': state.selectedProjectId=target.dataset.id; setPage('project-detail'); break;
      case 'new-project': openModal('new-project'); break;
      case 'remove-project': openModal('remove-project',{id:target.dataset.id}); break;
      case 'sync-github': syncGithubProjects(); break;
      case 'new-task': openModal('new-task',{projectId:target.dataset.project || (state.page==='project-detail'?state.selectedProjectId:undefined)}); break;
      case 'edit-project': openModal('edit-project',{id:target.dataset.id}); break;
      case 'close-modal': modal=null; render(); break;
      case 'toggle-task': toggleTask(target.dataset.id); break;
      case 'project-filter': state.projectFilter=target.dataset.value; save(); render(); break;
      case 'task-filter': state.taskFilter=target.dataset.value; taskSearch=''; save(); render(); break;
      case 'open-board': setPage('board'); break;
      case 'select-date': state.calendarDate=target.dataset.date; save(); render(); break;
      case 'select-today': state.calendarDate=todayISO; state.calendarMonth=todayISO.slice(0,7); save(); render(); break;
      case 'month-prev': { const [y,m]=state.calendarMonth.split('-').map(Number); const d=new Date(y,m-2,1); state.calendarMonth=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; save(); render(); break; }
      case 'month-next': { const [y,m]=state.calendarMonth.split('-').map(Number); const d=new Date(y,m,1); state.calendarMonth=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; save(); render(); break; }
      case 'use-prompt': setPage('assistant'); setTimeout(()=>{ const input=document.getElementById('assistant-input'); if(input){ input.value=target.dataset.value; input.focus(); }},0); break;
      case 'toggle-focus': state.focusRunning=!state.focusRunning; save(); render(); showToast(state.focusRunning?'Focus session started':'Focus session finished'); break;
      case 'settings-tab': activeSettingsTab=target.dataset.value; render(); break;
      case 'go-profile': setPage('profile'); break;
      case 'open-menu': openModal('mobile-menu'); break;
      case 'notifications': showToast('You’re all caught up on notifications'); break;
      case 'project-menu': state.selectedProjectId=target.dataset.id; setPage('project-detail'); break;
      case 'search-result': if(target.dataset.id) state.selectedProjectId=target.dataset.id; searchValue=''; setPage(target.dataset.page); break;
      case 'select-repo': loadGithubDetails(target.dataset.repo); break;
      case 'github-retry': githubRepos=null; githubOverview=null; githubOverviewLoading=false; githubError=''; githubDetails=null; loadGithub(); break;
      case 'reset-data': if(window.confirm('Restore the original ProjectPilot sample workspace? This replaces the data saved in this browser.')) { localStorage.removeItem(STORAGE_KEY); state=seedData(); modal=null; save(); render(); showToast('Sample workspace restored'); } break;
      case 'export-report': {
        const rows=[['Project','Status','Progress','Open tasks','Due date'],...state.projects.map((project)=>[project.name,projectStatus(project),`${projectProgress(project.id)}%`,projectOpenTasks(project.id),project.due])];
        const csv=rows.map((row)=>row.map((cell)=>`"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
        const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); const a=document.createElement('a'); a.href=url; a.download='projectpilot-report.csv'; a.click(); URL.revokeObjectURL(url); showToast('Report exported as CSV'); break;
      }
    }
  });

  app.addEventListener('submit', (event) => {
    const form=event.target;
    if(form.id==='project-form') {
      event.preventDefault(); const values=Object.fromEntries(new FormData(form));
      if(form.dataset.mode==='edit-project') {
        const project=getProject(form.dataset.id); if(project) Object.assign(project,{name:values.name.trim(),category:values.category.trim()||'Personal',due:values.due,description:values.description.trim(),notes:values.notes.trim()});
        modal=null; save(); render(); showToast('Project updated');
      } else {
        const id=`project-${Date.now()}`;
        state.projects.push({id,name:values.name.trim(),category:values.category.trim()||'Personal',due:values.due,description:values.description.trim(),notes:values.notes.trim(),owner:state.displayName,color:colors[state.projects.length%colors.length],created:todayISO});
        state.selectedProjectId=id; state.page='project-detail'; modal=null; save(); render(); showToast('Project created');
      }
    } else if(form.id==='remove-project-form') {
      event.preventDefault(); const project=getProject(form.dataset.id), typed=new FormData(form).get('confirmName');
      if(!project||typed!==project.name.trim()) { showToast('The project name did not match'); return; }
      state.projects=state.projects.filter((item)=>item.id!==project.id); state.tasks=state.tasks.filter((task)=>task.projectId!==project.id); if(state.githubLinks) delete state.githubLinks[project.id];
      state.selectedProjectId=state.projects[0]?.id||''; state.page='projects'; modal=null; save(); render(); showToast('Project removed from ProjectPilot');
    } else if(form.id==='task-form') {
      event.preventDefault(); const values=Object.fromEntries(new FormData(form));
      state.tasks.push({id:`task-${Date.now()}`,projectId:values.projectId,title:values.title.trim(),status:values.status||'todo',priority:values.priority||'medium',due:values.due,completedAt:null});
      modal=null; save(); render(); showToast('Task added to your workspace');
    } else if(form.id==='assistant-form') {
      event.preventDefault(); const input=form.querySelector('textarea'); submitAssistant(input.value);
    } else if(form.id==='profile-form') {
      event.preventDefault(); const values=Object.fromEntries(new FormData(form)); state.displayName=values.displayName.trim()||'Max'; save(); render(); showToast('Profile updated');
    } else if(form.id==='workspace-form') {
      event.preventDefault(); const values=Object.fromEntries(new FormData(form)); state.workspace=values.workspace.trim()||'Personal workspace'; save(); render(); showToast('Workspace updated');
    }
  });

  app.addEventListener('input', (event) => {
    if(event.target.id==='confirm-project-name') { const form=event.target.form; const project=getProject(form?.dataset.id); const button=document.getElementById('confirm-remove-button'); if(button&&project) button.disabled=event.target.value.trim()!==project.name.trim(); }
    if(event.target.id==='global-search') {
      searchValue=event.target.value; const wrap=document.getElementById('search-wrap'); const results=document.getElementById('search-results');
      if(wrap && window.matchMedia('(max-width: 920px)').matches) wrap.classList.add('focused');
      if(results) { results.innerHTML=searchResultsHtml(searchValue); results.classList.toggle('open',!!searchValue.trim()); }
    }
    if(event.target.id==='task-search') {
      const start=event.target.selectionStart; taskSearch=event.target.value; const focused=true; render(); const input=document.getElementById('task-search'); if(input&&focused){input.focus();input.setSelectionRange(start,start);}
    }
  });
  app.addEventListener('change', (event) => {
    if(event.target.matches('[data-preference]')) { state.preferences=state.preferences||{}; state.preferences[event.target.dataset.preference]=event.target.checked; save(); showToast('Preference saved'); }
    if(event.target.matches('[data-action="link-repo"]')) {
      const repo=event.target.dataset.repo, projectId=event.target.value;
      state.githubLinks=state.githubLinks||{};
      Object.keys(state.githubLinks).forEach((key)=>{if(state.githubLinks[key]===repo) delete state.githubLinks[key];});
      if(projectId) state.githubLinks[projectId]=repo;
      save(); render(); showToast(projectId?'Repository linked to project':'Repository unlinked');
    }
    if(event.target.id==='board-project-filter') {
      boardProjectFilter=event.target.value; render();
    }
  });
  app.addEventListener('dragstart', (event) => {
    const card=event.target.closest('.board-card'); if(!card) return;
    event.dataTransfer.setData('text/plain',card.dataset.taskId); event.dataTransfer.effectAllowed='move';
  });
  app.addEventListener('dragover', (event) => {
    const column=event.target.closest('.board-column'); if(!column) return;
    event.preventDefault(); column.classList.add('drag-over');
  });
  app.addEventListener('dragleave', (event) => { const column=event.target.closest('.board-column'); if(column&&!column.contains(event.relatedTarget)) column.classList.remove('drag-over'); });
  app.addEventListener('drop', (event) => {
    const column=event.target.closest('.board-column'); if(!column) return;
    event.preventDefault(); column.classList.remove('drag-over'); const task=getTask(event.dataTransfer.getData('text/plain')); if(!task) return;
    task.status=column.dataset.status; task.completedAt=task.status==='done'?todayISO:null; save(); render(); showToast(`Task moved to ${statusLabel(task.status)}`);
  });
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'&&modal){modal=null;render();}
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.getElementById('global-search')?.focus();}
    if(event.key==='Enter'&&event.target.matches('.project-card')) { state.selectedProjectId=event.target.dataset.id; setPage('project-detail'); }
  });

  render();
})();
