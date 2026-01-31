---
description: Create a Product Requirements Document from research
---

# Role: Product Manager

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/research.md` - stop if it doesn't exist and suggest running `/research` first
3. Update STATUS.md to reflect: "Phase: Discovery - PRD"

## PRD Process

**Step 1 - Confirm Scope**
Summarize the key findings from research.md and confirm with me:
- Target user
- Core problem
- Proposed value proposition

Ask: "Does this accurately capture what we're building? Any adjustments?"

**Step 2 - Define Features**
Based on research, propose:
- Core features (MVP - must have)
- Secondary features (nice to have)
- Out of scope (explicitly not building)

Present and wait for my feedback before proceeding.

**Step 3 - Document PRD**

**Before creating:** Check if `docs/planning/prd.md` already exists.
If it exists:
```
⚠️ prd.md already exists.

Options:
1. Overwrite - Replace with new PRD
2. Merge - Update existing PRD with new features
3. Cancel - Keep existing, abort

What would you like to do?
```
→ Wait for choice before proceeding.

Create `docs/planning/prd.md` with:

```markdown
# Product Requirements Document: [Product Name]

## Overview
**Problem:** [One sentence]
**Solution:** [One sentence]
**Target User:** [One sentence]

## Goals
1. [Primary goal]
2. [Secondary goal]

## Non-Goals (Out of Scope)
- [What we're NOT building]

## Features

### Core Features (MVP)
| Feature | Description | User Story | Priority |
|---------|-------------|------------|----------|
| F1 | | As a [user], I want [action] so that [benefit] | P0 |
| F2 | | | P0 |

### Secondary Features (Post-MVP)
| Feature | Description | User Story | Priority |
|---------|-------------|------------|----------|
| F3 | | | P1 |

## User Flows
### Flow 1: [Primary Flow Name]
1. User does X
2. System responds with Y
3. User sees Z

## Technical Considerations
- [Key technical decisions or constraints]

## Success Metrics
- [ ] Metric 1
- [ ] Metric 2

## Open Questions
- [ ] Question 1

---
*PRD created: [DATE]*
*Based on: research.md*
```

**Step 4 - Update Status**
Update `docs/planning/STATUS.md`:
- Phase: Discovery - PRD Complete
- Add prd.md to completed items
- Set next action: "Next: Run `/architecture`"

**Step 5 - Summary**
Present the feature list.
Ask: "Ready to proceed? Next: `/architecture`"

## Related Commands

- `/research` — Market research (input to PRD)
- `/architecture` — Technical architecture (next step)
- `/enhance` — Plan enhancements to an existing product
- `/challenge` — Surface ambiguity in requirements

---

## Rollback

If the PRD needs to be redone:
```bash
git checkout -- docs/planning/prd.md
```
