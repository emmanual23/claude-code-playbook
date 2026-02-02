---
description: AI-assisted PR review against project standards
---

# Role: Code Reviewer

Use this command to review a pull request against the project's standards defined in CLAUDE.md. Checks functionality, code quality, testing, security, documentation, and design compliance.

## Before Starting
1. Read `CLAUDE.md` for all project standards
2. Read `docs/planning/STATUS.md` for current context

## Step 1 - Get PR Diff

If a PR number is provided (`$ARGUMENTS`):
```bash
gh pr diff $ARGUMENTS
gh pr view $ARGUMENTS
```

If no PR number, diff the current branch against main:
```bash
git diff main...HEAD
```

## Step 2 - Review Against Checklist

Review every changed file against these categories:

### Functionality
- [ ] Code does what the issue/feature requires
- [ ] Edge cases are handled
- [ ] Error states are handled gracefully

### Code Quality
- [ ] Follows existing patterns in codebase
- [ ] No hardcoded secrets or sensitive data
- [ ] No commented-out code or debug logs
- [ ] Functions/components have clear, single responsibilities

### Testing
- [ ] Tests pass (`npm run test`)
- [ ] New logic has test coverage
- [ ] Bug fixes include a regression test that reproduces the original bug
- [ ] Critical paths have E2E coverage
- [ ] No manual testing suggested where an automated test could cover the same check

### Security
- [ ] No SQL injection vulnerabilities
- [ ] User input is validated/sanitized
- [ ] Auth checks are in place where needed
- [ ] Secrets use environment variables

### Documentation
- [ ] Complex logic is commented
- [ ] API changes are documented
- [ ] ADR created for significant decisions

### Design (if UI changes)
- [ ] Follows design system in CLAUDE.md Section 9
- [ ] UI state patterns used (loading, empty, error, success, disabled)
- [ ] Responsive/mobile-friendly
- [ ] Accessibility basics (labels, contrast, keyboard nav)

## Step 3 - Report

Present findings in this format:

```
PR REVIEW: #[number] — [title]
================================

✅ PASS
- [Category]: [What looks good]

⚠️ WARN
- [Category]: [Issue] — [File:line] — [Suggestion]

❌ FAIL
- [Category]: [Issue] — [File:line] — [Required fix]

SUMMARY
-------
Verdict: [APPROVE / REQUEST CHANGES / COMMENT]
Issues: [X] fail, [Y] warn, [Z] pass
```

## Step 4 - Address Findings

```
How would you like to proceed?

  [A] Fix all issues (Recommended)
  [C] Fix FAIL items only (skip warnings)
  [P] Pick specific items to fix
  [S] Skip — no fixes, review complete
```

→ Wait for user choice.

For each item being fixed:
1. Show the current (problematic) code
2. Show the proposed replacement
3. Explain why the change is needed

Apply approved fixes and commit:
```bash
git add -A && git commit -m "fix: address PR review feedback"
```

### Verify Fixes

After applying fixes, re-run checks:
```bash
npm run lint
npm run test
```

If new issues found:
```
⚠️ Fixes introduced [N] new issue(s). Review above.
```
→ Address before completing.

If clean:
```
✅ All fixes verified. No new issues introduced.
```

## Command Output

```
REVIEW COMPLETE
================
Verdict: [APPROVE / REQUEST CHANGES]
Findings: [X] fail, [Y] warn, [Z] pass
Fixed: [N] items
Skipped: [M] items
```

Append to `docs/planning/STATUS.md` under "Command History":
```
| /review | [date] | [APPROVE / REQUEST CHANGES] | PR #[number], [X] fail [Y] warn, [N] fixed |
```

## Rollback

This command may apply code fixes. To revert changes:
```bash
git checkout -- [modified files]
```

## Related Commands

- `/autopilot` — Implement issues that the review identifies
- `/audit` — Deeper security and logic review
- `/security-check` — Focused security scan
- `/design-check` — Detailed design system compliance check
