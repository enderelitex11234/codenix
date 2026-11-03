# CODENIX Linux V4
A browser-based desktop OS **simulator** (not a real Linux kernel). Static HTML/CSS/JS, no backend, no build step.

## Run
No server needed: unzip and double-click `index.html`, or deploy to any static host. If browser storage is blocked, it runs in memory and warns you.
Demo login: `admin` / `linux`. This is local browser protection only, not secure server authentication.

## Deploy
- **GitHub Pages:** unzip first, then upload the CONTENTS (index.html, css/, js/, assets/, manifest.json, .nojekyll) so `index.html` sits at the repo root, not inside a subfolder. Then Settings → Pages → Deploy from a branch → `main` / `(root)`. Open `https://USERNAME.github.io/REPO/` after 1–2 minutes and hard-refresh (Ctrl+Shift+R).
- **Netlify:** drag the folder onto app.netlify.com/drop (publish dir `.`, no build command).
- **Vercel:** `vercel --prod` in the folder, framework "Other", no build command.
All asset paths are relative.

## Included
Boot, login/lock/logout, desktop icons, taskbar, start menu, clock, toasts, window manager (drag, resize, minimise, maximise, focus), Terminal, Files (virtual FS, upload/download), Notes, Calculator, Settings (accent, wallpaper, backup export/import, reset). Data is stored in IndexedDB in this browser only and does not sync across devices.

## Not yet built
Browser, Code Editor, Music Player, System Monitor, App Center, Paint, Calendar, virtual desktops, context menus, window snapping.
