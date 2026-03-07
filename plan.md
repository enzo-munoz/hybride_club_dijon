1. Vue d'ensemble du projet
Le site du Hybride Club est une Single Page Application (SPA) développée en React.

Couche	Technologie	Role
Frontend	React + Vite + TailwindCSS	SPA : Accueil public + Espace membre
Backend	FastAPI (Python 3.11+)	API REST, logique metier, scheduler
Base de donnees	MongoDB Local	Stockage des données
Auth	JWT + bcrypt	Connexion securisee
Scheduler	APScheduler	Generation automatique des seances

2. Architecture — SPA React
Le frontend est une application React gérée par Vite.
Routing (React Router) :
- / : Page d'accueil publique (Hero, Presentation, Coachs, Evenements, Contact)
- /login : Formulaire de connexion
- /membres : Espace membre protégé (Planning semaine, Votes)

3. Structure des fichiers
sites_internet/
├── backend/                # API FastAPI (inchangé)
│   ├── main.py
│   ├── ...
│
├── frontend/               # Projet React + Vite
│   ├── src/
│   │   ├── components/     # Composants réutilisables (Navbar, Footer, CoachCard, SessionCard...)
│   │   ├── pages/          # Pages principales (Home, Login, Members)
│   │   ├── context/        # AuthContext (Gestion JWT)
│   │   ├── services/       # Appels API (axios ou fetch wrapper)
│   │   ├── App.jsx         # Configuration des routes
│   │   └── main.jsx        # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .env
└── nginx.conf

4. Base de donnees — MongoDB Local
(Inchangé — voir sections précédentes pour les détails des collections)

5. API Backend
(Inchangé — voir sections précédentes pour les routes API)
