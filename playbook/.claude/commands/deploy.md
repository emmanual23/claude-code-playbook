---
description: Deploy a milestone to production
---

# Role: Release Engineer

Use this command after `/pre-release` passes. This guides you through merging PRs, deploying to production, running migrations, and verifying the deployment.

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

## Step 2: Merge Open PRs

List open PRs for the current milestone:
```bash
gh pr list --state open
```

For each open PR:
```
OPEN PRs FOR MERGE
===================

1. #[PR] - [Title] (branch: [name])
2. #[PR] - [Title] (branch: [name])
...

Merge all [N] PRs into the production branch? (yes/no/select specific)
```

→ Wait for confirmation.

For each approved PR:
```bash
gh pr merge [number] --merge --delete-branch
```

If merge conflicts occur:
```
⚠️ MERGE CONFLICT on PR #[N]
==============================

Options:
1. Resolve conflicts now
2. Skip this PR and continue
3. Abort deployment
```

## Step 3: Push to Production Branch

Detect the production branch:
```bash
git remote show origin | grep "HEAD branch"
```

```bash
git checkout [production-branch]
git pull origin [production-branch]
```

Verify all milestone PRs are merged:
```bash
gh pr list --state open
```

If any milestone PRs remain open, warn and ask to continue or abort.

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

⚠️ **Never run migrations without explicit user approval.**

## Step 5: Verify Environment Variables

Check `docs/planning/INFRASTRUCTURE.md` for required environment variables.

```
ENVIRONMENT VARIABLES CHECK
============================

Required variables (from INFRASTRUCTURE.md):
- NEXT_PUBLIC_SUPABASE_URL: [set in hosting? check]
- SUPABASE_SERVICE_ROLE_KEY: [set in hosting? check]
- ...

Are all production environment variables configured in your hosting platform? (yes/no)
```

→ If user says no, list what's missing and help them set it up.

## Step 6: Verify Deployment

After pushing:

```
DEPLOYMENT VERIFICATION
========================

Check these:
1. Is the deployment platform building? (Vercel/Netlify/Railway/Fly.io)
2. Visit the production URL: [URL from INFRASTRUCTURE.md or ask user]
3. Check for errors in the browser console
4. Test a core user flow (login, main feature, etc.)

Did the deployment succeed? (yes/no/issues)
```

→ If issues found, proceed to rollback.

## Step 7: Update STATUS.md

Update `docs/planning/STATUS.md`:
- Record deployment: "Milestone [N] deployed on [date]"
- Phase: "Deployed"
- Note any post-deployment issues

```
✅ DEPLOYMENT COMPLETE
======================

Milestone: [N] - [Name]
Deployed: [Date]
PRs merged: [count]
Migrations run: [yes/no]
Production URL: [URL]

Next: Run `/milestone` to start the next milestone
```

## Rollback

If deployment fails at any step:

**Revert the merge (if code caused the issue):**
```bash
git revert HEAD --no-edit
git push origin [production-branch]
```

**Revert database migrations:**
- Supabase: Restore from dashboard backup or run down migration
- Prisma: `npx prisma migrate reset` (⚠️ destructive — confirm with user)
- Drizzle: Manual SQL revert

**Revert environment variables:**
- Remove any newly added variables that broke things

```
🔴 ROLLBACK COMPLETE
=====================

Reverted: [what was reverted]
Status: Production restored to pre-deployment state

Next steps:
1. Investigate the failure
2. Fix the issue
3. Run `/deploy` again
```

Update STATUS.md with rollback record.

## Related Commands

- `/pre-release` — Run this first to verify everything is ready
- `/milestone` — Transition to next milestone after deployment
- `/fix-issue` — Implement issues (PRs are merged during deploy)
- `/infra` — Provision infrastructure if not ready
