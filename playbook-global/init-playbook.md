---
description: Initialize or update the Claude Code playbook in any project
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
3. "Tech stack? (Press enter for default: Next.js, React, TypeScript, Tailwind, Supabase, shadcn/ui)"

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

### Fill In Project Context
In CLAUDE.md, replace the PROJECT CONTEXT placeholders with the user's answers.

### Final Message
```
✅ PLAYBOOK INSTALLED

Created:
- CLAUDE.md (project constitution)
- 19 slash commands in .claude/commands/
- GitHub workflow and issue templates
- docs/planning/STATUS.md and TECH-DEBT.md
- docs/decisions/ for Architecture Decision Records

Next steps:
1. Review and customize CLAUDE.md (especially the Design System if needed)
2. Add 2-3 screenshots to docs/design-references/
3. Run: /status (to see project state)
4. Run: /research (to start product discovery)
   OR /onboard (if adding to existing codebase)

GitHub setup (optional but recommended):
1. Create a GitHub repo if you haven't
2. Run: claude mcp add github (follow prompts for PAT)
3. Add ANTHROPIC_API_KEY to repo secrets
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

---

## 10. QUICK REFERENCE

### Commands Available
**Discovery:** `/research`, `/prd`, `/architecture`, `/adr`, `/roadmap`, `/sprint`
**Build:** `/plan`, `/build`, `/fix-issue`, `/audit`, `/security-check`, `/deps`, `/design-check`, `/pre-release`
**Session:** `/status`, `/checkpoint`, `/resume-work`
**Utility:** `/onboard`, `/challenge`

### Key Files
- `docs/planning/STATUS.md` - Current project state
- `docs/planning/TECH-DEBT.md` - Technical debt tracker
- `docs/planning/prd.md` - Product requirements
- `docs/planning/architecture.md` - Technical structure
- `docs/planning/roadmap.md` - Implementation plan
- `docs/decisions/` - Architecture Decision Records
```

---

## .claude/commands/plan.md

```markdown
---
description: Plan a feature with assumption checking
---

# Role: Architect

## Before Starting
1. Read `docs/planning/STATUS.md` if it exists
2. Read `docs/planning/prd.md` if it exists (for product context)
3. Read `docs/planning/architecture.md` if it exists (for technical structure)
4. Read `docs/planning/roadmap.md` if it exists (for current priorities)
5. Read `CLAUDE.md` for project constraints and design system

## Planning Process

1. Enter Plan Mode (read-only)
2. Read relevant codebase files to understand current state
3. Cross-reference with planning docs:
   - Does this feature align with the PRD?
   - Does it follow the architecture?
   - Where does it fit in the roadmap?
4. List every assumption you are making about:
   - How I want this to behave
   - Current codebase structure and patterns
   - Dependencies or APIs involved
   - Design/UI expectations
5. Ask me clarifying questions (one at a time)
6. Propose a step-by-step implementation plan
7. Wait for my explicit "proceed" before exiting Plan Mode

## After Planning Approved
Update `docs/planning/STATUS.md`:
- Set Active Work to this feature
- Note the approved plan
- Set next action: "Run /build to implement"
```

---

## .claude/commands/build.md

```markdown
---
description: Build a feature in stages with approval gates
---

# Role: Engineer

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists (for product context)
4. Read `docs/planning/architecture.md` if it exists (for technical structure)

## Build Process

Execute in stages. STOP after each stage and wait for my "proceed."
Update `docs/planning/STATUS.md` after completing each stage.

**Stage 1 - Data:**
Show proposed schema/database changes. Explain why.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 1 (Data) complete"

**Stage 2 - Logic:**
Show the core function or API route. Explain the logic.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 2 (Logic) complete"

**Stage 3 - UI:**
Implement the interface following DESIGN SYSTEM rules in CLAUDE.md.
Before showing me the result, verify:
- Colors within approved palette?
- Typography hierarchy correct?
- Spacing consistent with 4px grid?
- No forbidden patterns?

Show the component and confirm design compliance.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 3 (UI) complete"

**Stage 4 - Test:**
Write tests that verify expected behavior (not implementation).
→ Wait for "proceed"
→ Update STATUS.md: "Stage 4 (Test) complete"

**Stage 5 - Verify:**
Run lint and tests. Report results.
→ If passing, await commit approval
→ Update STATUS.md: Move to "Recently Completed", set next action

**Stage 6 - Tech Debt Check:**
Ask: "Were any shortcuts or workarounds taken?"
→ If yes, add entry to `docs/planning/TECH-DEBT.md`
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

## .claude/commands/challenge.md

```markdown
---
description: Surface ambiguity in vague requests
---

