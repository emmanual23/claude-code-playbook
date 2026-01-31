---
description: Initialize or update the Claude Code playbook (autopilot edition) in any project
---

# Role: Project Scaffolder

## Step 1: Detect Current State

Check if this project already has a playbook installed:
- Look for `CLAUDE.md` in the project root
- Look for `.claude/commands/` folder
- Look for `docs/planning/STATUS.md`

**If playbook exists:** Enter UPDATE MODE
**If no playbook:** Enter FRESH INSTALL MODE

---

## Step 2A: FRESH INSTALL MODE

### Gather Project Info
Ask these questions ONE AT A TIME:

1. "What's the project name?"
2. "One-line description of what it does?"
3. "What are you building?

   **A.** A complete web app (users log in, see data, do things)
   **B.** A server or API (other apps talk to it, no UI)
   **C.** A website or browser tool (no backend needed)
   **D.** A phone app
   **E.** A command-line tool (runs in the terminal)
   **F.** A game
   **G.** Something else (I'll describe it)

   *Already know your stack? Just type it (e.g. 'Next.js + Supabase', 'FastAPI').*"

→ If user names a stack directly, match to the closest archetype from `docs/ARCHETYPES.md`. Confirm: "I'll use the **[Name]** archetype — [one-line description]. Sound right?"

→ If user picks a category, show options with plain-English descriptions:

  **A (Complete web app):**
  "Which setup fits best?

   **1. Next.js + Supabase** — The popular choice for SaaS and dashboards.
      JavaScript/TypeScript. Huge ecosystem, tons of tutorials. Can get complex for simple apps.

   **2. Django + HTMX** — Python full-stack without JavaScript headaches.
      Great if you know Python. Simpler architecture. Smaller community for modern UI patterns.

   **3. AI/LLM App** — For chatbots, AI assistants, or AI-powered tools.
      Built on Next.js. Needs API keys for AI services (adds cost). Best when AI is the core feature."

  **B (Server or API):**
  "Which backend fits best?

   **1. Python + FastAPI** — Fast to build, easy to read, great for data work.
      Python. Huge library ecosystem. Slower runtime than Go/Node for high traffic.

   **2. Node.js + NestJS** — Structured TypeScript backend with guardrails.
      Same language as frontend (JS/TS). More boilerplate upfront, but scales well in teams.

   **3. Go + Gin** — Raw speed, tiny memory footprint.
      Compiled language, harder learning curve. Excellent for high-traffic services.

   **4. Hono** — Lightweight, runs anywhere (edge, serverless, Node).
      TypeScript. Very fast, minimal. Younger ecosystem, fewer batteries included."

  **C (Website or browser tool):**
  "Which type?

   **1. React + Vite** — Interactive single-page app or prototype.
      JavaScript/React. Fast dev experience. Needs a separate backend if you need data storage.

   **2. Astro** — Blog, docs site, or marketing page.
      Content-focused, very fast loading. Not ideal for highly interactive apps.

   **3. Chrome Extension** — Runs inside the browser.
      Extends Chrome/Edge. Limited to browser APIs. Review process for Chrome Web Store."

  **D (Phone app):**
  "Which mobile framework?

   **1. React Native + Expo** — Write once, run on iPhone and Android.
      JavaScript/React. Largest mobile JS community. Some native features need workarounds.

   **2. Flutter** — Write once, run on iPhone and Android.
      Uses Dart (not JavaScript). Smoother animations. Smaller job market than React Native."

  **E (Command-line tool):**
  → Use Archetype 6 (Node.js CLI Tool) directly. Confirm:
  "I'll set you up with **Node.js + TypeScript** for your CLI tool — the most common choice for developer tools distributed via npm. Sound right?"
  → If user says no or wants a different language, fall through to Custom.

  **F (Game):**
  → Use Archetype 14 (Godot Game) directly. Confirm:
  "I'll set you up with **Godot + GDScript** for your game — open-source, lightweight, great for indie and cross-platform games. Sound right?"
  → If user says no or wants Unity/other, fall through to Custom.

  **G (Something else):** Ask user to describe their stack.

→ Use the selected archetype from `docs/ARCHETYPES.md`
→ For custom stacks, use the user's description to fill CLAUDE.md section 2

4. **Design System Customization** (only for UI archetypes)

→ **UI archetypes** (1: Next.js+Supabase, 3: AI/LLM App, 5: React Native+Expo, 7: React+Vite, 8: Astro, 9: Chrome Extension, 11: Django+HTMX, 13: Flutter, 14: Godot Game): Ask this question.
→ **Non-UI archetypes** (2: FastAPI, 4: NestJS, 6: Node.js CLI, 10: Go+Gin, 12: Hono): Skip this question entirely. Use the **NON-UI DESIGN STUB** (see Design System Blocks below) for Section 9.

"Would you like to customize the design system for this project?

   **A.** Use the default (clean, professional — works great for most projects)
   **B.** Let's design something tailored (I'll ask a few questions, then research your space)"

→ **Option A:** Use the **DEFAULT DESIGN SYSTEM** block (see Design System Blocks below) for Section 9.
→ **Option B:** Run the **Design Discovery Process** (see Design Discovery Process section at the end of this file). After completing it, use the generated design system for Section 9.

→ Store the chosen Section 9 content as `{{DESIGN_SYSTEM}}` for insertion into CLAUDE.md.

### Create Folder Structure
```
.claude/commands/
.github/workflows/
.github/ISSUE_TEMPLATE/
docs/planning/
docs/decisions/
docs/design-references/
```

### Create All Files
Create each file listed in the FILES TO CREATE section below.
Use the selected archetype's tech stack for CLAUDE.md section 2.

### Fill In Project Context
In CLAUDE.md, replace the PROJECT CONTEXT placeholders with the user's answers.

### Run Environment Checks
After creating all files, automatically check the environment:

```bash
# Check core tools
git --version 2>/dev/null
node --version 2>/dev/null || python3 --version 2>/dev/null
gh --version 2>/dev/null
gh auth status 2>/dev/null

# Check for GitHub MCP
claude mcp list 2>/dev/null | grep -i github

# Check for test/lint in package.json (if exists)
if [ -f package.json ]; then
  grep -q '"test"' package.json && echo "TEST_SCRIPT=yes"
  grep -q '"lint"' package.json && echo "LINT_SCRIPT=yes"
fi
```

### Final Message
```
✅ PLAYBOOK INSTALLED

Created:
- CLAUDE.md (project constitution)
- 18 slash commands in .claude/commands/
- .claudeignore (files for Claude to skip)
- .claude/settings.json (hooks configuration)
- GitHub workflow and issue templates
- docs/planning/STATUS.md and TECH-DEBT.md
- docs/decisions/ for Architecture Decision Records

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 ENVIRONMENT CHECK

CORE TOOLS
├── Git: [✅/❌ based on check]
├── [Node.js/Python]: [✅/❌ based on check]
└── GitHub CLI: [✅/⚠️/❌ based on check]

GITHUB INTEGRATION
└── GitHub MCP: [✅ Configured | ❌ Not configured]
    [If not configured:]
    → Run: claude mcp add github
    → Need PAT: https://github.com/settings/tokens
    → Scopes needed: repo, read:org, workflow

PROJECT SCRIPTS
├── Test script: [✅ Found | ❌ Missing - add "test" to package.json]
└── Lint script: [✅ Found | ❌ Missing - add "lint" to package.json]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WORKFLOW READINESS

✅ READY NOW:
   /research → /prd → /architecture → /roadmap
   
[If GitHub MCP not configured:]
⚠️ BLOCKED (needs GitHub MCP):
   /autopilot
   
[If test/lint missing:]
⚠️ PARTIALLY READY (needs test/lint scripts):
   /build → /pre-release

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
[List in priority order based on what's missing]

1. [If GitHub MCP missing:]
   Run: claude mcp add github
   
2. [If test script missing:]
   Add to package.json: "scripts": { "test": "vitest" }
   
3. [If lint script missing:]
   Add to package.json: "scripts": { "lint": "eslint ." }

4. Run: /setup (to re-check after configuration)

5. Run: /research (to start product discovery)
   OR /onboard (if adding to existing codebase)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tip: Run /setup anytime to re-check environment readiness.
```

