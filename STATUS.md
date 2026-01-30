# Playbook Development Status

## Current State

- **Phase:** Maintenance & Enhancement
- **Version:** v1.1.0 (released 2026-01-29)
- **Commands:** 23 complete
- **E2E Review:** All 11 issues fixed

## What's Done

- v1.0.0: Initial release with 19 commands
- v1.1.0: Added `/infra`, `/milestone`, `/backlog`, `/setup`; fixed 21 gaps from E2E review
- E2E review complete — all workflow chains verified, cross-references added

## Next Actions

- [x] Collect enhancement ideas and prioritize them
- [ ] Pick enhancements to implement for v1.2.0

## Backlog

### High Impact, Low Effort
- [ ] **E-05:** `/build` offers to create GitHub issue after ad-hoc build
- [ ] **E-08:** Smarter `/resume-work` — check git status, uncommitted changes, open PRs, stale STATUS.md
- [ ] **E-06:** Backup before overwrite in discovery commands (`/research`, `/prd`, `/architecture`, `/roadmap`)
- [ ] **E-09:** `/onboard` auto-detects tech stack from package.json/requirements.txt and pre-fills CLAUDE.md

### High Impact, Medium Effort
- [ ] **E-01:** `/hotfix` — emergency fix workflow (branch from main, skip planning, fast-track PR)
- [ ] **E-07:** `/review-pr` — run PR review checklist from CLAUDE.md against a PR diff
- [ ] **E-10:** `/debug` — structured troubleshooting for non-technical PMs

### Medium Impact, Medium Effort
- [ ] **E-02:** `/release` — generate release notes, bump version, create GitHub release
- [ ] **E-04:** `/refactor` — guided tech debt paydown from TECH-DEBT.md

### Low Impact, Low Effort
- [ ] **E-03:** `/retro` — milestone retrospective summary

## Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-01-29 | Removed `/plan` command | Native Plan Mode (Shift+Tab) is better |
| 2026-01-29 | `/fix-issue` is primary build command | Issue-driven workflow preferred over ad-hoc `/build` |