# Role: Requirements Analyst

Before I build anything, challenge my request:

1. List what's ambiguous or underspecified
2. Identify assumptions you'd have to make
3. Ask clarifying questions (one at a time)
4. Summarize the clarified requirements
5. Wait for my confirmation before proceeding
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
- [ ] All tests pass (`npm run test`)
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

## .claude/commands/fix-issue.md

```markdown
---
description: Implement a GitHub issue
---

# Role: Engineer

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work to this issue
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists
4. Read `docs/planning/architecture.md` if it exists (for technical structure)
5. Read `docs/planning/roadmap.md` if it exists

## Implementation Process

1. Run `gh issue view $ARGUMENTS` to read the full issue
2. Update `docs/planning/STATUS.md`:
   - Active Work: "Implementing #[number]: [title]"
   - Phase: Build

3. Enter Plan Mode:
   - Summarize what the issue is asking for
   - Cross-reference with PRD and architecture if available
   - Identify which files need changes
   - List all assumptions
   - Propose implementation approach

4. Wait for my explicit "proceed"

5. Implement using /build stages (updating STATUS.md at each):
   - Stage 1 (Data): Schema changes if needed
   - Stage 2 (Logic): Core implementation
   - Stage 3 (UI): Interface changes if needed
   - Stage 4 (Test): Behavior tests
   - Stage 5 (Verify): Lint and test

6. When complete, ask: "Ready to create a PR?"

7. If yes:
   - Create branch: `git checkout -b fix/[issue-number]-[short-desc]`
   - Commit: `fix: [description] (#[issue-number])`
   - PR: `gh pr create --title "[description]" --body "Fixes #[issue-number]"`

8. Update STATUS.md: Move to "Recently Completed"

9. Tech Debt Check:
   Ask: "Were any shortcuts or workarounds taken?"
   → If yes, add entry to `docs/planning/TECH-DEBT.md`
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

**Step 6 - Update Status**
STATUS.md: Phase: Discovery - Architecture Complete. Next: /roadmap

**Step 7 - ADR Prompt**
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

## .claude/commands/sprint.md

```markdown
---
description: Create GitHub issues from roadmap
---

# Role: Sprint Planner

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/roadmap.md` - stop if missing
3. Read `docs/planning/prd.md` for context
4. Update STATUS.md: "Phase: Sprint Planning"

## Sprint Process

**Step 1 - Select Milestone**
If not specified in $ARGUMENTS, ask which milestone.

**Step 2 - Confirm**
List tasks for that milestone.
"I'll create [X] GitHub issues. Proceed?"

**Step 3 - Create Issues**
For each task, run `gh issue create`:

```
Title: [Feature]: [Task]

## Context
Part of: Milestone [X]
Feature: [Name]

## Description
[What needs to be done]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] Tests pass

## Technical Notes
- Complexity: [Low/Medium/High]
- Dependencies: [Blocking issues]
```

**Step 4 - Update Roadmap**
Add issue numbers to roadmap.md tasks.

**Step 5 - Update Status**
STATUS.md:
- Phase: Build
- List created issues
- Next: /fix-issue [first issue]

**Step 6 - Summary**
```
Created [X] issues for Milestone 1:
- #12: [Task]
- #13: [Task]

Start with: /fix-issue 12
```
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
description: Save progress before stepping away
---

# Role: Progress Recorder

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
description: Continue from where you left off
---

# Role: Session Continuity Manager

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
