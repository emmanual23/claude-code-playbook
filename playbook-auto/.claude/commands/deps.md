---
description: Audit and manage project dependencies
---

# Role: Dependency Manager

## Before Starting
1. Identify the project's tech stack from `CLAUDE.md` or package files
2. Check which package managers are in use

## Dependency Audit Process

**Step 1 - Identify Package Manager**
Look for:
- `package.json` → npm/yarn/pnpm (Node.js)
- `requirements.txt` / `pyproject.toml` → pip/poetry (Python)
- `Cargo.toml` → cargo (Rust)
- `go.mod` → go modules (Go)

**Step 2 - Check for Outdated Dependencies**

```bash
# Node.js
npm outdated
# or
yarn outdated

# Python
pip list --outdated
# or with pip-tools
pip-compile --upgrade --dry-run

# Shows: Package | Current | Wanted | Latest
```

**Step 3 - Security Vulnerability Scan**

```bash
# Node.js
npm audit
# For detailed report:
npm audit --json

# Python
pip-audit
# or
safety check
```

**Step 4 - Analyze Results**

Categorize findings:

```
🔴 CRITICAL VULNERABILITIES
Dependencies with known security exploits that must be fixed immediately.

🟠 MAJOR VERSION UPDATES AVAILABLE
Breaking changes likely - review changelogs before updating.

🟡 MINOR/PATCH UPDATES AVAILABLE  
Generally safe to update - may include bug fixes and features.

🔵 DEVELOPMENT DEPENDENCIES
Lower priority - update when convenient.
```

**Step 5 - Report**

Present findings:

```
## Dependency Audit Report

### Security Vulnerabilities
| Package | Severity | Issue | Fix Version |
|---------|----------|-------|-------------|
| lodash  | High     | Prototype pollution | 4.17.21 |

### Outdated Packages
| Package | Current | Latest | Type | Breaking? |
|---------|---------|--------|------|-----------|
| react   | 18.2.0  | 19.0.0 | Major | Yes |
| axios   | 1.4.0   | 1.6.0  | Minor | No |

### Recommendations
1. **Immediate:** Fix [X] critical vulnerabilities
2. **This sprint:** Update [Y] packages with security patches
3. **Plan for:** Major version upgrades requiring code changes
```

## Update Commands

**Safe updates (patch/minor):**
```bash
# Node.js
npm update

# Python
pip install --upgrade [package]
```

**Specific package:**
```bash
npm install [package]@latest
```

**Fix vulnerabilities automatically:**
```bash
npm audit fix
# For breaking changes (careful!):
npm audit fix --force
```

## Best Practices

1. **Lock files:** Always commit `package-lock.json` or `yarn.lock`
2. **Regular audits:** Run `/deps` before each release
3. **Test after updates:** Run full test suite after updating
4. **One at a time:** Update major versions individually to isolate issues
5. **Read changelogs:** Check for breaking changes before major updates

## Integration with Workflow

- Run `/deps` as part of `/security-check`
- Add critical vulnerabilities to tech debt if not fixable immediately
- Document major version upgrade decisions with `/adr`

## Quick Mode

If user says `/deps quick`:
- Only run security audit
- Skip outdated package listing
- Focus on vulnerabilities only

## Related Commands

- `/security-check` — Broader security scan (includes code patterns)
- `/audit` — Security and logic review
- `/pre-release` — Full pre-deployment checklist (includes deps)
- `/adr` — Document major version upgrade decisions
