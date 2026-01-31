# Project Archetypes

Pre-configured tech stacks for common project types. Use with `/init-playbook`.

---

## Archetype 1: Next.js + Supabase (Full-Stack Web App)

**Best for:** SaaS apps, dashboards, authenticated web apps

```markdown
## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router), React 18+, TypeScript
- **State:** React Query (Server), Zustand (Client)
- **Database:** Supabase (PostgreSQL), Drizzle ORM as alternative
- **Auth:** Supabase Auth (or Clerk for complex auth needs)
- **UI:** shadcn/ui, Tailwind CSS, Lucide icons
- **Hosting:** Vercel
- **Testing:** Vitest, Playwright
```

**INFRASTRUCTURE.md services:**
- Supabase (database + auth)
- Vercel (hosting)
- Optional: Stripe (payments), Resend (email)

---

## Archetype 2: Python + FastAPI (Backend API)

**Best for:** REST APIs, microservices, data processing

```markdown
## 2. TECH STACK

- **Framework:** FastAPI, Python 3.12+
- **Package Manager:** uv
- **Database:** PostgreSQL with SQLAlchemy
- **Auth:** JWT tokens (python-jose)
- **Validation:** Pydantic
- **Hosting:** Railway, Fly.io, or AWS Lambda
- **Containerization:** Docker
- **Testing:** pytest, httpx
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Redis (caching, optional)
- Railway/Fly.io (hosting)

---

## Archetype 3: React + Vite (Frontend SPA)

**Best for:** Client-side apps, prototypes, tools

```markdown
## 2. TECH STACK

- **Framework:** React 18+, Vite, TypeScript
- **State:** Zustand (default) or Jotai (alternative)
- **Routing:** React Router v6 or TanStack Router
- **UI:** shadcn/ui or Radix, Tailwind CSS
- **API:** React Query + fetch/axios
- **Hosting:** Vercel, Netlify, or Cloudflare Pages
- **Testing:** Vitest, Playwright
```

**INFRASTRUCTURE.md services:**
- Vercel/Netlify (hosting)
- External API backend (if needed)

---

## Archetype 4: Node.js + NestJS (Backend API)

**Best for:** Structured REST/GraphQL APIs, enterprise backends

```markdown
## 2. TECH STACK

- **Framework:** NestJS, Node.js 20+, TypeScript
- **Database:** PostgreSQL with Prisma (or Drizzle)
- **Auth:** Lucia or JWT (jose)
- **Validation:** Zod or class-validator
- **Hosting:** Railway, Fly.io, or Render
- **Testing:** Jest, Supertest
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Redis (sessions, optional)
- Railway/Fly.io (hosting)

---

## Archetype 5: Mobile App (React Native + Expo)

**Best for:** Cross-platform mobile apps

> For non-React teams, see Archetype 13 (Flutter).

```markdown
## 2. TECH STACK

- **Framework:** React Native, Expo (latest SDK), TypeScript
- **State:** Zustand, React Query
- **Navigation:** Expo Router
- **UI:** NativeWind (Tailwind for RN)
- **Backend:** Supabase or Firebase
- **Testing:** Jest, Maestro (E2E)
```

**INFRASTRUCTURE.md services:**
- Supabase or Firebase (backend)
- Expo EAS (builds)
- App Store / Play Store (distribution)

---

## Archetype 6: CLI Tool (Node.js)

**Best for:** Command-line utilities, developer tools

```markdown
## 2. TECH STACK

- **Runtime:** Node.js 20+ (or Bun), TypeScript
- **CLI Framework:** Commander.js or oclif
- **Output:** picocolors (colors), ora (spinners)
- **Distribution:** npm
- **Testing:** Vitest
```

**INFRASTRUCTURE.md services:**
- npm (package registry)
- GitHub Actions (CI/CD)

---

## Archetype 7: Static Site (Astro)

**Best for:** Marketing sites, blogs, documentation

> For documentation sites specifically, consider Astro's [Starlight](https://starlight.astro.build/) template.

```markdown
## 2. TECH STACK

- **Framework:** Astro 4+
- **Content:** MDX, Content Collections
- **UI:** Tailwind CSS
- **Components:** React/Vue/Svelte (islands)
- **Hosting:** Vercel, Netlify, or Cloudflare Pages
- **Testing:** Playwright
```

**INFRASTRUCTURE.md services:**
- Vercel/Netlify (hosting)
- Optional: CMS (Sanity, Contentful)

---

## Archetype 8: Chrome Extension

**Best for:** Browser extensions, productivity tools

```markdown
## 2. TECH STACK

- **Framework:** React + Vite, TypeScript
- **Extension:** Chrome Extension Manifest V3
- **UI:** Tailwind CSS
- **State:** Zustand + chrome.storage
- **Build:** CRXJS Vite Plugin
- **Testing:** Vitest, Puppeteer
```

**INFRASTRUCTURE.md services:**
- Chrome Web Store (distribution)
- Optional: Backend API for sync

---

## Archetype 9: AI/LLM App (Next.js + Vercel AI SDK)

**Best for:** AI chatbots, RAG apps, LLM-powered tools, AI agents

