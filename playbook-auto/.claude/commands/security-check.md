---
description: Run shift-left security checks on the codebase
---

# Role: Security Engineer

## Before Starting
1. Read `CLAUDE.md` for project tech stack
2. Read `docs/planning/STATUS.md` for current context

## Security Check Process

Run these checks and report findings:

**0. Run Automated Scanners First**

Before manual analysis, run any available automated tools:

```bash
# Secret scanning
npx gitleaks detect --source . 2>/dev/null || echo "gitleaks not installed — skipping"

# SAST (if available)
npx semgrep --config auto . 2>/dev/null || echo "semgrep not installed — skipping"

# Dependency audit (also run in section 2)
npm audit --json 2>/dev/null || pip-audit --format json 2>/dev/null || echo "no audit tool available"
```

Use findings from any tools that ran as the starting point for each section below. Supplement with manual analysis for anything the tools miss.

> If no automated tools are installed, proceed with manual analysis and recommend installing gitleaks and semgrep in the final report.

**1. Secrets Scanning**
Search for hardcoded secrets in the codebase:
- API keys, tokens, passwords
- Connection strings
- Private keys or certificates
- `.env` files committed to git

Patterns to search:
```
- "api_key", "apiKey", "API_KEY"
- "secret", "password", "passwd"
- "token", "bearer"
- "-----BEGIN.*PRIVATE KEY-----"
- Strings matching: sk-*, pk_*, sk_live_*, etc.
```

**2. Dependency Vulnerabilities**
Run the appropriate audit command:
```bash
# Node.js
npm audit

# Python
pip-audit  # or: safety check

# If not installed, check package.json/requirements.txt manually
```

Report:
- Critical vulnerabilities (must fix)
- High vulnerabilities (should fix)
- Moderate/Low (note for later)

**3. Environment & Configuration**
Check for:
- `.env` files in `.gitignore`
- Secrets in `CLAUDE.md` or docs
- Hardcoded localhost/dev URLs in production code
- Debug flags left enabled

**4. Basic Code Patterns**
Scan for risky patterns:
- `eval()` or `exec()` with user input
- SQL string concatenation (injection risk)
- `dangerouslySetInnerHTML` without sanitization
- Disabled CORS or overly permissive CORS
- Missing input validation on API routes
- Console.log with sensitive data

**5. Authentication & Authorization**
If auth exists, verify:
- Passwords hashed (not plain text)
- Sessions have expiration
- Protected routes check auth
- No sensitive data in JWTs
- HTTPS enforced

**6. Runtime Security**
Check production security headers and configuration:
- CSP headers configured (`Content-Security-Policy`)
- CORS not set to `*` in production
- Rate limiting on auth endpoints and public APIs
- HTTPS enforced (no mixed content)
- Secure cookie flags (`HttpOnly`, `Secure`, `SameSite`)
- `X-Frame-Options` / `X-Content-Type-Options` headers set

**7. Git History**
Check git history for accidentally committed secrets:
```bash
git log --all -p | grep -E "(sk-|pk_|password|secret)" | head -20
```
If secrets found in history:
- Recommend `git-filter-repo` or BFG Repo-Cleaner to remove
- Rotate any exposed keys immediately
- Add patterns to `.gitignore` to prevent recurrence

## Report Format

Present findings as:

```
🔴 CRITICAL (Block deployment)
- [Issue]: [Location] - [How to fix]

🟠 HIGH (Fix before merge)
- [Issue]: [Location] - [How to fix]

🟡 MEDIUM (Fix soon)
- [Issue]: [Location] - [How to fix]

🔵 LOW (Track as tech debt)
- [Issue]: [Location]

✅ PASSED
- [Check name]: No issues found
```

## After Check

```
How would you like to proceed?

  [A] Fix all issues (Recommended if CRITICAL found)
  [C] Fix CRITICAL and HIGH only
  [P] Pick specific issues to fix
  [S] Skip — log all to TECH-DEBT.md
```

→ Wait for user choice.

For each fix, present:
```
Finding: [description]
Location: [file:line or config location]

  BEFORE:
  > [current code/config]

  AFTER:
  > [fixed code/config]

Apply? [Y/n/a]
```

The `a` shortcut applies all remaining fixes without asking.

For issues the user declines to fix:
- CRITICAL → record in TECH-DEBT.md with priority "critical-deferred"
- HIGH → add to TECH-DEBT.md
- MEDIUM/LOW → add to tech debt tracking

### Verify Fixes

After applying fixes, re-run the automated scanners from Step 0:
```bash
npx gitleaks detect --source . 2>/dev/null
npm audit 2>/dev/null
```

If new issues found:
```
⚠️ Fixes introduced [N] new issue(s).
```
→ Show and address before completing.

If clean:
```
✅ All fixes verified. No new issues introduced.
```

Update STATUS.md with security check results.

Append to "Command History" in STATUS.md:
```
| /security-check | [date] | [clean / issues-found] | [X] critical, [Y] high, [Z] fixed |
```

## Rollback

This command may apply security fixes. To revert changes:
```bash
git checkout -- [modified files]
```

## Quick Check Mode

If user says "quick security check":
- Run only secrets scanning and dependency audit
- Skip detailed code pattern analysis

## Related Commands

- `/audit` — Security and logic review (code-level)
- `/deps` — Dependency audit for known vulnerabilities
- `/pre-release` — Full pre-deployment checklist
- `/setup` — Check environment configuration
- `/monitor` — Set up error tracking and observability
- `/hotfix` — Emergency production fix workflow
