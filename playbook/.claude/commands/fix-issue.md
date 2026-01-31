---
description: Implement a GitHub issue with staged builds
---

# Role: Engineer

This is the **primary build command** when following the playbook workflow.

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work to this issue
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists (for product context)
4. Read `docs/planning/architecture.md` if it exists (for technical structure)
5. Read `docs/planning/roadmap.md` if it exists (to understand priority and dependencies)
6. Read `docs/planning/INFRASTRUCTURE.md` if it exists - check for 🔴 items

## Step 0: Validate Prerequisites

**Check 1 - Issue Number:**
If `$ARGUMENTS` is empty or not provided:
```
No issue number specified.

Open issues:
[Run: gh issue list --state open --limit 10]

Which issue would you like to work on? Enter the number.
```
→ Wait for issue number before proceeding.

**Check 2 - Infrastructure:**
If `docs/planning/INFRASTRUCTURE.md` exists and has any 🔴 items:
```
⚠️ INFRASTRUCTURE NOT READY
============================

The following services are not provisioned:
- [List 🔴 items]

These may be required for this issue. Options:
1. Run `/infra` to provision now
2. Continue anyway (may encounter errors)
3. Cancel

What would you like to do?
```
→ If user says "continue anyway", proceed with warning noted.

**Check 3 - GitHub CLI:**
Test that GitHub is accessible:
```bash
gh auth status
```
If not authenticated:
```
GitHub CLI not authenticated. Run one of:
- `gh auth login` (to authenticate)
- `/setup` (to check all prerequisites)
```
→ Stop until resolved.

## Step 1: Read the Issue
```bash
gh issue view $ARGUMENTS
```

Update `docs/planning/STATUS.md`:
- Active Work: "Implementing #[number]: [title]"
- Phase: Build

## Step 2: Plan (Use Plan Mode)
- Summarize what the issue is asking for
- Cross-reference with PRD and architecture
- Identify which files will need changes
- List all assumptions
- Propose implementation approach

→ Wait for "proceed"

## Step 3: Create Branch
```bash
git checkout -b feat/[issue-number]-[short-description]
```

## Step 4: Staged Build

Execute in stages. STOP after each stage and wait for "proceed."

**Stage 4.1 - Data:**
Show proposed schema/database changes. Explain why.
→ Wait for "proceed"
→ Commit: `git commit -m "feat(data): [description] (#[issue-number])"`

**Stage 4.2 - Logic:**
Show the core function or API route. Explain the logic.
→ Wait for "proceed"
→ Commit: `git commit -m "feat(logic): [description] (#[issue-number])"`

**Stage 4.3 - UI:**
Implement interface following DESIGN SYSTEM rules in CLAUDE.md.
Verify design compliance before showing.
→ Wait for "proceed"
→ Commit: `git commit -m "feat(ui): [description] (#[issue-number])"`

**Stage 4.4 - Unit/Integration Tests:**
Write tests that verify expected behavior of functions and APIs.
→ Wait for "proceed"
→ Commit: `git commit -m "test(unit): [description] (#[issue-number])"`

**Stage 4.5 - E2E Tests (if UI changed):**
If Stage 4.3 was executed, write or update E2E tests for affected user flows.
Use Playwright, Cypress, or Puppeteer based on project setup.
→ If no UI change, state "Skipping E2E - no UI changes" and proceed
→ Wait for "proceed"
→ Commit: `git commit -m "test(e2e): [description] (#[issue-number])"`

**Stage 4.6 - Verify:**
Run lint, unit tests, and E2E tests. Report results.
```bash
npm run lint
npm run test
npm run test:e2e  # if exists
```
→ Wait for "proceed" to continue

## Step 5: Create PR
```bash
gh pr create --title "[description]" --body "Fixes #[issue-number]

## Changes
- [Summary of changes]

## Testing
- [How to test]
"
```

> **Note:** PR created but not merged. PRs are merged during `/deploy` when the milestone is ready for production.

## Step 6: Tech Debt Check
Ask: "Were any shortcuts or workarounds taken?"
→ If yes, add entry to `docs/planning/TECH-DEBT.md`

## Step 7: Update Status
Update `docs/planning/STATUS.md`:
- Move issue to "Recently Completed"
- Update roadmap progress

## Step 8: Check Milestone & Suggest Next Issue

**First, check if milestone is complete:**
```bash
# Get current issue's milestone
gh issue view [just-completed-issue] --json milestone

# Check remaining issues in that milestone
gh issue list --milestone "[Milestone Name]" --state open
```

**If milestone is complete (no open issues remaining):**
```
✅ ISSUE #[N] COMPLETE
======================
PR created: #[pr-number]

🎉 MILESTONE [X] COMPLETE!
==========================
All issues in Milestone [X] are now closed.

Next: Run `/pre-release` → `/deploy` → `/milestone`
```
→ Stop here. Don't suggest issues from other milestones.

**If milestone has more issues:**
```bash
gh issue list --state open --limit 5
```

Present:
```
✅ ISSUE #[N] COMPLETE
======================
PR created: #[pr-number]

Milestone [X] progress: [Y]/[Z] issues done

📋 NEXT ISSUES (by priority):
1. #[X] - [Title] (recommended next)
2. #[Y] - [Title]
3. #[Z] - [Title]

Ready to start #[X]? Say "next" or specify an issue number.
```

If I say "next" or a number:
→ Run `/fix-issue [number]` automatically

---

## When to Skip Stages

Not every issue needs all stages:
- **Bug fix (backend)**: May skip Data, UI, and E2E stages
- **Bug fix (frontend)**: May skip Data and Logic stages
- **UI-only change**: May skip Data and Logic stages (E2E required)
- **Schema migration**: May skip UI and E2E stages
- **API-only change**: May skip UI and E2E stages

**E2E Rule:** If Stage 4.3 (UI) was executed, Stage 4.5 (E2E) is required.

State which stages apply before starting, and get approval.

## Related Commands

- `/sprint` — Create GitHub issues from roadmap
- `/milestone` — Transition to next milestone when all issues are done
- `/deploy` — Merge PRs and deploy milestone to production
- `/build` — Ad-hoc builds (when no issue exists)
- `/design-check` — Verify UI after implementation

## Rollback

If something goes wrong at any stage:
```bash
git log --oneline
git reset --hard <commit-hash>
```
