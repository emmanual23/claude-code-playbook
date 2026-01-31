---
description: Start the next milestone after completing one
---

# Role: Sprint Planner

Use this command when you've completed a milestone and are ready to start the next one.

## Before Starting
1. Read `docs/planning/STATUS.md` - verify current milestone is complete
2. Read `docs/planning/roadmap.md` - identify next milestone
3. Verify all issues from current milestone are closed

## Step 1: Check Deployment Status

Before transitioning milestones, check if the current milestone has been deployed:

If `docs/planning/STATUS.md` does NOT show a deployment record for the current milestone:
```
⚠️ MILESTONE NOT DEPLOYED
===========================

Milestone [N] issues are complete, but it hasn't been deployed yet.

Recommended sequence: `/pre-release` → `/deploy` → `/milestone`

1. Run `/pre-release` now
2. Skip deployment and transition anyway
3. Cancel
```
→ Wait for user choice. If they choose option 2, proceed with a note in STATUS.md.

## Step 2: Verify Completion

Check current milestone status:
```bash
gh issue list --milestone "[Current Milestone Name]" --state open
```

If open issues remain:
```
⚠️ MILESTONE NOT COMPLETE
=========================

Open issues remaining:
- #[X]: [Title]
- #[Y]: [Title]

Complete these issues first, or move them to next milestone?
1. Show me the next issue to work on
2. Move remaining to next milestone
3. Cancel
```

## Step 3: Close Milestone (if all issues done)

```bash
gh api repos/{owner}/{repo}/milestones/{milestone_number} -X PATCH -f state="closed"
```

## Step 4: Identify Next Milestone

From roadmap.md, find the next milestone:

```
MILESTONE TRANSITION
====================

✅ Completed: Milestone [N] - [Name]
   Issues: [X] closed

⏭️ Next: Milestone [N+1] - [Name]
   Goal: [Goal from roadmap]
   Features: [List from roadmap]
```

## Step 5: Create Issues for Next Milestone

If GitHub issues don't exist for next milestone, offer to create them:

"Would you like me to create GitHub issues for Milestone [N+1]?"

→ If yes, run the `/sprint Milestone [N+1]` process

→ If issues already exist:
```bash
gh issue list --milestone "[Next Milestone Name]" --state open
```

## Step 6: Update Status

Update `docs/planning/STATUS.md`:
- Mark previous milestone complete with date
- Set current milestone to the new one
- List new milestone's issues
- Next: "Next: Run `/fix-issue [#]`"

Update `docs/planning/roadmap.md`:
- Previous milestone status: ✅ Complete
- Current milestone status: 🔄 In Progress

## Step 7: Summary

```
✅ MILESTONE [N] COMPLETE
=========================

Completed: [Date]
Issues closed: [X]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 STARTING MILESTONE [N+1]: [Name]
===================================

Goal: [Goal]

Issues ready:
1. #[A] - [Title] (start here)
2. #[B] - [Title]
3. #[C] - [Title]
...

Next: Run `/fix-issue [A]`
```

## Alternative Usage

**Check milestone status only:**
```
/milestone status
```
→ Shows current milestone progress without transitioning

**Start specific milestone:**
```
/milestone 2
```
→ Transition directly to Milestone 2

## Related Commands

- `/deploy` — Deploy the milestone before transitioning
- `/sprint` — Create GitHub issues for the next milestone
- `/fix-issue` — Implement issues in the new milestone
- `/status` — View current project state
- `/backlog` — See what's ready to build vs. needs definition
