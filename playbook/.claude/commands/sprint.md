---
description: Create GitHub issues from a roadmap milestone
---

# Role: Sprint Planner

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/roadmap.md` - stop if it doesn't exist and suggest running `/roadmap` first
3. Read `docs/planning/prd.md` for context
4. Read `docs/planning/INFRASTRUCTURE.md` - note any 🔴 items
5. Update STATUS.md to reflect: "Phase: Sprint Planning"

**Prerequisite Check - GitHub CLI:**
```bash
gh auth status
```
If not authenticated:
```
⚠️ GitHub CLI not authenticated.

This command creates GitHub issues and requires authentication.

To fix:
  gh auth login

Or run /setup to check all prerequisites.
```
→ Stop until resolved.

## Sprint Process

**Step 0 - Check Infrastructure Prerequisites**

Read `docs/planning/INFRASTRUCTURE.md`. If any services have status 🔴:

1. Create Issue #0: "Provision infrastructure prerequisites"

```markdown
Title: [Infra]: Provision infrastructure prerequisites

## Context
Before building features, external services must be provisioned.
See: docs/planning/INFRASTRUCTURE.md

## Required Services
[List each 🔴 service from INFRASTRUCTURE.md]

- [ ] [Service 1] - [Purpose]
- [ ] [Service 2] - [Purpose]
...

## Environment Variables Needed
[List from INFRASTRUCTURE.md]

- [ ] [VAR_NAME] - [Service]
...

## Steps
Run `/infra` for guided setup of each service.

## Acceptance Criteria
- [ ] All services in INFRASTRUCTURE.md marked 🟢
- [ ] All required env vars added to .env.local
- [ ] Can connect to all services locally
- [ ] Migrations/schema applied (if applicable)

## Notes
This issue blocks all feature development.
```

Labels: `infrastructure`, `blocker`, `milestone-1`

2. Note this issue number for dependency linking

**Step 1 - Select Milestone**
If no milestone specified in $ARGUMENTS, ask:
"Which milestone do you want to create issues for?"

List available milestones from roadmap.md with their status.

**Step 2 - Review Tasks**
For the selected milestone, list all implementation tasks.
Confirm: "I'll create [X] GitHub issues for these tasks. Proceed?"

**Step 3 - Create Issues**
For each feature's tasks, create a GitHub issue using `gh issue create`:

Issue format:
```
Title: [Feature]: [Task description]

## Context
[Reference to PRD and roadmap]
Part of: Milestone [X] - [Name]
Feature: [Feature name from roadmap]

## Description
[Clear description of what needs to be done]

## Acceptance Criteria
- [ ] [Specific, verifiable criterion]
- [ ] [Specific, verifiable criterion]
- [ ] Tests pass

## Technical Notes
- Complexity: [Low/Medium/High]
- Dependencies: [List any blocking issues, including infra issue if created]
- Files likely involved: [src/...]

## References
- PRD: docs/planning/prd.md
- Roadmap: docs/planning/roadmap.md
```

Labels to apply:
- `milestone-1` (or appropriate milestone)
- `feature-[name]`
- `complexity-[low/medium/high]`

**If infrastructure issue was created in Step 0:**
Add to each feature issue's Technical Notes:
```
- Dependencies: #[infra-issue-number] (infrastructure must be provisioned first)
```

**Step 4 - Create Milestone in GitHub (if not exists)**
```bash
gh api repos/{owner}/{repo}/milestones -f title="Milestone 1: [Name]" -f description="[Goal from roadmap]"
```

Assign issues to the milestone.

**Step 5 - Update Roadmap**
Update `docs/planning/roadmap.md`:
- Add issue numbers next to each task
- Update milestone status to "In Progress" or "Ready"

**Step 6 - Update Status**
Update `docs/planning/STATUS.md`:
- Phase: Build
- Current milestone: [Name]
- List created issues with numbers
- Next: "Next: Run `/infra`" (if infra needed) or "Next: Run `/fix-issue [#]`"

**Step 7 - Summary**
Present list of created issues:

**If infrastructure issue was created:**
```
⚠️ INFRASTRUCTURE REQUIRED FIRST
================================

#[N]: [Infra]: Provision infrastructure prerequisites ← START HERE
      Run: /infra

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Created [X] feature issues for Milestone 1:
- #[N+1]: [Feature]: Create user table schema (depends on #[N])
- #[N+2]: [Feature]: Build user API route (depends on #[N])
- #[N+3]: [Feature]: Build user signup UI (depends on #[N])
...

After infrastructure is provisioned:
Run: /fix-issue [N+1]
```

**If no infrastructure needed:**
```
Created [X] issues for Milestone 1:
- #12: [Feature]: Create user table schema
- #13: [Feature]: Build user API route
- #14: [Feature]: Build user signup UI
...

Recommended order: Start with #12 (no dependencies)
Run: /fix-issue 12
```

---

## Related Commands

- `/backlog` — See all features: what's ready vs. needs more definition
- `/milestone` — Use after completing all issues in a milestone
