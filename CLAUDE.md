# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hybride Club** — a fitness coaching club web platform (Hyrox discipline) for `hybrideclub.fr`. Features a public landing page, a member dashboard with weekly session attendance voting, and coach-only schedule generation.

## Commands

### Frontend (run from `frontend/`)
```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:5173
npm run build        # Production build to dist/
npm run lint         # ESLint
npm run preview      # Preview production build
```

### Backend (run from repo root)
```bash
uv sync              # Install Python dependencies
python backend/main.py  # Dev server at http://localhost:8000 (with auto-reload)
```

## Architecture

### Tech Stack
- **Frontend:** React 19 + Vite + TailwindCSS + React Router v7
- **Backend:** FastAPI + Motor (async MongoDB driver) + APScheduler
- **Database:** MongoDB local (`Hybride_club` DB)
- **Auth:** JWT (HS256) + bcrypt
- **Deployment:** Nginx reverse proxy → FastAPI on PulseHeberg VPS

### Frontend Flow
- `App.jsx` — Router: `/` (Home), `/login` (Login), `/membres` (protected dashboard)
- `context/AuthContext.jsx` — JWT stored in localStorage; sets axios default `Authorization` header; fetches `/api/auth/me` on load
- `services/api.js` — Axios instance with `baseURL: http://localhost:8000/api` (hardcoded, needs env var for production)

### Backend Structure
- `main.py` — FastAPI app, CORS config (allows all origins — restrict in prod), registers all route prefixes, triggers scheduler on startup
- `database.py` — Motor connection; collections: `membres`, `coaches`, `sessions`, `evenements`
- `auth.py` — bcrypt helpers + JWT creation/decoding
- `scheduler.py` — APScheduler job every Sunday 8:00 AM (Paris TZ); auto-generates 6 sessions (Mon–Sat) for next week
- `routes/` — `auth.py` (`/api/auth`), `sessions.py` (`/api/sessions`), `coaches.py` (`/api/coaches`), `evenements.py` (`/api/evenements`), `contact.py` (`/api/contact`)

### Key Behaviors
- **Session voting:** votes tracked by user email; deadline = previous day 23:59 (Paris TZ)
- **Role separation:** coaches and members stored in separate MongoDB collections; coach role enables manual session generation via `POST /api/sessions/generate`
- **Contact form:** sends email via Gmail SMTP to `hybrideclubdijon@gmail.com`
- **TailwindCSS theme:** primary `#ff4500` (orange), background `#0f0f0f` (black), text `#f0f0f0`

### Environment Variables (`.env`)
```
MONGO_URL, MONGO_DB_NAME, SECRET_KEY
SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SENDER_EMAIL
```
