# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hybride Club Dijon** — static showcase site for a Hyrox fitness club. No backend, no database: everything is in the React frontend.

## Commands (run from `frontend/`)
```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:5173
npm run build        # Production build into ../public (emptied on each build)
npm run lint         # ESLint
```

## Architecture
- **Stack:** React 19 + Vite + TailwindCSS + React Router v7
- **Routes:** `/` (Home), `/suppression-compte`; `/politique-confidentialite` is a standalone HTML file (`frontend/public/politique-confidentialite.html`), not a React page
- **Content:** coaches and events are static arrays at the top of `src/pages/Home.jsx`; contact is a `mailto:` link + Instagram
- **Deployment:** `public/` is the built site, committed to git and served by Apache. `frontend/public/.htaccess` (copied into the build) maps `/politique-confidentialite` to the HTML file and falls back to `index.html` for SPA routes
- **Theme:** primary `#ff4500` (orange), background `#0f0f0f`, text `#f0f0f0`
