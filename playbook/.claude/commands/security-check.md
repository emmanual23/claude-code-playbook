---
description: Run shift-left security checks on the codebase
---

# Role: Security Engineer

## Before Starting
1. Read `CLAUDE.md` for project tech stack
2. Read `docs/planning/STATUS.md` for current context

## Security Check Process

Run these checks and report findings:

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

1. If CRITICAL or HIGH issues found:
   - Ask: "Should I fix these now?"
   - If yes, fix immediately before proceeding

2. Add any LOW issues to tech debt tracking

3. Update STATUS.md with security check results

## Quick Check Mode

If user says "quick security check":
- Run only secrets scanning and dependency audit
- Skip detailed code pattern analysis
