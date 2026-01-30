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

## Using Archetypes

When running `/init-playbook`, Claude will ask:

```
What type of project is this?

1. Next.js + Supabase (Full-Stack Web App)
2. Python + FastAPI (Backend API)
3. React + Vite (Frontend SPA)
4. Node.js + NestJS (Backend API)
5. React Native + Expo (Mobile App)
6. Node.js CLI Tool
7. Astro (Static Site / Docs)
8. Chrome Extension
9. AI/LLM App (Next.js + Vercel AI SDK)
10. Go + Gin (Backend API / Service)
11. Django + HTMX (Full-Stack Python)
12. Hono (Edge / Serverless API)
13. Flutter (Mobile App)
14. Custom (I'll specify my stack)

Enter number or describe your stack:
```

The selected archetype pre-fills the CLAUDE.md tech stack section.