---

## Step 2B: UPDATE MODE

### Show Current State
List which playbook files exist and their last modified dates.

### Ask What To Update
"Playbook already installed. What would you like to do?
1. Update all commands to latest versions (keeps CLAUDE.md customizations)
2. Reset everything (overwrites all files including CLAUDE.md)
3. Add missing files only
4. Cancel"

### Execute Based on Choice
- **Option 1:** Overwrite `.claude/commands/*`, `.github/*`, keep `CLAUDE.md` and `docs/planning/*`
- **Option 2:** Overwrite everything, re-ask project questions
- **Option 3:** Only create files that don't exist
- **Option 4:** Exit

### Final Message
```
✅ PLAYBOOK UPDATED

Updated: [list of files]
Preserved: [list of files]

Run /status to see current project state.
```

---

# FILES TO CREATE

## CLAUDE.md

```markdown
# CLAUDE.md - Project Constitution

## 1. PROJECT CONTEXT

**Project:** {{PROJECT_NAME}}
**Description:** {{PROJECT_DESCRIPTION}}
**Owner:** [Your name]

---

## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel

---

## 3. CODING RULES

### General
- Always run lint before committing
- Use environment variables for secrets (never hardcode)
- Match existing patterns in the codebase before introducing new ones

### File Organization
- Components: `src/components/`
- Pages/Routes: `src/app/`
- Utilities: `src/lib/`
- Types: `src/types/`
- API routes: `src/app/api/`

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE
- Database tables: snake_case

---

## 4. TESTING STRATEGY

### Philosophy
Tests verify **expected behavior**, not implementation details. Focus on user-facing outcomes.

### Testing Pyramid
```
        /\
       /E2E\        ← Few: Critical paths only
      /------\
     /Component\    ← Some: Key interactions
    /------------\
   / Integration  \  ← More: API & data layer
  /----------------\
 /      Unit        \ ← Many: Business logic
/____________________\
```

### What to Test (Priority Order)
1. **Always test:** Business logic, API endpoints, form validation, auth logic
2. **Test when valuable:** Complex component interactions, state management
3. **Skip tests for:** Styling, trivial getters, third-party wrappers

### Test Commands
- `npm run test` — Must pass before commit
- `npm run test:watch` — During development
- `npm run test:coverage` — Check coverage (no minimum required)

---

## 5. ASSUMPTION PROTOCOL

Before writing any code, you (Claude) must:

1. **State your assumptions** about:
   - What the user wants (behavior, not implementation)
   - Current codebase patterns you'll follow
   - Dependencies or APIs involved
   - Edge cases you'll handle (or ignore)

2. **Wait for confirmation** before proceeding

3. **If uncertain**, ask ONE clarifying question at a time

This is mandatory. Do not skip this step.

---

## 6. GIT & GITHUB WORKFLOW

### Commit Messages
Format: `type: description`

Types:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code change that doesn't fix bug or add feature
- `docs:` documentation
- `test:` adding tests
- `chore:` maintenance

### Branch Naming
- Features: `feat/short-description`
- Fixes: `fix/issue-number-short-description`

### Pull Requests
- Reference issue number: "Fixes #123"
- Keep PRs focused on a single change
- Ensure all tests pass before requesting review

### PR Review Checklist
Before merging any PR, verify:

**Functionality**
- [ ] Code does what the issue/feature requires
- [ ] Edge cases handled
- [ ] Error states handled gracefully

**Code Quality**
- [ ] Follows existing patterns
- [ ] No hardcoded secrets
- [ ] No debug logs or commented code

**Testing**
- [ ] Tests pass (`npm run test`)
- [ ] New logic has test coverage

**Security**
- [ ] User input validated
- [ ] Auth checks in place where needed

**Documentation**
- [ ] Complex logic commented
- [ ] ADR created for significant decisions

### Git Operations
You (Claude) should handle routine git operations:
- Creating branches
- Writing commit messages based on changes
- Creating PRs via `gh pr create`

---

## 7. PLANNING DOCUMENTS

### Document Hierarchy
```
docs/
├── planning/
│   ├── STATUS.md        # Current state (always read first)
│   ├── TECH-DEBT.md     # Technical debt tracker
│   ├── research.md      # Market research
│   ├── prd.md           # Product requirements
│   ├── architecture.md  # Technical structure
│   └── roadmap.md       # Milestones and tasks
└── decisions/
    └── ADR-XXX-*.md     # Architecture Decision Records
```

### Reading Order
When starting any work:
1. Always read `STATUS.md` first
2. Read `prd.md` for product context
3. Read `architecture.md` for technical structure
4. Read `roadmap.md` for current priorities

### Keeping Documents Updated
- Update `STATUS.md` after every significant action
- Update `roadmap.md` when issues are created or completed
- Update `TECH-DEBT.md` when taking shortcuts or identifying debt
- Create ADRs in `docs/decisions/` for significant technical decisions

---

## 8. SESSION CONTINUITY

### Status Tracking
- Project status lives in `docs/planning/STATUS.md`
- Always read this file at session start
- Update after completing any significant step
- Update before ending a session

### When Starting a Session
1. Read `docs/planning/STATUS.md`
2. Summarize current state to the user
3. Ask if they want to continue where they left off

### When Ending a Session
Update `docs/planning/STATUS.md` with:
- What was accomplished
- Exactly where work stopped
- Any blockers or open questions
- Clear next steps

---

{{DESIGN_SYSTEM}}

---

## 10. QUICK REFERENCE

### Commands Available
**Discovery:** `/research`, `/prd`, `/architecture`, `/adr`, `/roadmap`, `/enhance`
**Autonomous Build:** `/autopilot`
**Quality:** `/audit`, `/security-check`, `/deps`, `/design-check`, `/pre-release`
**Session:** `/status`, `/checkpoint`, `/resume-work`
**Utility:** `/setup`, `/infra`, `/onboard`

**Native Commands:** `/clear`, `/compact`, `/resume`, `/rewind`, `/model`, `Shift+Tab` (Plan Mode)

### Key Files
- `docs/planning/STATUS.md` - Current project state
- `docs/planning/TECH-DEBT.md` - Technical debt tracker
- `docs/planning/prd.md` - Product requirements
- `docs/planning/architecture.md` - Technical structure
- `docs/planning/roadmap.md` - Implementation plan
- `docs/decisions/` - Architecture Decision Records
```

---

## .claude/commands/audit.md

```markdown
---
description: Security and logic review
---

# Role: Security Reviewer

Scan the recent changes (or specified files) for:

1. **Secrets:** Hardcoded API keys, passwords, tokens
2. **Injection:** SQL injection, XSS vulnerabilities
3. **Validation:** Missing input validation, unchecked user data
4. **Auth:** Broken access controls, missing permission checks
5. **Logic:** Race conditions, off-by-one errors, null handling
6. **Accessibility:** Missing labels, poor contrast, no keyboard nav

Report findings as:
```
🔴 CRITICAL: [issue] - [file:line]
🟡 WARNING: [issue] - [file:line]
🔵 INFO: [suggestion] - [file:line]
```

If no issues found, confirm: "✅ No issues detected in scanned files."
```

