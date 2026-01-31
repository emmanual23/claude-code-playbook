---
description: Pre-release checklist before deploying to production
---

# Role: Release Manager

## Before Starting
1. Read `docs/planning/STATUS.md` for current state
2. Confirm which features/fixes are included in this release

## Pre-Release Checklist

Run through each section and report status.

**1. Code Quality**
```bash
npm run lint
npm run test
npm run test:e2e
```
- [ ] Lint passes with no errors
- [ ] All unit/integration tests pass
- [ ] All E2E tests pass
- [ ] No skipped tests without justification

**2. Security**
Run `/security-check` and verify:
- [ ] No hardcoded secrets
- [ ] No critical vulnerabilities in dependencies
- [ ] No risky code patterns (eval, SQL injection, XSS)
- [ ] Auth checks in place on protected routes
- [ ] Input validation on all user inputs

**3. Dependencies**
Run `/deps` and verify:
- [ ] No critical security vulnerabilities
- [ ] No severely outdated packages blocking security patches
- [ ] Lock file (package-lock.json) committed

**4. Technical Debt**
Review `docs/planning/TECH-DEBT.md`:
- [ ] No critical (🔴) debt items blocking release
- [ ] High priority (🟠) items have remediation plan
- [ ] Any new shortcuts from this release are logged

**5. Design & UX**
Run `/design-check` on new UI:
- [ ] Follows design system
- [ ] Responsive/mobile-friendly
- [ ] Accessibility basics (labels, contrast, keyboard nav)

**6. Documentation**
- [ ] README updated if setup changed
- [ ] API documentation current
- [ ] ADRs created for significant decisions
- [ ] CHANGELOG updated (if used)

**7. Environment**
- [ ] Environment variables documented
- [ ] No dev/test values in production config
- [ ] Database migrations ready (if applicable)

## Report Format

Present findings:

```
🚀 PRE-RELEASE CHECK: [Project Name]
=====================================

✅ PASSED
---------
- Code Quality: Lint clean, 47 tests passing
- Design Check: No violations
- Documentation: Up to date

⚠️ WARNINGS (non-blocking)
--------------------------
- Dependencies: 3 minor updates available
- Tech Debt: 2 medium items logged

🔴 BLOCKERS (must fix)
----------------------
- [None] or [List blockers]

RECOMMENDATION: [Ready to ship / Fix blockers first]
```

## After Check

If blockers found:
1. List specific fixes needed
2. Ask: "Should I fix these now?"

If ready to ship:
1. Ask: "Ready to create release commit/tag?"
2. If yes, suggest version number based on changes (major/minor/patch)

## Related Commands

- `/deploy` — Deploy to production after this check passes
- `/security-check` — Detailed security scan
- `/deps` — Dependency audit
- `/audit` — Security and logic review
- `/design-check` — UI consistency check

## Quick Mode

If user says `/pre-release quick`:
- Run only: tests, security-check, deps
- Skip: design-check, documentation review
- Report pass/fail summary
