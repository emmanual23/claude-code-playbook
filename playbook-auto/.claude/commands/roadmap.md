---
description: Create a product roadmap from PRD
---

# Role: Product Strategist

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest `/prd` first
3. Read `docs/planning/architecture.md` - stop if missing, suggest `/architecture` first
4. Update STATUS.md: "Phase: Discovery - Roadmap"

## Roadmap Process

**Step 1 - Review Features**
List all features from the PRD and their priorities.
Confirm with me: "Are these priorities still correct?"

**Step 2 - Define Milestones**
Propose 2-4 milestones that make logical groupings:
- Milestone 1: Core functionality (MVP)
- Milestone 2: Enhanced experience
- Milestone 3: Growth features
- etc.

Each milestone should be:
- Independently shippable (delivers user value)
- Logically sequenced (dependencies respected)
- Reasonably scoped (not too big)

Present and wait for my feedback.

**Step 3 - Break Down into Tasks**
For each feature, identify implementable tasks:
- Data/schema changes
- API/backend work
- UI components
- Integration points

**Step 4 - Document Roadmap**

**Before creating:** Check if `docs/planning/roadmap.md` already exists.
If it exists:
```
⚠️ roadmap.md already exists.

Options:
1. Overwrite - Replace with new roadmap
2. Merge - Add new milestones to existing
3. Cancel - Keep existing, abort

What would you like to do?
```
→ Wait for choice before proceeding.

Create `docs/planning/roadmap.md` with:

```markdown
# Product Roadmap: [Product Name]

## Overview
**Total Milestones:** [X]
**MVP Target:** Milestone 1

---

## Milestone 1: [Name] (MVP)
**Goal:** [What user can do after this milestone]
**Status:** Not Started

### Features Included
- [ ] F1: [Feature name]
- [ ] F2: [Feature name]

### Implementation Tasks

#### F1: [Feature Name]
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Create [X] table schema | Data | Low | None |
| Build [X] API route | Backend | Medium | Schema |
| Build [X] UI component | Frontend | Medium | API |
| Write tests for [X] | Test | Low | All above |

#### F2: [Feature Name]
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|

---

## Milestone 2: [Name]
**Goal:** [What user can do after this milestone]
**Status:** Not Started
**Depends on:** Milestone 1

### Features Included
- [ ] F3: [Feature name]

### Implementation Tasks
[Same structure as above]

---

## Milestone 3: [Name] (Future)
[Same structure]

---

## Dependencies Map
```
M1:F1 → M1:F2 → M2:F3
```

---
*Roadmap created: [DATE]*
*Based on: prd.md, architecture.md*
```

**Step 5 - Update Status**
Update `docs/planning/STATUS.md`:
- Phase: Discovery - Roadmap Complete
- Add roadmap.md to completed items
- Next: "Next: Run `/autopilot`"

**Step 6 - Summary**
Present milestone overview.
Ask: "Ready to proceed? Next: `/autopilot` to start the autonomous build"

---

## Rollback

If the roadmap needs to be redone:
```bash
git checkout -- docs/planning/roadmap.md
```

---

## Related Commands

- `/autopilot` — Start the autonomous build from this roadmap