---

## .claude/commands/security-check.md

```markdown
---
description: Shift-left security scan before deployment
---

# Role: Security Engineer

## Before Starting
1. Read `CLAUDE.md` for project tech stack
2. Read `docs/planning/STATUS.md` if it exists

## Security Check Process

**Step 1 - Secrets Scan**
Search the codebase for hardcoded secrets:
- API keys (patterns like `sk-`, `api_key`, `apiKey`, `API_KEY`)
- Passwords (`password`, `passwd`, `pwd`, `secret`)
- Tokens (`token`, `bearer`, `jwt`)
- Connection strings (`mongodb://`, `postgres://`, `mysql://`)
- Private keys (`-----BEGIN`)

Check `.env` files are in `.gitignore`.

**Step 2 - Dependency Vulnerabilities**
Run appropriate command:
- Node.js: `npm audit`
- Python: `pip-audit`

Report by severity:
- 🔴 CRITICAL: Must fix before deploy
- 🟠 HIGH: Should fix before deploy
- 🟡 MODERATE: Fix in next sprint
- 🔵 LOW: Track in tech debt

**Step 3 - Code Security Patterns**
Check for:
- SQL Injection (raw SQL with string concatenation)
- XSS (unescaped user input)
- Missing auth checks
- Sensitive data in logs

**Step 4 - Report**
```
🔒 SECURITY CHECK RESULTS
=========================
Secrets Scan: [PASS/FAIL]
Dependencies: [X critical, Y high]
Code Patterns: [PASS/FAIL]
RECOMMENDATION: [Safe to deploy / Fix issues first]
```
```

---

## .claude/commands/deps.md

```markdown
---
description: Audit and manage project dependencies
---

# Role: Dependency Manager

## Dependency Audit Process

**Step 1 - Identify Package Manager**
Check for: package.json (npm), requirements.txt (pip), etc.

**Step 2 - Check for Outdated**
```bash
# Node.js
npm outdated

# Python
pip list --outdated
```

**Step 3 - Security Scan**
```bash
# Node.js
npm audit

# Python
pip-audit
```

**Step 4 - Report**

```
🔴 CRITICAL VULNERABILITIES
[Package] - [Issue] - Fix: [version]

🟠 MAJOR UPDATES AVAILABLE
[Package] - Current: [X] - Latest: [Y] - Breaking changes likely

🟡 MINOR/PATCH UPDATES
[Package] - Current: [X] - Latest: [Y] - Safe to update

Recommendations:
1. Fix critical vulnerabilities immediately
2. Update packages with security patches
3. Plan major version upgrades
```

**Step 5 - Fix**
```bash
npm audit fix        # Safe fixes
npm audit fix --force  # Breaking changes (careful!)
```

## Best Practices
- Commit lock files (package-lock.json)
- Run /deps before releases
- Update major versions one at a time
- Test after updates
```

---

## .claude/commands/adr.md

```markdown
---
description: Document an architecture decision
---

# Role: Technical Architect

## When to Create an ADR
- Choosing a framework, library, or tool
- Deciding on a data model or API design
- Making a significant trade-off

## ADR Process

**Step 1 - Gather Context**
Ask:
1. "What decision needs to be documented?"
2. "What alternatives were considered?"
3. "What factors influenced the decision?"

**Step 2 - Create ADR File**
Create `docs/decisions/ADR-[NUMBER]-[short-title].md`:

```markdown
# ADR-[NUMBER]: [Title]

**Date:** [DATE]
**Status:** [Proposed | Accepted | Deprecated | Superseded]

## Context
[What motivates this decision?]

## Decision
[What was decided?]

## Alternatives Considered
### Option A: [Name]
- Pros: [List]
- Cons: [List]

### Option B: [Name]
- Pros: [List]
- Cons: [List]

## Consequences
### Positive
- [What becomes easier?]

### Negative
- [What becomes harder?]
```

**Step 3 - Update Index**
Add to `docs/decisions/README.md` index table.

**Step 4 - Confirm**
```
✅ ADR CREATED
File: docs/decisions/ADR-[NUMBER]-[title].md
Decision: [Brief summary]
```
```

---

## .claude/commands/onboard.md

```markdown
---
description: Get Claude up to speed on an existing codebase
---

# Role: Codebase Analyst

1. Read `CLAUDE.md` for project constitution
2. Read `docs/planning/STATUS.md` if it exists
3. Scan the folder structure and key files
4. Identify: framework, patterns, naming conventions, existing components
5. Summarize your understanding back to me
6. Ask if anything is incorrect or missing
7. Update STATUS.md if needed
```

---

## .claude/commands/design-check.md

```markdown
---
description: Verify UI matches design system
---

# Role: Design Reviewer

Check the specified component (or recent UI changes) against CLAUDE.md design system:

**Colors:**
- Only using approved palette?
- No rogue colors or gradients?

**Typography:**
- Correct font sizes for hierarchy?
- Proper font weights?

**Spacing:**
- Following 4px grid?
- Consistent padding/margins?

**Components:**
- Buttons styled correctly?
- Cards have correct border/shadow?
- Icons from Lucide only?

**Forbidden Patterns:**
- No hero sections?
- No decorative illustrations?
- No marketing-style CTAs?
- No excessive animations?

Report:
```
✅ PASS: [aspect]
❌ FAIL: [aspect] - [what's wrong] - [how to fix]
```
```

---

## .claude/commands/pre-release.md

```markdown
---
description: Pre-release checklist before deploying
---

# Role: Release Manager

## Pre-Release Checklist

Run through each check and report status:

**1. Tests**
- [ ] All unit/integration tests pass (`npm run test`)
- [ ] All E2E tests pass (`npm run test:e2e`)
- [ ] No skipped tests without justification

**2. Security**
Run `/security-check`:
- [ ] No hardcoded secrets
- [ ] No critical code vulnerabilities

**3. Dependencies**
Run `/deps`:
- [ ] No critical vulnerabilities
- [ ] Lock file committed

**4. Design**
Run `/design-check`:
- [ ] UI follows design system
- [ ] Accessibility basics met

**5. Code Quality**
- [ ] Lint passes
- [ ] No debug code or console.logs
- [ ] No TODO without linked issues

**6. Documentation**
- [ ] README current
- [ ] API docs updated
- [ ] ADRs created for decisions

**7. Tech Debt**
Check `TECH-DEBT.md`:
- [ ] No critical blockers
- [ ] New shortcuts documented

**8. Build**
- [ ] Build succeeds
- [ ] App runs locally

## Report Format

```
🚀 PRE-RELEASE CHECK
====================
✅ Tests: PASS
✅ Security: PASS
✅ Dependencies: PASS
✅ Design: PASS
✅ Code: PASS
✅ Docs: PASS
✅ Tech Debt: PASS
✅ Build: PASS

READY TO DEPLOY ✅
```

If blockers found, list them and ask: "Fix these now?"
```

---

## .claude/commands/research.md

```markdown
---
description: Conduct product research for a new idea
---

# Role: Product Researcher

## Before Starting
1. Read `docs/planning/STATUS.md` if it exists
2. Update STATUS.md: "Phase: Discovery - Research"

## Research Process

**Step 1 - Clarify the Idea**
Ask me to describe the product idea in 2-3 sentences if not clear.

**Step 2 - Research (use web search)**
Investigate:
1. **Problem Validation:** What problem? Who has it? How painful?
2. **Market Landscape:** What competitors exist? Strengths/weaknesses?
3. **Target User:** Who specifically? What motivates them?
4. **Differentiation:** Why would someone choose this over alternatives?

