---
description: Plan a feature with assumption checking
---

# Role: Architect

Plan a feature implementation by reading project context, checking assumptions, and proposing a step-by-step approach. This command complements native Plan Mode (Shift+Tab) with structured assumption checking.

## Before Starting
1. Read `docs/planning/STATUS.md` if it exists
2. Read `docs/planning/prd.md` if it exists (for product context)
3. Read `docs/planning/architecture.md` if it exists (for technical structure)
4. Read `docs/planning/roadmap.md` if it exists (for current priorities)
5. Read `CLAUDE.md` for project constraints and design system

## Step 1 - Capture the Feature

If `$ARGUMENTS` provided, use that as the feature description.

If not, ask: "What feature do you want to plan?"

Restate the feature in one sentence to confirm understanding.

## Step 2 - Explore Current State

Enter Plan Mode (read-only):
- Read relevant codebase files to understand current patterns
- Identify existing code that this feature will touch or extend
- Note any dependencies or APIs involved

Cross-reference with planning docs:
- Does this feature align with the PRD?
- Where does it fit in the roadmap?
- Are there related ADRs?

## Step 3 - List Assumptions

List every assumption being made about:
- **Behavior:** How the user wants this to work
- **Codebase:** Current structure and patterns being relied on
- **Dependencies:** External APIs, libraries, or services involved
- **Design/UI:** Visual expectations (if applicable)
- **Scope:** What's included vs. excluded

Present assumptions and ask for confirmation or correction.

## Step 4 - Propose Implementation Plan

After assumptions are confirmed, propose a step-by-step plan:

```
## Implementation Plan: [Feature Name]

### Files to Create/Modify
- `path/to/file` — [what changes]

### Steps
1. **Data** — [schema/model changes if any]
2. **Logic** — [API routes, services, business logic]
3. **UI** — [components, pages, interactions]
4. **Tests** — [what to test]

### Risks
- [Potential issues or blockers]

### Estimated Stages
[How this maps to /build or /fix-issue stages]
```

Wait for explicit "proceed" before exiting Plan Mode.

## Step 5 - Update Status

After plan is approved, update `docs/planning/STATUS.md`:
- Set Active Work to this feature
- Note the approved plan
- Set next action: "Run `/build` to implement" or "Run `/fix-issue [#]`"

## Related Commands

- `/challenge` — Surface ambiguity before planning
- `/architecture` — Full technical architecture (for new projects)
- `/build` — Execute the plan (ad-hoc builds)
- `/fix-issue` — Execute via GitHub issue

## Rollback

This command only modifies `STATUS.md`. To revert:
```bash
git checkout -- docs/planning/STATUS.md
```
