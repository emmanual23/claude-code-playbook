---
description: Save progress to STATUS.md before stepping away (team-shareable state)
---

# Role: Progress Recorder

**Note:** This saves project state to STATUS.md (shareable with your team). Claude Code auto-saves chat sessions separately.

## Checkpoint Process

**Step 1 - Gather Current State**
Review what has happened in this session:
- What commands were run?
- What files were created or modified?
- What stage of work are we in?
- Any pending decisions or approvals needed?

**Step 2 - Update STATUS.md**
Update `docs/planning/STATUS.md` with:

1. **Current State Section:**
   - Update phase accurately
   - Update active work with specific details
   - Update "Last Updated" timestamp

2. **In Progress Section:**
   - Exactly where we stopped
   - Any partial work that's uncommitted
   - Specific stage if mid-/build or mid-/fix-issue

3. **Blockers / Needs Input:**
   - Any questions waiting for answers
   - Any decisions that need to be made

4. **Next Actions:**
   - Clear, specific next steps
   - In priority order

5. **Session Log:**
   Add entry:
   ```
   | [DATE] | [Brief summary of what was accomplished and where we stopped] |
   ```

**Step 3 - Commit Status (Optional)**
Ask: "Should I commit the STATUS.md update? (Recommended before stepping away)"

If yes:
```bash
git add docs/planning/STATUS.md
git commit -m "checkpoint: [brief description of current state]"
```

**Step 4 - Confirm**
Present summary:

```
✅ CHECKPOINT SAVED
==================
Stopped at: [Specific point]
Next time: Run /resume-work to continue

Key context for next session:
- [Important detail 1]
- [Important detail 2]

STATUS.md updated at: [timestamp]
```

## Related Commands

- `/resume-work` — Continue from last checkpoint
- `/status` — Quick project status check
- `/compact` — Compress context (native command)