**Step 3 - Document**
Create `docs/planning/research.md`:

```markdown
# Product Research: [Name]

## Problem Statement
[Clear articulation]

## Target User
[Who they are, what they need]

## Competitive Landscape
| Competitor | Strengths | Weaknesses | Gap |
|------------|-----------|------------|-----|

## Differentiation Opportunity
[Where we can win]

## Key Risks & Assumptions
- [ ] Assumption 1
- [ ] Assumption 2

## Recommendation
[Proceed or not? MVP scope?]
```

**Step 4 - Update Status**
Update STATUS.md:
- Phase: Discovery - Research Complete
- Next: Run /prd

**Step 5 - Summary**
Present findings. Ask: "Ready to proceed to PRD?"
```

---

## .claude/commands/prd.md

```markdown
---
description: Create a Product Requirements Document
---

# Role: Product Manager

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/research.md` - stop if missing, suggest /research first
3. Update STATUS.md: "Phase: Discovery - PRD"

## PRD Process

**Step 1 - Confirm Scope**
Summarize research findings. Confirm:
- Target user
- Core problem
- Value proposition

Ask: "Any adjustments before I define features?"

**Step 2 - Define Features**
Propose:
- Core features (MVP - must have)
- Secondary features (nice to have)
- Out of scope (explicitly not building)

Wait for feedback.

**Step 3 - Document**
Create `docs/planning/prd.md`:

```markdown
# PRD: [Product Name]

## Overview
**Problem:** [One sentence]
**Solution:** [One sentence]
**Target User:** [One sentence]

## Goals
1. [Primary goal]
2. [Secondary goal]

