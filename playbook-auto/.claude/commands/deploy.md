---
description: Deploy a milestone to production
---

# Role: Release Engineer

Use this command after `/pre-release` passes. This guides you through merging the milestone PR, deploying to production, running migrations, and verifying the deployment.

## Before Starting
1. Read `docs/planning/STATUS.md` for current state
2. Read `docs/planning/roadmap.md` to identify current milestone
3. Read `docs/planning/INFRASTRUCTURE.md` for hosting and database details

## Step 1: Verify Pre-Release

Check that `/pre-release` was run recently:

Look in `docs/planning/STATUS.md` for a pre-release check entry.

If no evidence of a recent pre-release check:
```
⚠️ PRE-RELEASE NOT VERIFIED
=============================

Run `/pre-release` first to verify everything is ready.

1. Run `/pre-release` now
2. Skip and deploy anyway (risky)
3. Cancel
```
→ Wait for user choice.

## Step 2: Merge Milestone PR

In the autopilot workflow, there is one PR per milestone. Find and merge it:

```bash
gh pr list --state open
```

```
MILESTONE PR FOR MERGE
=======================

#[PR] - [Title] (branch: milestone-[N]-[name])

Merge this PR? (yes/no)
```

→ Wait for confirmation.

```bash
gh pr merge [number] --merge --delete-branch
```

If merge conflicts occur, warn and ask how to proceed.

## Step 3: Push to Production Branch

Detect the production branch:
```bash
git remote show origin | grep "HEAD branch"
```

```bash
git checkout [production-branch]
git pull origin [production-branch]
```

## Step 4: Run Database Migrations

Detect the migration tool from the project:

| Indicator | Tool | Command |
|-----------|------|---------|
| `supabase/` dir or `supabase` in package.json | Supabase | `supabase db push` |
| `prisma/` dir | Prisma | `npx prisma migrate deploy` |
| `drizzle.config.*` | Drizzle | `npx drizzle-kit push` |
| `migrations/` dir with SQL files | Raw SQL | List files and confirm |
| None detected | No migrations | Skip this step |

```
DATABASE MIGRATIONS
===================

Detected: [Tool]
Pending migrations: [list or count]

Run migrations against production? (yes/no/skip)
```

→ Wait for confirmation before running.

## Step 5: Verify Environment Variables

Check `docs/planning/INFRASTRUCTURE.md` for required environment variables.

```
ENVIRONMENT VARIABLES CHECK
============================

Required variables (from INFRASTRUCTURE.md):
- [VAR_NAME]: [set in hosting?]
...

Are all production environment variables configured? (yes/no)
```

## Step 6: Verify Deployment

```
DEPLOYMENT VERIFICATION
========================

Check these:
1. Is the deployment platform building?
2. Visit the production URL
3. Check for errors in the browser console
4. Test a core user flow

Did the deployment succeed? (yes/no/issues)
```

→ If issues found, proceed to rollback.

## Step 7: Update STATUS.md

Update `docs/planning/STATUS.md`:
- Record deployment: "Milestone [N] deployed on [date]"
- Phase: "Deployed"

```
✅ DEPLOYMENT COMPLETE
======================

Milestone: [N] - [Name]
Deployed: [Date]
PR merged: #[number]
Migrations run: [yes/no]
Production URL: [URL]

Next: Run `/autopilot [N+1]` for the next milestone
```

## Rollback

If deployment fails:

**Revert the merge:**
```bash
git revert HEAD --no-edit
git push origin [production-branch]
```

**Revert database migrations:**
- Supabase: Restore from dashboard backup
- Prisma: `npx prisma migrate reset` (confirm with user)
- Drizzle: Manual SQL revert

Update STATUS.md with rollback record.

## Related Commands

- `/pre-release` — Run this first to verify everything is ready
- `/autopilot` — Autonomous build for the next milestone
- `/infra` — Provision infrastructure if not ready
