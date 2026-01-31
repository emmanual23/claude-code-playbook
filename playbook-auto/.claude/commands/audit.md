---
description: Security and logic review
---

# Role: Security Reviewer

Perform a thorough security, logic, and accessibility review of changed or specified files. Produce a prioritized report with actionable remediation guidance.

## Before Starting
1. Read `CLAUDE.md` for project constraints and coding rules
2. Run `git diff --name-only HEAD~1` (or check staged/modified files) to identify changed files
3. If `$ARGUMENTS` specifies files or a scope, use that instead

## Step 1 - Identify Review Scope

Determine which files to review:
- If `$ARGUMENTS` provided: review those files/directories
- If no arguments: review files changed since last commit
- If no changes detected: ask the user what to review

List the files that will be reviewed.

## Step 2 - Security Scan

Check every file for:

**Critical (must fix before commit):**
- Hardcoded secrets, API keys, tokens, or passwords
- SQL injection vulnerabilities (unsanitized inputs in queries)
- XSS vulnerabilities (unescaped user content in HTML/JSX)
- Command injection (user input passed to shell/exec)
- Path traversal (user input in file paths)
- Authentication/authorization bypasses
- Insecure deserialization

**High (fix before merge):**
- Missing input validation on user-facing endpoints
- Missing rate limiting on sensitive operations
- Overly permissive CORS configuration
- Sensitive data in logs or error messages
- Missing CSRF protection on state-changing endpoints

**Medium (fix soon):**
- Weak cryptographic choices (MD5, SHA1 for security purposes)
- Missing security headers
- Verbose error messages exposing internals
- Insecure cookie settings (missing HttpOnly, Secure, SameSite)

## Step 3 - Logic Review

Check for:
- Off-by-one errors in loops and array access
- Null/undefined access without guards
- Race conditions in async operations
- Unhandled promise rejections
- Dead code or unreachable branches
- Incorrect boolean logic (especially complex conditions)
- Missing error handling on I/O operations
- State mutations where immutability is expected

## Step 4 - Accessibility Review

Check for:
- Missing `alt` text on images
- Form inputs without associated labels
- Missing ARIA attributes on interactive elements
- Insufficient color contrast (check against WCAG AA)
- Missing keyboard navigation support
- Missing focus indicators

## Step 5 - Report

Present findings in this format:

```
## Audit Report

**Scope:** [files reviewed]
**Date:** [today]

### 🔴 Critical — Must Fix Before Commit
1. **[Issue]** — `file:line` — [description and fix]

### 🟠 High — Fix Before Merge
1. **[Issue]** — `file:line` — [description and fix]

### 🟡 Medium — Fix Soon
1. **[Issue]** — `file:line` — [description and fix]

### 🟢 Minor — Nice to Have
1. **[Issue]** — `file:line` — [description and fix]

### ✅ Passed Checks
- [List areas that passed review with no issues]

### Summary
- Critical: X | High: X | Medium: X | Minor: X
- Recommendation: [SAFE TO COMMIT / FIX CRITICAL FIRST / NEEDS REWORK]
```

## Step 6 - Remediation

For any Critical or High findings:
1. Propose a specific code fix for each issue
2. Ask: "Want me to fix these now?"
3. If approved, apply fixes and re-run the relevant checks

## Related Commands

- `/security-check` — Shift-left security scan (broader, includes dependency checks)
- `/deps` — Audit dependencies for known vulnerabilities
- `/design-check` — Verify UI matches design system
- `/pre-release` — Full pre-deployment checklist

## Rollback

This command is read-only unless remediation fixes are approved. If fixes were applied:
```bash
git checkout -- [modified files]
```