## Non-Goals
- [What we're NOT building]

## Features

### Core (MVP)
| Feature | Description | User Story | Priority |
|---------|-------------|------------|----------|
| F1 | | As a [user], I want... | P0 |

### Secondary (Post-MVP)
| Feature | Description | Priority |
|---------|-------------|----------|
| F2 | | P1 |

## User Flows
### [Primary Flow]
1. User does X
2. System responds Y
3. User sees Z

## Success Metrics
- [ ] Metric 1
```

**Step 4 - Update Status**
STATUS.md: Phase: Discovery - PRD Complete. Next: /architecture

**Step 5 - Summary**
Present feature list. Ask: "Ready for architecture?"
```

---

## .claude/commands/architecture.md

```markdown
---
description: Define technical architecture from PRD
---

# Role: Technical Architect

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest `/prd` first
3. Read `CLAUDE.md` for tech stack and constraints
4. Update STATUS.md: "Phase: Discovery - Architecture"

## Architecture Process

**Step 1 - Review Features**
List all features from the PRD.
For each, identify:
- What data does it need?
- What APIs/endpoints does it require?
- What UI components does it involve?
- How does it interact with other features?

**Step 2 - Define Data Model**
Propose the database schema:
- Tables and their columns
- Relationships (foreign keys)
- Indexes for common queries

Present and wait for feedback before proceeding.

**Step 3 - Define API Structure**
Propose the API routes:
- Endpoints grouped by resource
- HTTP methods
- Request/response shapes
- Authentication requirements

Present and wait for feedback.

**Step 4 - Define Component Structure**
Propose the frontend organization:
- Page components
- Shared/reusable components
- State management approach
- Data fetching patterns

Present and wait for feedback.

**Step 5 - Document**
Create `docs/planning/architecture.md`:

```markdown
# Technical Architecture: [Product Name]

## Overview
[1-2 sentence summary of technical approach]

## Tech Stack
[From CLAUDE.md or customized]

## Data Model

### Tables
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| users | User accounts | id, email, name, created_at |

### Relationships
users 1──* transactions

### Schema Details
[Column definitions for each table]

## API Routes

### Authentication
| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/auth/signup | Create account |

### [Resource Name]
| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | /api/[resource] | List all | Required |

## Component Structure

### Pages
src/app/
├── page.tsx
├── dashboard/
│   └── page.tsx
└── api/

### Shared Components
| Component | Purpose | Used By |
|-----------|---------|---------|
| DataTable | Tables | Dashboard |

## Feature → Component Mapping
| Feature | Pages | Components | API Routes | Tables |
|---------|-------|------------|------------|--------|
| F1 | /signup | SignupForm | /api/auth | users |
```

**Step 6 - Identify Infrastructure Requirements**

Based on the architecture, identify all external services:

- **Databases:** Supabase, PlanetScale, etc.
- **Auth:** Clerk, Auth0, Supabase Auth, etc.
- **APIs:** OpenAI, Stripe, SendGrid, etc.
- **Hosting:** Vercel, Netlify, AWS, etc.

Create `docs/planning/INFRASTRUCTURE.md`:

```markdown
# Infrastructure Requirements

## Status: 🔴 Not Provisioned

## Required Services

### Databases
| Service | Purpose | Status | Blocks |
|---------|---------|--------|--------|
| [Provider] | [Purpose] | 🔴 | [What depends on it] |

### API Keys
| Service | Purpose | Status | Blocks |
|---------|---------|--------|--------|
| [Provider] | [Purpose] | 🔴 | [What depends on it] |

### Hosting
| Platform | Purpose | Status | Blocks |
|----------|---------|--------|--------|
| [Provider] | [Purpose] | 🔴 | Deployment |

## Environment Variables Required
| Variable | Service | Description | Added |
|----------|---------|-------------|-------|
| [VAR] | [Service] | [Purpose] | [ ] |

## Provisioning Order
1. [First] - blocks: [dependencies]
2. [Second] - blocks: [dependencies]
```

**Step 7 - Update Status**
STATUS.md: Phase: Discovery - Architecture Complete. Next: /roadmap

**Step 8 - ADR Prompt**
Ask: "Should I create ADRs for key decisions? For example:"
- Database choice
- Authentication approach  
- State management
If yes, run `/adr` for each.

**Step 8 - Summary**
Present summary. Ask: "Ready to proceed to roadmap?"
```

---

## .claude/commands/roadmap.md

```markdown
---
description: Create a milestone roadmap from PRD
---

# Role: Product Strategist

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest /prd first
3. Read `docs/planning/architecture.md` - stop if missing, suggest /architecture first
4. Update STATUS.md: "Phase: Discovery - Roadmap"

## Roadmap Process

**Step 1 - Review Features**
List all features from PRD with priorities.
Confirm: "Priorities still correct?"

**Step 2 - Define Milestones**
Propose 2-4 milestones:
- Milestone 1: Core functionality (MVP)
- Milestone 2: Enhanced experience
- Milestone 3: Growth features

Each milestone should be independently shippable.

Wait for feedback.

**Step 3 - Break Down Tasks**
For each feature, identify:
- Data/schema changes
- API/backend work
- UI components
- Tests

**Step 4 - Document**
Create `docs/planning/roadmap.md`:

```markdown
# Roadmap: [Product Name]

## Milestone 1: [Name] (MVP)
**Goal:** [What user can do after]
**Status:** Not Started

### Features
- [ ] F1: [Name]
- [ ] F2: [Name]

### Tasks

#### F1: [Name]
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Create X schema | Data | Low | None |
| Build X API | Backend | Medium | Schema |
| Build X UI | Frontend | Medium | API |

---

## Milestone 2: [Name]
[Same structure]
```

**Step 5 - Update Status**
STATUS.md: Phase: Discovery Complete. Next: /sprint

**Step 6 - Summary**
Present milestones. Ask: "Ready to create GitHub issues?"
```

---

## .claude/commands/enhance.md

```markdown
---
description: Research and plan an enhancement to an existing product
---

# Role: Product Iterator

Use this command when you have an enhancement idea for a product that's already built and you want to research it, validate fit, and integrate it into the existing planning structure.

## .claude/commands/autopilot.md

````markdown
---
description: Autonomous build — runs sprint through PR without stopping
---

# Role: Autonomous Build Engineer

You are an autonomous build agent. After the user approves the roadmap, you execute the entire build pipeline — sprint planning, implementation, testing, and PR creation — without stopping to ask questions. When facing ambiguity, make the best choice and log it as an ADR. Never pause to ask.

## Pre-flight Checks

**Step 1 — Verify Discovery Complete**
1. Read `docs/planning/STATUS.md` — confirm phase is "Discovery Complete" or later
   → If not: STOP. Say "Discovery not complete. Run /research → /prd → /architecture → /roadmap first."
2. Read `docs/planning/roadmap.md` — confirm it exists and has milestones
   → If missing: STOP. Say "No roadmap found. Run /roadmap first."
3. Read `docs/planning/INFRASTRUCTURE.md` — ALL services must be 🟢
   → If any 🔴: STOP. Say "Infrastructure not ready. Run /infra first. Autopilot requires all infrastructure provisioned."
4. Read `CLAUDE.md` for project constraints and design system
5. Read `docs/planning/prd.md` for product context
6. Read `docs/planning/architecture.md` for technical structure

Log: "Pre-flight checks passed. Starting autopilot."
Update STATUS.md: "Phase: Autopilot — Starting"

---

## Step 1: Sprint Planning (automatic)

Select the target milestone:
- If `$ARGUMENTS` specifies a milestone number or name, use that
- Otherwise, select the first incomplete milestone from roadmap.md

For the selected milestone:

1. Create a GitHub milestone: `gh api repos/{owner}/{repo}/milestones -f title="Milestone N: [Name]" -f description="[Goal from roadmap]"`
2. Create GitHub issues for all tasks in dependency order using `gh issue create`:

```
Title: [Feature]: [Task]

## Context
Part of: Milestone [N] — [Name]
Feature: [Feature Name]

## Description
[What needs to be done, derived from roadmap and architecture]

## Acceptance Criteria
- [ ] [Criterion from roadmap/PRD]
- [ ] Tests pass (unit + integration + E2E where applicable)

## Technical Notes
- Complexity: [Low/Medium/High]
- Dependencies: [Blocking issue numbers]
```

3. Assign issues to the milestone
4. Update STATUS.md: "Sprint planned: X issues created for Milestone N"
5. Update roadmap.md with issue numbers

Log: "Sprint planned: [X] issues created for Milestone [N]"

---

## Step 2: Build Loop

Create the milestone branch:
```bash
git checkout -b milestone-N-[short-name]
```

Process each issue in dependency order. If an issue depends on a skipped issue, skip it too.

### For each issue:

#### 2a. Plan
- Read the issue with `gh issue view [number]`
- Cross-reference PRD and architecture docs
- Choose implementation approach
- If any non-trivial architectural decision: create ADR in `docs/decisions/` using this format:

```markdown
# ADR-[NUMBER]: [Title]

**Date:** [DATE]
**Status:** Accepted
**Context:** Autopilot — autonomous decision during Milestone [N]

## Context
[What motivated this decision]

## Decision
[What was decided and why]

## Alternatives Considered
[Brief list]

## Consequences
- Positive: [What becomes easier]
- Negative: [What becomes harder]
```

- Log approach to STATUS.md under "In Progress"

#### 2b. Implement
Build in this order: data → logic → UI → tests

**Stage: Data** (if applicable)
- Implement schema/database changes
- Commit: `feat(data): [description] (#[issue])`
- Run lint + tests
- If tests fail: fix and retry (up to 3 attempts)

**Stage: Logic** (if applicable)
- Implement core business logic and API routes
- Commit: `feat(logic): [description] (#[issue])`
- Run lint + tests
- If tests fail: fix and retry (up to 3 attempts)

**Stage: UI** (if applicable)
- Implement interface following DESIGN SYSTEM rules in CLAUDE.md
- Verify: colors within palette, typography correct, spacing consistent, no forbidden patterns
- Commit: `feat(ui): [description] (#[issue])`
- Run lint + tests
- If tests fail: fix and retry (up to 3 attempts)

**Stage: Tests**
- Write unit tests for all business logic and utilities
- Write integration tests for API routes and data operations
- Write E2E tests for any issue that changes UI (mandatory, not optional)
- Commit: `test: [description] (#[issue])`
- Run full test suite + lint

**Failure handling per stage:**
- If tests fail after implementation: fix the issue and retry
- Up to 3 fix attempts per stage
- If still failing after 3 attempts: log as blocker in STATUS.md, skip this issue, continue to next unblocked issue

#### 2c. Verify
- Run full test suite (unit + integration + E2E)
- Run lint
- If all passing: add commit closing the issue reference
- Update STATUS.md: mark issue as completed

---

## Step 3: Milestone Quality Gate

Before creating the PR, run a full quality gate:

1. **Full test suite** — unit + integration + E2E must all pass
2. **Lint** — must pass with zero errors
3. **Build** — `npm run build` (or equivalent) must succeed
4. **Security check** — scan for hardcoded secrets + run dependency audit
5. **Coverage report** — generate coverage; warn if below 60% but do not block

If quality gate fails:
- Attempt to fix (up to 3 attempts)
- If unfixable: note in PR body, continue with PR creation

---

## Step 4: Milestone PR

Push the branch and create the PR:

```bash
git push -u origin milestone-N-[short-name]
```

Create PR with `gh pr create`:

```
Title: Milestone [N]: [Name]

## Summary
[Goal from roadmap]

## Issues Completed
- Closes #[A]: [Title]
- Closes #[B]: [Title]
...

## Issues Skipped (needs human review)
- #[X]: [Reason skipped]
...

## ADRs Created
- ADR-[N]: [Title] — [One-line summary]
...

## Quality Gate Results
- Tests: [X passed, Y failed]
- Lint: [PASS/FAIL]
- Build: [PASS/FAIL]
- Security: [PASS/FAIL]
- Coverage: [X%] [⚠️ if below 60%]

## Test Summary
- Unit tests: [count]
- Integration tests: [count]
- E2E tests: [count]
```

---

## Step 5: Report

Update STATUS.md with final state:
- Phase: "Autopilot Complete — Milestone [N]"
- List all completed issues
- List all skipped issues with reasons
- List all ADRs created
- Set next action

Present final summary:

```
AUTOPILOT COMPLETE
==================
Milestone: [N] — [Name]
Branch: milestone-N-[short-name]
PR: #[number]

Issues completed: X/Y
ADRs created: [list or "None"]
Tests: [pass/fail summary]
Coverage: [X%]

Skipped (needs human):
- #[N]: [reason]

Next: Review PR, then run /autopilot for next milestone
```

---

## Failure Handling Summary

| Failure | Action |
|---------|--------|
| Test fails after implementation | Fix → retry (up to 3 attempts per stage) |
| Still failing after 3 attempts | Skip issue, log as blocker in STATUS.md |
| Issue depends on skipped issue | Skip, log as blocked |
| Build error | Attempt fix, if unfixable after 3 tries → skip, log |
| Security issue found | Log in PR body, continue |
| Coverage below 60% | Warn in PR body, do not block |

All skipped issues are reported in the final summary and PR body.

---

## Why Soft Coverage Threshold

Hard thresholds cause autonomous agents to write meaningless tests to hit a number. Soft threshold (log + warn) gives visibility without brittleness. The user reviews coverage in the PR summary and decides adequacy per milestone.

---

## Related Commands

- `/research` → `/prd` → `/architecture` → `/roadmap` — Run these first (guided discovery)
- `/infra` — Must be all 🟢 before autopilot
- `/status` — Check project state anytime
- `/adr` — Autopilot creates these automatically for decisions
- `/pre-release` — Autopilot runs quality checks automatically

````

## Before Starting
1. Read `CLAUDE.md` — Understand the product
2. Read `docs/planning/prd.md` — Current feature set
3. Read `docs/planning/architecture.md` — Current technical structure
4. Read `docs/planning/roadmap.md` — Current milestones

## Step 1 - Capture the Enhancement Idea

If `$ARGUMENTS` provided, use that as the idea.

If not, ask:
"What enhancement are you considering? Describe the idea, user need, or feedback that prompted it."

→ Wait for response

## Step 2 - Research & Validate

Research the enhancement:
- How do similar products handle this?
- What are the common approaches?
- Are there potential pitfalls?
- What's the effort vs. impact?

If `$ARGUMENTS` contains "quick" or the idea is straightforward, skip deep research and go to Step 3.

If `$ARGUMENTS` contains "--research-only", stop after this step and do not update planning docs.

If `$ARGUMENTS` contains "--from-feedback", frame research around the user problem rather than the solution.

Present findings:

```
🔍 ENHANCEMENT RESEARCH
=======================

Idea: [Enhancement description]

MARKET CONTEXT
- How others do it: [Brief summary]
- Common patterns: [Patterns]
- Potential pitfalls: [Risks to avoid]

FIT ANALYSIS
- Aligns with product vision? [Yes/No + why]
- Impacts existing features? [List any]
- Architecture implications? [Changes needed]

EFFORT ESTIMATE
- Complexity: [Low / Medium / High]
- Suggested milestone: [New / Existing milestone name]

RECOMMENDATION
[Proceed / Modify / Defer / Reject] — [Reasoning]
```

Ask: "Does this analysis align with your thinking? Any adjustments before I propose the specification?"

→ Wait for confirmation

## Step 3 - Draft Feature Specification

Create a feature spec for the enhancement:

```
📋 FEATURE SPECIFICATION
========================

Feature: [Name]
Type: [New Feature / Enhancement / Extension]

USER STORY
As a [user type], I want [capability] so that [benefit].

DESCRIPTION
[2-3 sentences on what this does]

ACCEPTANCE CRITERIA
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]
- [ ] Tests pass

TECHNICAL NOTES
- Dependencies: [Existing features this builds on]
- Architecture impact: [None / Minor / Significant]
- New components: [List any]

OUT OF SCOPE
- [What this explicitly does NOT include]

OPEN QUESTIONS
- [Any unresolved questions]
```

Ask: "Does this specification capture what you want? Any changes?"

→ Wait for confirmation

## Step 4 - Integrate into Planning

**Step 4a - Update PRD**

⚠️ `docs/planning/prd.md` already exists.

Options:
1. Add — Append this feature to the existing PRD
2. Review — Show me where it would go first
3. Skip — Don't update PRD

→ Wait for choice

If Add or Review approved:
- Add feature to appropriate section of PRD
- Include user story and acceptance criteria
- Note it as "Added: [DATE]" to distinguish from original features

**Step 4b - Update Roadmap**

⚠️ `docs/planning/roadmap.md` already exists.

Ask: "Which milestone should this feature belong to?"
- Show existing milestones with their themes
- Offer: "Or create a new milestone?"

→ Wait for choice

Then:
- Add feature to selected milestone in roadmap.md
- Include dependency notes if any

**Step 4c - Update Architecture (if needed)**

If architecture impact was Minor or Significant in the spec:

⚠️ `docs/planning/architecture.md` may need updates.

Options:
1. Update — Add new components/routes/tables
2. ADR — Create an Architecture Decision Record for significant changes
3. Skip — No architecture changes needed

→ Wait for choice

## Step 5 - Create GitHub Issue

Ask: "Create a GitHub issue for this enhancement?"

If yes:
```bash
gh issue create \
  --title "[Enhancement]: [Feature name]" \
  --body "[Generated from spec]" \
  --label "enhancement" \
  --milestone "[Selected milestone]"
```

Show:
```
✅ ENHANCEMENT PLANNED
======================

Feature: [Name]
Issue: #[number]
Milestone: [Name]

Files updated:
- docs/planning/prd.md ✓
- docs/planning/roadmap.md ✓
- docs/planning/architecture.md [✓ if updated]

Ready to build? Run `/autopilot`
```

## Step 6 - Update STATUS.md

Update `docs/planning/STATUS.md`:
- Add to Recently Completed: "Enhancement planned: [Feature name]"
- Set Next Action based on context

---

## Related Commands

- `/research` — Initial product research (use for new products)
- `/prd` — Create initial PRD (use for new products)
- `/autopilot` — Run autonomous build after roadmap approval

## Rollback

If the enhancement was added to planning docs and you want to undo:
```bash
git checkout -- docs/planning/prd.md docs/planning/roadmap.md docs/planning/architecture.md
```
```

---

## .claude/commands/infra.md

```markdown
---
description: Provision external services step by step
---

# Role: Infrastructure Guide

## Before Starting
Read `docs/planning/INFRASTRUCTURE.md`. If missing, run `/architecture` first.

## Step 1: Show Status
```
🔧 INFRASTRUCTURE STATUS
========================

DATABASES
├── [Service]: [🔴/🟢] [Purpose]

API KEYS
├── [Service]: [🔴/🟢] [Purpose]

HOSTING
├── [Service]: [🔴/🟢] [Purpose]

Overall: [X]/[Y] Ready
```

## Step 2: Provision Each Service

For each 🔴 service, guide ONE STEP AT A TIME:

```
PROVISIONING: [Service]
=======================

Step [N] of [Total]: [Action]

[Clear single instruction]

Let me know when done.
```

## Step 3: Verify & Update

After each service:
1. Test connection if possible
2. Update INFRASTRUCTURE.md status to 🟢
3. Confirm env vars are set

When ALL services are 🟢, also update STATUS.md:
- Mark "Infrastructure provisioned" as complete
- Add to Recently Completed: "Infrastructure provisioned"

## Step 4: Final Summary

When all 🟢:
```
✅ INFRASTRUCTURE READY

All services provisioned.
STATUS.md updated ✓

Run: /autopilot
```

## Subcommands
- `/infra status` - Show status only
- `/infra verify` - Test connections
- `/infra [service]` - Provision specific service
```

---

## .claude/commands/status.md

```markdown
---
description: View or update project status
---

# Role: Status Tracker

## If STATUS.md Exists
Read `docs/planning/STATUS.md` and present:

```
📍 PROJECT STATUS
================
Phase: [Current phase]
Active Work: [What's in progress]

✅ Recently Completed:
- [Items]

🚧 In Progress:
- [Current task]

⏳ Up Next:
- [Next items]

❓ Blockers:
- [Any blockers]

💡 Suggested: [What to do next]
```

Ask: "Update anything, or continue with [suggestion]?"

## If STATUS.md Doesn't Exist
Create `docs/planning/STATUS.md` with initial template.
Say: "Created STATUS.md. Run /research to start, or /onboard for existing code."
```

---

## .claude/commands/checkpoint.md

```markdown
---
description: Save progress to STATUS.md before stepping away (team-shareable state)
---

# Role: Progress Recorder

**Note:** This saves project state to STATUS.md (shareable with your team). Claude Code auto-saves chat sessions separately.

## Checkpoint Process

**Step 1 - Gather State**
Review this session:
- Commands run
- Files created/modified
- Current stage
- Pending decisions

**Step 2 - Update STATUS.md**
Update `docs/planning/STATUS.md`:
- Current phase and active work
- Exactly where we stopped
- Any pending questions
- Clear next steps
- Add session log entry

**Step 3 - Offer Commit**
"Should I commit STATUS.md? (Recommended before stepping away)"

If yes: `git add docs/planning/STATUS.md && git commit -m "checkpoint: [state]"`

**Step 4 - Confirm**
```
✅ CHECKPOINT SAVED
Stopped at: [Specific point]
Next time: /resume-work

Key context:
- [Detail 1]
- [Detail 2]
```
```

---

## .claude/commands/resume-work.md

```markdown
---
description: Read STATUS.md and continue where you left off (different from native /resume)
---

# Role: Session Continuity Manager

**Note:** This command reads your project's STATUS.md file for team-shareable project state. It's different from Claude Code's native `/resume` command which continues a previous chat session.

## Resume Process

**Step 1 - Read State**
Read in order:
1. `docs/planning/STATUS.md` (required)
2. `CLAUDE.md`
3. Active planning docs based on phase

**Step 2 - Present Context**
```
👋 WELCOME BACK
===============
📍 Phase: [Phase]
🎯 Active: [What was in progress]
📅 Last Session: [Date]

Last time you:
- [Accomplishment 1]
- [Accomplishment 2]

You stopped at:
→ [Specific point]

Pending:
- [Any blockers/questions]

Ready to continue?
```

**Step 3 - Propose Next Action**
Based on STATUS.md, suggest logical next step.

**Step 4 - Wait**
Don't proceed automatically. Wait for confirmation.
```

---

## docs/planning/STATUS.md

```markdown
# Project Status

## Current State
**Phase:** Not Started
**Active Work:** None
**Last Updated:** [DATE]

## Progress

### Discovery
- [ ] Research (docs/planning/research.md)
- [ ] PRD (docs/planning/prd.md)
- [ ] Roadmap (docs/planning/roadmap.md)
- [ ] Sprint Planning (GitHub issues)

### Build
- [ ] Milestone 1: Not started
- [ ] Milestone 2: Not started

## Recently Completed
*Nothing yet*

## In Progress
*Nothing yet*

## Blockers / Needs Input
*None*

## Next Actions
1. Run /research to start discovery
2. Or /onboard for existing codebase
3. After roadmap approval, run /autopilot

## Session Log
| Date | Summary |
|------|---------|
```

---

## .github/workflows/claude.yml

```yaml
name: Claude Code Assistant

on:
  issue_comment:
    types: [created]
  issues:
    types: [labeled]
  pull_request_review_comment:
    types: [created]

jobs:
  claude-response:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && github.event.label.name == 'claude') ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude'))
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Claude
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## .github/ISSUE_TEMPLATE/feature.md

```markdown
---
name: Feature Request
about: Propose a new feature
title: 'feat: '
labels: 'enhancement'
---

## Problem
What problem does this solve?

## Proposed Solution
What should be built?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Additional Context
Any mockups, references, or technical notes?
```

---

## .github/ISSUE_TEMPLATE/bug.md

```markdown
---
name: Bug Report
about: Report something broken
title: 'bug: '
labels: 'bug'
---

## Description
What's broken?

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- Browser:
- OS:
- Version:
```

---

## docs/design-references/README.md

```markdown
# Design References

Add screenshots of UI patterns you want to match.

## How to Use

1. Screenshot a UI you like (Stripe, Linear, FT, etc.)
2. Save here with descriptive name: `stripe-pricing-table.png`
3. Reference in prompts: "Match the style in /docs/design-references/stripe-pricing-table.png"

## Suggested References

- Navigation/sidebar pattern
- Data table style
- Card layout
- Form design
- Dashboard layout
```

---

## docs/planning/TECH-DEBT.md

```markdown
# Technical Debt Tracker

Track known shortcuts, workarounds, and areas needing improvement.

**Last Updated:** [DATE]

---

## Summary

| Priority | Count | Estimated Effort |
|----------|-------|------------------|
| 🔴 Critical | 0 | - |
| 🟠 High | 0 | - |
| 🟡 Medium | 0 | - |
| 🔵 Low | 0 | - |

---

## Active Debt Items

### 🔴 Critical (Fix immediately)
*None currently*

### 🟠 High (Fix this sprint)
*None currently*

### 🟡 Medium (Fix next sprint)
*None currently*

### 🔵 Low (Fix when convenient)
*None currently*

---

## Resolved Debt

| ID | Title | Resolved Date | Resolution |
|----|-------|---------------|------------|
| - | - | - | - |

---

## Process

### When to Add Debt
- Taking a shortcut to meet a deadline
- Implementing a workaround for a bug
- Skipping tests for expedience
- Using deprecated APIs

### Debt Review Cadence
- Review during sprint planning
- Allocate 20-30% of sprint capacity to debt reduction
```

---

## docs/decisions/README.md

```markdown
# Architecture Decision Records

This directory contains ADRs documenting significant technical decisions.

## What is an ADR?

An ADR captures a single architectural decision along with its context and consequences.

## When to Write an ADR

Create an ADR when you make a decision that:
- Affects the structure of the system
- Is hard to reverse
- Has significant trade-offs

## Index

| ADR | Title | Date | Status |
|-----|-------|------|--------|
| - | *No decisions recorded yet* | - | - |

## Creating a New ADR

Run `/adr` in Claude Code to create a new decision record.
```


---

## .claudeignore

```
# Claude Code Ignore File
# Files and directories listed here won't be scanned by Claude

# Dependencies
node_modules/
vendor/
.pnpm-store/

# Build outputs
dist/
build/
.next/
.nuxt/
out/

# Cache
.cache/
.turbo/

# Test coverage
coverage/

# Environment files
.env
.env.*
!.env.example

# IDE
.idea/
.vscode/

# OS files
.DS_Store

# Logs
*.log
logs/

# Lock files (large)
package-lock.json
yarn.lock
pnpm-lock.yaml

# Generated files
*.min.js
*.min.css
```

---

## .claude/settings.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "echo '✓ File modified - remember to test changes'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo '📝 Session ending - consider running /checkpoint'"
          }
        ]
      }
    ]
  }
}
```


---

## .claude/commands/setup.md

```markdown
---
description: Check environment readiness and guide through configuration
---

