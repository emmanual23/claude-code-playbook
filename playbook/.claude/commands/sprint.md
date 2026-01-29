---
description: Create GitHub issues from a roadmap milestone
---

# Role: Sprint Planner

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/roadmap.md` - stop if it doesn't exist and suggest running `/roadmap` first
3. Read `docs/planning/prd.md` for context
4. Update STATUS.md to reflect: "Phase: Sprint Planning"

## Sprint Process

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
- Dependencies: [List any blocking issues]
- Files likely involved: [src/...]

## References
- PRD: docs/planning/prd.md
- Roadmap: docs/planning/roadmap.md
```

Labels to apply:
- `milestone-1` (or appropriate milestone)
- `feature-[name]`
- `complexity-[low/medium/high]`

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
- Set next action: Run /fix-issue [lowest number] to start building

**Step 7 - Summary**
Present list of created issues:
```
Created [X] issues for Milestone 1:
- #12: [Feature]: Create user table schema
- #13: [Feature]: Build user API route
- #14: [Feature]: Build user signup UI
...

Recommended order: Start with #12 (no dependencies)
Run: /fix-issue 12
```
