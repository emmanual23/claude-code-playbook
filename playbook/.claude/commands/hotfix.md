---
description: Emergency production fix workflow
---

# Role: Incident Responder

Use this command when production is broken and you need a fast, focused fix. Skips normal planning stages.

## Before Starting
1. Read `docs/planning/STATUS.md` for current state
2. Read the production error report, logs, or user report

## Step 0: Quick Validation

```bash
git status --porcelain
```
If uncommitted changes exist: "Stash or commit current work first — hotfixes branch from clean main."

```bash
git fetch origin && git log HEAD..origin/main --oneline
```
If behind main: pull before branching.

## Step 1 - Triage

Classify the issue:

```
INCIDENT TRIAGE
================

Severity: [Critical / High / Medium]
Impact: [What's broken for users]
Scope: [How many users affected]
Source: [Error log / User report / Monitoring alert]
```

## Step 2 - Branch from Production

```bash
git checkout main && git pull origin main
git checkout -b hotfix/[short-description]
```

## Step 3 - Minimal Fix

**Rules:**
- Fix the issue only — no refactoring, no related improvements
- Change the minimum number of files possible
- Skip Plan Mode — go directly to implementation
- If the root cause is complex, apply a band-aid fix now and create a follow-up issue

## Step 4 - Test the Fix

- **Write a regression test** that reproduces the bug before verifying the fix. Even for hotfixes, a test prevents recurrence. If writing a full test is truly impossible under time pressure, create a follow-up issue for the test and note it in the PR.
- Run the affected tests: `npm run test -- [relevant-files]`
- If the fix touches UI and automated E2E exists, run: `npm run test:e2e -- [relevant-files]`
- Only fall back to manual smoke testing for flows that have no automated test infrastructure yet.

## Step 5 - Expedited PR

```bash
gh pr create --title "[HOTFIX] [description]" --body "## Incident
[What broke and how it manifested]

## Fix
[What was changed and why]

## Testing
[What was tested to verify the fix]

## Follow-up
[Any remaining work needed]"
```

## Step 6 - Fast Deploy

Merge immediately and run `/deploy` (skip `/pre-release` for hotfixes):

```bash
gh pr merge [number] --merge --delete-branch
```

Then follow abbreviated `/deploy` steps (push to production, run migrations if needed, verify).

## Step 7 - Postmortem

After the fix is live, create a postmortem document:

```bash
# Create postmortem
```

Save to `docs/decisions/POSTMORTEM-[YYYY-MM-DD]-[title].md` with:
- **What broke:** Description of the failure
- **Impact:** Users affected, duration of outage
- **Root cause:** Why it happened
- **Fix applied:** What was changed
- **Prevention:** How to prevent recurrence (test gap, monitoring gap, validation gap)

## Step 8 - Follow-up

- If the hotfix was a band-aid, create a GitHub issue for the proper fix
- Add to `docs/planning/TECH-DEBT.md` if applicable
- Update `docs/planning/STATUS.md` with incident record

Append to "Command History" in STATUS.md:
```
| /hotfix | [date] | deployed | [severity], PR #[N] |
```

```
✅ HOTFIX DEPLOYED
===================

Issue: [description]
Severity: [Critical/High/Medium]
Fix: [what was changed]
Deployed: [date/time]
Postmortem: docs/decisions/POSTMORTEM-[date]-[title].md
Follow-up issue: #[number] (if created)
```

## Rollback

This command creates a hotfix branch and may modify STATUS.md. The hotfix branch can be deleted if needed:
```bash
git checkout main && git branch -D hotfix/[description]
git checkout -- docs/planning/STATUS.md
```

## Related Commands

- `/deploy` — Deploy the hotfix to production
- `/fix-issue` — For non-emergency fixes that follow normal workflow
- `/security-check` — Run if the incident was security-related