# Role: Setup Assistant

Check if all required tools and integrations are configured.

## Step 1: Check Core Tools

```bash
git --version 2>/dev/null
node --version 2>/dev/null
npm --version 2>/dev/null
python3 --version 2>/dev/null
gh --version 2>/dev/null
gh auth status 2>/dev/null
```

## Step 2: Check Project Files

Look for:
- package.json or pyproject.toml (project type)
- Test script configured
- Lint script configured
- CLAUDE.md exists
- .claudeignore exists
- docs/planning/STATUS.md exists

## Step 3: Check GitHub MCP

```bash
claude mcp list 2>/dev/null | grep -i github
```

## Step 4: Present Results

```
🔧 ENVIRONMENT CHECK
====================

CORE TOOLS
├── Git: [✅/❌]
├── Runtime: [✅/❌]
├── Package Manager: [✅/❌]
└── GitHub CLI: [✅/⚠️/❌]

GITHUB INTEGRATION
├── GitHub MCP: [✅ Configured | ❌ Not configured]
│   → Run: claude mcp add github
│   → PAT: https://github.com/settings/tokens
│   → Scopes: repo, read:org, workflow
│
└── ANTHROPIC_API_KEY: [Check repo secrets manually]

PROJECT FILES
├── CLAUDE.md: [✅/❌]
├── .claudeignore: [✅/⚠️]
├── Test script: [✅/❌]
└── Lint script: [✅/❌]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW READINESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Discovery (/research → /roadmap): [✅/❌]
Autopilot (/autopilot): [✅/❌ needs GitHub CLI + test/lint]
Quality (/pre-release): [✅/⚠️ needs test/lint]
```

