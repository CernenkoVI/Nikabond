# Nikabond

Casting and talent management platform connecting actors, agents, and casting directors. Built with a Django REST API backend and a Next.js frontend.

## Tech Stack

| Layer    | Technology                                                        |
|----------|-------------------------------------------------------------------|
| Backend  | Django 5.2.5, Django REST Framework, PostgreSQL 15, Docker        |
| Frontend | Next.js 15.4.1 (App Router), React 19, TypeScript 5, Tailwind v4 |
| Auth     | JWT (simplejwt) with HTTP-only cookie storage                     |
| State    | Zustand                                                           |
| UI       | Framer Motion, React Select                                       |

## Prerequisites

- Docker & Docker Compose
- Node.js 18+
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Nikabond
```

### 2. Backend setup

```bash
cd backend

# Copy environment config
cp nikabond_backend/.env.example nikabond_backend/.env
# Edit .env with your SECRET_KEY and SQL_PASSWORD

# Start backend (Django + PostgreSQL)
docker-compose up
```

The entrypoint script automatically runs migrations on startup. The API will be available at **http://localhost:8000**.

To create an admin user:

```bash
docker-compose exec web python manage.py createsuperuser
```

### 3. Frontend setup

```bash
cd nikabond

# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev
```

The frontend will be available at **http://localhost:3000**.

### Environment Variables

**Backend** (`backend/nikabond_backend/.env`):

| Variable              | Description              |
|-----------------------|--------------------------|
| `DEBUG`               | Debug mode (1/0)         |
| `SECRET_KEY`          | Django secret key        |
| `DJANGO_ALLOWED_HOSTS`| Allowed host names      |
| `SQL_ENGINE`          | Database engine          |
| `SQL_DATABASE`        | Database name            |
| `SQL_USER`            | Database user            |
| `SQL_PASSWORD`        | Database password        |
| `SQL_HOST`            | Database host            |
| `SQL_PORT`            | Database port            |

**Frontend** (`nikabond/.env.local`):

| Variable                | Description        |
|-------------------------|--------------------|
| `NEXT_PUBLIC_API_HOST`  | Backend API URL    |

## Project Structure

```
Nikabond/
├── backend/
│   ├── docker-compose.yml
│   └── nikabond_backend/
│       ├── Dockerfile
│       ├── entrypoint.sh
│       ├── manage.py
│       ├── nikabond_backend/      # Django settings & root URLs
│       ├── actor/                 # Actor profiles & portfolios
│       ├── agent/                 # Talent agents
│       ├── project/               # Casting projects
│       ├── role/                  # Roles within projects
│       ├── session/               # Scheduling sessions
│       └── useraccount/           # Custom user model & auth
│
├── nikabond/                      # Next.js frontend
│   ├── app/
│   │   ├── page.tsx               # Home — actor browsing grid
│   │   ├── layout.tsx             # Root layout with navbar & modals
│   │   ├── actors/[id]/           # Actor detail page
│   │   ├── agents/[id]/           # Agent detail page
│   │   ├── projects/[id]/         # Project detail page
│   │   ├── roles/[id]/            # Role detail page
│   │   ├── sessions/[id]/         # Session detail page
│   │   ├── mypage/[id]/           # User dashboard
│   │   ├── inbox/[id]/            # Messaging (WIP)
│   │   ├── components/            # UI components by feature
│   │   ├── services/              # API service layer
│   │   └── lib/                   # Server actions
│   └── public/                    # Static assets & icons
│
├── CLAUDE.md
└── user_stories.md
```

## API Endpoints

| Method | Endpoint               | Description          | Auth     |
|--------|------------------------|----------------------|----------|
| POST   | `/api/auth/register/`  | User registration    | No       |
| POST   | `/api/auth/login/`     | User login (JWT)     | No       |
| POST   | `/api/auth/logout/`    | User logout          | No       |
| GET    | `/api/actors/`         | List all actors      | No       |
| GET    | `/api/actors/<id>/`    | Actor details        | No       |
| POST   | `/api/actors/create/`  | Create actor profile | No       |
| PUT    | `/api/actors/<id>/update/` | Update actor     | No       |
| GET    | `/api/agents/`         | List all agents      | No       |
| GET    | `/api/agents/<id>/`    | Agent details        | No       |
| POST   | `/api/agents/create/`  | Create agent         | No       |
| PUT    | `/api/agents/<id>/update/` | Update agent     | No       |
| GET    | `/api/projects/`       | List all projects    | No       |
| GET    | `/api/projects/<id>/`  | Project details      | No       |
| POST   | `/api/projects/create/`| Create project       | No       |
| PUT    | `/api/projects/<id>/update/` | Update project | No       |
| GET    | `/api/roles/`          | List roles (filter: `?project=<id>`) | No |
| GET    | `/api/roles/<id>/`     | Role details         | No       |
| POST   | `/api/roles/create/`   | Create role          | No       |
| PUT    | `/api/roles/<id>/update/` | Update role       | No       |
| PUT    | `/api/roles/<id>/actors/` | Assign actors to role | No   |
| GET    | `/api/sessions/`       | List sessions (filter: `?project=<id>`) | No |
| GET    | `/api/sessions/<id>/`  | Session details      | No       |
| POST   | `/api/sessions/create/`| Create session       | No       |
| PUT    | `/api/sessions/<id>/update/` | Update session | No       |

Admin panel: **http://localhost:8000/admin/**

## Development Commands

```bash
# Backend
cd backend
docker-compose up                  # Start backend stack
docker-compose up --build          # Rebuild & start
docker-compose down                # Stop
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser

# Frontend
cd nikabond
npm run dev                        # Dev server (Turbopack)
npm run build                      # Production build
npm run lint                       # ESLint
```

## Architecture Notes

- All models use **UUID primary keys**
- JWT tokens: 60-minute access, 7-day refresh
- Email-based authentication (no username required)
- Frontend stores tokens in **HTTP-only cookies** via Next.js Server Actions
- API service layer (`apiService.ts`) handles all HTTP requests with automatic token injection
- Modal state managed globally with Zustand hooks
- Multi-step form wizards for creating actors, agents, projects, roles, and sessions
- Edit modals for all entities (actors, agents, projects, roles, sessions)
- Actor assignment to roles

## Known Issues

- JWT signing key is a placeholder (`"acomplexkey"`) — must be changed for production
- Email verification is disabled (`ACCOUNT_EMAIL_VERIFICATION = "none"`)
- No error handling when required data is missing on login form
- User `is_active` defaults to `True` — should be `False` for proper email verification flow
- No token refresh mechanism on the frontend
- No pagination on API list endpoints

## Credits

- Icons: [Icons8](https://icons8.com), [Heroicons](https://heroicons.com)
- Logo: [Canva](https://canva.com), [remove.bg](https://remove.bg)
