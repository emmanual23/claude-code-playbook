# Project Archetypes

Pre-configured tech stacks for common project types. Use with `/init-playbook`.

---

## Archetype 1: Next.js + Supabase (Full-Stack Web App)

**Best for:** SaaS apps, dashboards, authenticated web apps

```markdown
## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router), React 18+, TypeScript
- **State:** React Query (Server), Zustand (Client)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (or Clerk)
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

- **Framework:** FastAPI, Python 3.11+
- **Database:** PostgreSQL with SQLAlchemy
- **Auth:** JWT tokens (python-jose)
- **Validation:** Pydantic
- **Hosting:** Railway, Render, or AWS Lambda
- **Testing:** pytest, httpx
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Redis (caching, optional)
- Railway/Render (hosting)

---

## Archetype 3: React + Vite (Frontend SPA)

**Best for:** Client-side apps, prototypes, tools

```markdown
## 2. TECH STACK

- **Framework:** React 18+, Vite, TypeScript
- **State:** Zustand or Jotai
- **Routing:** React Router v6
- **UI:** shadcn/ui or Radix, Tailwind CSS
- **API:** React Query + fetch/axios
- **Hosting:** Vercel, Netlify, or Cloudflare Pages
- **Testing:** Vitest, Playwright
```

**INFRASTRUCTURE.md services:**
- Vercel/Netlify (hosting)
- External API backend (if needed)

---

## Archetype 4: Node.js + Express (Backend API)

**Best for:** Simple REST APIs, real-time apps

```markdown
## 2. TECH STACK

- **Framework:** Express.js, Node.js 20+, TypeScript
- **Database:** PostgreSQL with Prisma
- **Auth:** Passport.js or JWT
- **Validation:** Zod
- **Hosting:** Railway, Render, or Heroku
- **Testing:** Jest, Supertest
```

**INFRASTRUCTURE.md services:**
- PostgreSQL (database)
- Redis (sessions, optional)
- Railway/Render (hosting)

---

## Archetype 5: Mobile App (React Native + Expo)

**Best for:** Cross-platform mobile apps

```markdown
## 2. TECH STACK

- **Framework:** React Native, Expo SDK 50+, TypeScript
- **State:** Zustand, React Query
- **Navigation:** Expo Router
- **UI:** NativeWind (Tailwind for RN), React Native Paper
- **Backend:** Supabase or Firebase
- **Testing:** Jest, Detox
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

- **Runtime:** Node.js 20+, TypeScript
- **CLI Framework:** Commander.js or oclif
- **Output:** chalk (colors), ora (spinners)
- **Config:** cosmiconfig
- **Distribution:** npm
- **Testing:** Vitest
```

**INFRASTRUCTURE.md services:**
- npm (package registry)
- GitHub Actions (CI/CD)

---

## Archetype 7: Static Site (Astro)

**Best for:** Marketing sites, blogs, documentation

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

## Using Archetypes

When running `/init-playbook`, Claude will ask:

```
What type of project is this?

1. Next.js + Supabase (Full-Stack Web App)
2. Python + FastAPI (Backend API)
3. React + Vite (Frontend SPA)
4. Node.js + Express (Backend API)
5. React Native + Expo (Mobile App)
6. Node.js CLI Tool
7. Astro (Static Site)
8. Chrome Extension
9. Custom (I'll specify my stack)

Enter number or describe your stack:
```

The selected archetype pre-fills the CLAUDE.md tech stack section.
