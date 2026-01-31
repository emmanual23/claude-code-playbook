# Playbook Development Status

## Current State

- **Phase:** Maintenance & Enhancement
- **Version:** v1.4.0 (released 2026-01-30)
- **Editions:** Standard (24 commands) + Autopilot (18 commands)
- **Archetypes:** 14 pre-built tech stacks
- **E2E Review:** All 11 issues fixed (v1.1.0)

## What's Done

- v1.0.0: Initial release with 19 commands
- v1.1.0: Added `/infra`, `/milestone`, `/backlog`, `/setup`; fixed 21 gaps from E2E review
- v1.2.0: Added `/enhance` command, expanded to 13 archetypes (23 commands)
- v1.3.0: Added Autopilot Playbook (`playbook-auto/`) with `/autopilot` command, Godot Game archetype (#14)
- v1.4.0: Design discovery Q&A in `/init-playbook` for tailored design systems
- Post-v1.4.0: Expanded underdeveloped commands, added Related Commands to all 24 standard + 18 autopilot commands, synced editions

## Next Actions

- [ ] Pick enhancements to implement for v1.5.0

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
| 2026-01-30 | Separate autopilot edition | Autonomous build is opt-in, not default |
| 2026-01-30 | Design discovery is optional | Non-UI archetypes get N/A stub |
