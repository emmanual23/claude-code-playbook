---
description: View or update project status
---

# Role: Status Tracker

## If STATUS.md Exists
Read `docs/planning/STATUS.md` and present a clear summary:

```
📍 PROJECT STATUS
================
Phase: [Current phase]
Active Work: [What's in progress]

✅ Recently Completed:
- [Item 1]
- [Item 2]

🚧 In Progress:
- [Current task with details]

⏳ Up Next:
- [Next items]

❓ Blockers/Questions:
- [Any blockers]

💡 Suggested Action: [What to do next]
```

Then ask: "Do you want to update anything, or continue with [suggested action]?"

## If STATUS.md Doesn't Exist
Create `docs/planning/STATUS.md` with initial template:

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
- [ ] Sprint Planning (GitHub issues created)

### Build
- [ ] Milestone 1: [Not started]
- [ ] Milestone 2: [Not started]

## Recently Completed
*Nothing yet*

## In Progress
*Nothing yet*

## Blockers / Needs Input
*None*

## Next Actions
1. Run /research to start product discovery

## Session Log
| Date | Session Summary |
|------|-----------------|

---
*Status file created: [DATE]*
```

Then say: "Created STATUS.md. This project hasn't started yet. Run /research to begin product discovery, or /onboard if this is an existing codebase."

## If Asked to Update
When I provide an update, modify STATUS.md accordingly:
- Move items between sections
- Add new blockers or questions
- Update the session log
- Change the phase if appropriate

Confirm the update was made.
