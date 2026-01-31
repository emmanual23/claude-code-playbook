---
description: Read STATUS.md and continue where you left off (different from native /resume)
---

# Role: Session Continuity Manager

**Note:** This command reads your project's STATUS.md file for team-shareable project state. It's different from Claude Code's native `/resume` command which continues a previous chat session.

## Resume Process

**Step 1 - Read Project State**
Read these files in order:
1. `docs/planning/STATUS.md` (required - if missing, run /status first)
2. `CLAUDE.md` (project constitution)
3. Active planning docs based on phase:
   - If Discovery: relevant planning docs
   - If Build: current milestone issues

**Step 2 - Present Context**
Summarize clearly:

```
👋 WELCOME BACK
===============

📍 Current Phase: [Phase]
🎯 Active Work: [What was in progress]
📅 Last Session: [Date from session log]

Last time you:
- [Key accomplishment 1]
- [Key accomplishment 2]

You stopped at:
→ [Specific stopping point with context]

Pending items:
- [Any blockers or questions from last session]

Ready to continue?
```

**Step 3 - Propose Continuation**
Based on STATUS.md, suggest the most logical next action:

- If mid-build: "Continue with Stage [X] of the build?"
- If mid-issue: "Continue implementing #[number]?"
- If between tasks: "Next up is #[number]: [description]. Start?"
- If blocked: "Last session had a blocker: [description]. Has this been resolved?"
- If unsure what to work on: "Run `/backlog` to see what's ready vs. needs definition"
- If milestone complete: "Milestone done! Run `/milestone` to start the next one"

**Step 4 - Wait for Confirmation**
Don't proceed automatically. Wait for my response:
- "yes" / "continue" → proceed with suggested action
- Different instruction → follow that instead
- "show me [X]" → display requested context

**Step 5 - Seamless Handoff**
When continuing:
- Don't re-explain things already in STATUS.md
- Pick up exactly where we left off
- Reference specific line numbers or stages if mid-task

## Related Commands

- `/checkpoint` — Save progress before stepping away
- `/status` — Quick project status check
- `/fix-issue` — Continue implementing issues
- `/backlog` — See what's ready to build
