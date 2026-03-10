# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nikabond is a casting and talent management platform connecting actors, agents, and casting directors. Django REST API backend + Next.js App Router frontend.

## Technology Stack

**Backend:** Django 5.2.5, DRF, PostgreSQL 15 (Docker), JWT auth (simplejwt), Docker Compose
**Frontend:** Next.js 15.4.1 (App Router), React 19.1.0, TypeScript 5, Tailwind CSS v4, Zustand, Framer Motion

## Development Commands

```bash
# Backend (Docker)
cd backend && docker-compose up
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser

# Backend (manual)
cd backend/nikabond_backend
python manage.py runserver

# Frontend
cd nikabond
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run lint         # ESLint
```

**Access URLs:** Backend API http://localhost:8000 | Frontend http://localhost:3000

## Backend Architecture

### Django Apps

| App           | Purpose                                              |
|---------------|------------------------------------------------------|
| `actor/`      | Actor profiles (physical attributes, skills, experience, work permits) |
| `agent/`      | Talent agents — linked to actors via ForeignKey      |
| `project/`    | Casting projects with multi-phase date ranges        |
| `role/`       | Roles within projects (FK to Project, CASCADE)       |
| `session/`    | Scheduling sessions (FK to Project, CASCADE)         |
| `useraccount/`| Custom UUID user model with email-based auth         |

### Key Backend Patterns

- All models use **UUID primary keys**
- Models with images have `image_url()` methods that prepend `WEBSITE_URL` setting
- JWT tokens: 60 min access, 7 day refresh, HS512 algorithm
- Email-based authentication (no username required)
- Views use **function-based** `@api_view` decorators, not class-based views
- Create endpoints use **Django Forms** for validation, then serialize
- List/detail GET endpoints are **public** (no auth required)
- Serializers come in pairs: `ListSerializer` (minimal fields) and `DetailSerializer` (all fields)
- Detail serializers use **nested read-only serializers** for related objects

### API Endpoints

```
/api/auth/register/          POST   Registration (dj-rest-auth)
/api/auth/login/             POST   Login (returns JWT)
/api/auth/logout/            POST   Logout
/api/actors/                 GET    List actors
/api/actors/<uuid>/          GET    Actor detail
/api/actors/create/          POST   Create actor portfolio
/api/agents/                 GET    List agents
/api/agents/<uuid>/          GET    Agent detail
/api/agents/create/          POST   Create agent
/api/projects/               GET    List projects
/api/projects/<uuid>/        GET    Project detail
/api/projects/create/        POST   Create project
/api/roles/                  GET    List roles
/api/roles/<uuid>/           GET    Role detail
/api/sessions/               GET    List sessions
/api/sessions/<uuid>/        GET    Session detail
```

### Known Backend Bugs

- **URL routing bug:** `/api/sessions/` includes `role.urls` instead of `session.urls` in root `urls.py`
- JWT signing key is hardcoded placeholder: `"acomplexkey"`
- Email verification disabled (`ACCOUNT_EMAIL_VERIFICATION = "none"`)
- User `is_active` defaults to True (should be False for email verification flow)

## Frontend Architecture

### Directory Layout

```
nikabond/app/
├── page.tsx                   # Home page — actor browsing grid with filters
├── layout.tsx                 # Root layout: Navbar + global modals
├── globals.css                # Tailwind imports, custom theme colors
├── actors/[id]/page.tsx       # Actor detail (3-column layout)
├── agents/[id]/page.tsx       # Agent detail + their actors list
├── projects/[id]/page.tsx     # Project detail with roles
├── roles/[id]/page.tsx        # Role detail
├── mypage/[id]/page.tsx       # User dashboard (collapsible sections)
├── inbox/[id]/page.tsx        # Messaging (WIP)
├── components/
│   ├── actors/                # ActorsList, ActorsListItem, ActorsPage{Left,Middle,Right}
│   ├── agents/                # AgentsList, AgentsListItem
│   ├── projects/              # ProjectPage{Left,Middle,Right}, ProjectPageRoleItem
│   ├── modals/                # Modal, LoginModal, SignupModal, AddPortfolioModal, AddAgentModal, AddProjectModal
│   ├── navbar/                # Navbar, Logo, User, SearchFilters, LoginButton, MenuLink
│   ├── mypage/                # MyAccountComponent, MyProjectsComponent, MyAgentsComponent, etc.
│   ├── forms/                 # SelectCountry
│   ├── hooks/                 # Zustand modal hooks (useLoginModal, useSignUpModal, etc.)
│   └── *.tsx                  # Shared: SubmitButton, PreviousButton, ContactButton, AdvancedFilters, LogoutButton
├── services/apiService.ts     # Centralized API client with token management
└── lib/actions.ts             # Server Actions for cookie-based auth
```

### Key Frontend Patterns

- **Server Components** for async data fetching on detail pages
- **Client Components** (`'use client'`) for interactive UI (modals, forms, dropdowns)
- **Server Actions** in `lib/actions.ts` manage JWT tokens in HTTP-only cookies (`handleLogin`, `resetAuthCookies`, `getUserId`, `getAccessToken`)
- **Zustand hooks** for global modal state — each modal has an `{isOpen, open, close}` store
- **Global modals** rendered once in `layout.tsx`: Login, SignUp, AddPortfolio, AddAgent, AddProject
- **apiService.ts** has three methods:
  - `get(url)` — authenticated GET with Bearer token from cookies
  - `post(url, data)` — authenticated POST
  - `postWithoutToken(url, data)` — unauthenticated POST (login, register, create)
- Multi-step **form wizards** in modal components (Portfolio: 3 steps, Agent: 2 steps, Project: 4 steps)
- Dynamic routes use `[id]` pattern with UUID params
- Images loaded from localhost:8000 via `next.config.ts` remote patterns
- Custom color theme: `--color-airbnb: #ff385c` and lime-based UI

### Hooks Available (not all have corresponding modals yet)

- `useLoginModal`, `useSignUpModal` — auth modals (implemented)
- `useAddPortfolioModal`, `useAddAgentModal`, `useAddProjectModal` — creation modals (implemented)
- `useAddRoleModal`, `useAddSessionModal` — defined but **no modal components built yet**
- `useCountries` — country data from `world-countries` package

## Configuration

**Backend** (`backend/nikabond_backend/.env`, see `.env.example`):
- `DEBUG`, `SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`
- PostgreSQL: `SQL_ENGINE`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, `SQL_HOST`, `SQL_PORT`

**Frontend** (`nikabond/.env.local`):
- `NEXT_PUBLIC_API_HOST=http://localhost:8000`

**Important settings:**
- CORS: `CORS_ALLOW_ALL_ORIGINS = True`, explicit origins for localhost:3000 and 127.0.0.1:8000
- Media uploads: `media/uploads/{actors,agents,projects}/`
- `WEBSITE_URL = "http://localhost:8000"` used in model `image_url()` methods
- `SITE_ID = 1` required by django-allauth

## Not Yet Implemented

Per `user_stories.md`, these features are planned but not built:
- Role application/submission system
- Application status tracking (Submitted → Viewed → Shortlisted → Cast)
- Functional search/filter backend logic (UI exists)
- Messaging system backend (inbox UI is scaffolded)
- Notification system (in-app and email)
- Profile editing
- Agent-actor invitation and roster management
- Password reset flow
- Media uploads beyond single image (video reels, PDFs, multiple photos)
- Pagination on list endpoints
- AddRole and AddSession modal components
