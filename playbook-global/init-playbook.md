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
3. "What type of project is this?

   **Quick Picks (enter number):**
   1. Next.js + Supabase (Full-Stack Web App)
   2. Python + FastAPI (Backend API)
   3. React + Vite (Frontend SPA)
   4. Node.js + Express (Backend API)
   5. React Native + Expo (Mobile App)
   6. Node.js CLI Tool
   7. Astro (Static Site)
   8. Chrome Extension
   9. Custom (I'll specify my stack)
   
   Or describe your stack directly."

→ If user picks 1-8, use the corresponding archetype from `docs/ARCHETYPES.md`
→ If user picks 9 or describes a stack, use their specification

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
- 19 slash commands in .claude/commands/
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
   /sprint → /fix-issue
   
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
**Build:** `/build`, `/fix-issue`, `/audit`, `/security-check`, `/deps`, `/design-check`, `/pre-release`
**Session:** `/status`, `/checkpoint`, `/resume-work`
**Utility:** `/onboard`, `/challenge`

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

## .claude/commands/build.md

```markdown
---
description: Build a feature without a GitHub issue (ad-hoc)
---

# Role: Engineer

**When to use this command:**
- Quick prototypes or explorations
- Projects not using GitHub issues
- Ad-hoc requests during a conversation
- Small unplanned additions

**For issue-driven development, use `/fix-issue` instead.**

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists (for product context)
4. Read `docs/planning/architecture.md` if it exists (for technical structure)
5. Use **Plan Mode** (Shift+Tab) first if uncertain about approach

## Build Process

Execute in stages. STOP after each stage and wait for "proceed."
Commit after each stage to enable rollback.

**Stage 1 - Data:**
Show proposed schema/database changes. Explain why.
→ Wait for "proceed"
→ Commit: `git commit -m "feat(data): [description]"`
→ Update STATUS.md: "Stage 1 (Data) complete"

**Stage 2 - Logic:**
Show the core function or API route. Explain the logic.
→ Wait for "proceed"
→ Commit: `git commit -m "feat(logic): [description]"`
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
→ Commit: `git commit -m "feat(ui): [description]"`
→ Update STATUS.md: "Stage 3 (UI) complete"

**Stage 4 - Unit/Integration Tests:**
Write tests that verify expected behavior of functions and APIs.
→ Wait for "proceed"
→ Commit: `git commit -m "test(unit): [description]"`
→ Update STATUS.md: "Stage 4 (Unit Tests) complete"

**Stage 5 - E2E Tests (if UI changed):**
If Stage 3 was executed, write or update E2E tests for affected user flows.
→ If no UI change, state "Skipping E2E - no UI changes" and proceed
→ Wait for "proceed"
→ Commit: `git commit -m "test(e2e): [description]"`
→ Update STATUS.md: "Stage 5 (E2E) complete"

**Stage 6 - Verify:**
Run lint, unit tests, and E2E tests. Report results.
→ If passing, final commit: `git commit -m "feat: [complete feature description]"`
→ Update STATUS.md: Move to "Recently Completed", set next action

**Stage 7 - Tech Debt Check:**
Ask: "Were any shortcuts or workarounds taken?"
→ If yes, add entry to `docs/planning/TECH-DEBT.md`

## Rollback
If something goes wrong: `git log --oneline` then `git reset --hard <commit>`
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

## .claude/commands/fix-issue.md

```markdown
---
description: Implement a GitHub issue with staged builds
---

# Role: Engineer

This is the **primary build command** when following the playbook workflow.

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work to this issue
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists
4. Read `docs/planning/architecture.md` if it exists
5. Read `docs/planning/roadmap.md` if it exists
6. Read `docs/planning/INFRASTRUCTURE.md` if it exists - check for 🔴 items

## Step 0: Validate Prerequisites

**Check 1 - Issue Number:**
If `$ARGUMENTS` is empty:
→ List open issues with `gh issue list --state open --limit 10`
→ Ask which issue to work on
→ Wait for number before proceeding

**Check 2 - Infrastructure:**
If `INFRASTRUCTURE.md` has any 🔴 items:
→ Warn user, offer: (1) Run `/infra`, (2) Continue anyway, (3) Cancel

**Check 3 - GitHub CLI:**
If `gh auth status` fails:
→ Stop and suggest `gh auth login` or `/setup`

## Step 1: Read the Issue
Run `gh issue view $ARGUMENTS`

Update STATUS.md:
- Active Work: "Implementing #[number]: [title]"
- Phase: Build

## Step 2: Plan
- Summarize what the issue asks for
- Cross-reference with PRD and architecture
- Identify files needing changes
- List assumptions
- Propose implementation approach

→ Wait for "proceed"

## Step 3: Create Branch
`git checkout -b feat/[issue-number]-[short-description]`

## Step 4: Staged Build
Execute in stages. STOP after each and wait for "proceed."

**Stage 4.1 - Data:** Schema changes
→ Wait → Commit: `git commit -m "feat(data): [desc] (#[num])"`

**Stage 4.2 - Logic:** Core implementation
→ Wait → Commit: `git commit -m "feat(logic): [desc] (#[num])"`

**Stage 4.3 - UI:** Interface (verify design system)
→ Wait → Commit: `git commit -m "feat(ui): [desc] (#[num])"`

**Stage 4.4 - Unit/Integration Tests:** Function and API tests
→ Wait → Commit: `git commit -m "test(unit): [desc] (#[num])"`

**Stage 4.5 - E2E Tests (if UI changed):** User flow tests
→ Skip if no UI change → Commit: `git commit -m "test(e2e): [desc] (#[num])"`

**Stage 4.6 - Verify:** Run lint, unit tests, E2E tests
→ Wait for "proceed"

## Step 5: Create PR
`gh pr create --title "[description]" --body "Fixes #[issue-number]"`

## Step 6: Tech Debt Check
Ask: "Were any shortcuts taken?"
→ If yes, add to `docs/planning/TECH-DEBT.md`

## Step 7: Update Status
Move issue to "Recently Completed" in STATUS.md

## Step 8: Suggest Next Issue
Run `gh issue list --state open --limit 5`

Present:
✅ ISSUE #[N] COMPLETE
PR created: #[pr-number]

📋 NEXT ISSUES:
1. #[X] - [Title] (recommended)
2. #[Y] - [Title]

Ready to start #[X]? Say "next" or specify issue number.

If "next" → Run `/fix-issue [number]` automatically
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
4. Read `docs/planning/INFRASTRUCTURE.md` - note any 🔴 items
5. Update STATUS.md: "Phase: Sprint Planning"

## Sprint Process

**Step 0 - Check Infrastructure**
If INFRASTRUCTURE.md has any 🔴 services, create infrastructure issue first:

```
Title: [Infra]: Provision infrastructure prerequisites

## Required Services
- [ ] [Service 1] - [Purpose]
- [ ] [Service 2] - [Purpose]

## Steps
Run `/infra` for guided setup.

## Acceptance Criteria
- [ ] All services in INFRASTRUCTURE.md marked 🟢
- [ ] All env vars added to .env.local
```

Labels: `infrastructure`, `blocker`

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
- Dependencies: [Blocking issues, including infra if created]
```

**Step 4 - Update Roadmap**
Add issue numbers to roadmap.md tasks.

**Step 5 - Update Status**
STATUS.md:
- Phase: Build
- List created issues
- Next: /infra (if infra needed) or /fix-issue [first issue]

**Step 6 - Summary**
If infrastructure needed:
```
⚠️ INFRASTRUCTURE REQUIRED FIRST

#1: [Infra]: Provision infrastructure ← Run /infra

Then:
#2: [Task] (depends on #1)
#3: [Task] (depends on #1)
```

If no infrastructure:
```
Created [X] issues for Milestone 1:
- #12: [Task]
- #13: [Task]

Start with: /fix-issue 12
```
```

---

## .claude/commands/milestone.md

```markdown
---
description: Start the next milestone after completing one
---

# Role: Sprint Planner

Use when you've completed a milestone and are ready to start the next.

## Step 1: Verify Completion
```bash
gh issue list --milestone "[Current Milestone]" --state open
```

If open issues remain, ask: "Complete these first, or move to next milestone?"

## Step 2: Close Milestone
```bash
gh api repos/{owner}/{repo}/milestones/{number} -X PATCH -f state="closed"
```

## Step 3: Identify Next Milestone
From roadmap.md, find next milestone and show:
```
MILESTONE TRANSITION
====================
✅ Completed: Milestone [N] - [Name]
⏭️ Next: Milestone [N+1] - [Name]
   Goal: [Goal from roadmap]
```

## Step 4: Create Issues (if needed)
If issues don't exist for next milestone:
"Create issues for Milestone [N+1]?" → Run /sprint process

## Step 5: Update Status
- Mark previous milestone complete in STATUS.md and roadmap.md
- Set current milestone to new one
- Next: "Next: Run `/fix-issue [#]`"

## Step 6: Summary
```
🎉 MILESTONE [N] COMPLETE!

🚀 STARTING MILESTONE [N+1]: [Name]

Issues ready:
1. #[A] - [Title] (start here)
2. #[B] - [Title]

Next: Run `/fix-issue [A]`
```

## Subcommands
- `/milestone status` — Check progress only
- `/milestone [N]` — Start specific milestone
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

Run: /fix-issue [first-feature-issue]
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

## .claude/commands/backlog.md

```markdown
---
description: View features ready to build vs. needing definition
---

# Role: Backlog Manager

Show what's ready to build and what needs more definition.

## Step 1: Gather Sources
Read:
1. `docs/planning/prd.md` — Feature definitions
2. `docs/planning/roadmap.md` — Milestone groupings
3. `docs/planning/INFRASTRUCTURE.md` — Check for blockers
4. GitHub issues: `gh issue list --state open --limit 50`

## Step 2: Analyze Feature Readiness

**✅ Ready to Build** (all true):
- Clear description
- Acceptance criteria defined
- GitHub issue created
- Dependencies identified
- No blocking infrastructure

**⚠️ Needs Definition** (any true):
- Vague description
- No acceptance criteria
- Missing GitHub issue
- Unknown dependencies

## Step 3: Present Backlog

```
📋 BACKLOG OVERVIEW

✅ READY TO BUILD (X features)
Milestone 1:
├── #12: Create user table schema
│   └── Acceptance: [3 criteria] ✓
├── #13: Build user API  
│   └── Depends on: #12

🟢 Recommended next: #12

⚠️ NEEDS DEFINITION (Y features)
├── F5: "Admin dashboard"
│   └── ❌ Missing: acceptance criteria
│   └── 💡 Action: Define scope, create issue
```

## Subcommands
- `/backlog ready` — Only ready items
- `/backlog undefined` — Only items needing definition
- `/backlog [milestone]` — Filter by milestone
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
3. Run /backlog to see what's ready vs. needs definition

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
Sprint (/sprint): [✅/❌ needs GitHub MCP]
Build (/fix-issue, /build): [✅/⚠️]
Quality (/pre-release): [✅/⚠️ needs test/lint]
```

## Step 5: Next Steps

List missing items in priority order with exact commands to fix.
```
