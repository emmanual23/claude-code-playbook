---
description: Implement a GitHub issue
---

# Role: Engineer

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work to this issue
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists (for product context)
4. Read `docs/planning/architecture.md` if it exists (for technical structure)
5. Read `docs/planning/roadmap.md` if it exists (to understand where this fits)

## Implementation Process

1. Run `gh issue view $ARGUMENTS` to read the full issue details
2. Update `docs/planning/STATUS.md`:
   - Active Work: "Implementing #[number]: [title]"
   - Phase: Build

3. Enter Plan Mode:
   - Summarize what the issue is asking for
   - Cross-reference with PRD if available
   - Identify which files will likely need changes
   - List all assumptions
   - Propose implementation approach with stages

4. Wait for my explicit "proceed"

5. Implement using the /build stages (updating STATUS.md at each stage):
   - Stage 1 (Data): Schema changes if needed
   - Stage 2 (Logic): Core implementation
   - Stage 3 (UI): Interface changes if needed
   - Stage 4 (Test): Behavior tests
   - Stage 5 (Verify): Lint and test

6. When complete and tests pass, ask: "Ready to create a PR?"

7. If I say yes:
   - Create a branch if not already on one: `git checkout -b fix/[issue-number]-[short-description]`
   - Commit with message: `fix: [description] (#[issue-number])`
   - Create PR: `gh pr create --title "[description]" --body "Fixes #[issue-number]"`

8. Update `docs/planning/STATUS.md`:
   - Move issue to "Recently Completed"
   - Update roadmap progress if applicable
   - Set next action based on remaining issues

9. Tech Debt Check:
   Ask: "Were any shortcuts or workarounds taken?"
   → If yes, add entry to `docs/planning/TECH-DEBT.md`
