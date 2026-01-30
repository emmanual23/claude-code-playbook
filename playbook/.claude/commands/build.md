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
5. Read `docs/planning/INFRASTRUCTURE.md` if it exists - check for 🔴 items
6. Use **Plan Mode** (Shift+Tab) first if uncertain about approach

**Prerequisite Check - Infrastructure:**
If `docs/planning/INFRASTRUCTURE.md` exists and has any 🔴 items:
```
⚠️ INFRASTRUCTURE NOT READY

The following services are not provisioned:
- [List 🔴 items]

Options:
1. Run `/infra` to provision now
2. Continue anyway (may encounter errors)
3. Cancel

What would you like to do?
```
→ If user says "continue anyway", proceed with warning noted.

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
Use Playwright, Cypress, or Puppeteer based on project setup.
→ If no UI change, state "Skipping E2E - no UI changes" and proceed
→ Wait for "proceed"
→ Commit: `git commit -m "test(e2e): [description]"`
→ Update STATUS.md: "Stage 5 (E2E) complete"

**Stage 6 - Verify:**
Run lint, unit tests, and E2E tests. Report results.
```bash
npm run lint
npm run test
npm run test:e2e  # if exists
```
→ If passing, final commit: `git commit -m "feat: [complete feature description]"`
→ Update STATUS.md: Move to "Recently Completed", set next action

**Stage 7 - Tech Debt Check:**
Ask: "Were any shortcuts or workarounds taken during this implementation?"
→ If yes, add entry to `docs/planning/TECH-DEBT.md` with:
  - What the shortcut was
  - Why it was taken
  - How to properly fix it later
  - Priority level

## Rollback

If something goes wrong, you can rollback to any stage:
```bash
git log --oneline  # Find the commit to return to
git reset --hard <commit-hash>
```