## Step 5: Next Steps

List missing items in priority order with exact commands to fix.
```

---

# DESIGN SYSTEM BLOCKS

These are the three possible Section 9 values. Use the one that matches the user's path through Question 4.

## DEFAULT DESIGN SYSTEM

Use this when the user picks **Option A** (default) for a UI archetype.

```markdown
## 9. DESIGN SYSTEM

### Philosophy
Professional, information-dense, minimal. Think "Financial Times meets Stripe."
NOT: flashy, playful, marketing-heavy, or consumer-app aesthetic.

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Background | `white` / `slate-50` | Page backgrounds |
| Surface | `white` | Cards, modals |
| Border | `slate-200` | Subtle divisions |
| Text Primary | `slate-900` | Headings, body |
| Text Secondary | `slate-500` | Captions, labels |
| Accent | `slate-600` | Primary buttons, links |
| Accent Hover | `slate-700` | Button hover states |
| Success | `emerald-600` | Success states |
| Warning | `amber-600` | Warning states |
| Error | `red-600` | Error states |

### Typography
- **Font:** Inter (system fallback: -apple-system, sans-serif)
- **Scale:** 12px (caption) → 14px (body) → 16px (lead) → 20px (h3) → 24px (h2) → 30px (h1)
- **Line height:** 1.5 for body, 1.2 for headings
- **Font weights:** 400 (normal), 500 (medium), 600 (semibold)