```markdown
## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router), TypeScript
- **AI:** Vercel AI SDK, Anthropic SDK / OpenAI SDK
- **Orchestration:** LangChain / LangGraph (for complex agents)
- **Database:** PostgreSQL + pgvector (for RAG), Supabase or Neon
- **UI:** shadcn/ui, Tailwind CSS
- **Hosting:** Vercel
- **Testing:** Vitest, Playwright
```

**INFRASTRUCTURE.md services:**
- LLM API keys (Anthropic/OpenAI)
- Vector database (pgvector via Supabase/Neon)
- Vercel (hosting)

---

## Archetype 10: Go API/Service (Go + Gin)

**Best for:** High-performance APIs, microservices, system tools

```markdown
## 2. TECH STACK

- **Language:** Go 1.22+
- **Framework:** Gin
- **Database:** PostgreSQL with pgx
- **Auth:** JWT (golang-jwt)
- **Validation:** go-playground/validator
- **Hosting:** Fly.io, Railway, or Docker on any cloud
- **Testing:** Go standard library (testing), testify
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Docker
- Fly.io/Railway (hosting)

---

## Archetype 11: Django Full-Stack (Python + Django + HTMX)

**Best for:** Content sites, admin tools, full-stack Python apps without a JS build step

```markdown
## 2. TECH STACK

- **Framework:** Django 5+, Python 3.12+
- **Frontend:** HTMX + Alpine.js (no JS build step)
- **Styling:** Tailwind CSS (via django-tailwind)
- **Database:** PostgreSQL
- **Auth:** Django built-in auth
- **Package Manager:** uv
- **Hosting:** Fly.io, Railway, or Render
- **Testing:** pytest, Playwright
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Fly.io/Railway (hosting)

---

## Archetype 12: Edge/Serverless API (Hono + TypeScript)

**Best for:** Lightweight APIs, edge functions, multi-runtime services

```markdown
## 2. TECH STACK

- **Framework:** Hono (multi-runtime)
- **Runtime:** Bun, Node.js, Cloudflare Workers, or Deno
- **Language:** TypeScript
- **Database:** Drizzle ORM + Turso/D1/Neon (edge-compatible)
- **Auth:** JWT or Lucia
- **Hosting:** Cloudflare Workers, Vercel Edge, or AWS Lambda
- **Testing:** Vitest
```

**INFRASTRUCTURE.md services:**
- Edge database (Turso/D1/Neon)
- Cloudflare or Vercel (hosting)

---

## Archetype 13: Flutter Mobile App

**Best for:** Cross-platform mobile apps (non-React teams), high-fidelity UI

```markdown
## 2. TECH STACK

- **Framework:** Flutter (latest), Dart
- **State:** Riverpod
- **Navigation:** go_router
- **Backend:** Supabase or Firebase
- **Testing:** flutter_test, Patrol (E2E)
- **Distribution:** App Store, Play Store
```

**INFRASTRUCTURE.md services:**
- Supabase/Firebase (backend)
- App Store / Play Store accounts

---

## Archetype 14: Godot Game (Desktop/Cross-Platform)

**Best for:** Indie games, 2D/3D games, game jams, cross-platform desktop games

```markdown
## 2. TECH STACK

- **Engine:** Godot 4.3+
- **Language:** GDScript (primary), C# (optional)
- **Scene System:** Godot scene tree, .tscn/.tres files
- **Assets:** Aseprite (2D sprites), Blender (3D models)
- **Audio:** Godot built-in audio system
- **Export:** Windows, macOS, Linux, Web (HTML5), Android, iOS
- **Testing:** GUT (Godot Unit Test), gdUnit4
- **Distribution:** itch.io, Steam, GOG
```

**INFRASTRUCTURE.md services:**
- itch.io or Steam (distribution)
- GitHub Actions + Godot Export Templates (CI/CD)
- Optional: Nakama or PlayFab (multiplayer backend)

---

## Using Archetypes

When running `/init-playbook`, Claude uses a two-step selection funnel:

### Step 1 — What are you building?

Users pick a plain-English category (no jargon):

| Choice | Category | Archetypes |
|--------|----------|------------|
| **A** | Complete web app | 1 (Next.js + Supabase), 11 (Django + HTMX), 9 (AI/LLM App) |
| **B** | Server or API | 2 (FastAPI), 4 (NestJS), 10 (Go + Gin), 12 (Hono) |
| **C** | Website or browser tool | 3 (React + Vite), 7 (Astro), 8 (Chrome Extension) |
| **D** | Phone app | 5 (React Native + Expo), 13 (Flutter) |
| **E** | Command-line tool | 6 (Node.js CLI Tool) |
| **F** | Game | 14 (Godot Game) |
| **G** | Something else | Custom stack |

### Step 2 — Pick a stack

Each category shows 2-4 options with plain-English descriptions including what it is, who it's for, and key tradeoffs. No jargon in step 1; step 2 names the tech but explains it simply.

### Expert shortcut

Users who already know their stack can type it directly at step 1 (e.g. "FastAPI", "Next.js + Supabase"). Claude matches to the closest archetype and confirms.

The selected archetype pre-fills the CLAUDE.md tech stack section.