### Spacing
- Base unit: 4px
- Use Tailwind spacing: `p-2` (8px), `p-4` (16px), `p-6` (24px)
- Consistent padding inside cards: `p-6`
- Gap between sections: `space-y-8`

### Components
- **Buttons:** Subtle, not loud. Primary = solid slate. Secondary = outline.
- **Cards:** White background, `border border-slate-200`, `rounded-lg`, `shadow-sm`
- **Tables:** Clean, minimal borders, hover states on rows
- **Forms:** Simple labels above inputs, clear focus states
- **Icons:** Lucide icons only, 20px default size, stroke-width 1.5

### Layout
- Max content width: 1280px centered
- Sidebar: 256px fixed width (if applicable)

### FORBIDDEN
- Hero sections with large images
- Gradient backgrounds
- Colored section backgrounds
- Decorative illustrations
- Emojis in UI (okay in content)
- Marketing-style CTAs ("🚀 Get Started Free!")
- Excessive animations
- Card shadows darker than `shadow-sm`
- More than one accent color

### Reference
- [Stripe Dashboard](https://stripe.com)
- [Linear](https://linear.app)
```

## NON-UI DESIGN STUB

Use this for non-UI archetypes (2: FastAPI, 4: NestJS, 6: Node.js CLI, 10: Go+Gin, 12: Hono).

```markdown
## 9. DESIGN SYSTEM

This project has no user-facing UI. Design system rules are not applicable.

If UI is added later, run `/init-playbook` in update mode to configure a design system.
```

---

# DESIGN DISCOVERY PROCESS

Run this when the user picks **Option B** (tailored design) for a UI archetype. Ask all questions ONE AT A TIME, then research, then present a recommendation.

## Q4a — Product & Audience

Ask:
```
"Describe your product in one sentence and who will use it.
(e.g. 'A budgeting app for freelancers' or 'An internal admin dashboard for a logistics company')"
```

→ Wait for response. Store as `PRODUCT_DESCRIPTION` and `TARGET_AUDIENCE`.

## Q4b — Visual References

Ask:
```
"Name 1-3 apps or websites whose visual style you admire.
(e.g. 'Linear, Notion' or 'Duolingo' or 'I don't have any in mind')"
```

→ Wait for response. Store as `VISUAL_REFERENCES`.

## Q4c — Desired Feeling

Ask:
```
"What feeling should the UI convey? Pick one or describe your own:

   1. Professional & trustworthy (finance, enterprise, B2B)
   2. Clean & minimal (developer tools, productivity)
   3. Warm & approachable (consumer, education, health)
   4. Bold & energetic (gaming, social, entertainment)
   5. Luxurious & refined (premium products, fashion)
   6. Something else (describe it)"
```

→ Wait for response. Store as `DESIRED_FEELING`.

## Web Search Research

After collecting all three answers, perform 4-5 web searches:

1. For each reference app named in Q4b (1-3 searches): `"[reference app] design system UI"`
2. Competitor patterns: `"[product category] app UI design 2026"`
3. Audience expectations: `"[target audience] UX expectations"`

If the user said "I don't have any in mind" for Q4b, replace reference searches with:
- `"best [product category] app UI design examples"`

**Extract from results:** color palettes (actual hex values), typography choices, layout patterns, tone/mood, platform conventions.

## Present Recommendation

Present findings in this format:

```
🎨 DESIGN RECOMMENDATION
=========================

Based on: [references], [competitor research], [audience]

PHILOSOPHY
[2 sentences — the visual feel and why it fits this product]

INSPIRATION
- [App 1]: [what we're borrowing — e.g. "color restraint, typography scale"]
- [App 2]: [what we're borrowing — e.g. "card layout, spacing rhythm"]

COLOR PALETTE
| Role        | Value   | Tailwind Class | Usage            |
|-------------|---------|----------------|------------------|
| Background  | #FFFFFF | bg-white       | Page backgrounds |
| Surface     | ...     | ...            | Cards, panels    |
| [8-10 rows with actual values]

TYPOGRAPHY
- Font: [Name] (fallback: [stack])
- Scale: 12px → 14px → 16px → 20px → 24px → 30px

SPACING
- Base unit: 4px
- Card padding: [value]
- Section gap: [value]

COMPONENTS
- Buttons: [specific style]
- Cards: [specific style]
- Icons: [library]

FORBIDDEN PATTERNS
- [3-5 project-specific items]

Does this direction feel right? I can adjust colors, typography, or mood.
```

→ Wait for user approval. Allow up to 2 revision rounds if user wants tweaks.

## Generate Section 9

Once approved, generate a complete Section 9 with **all of these subsections** (this structure is required — `/design-check` audits each subsection by name):

- **Philosophy** — 2-3 sentences on the visual feel
- **Color Palette** — Table with Role / Value / Usage columns
- **Typography** — Font, scale, weights, line heights
- **Spacing** — Base unit, Tailwind values (or pixel values for Godot)
- **Components** — Buttons, cards, tables, forms, icons
- **Layout** — Max-width, sidebar (if applicable)
- **FORBIDDEN** — Bulleted list of project-specific anti-patterns
- **Reference** — 2-3 sites that inspired the design

### Platform-Specific Variations

**Godot (archetype 14):** Replace Tailwind classes with hex values and pixel sizes throughout. Replace the "Components" subsection with Godot Control node patterns (Button, Panel, MarginContainer, etc.). Add "Art Direction" and "Asset Guidelines" subsections after Components.

**Mobile (archetypes 5, 13 — React Native, Flutter):** After the Reference subsection, append a "Mobile-Specific Rules" subsection:
- 44pt (iOS) / 48dp (Android) minimum touch targets
- Safe area handling (notch, home indicator)
- Platform navigation patterns (tab bar on iOS, bottom nav on Android)
- System font notes (SF Pro on iOS, Roboto on Android)

→ Use the generated Section 9 as `{{DESIGN_SYSTEM}}` in the CLAUDE.md template.
