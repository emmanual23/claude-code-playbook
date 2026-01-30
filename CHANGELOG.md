# Changelog

All notable changes to the Claude Code Playbook will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] - 2026-01-29

### Removed
- **`/plan` command** — Use native Plan Mode (`Shift+Tab`) instead. Native Plan Mode does the same thing with better integration.

### Added
- **`/infra` command** — Guide through provisioning external services (databases, APIs, hosting) step-by-step
- **`INFRASTRUCTURE.md` template** — Track external service requirements, status, and environment variables
- **Infrastructure identification in `/architecture`** — Now identifies all external dependencies and creates INFRASTRUCTURE.md
- **Infrastructure issue in `/sprint`** — Auto-creates blocker issue #0 if infrastructure not provisioned
- **`/setup` command** — Check environment readiness, report what's configured vs missing, guide through setup
- **E2E Testing Stage** — Stage 4.5 in `/fix-issue` and `/build` for E2E tests when UI changes
- **E2E in `/pre-release`** — E2E test suite must pass before release
- **Native Commands Reference** — New section documenting `/clear`, `/compact`, `/rewind`, Escape key, Plan Mode
- **Context Management Guide** — When to clear, compact, and token-saving tips
- **`.claudeignore` template** — Exclude node_modules, build folders, logs from Claude's scanning
- **`.claude/settings.json`** — Hooks configuration for quality gates
- **Commit per stage** in `/build` and `/fix-issue` — Each stage commits separately for easy rollback
- **Next issue suggestion** — After completing an issue, suggests next one to work on
- **Pro Tips section** — File references, permission modes, headless mode, sub-agents
- **MCP Server recommendations** — GitHub, Puppeteer, PostgreSQL, Sentry, Slack
- **Environment checks in `/init-playbook`** — Now reports setup status after installation
- **Infrastructure check in `/fix-issue`** — Warns if services not provisioned before building
- **Infrastructure check in `/build`** — Same warning for ad-hoc builds
- **Argument validation in `/fix-issue`** — Prompts for issue number if not provided
- **GitHub CLI check in `/sprint`** — Verifies authentication before creating issues
- **File overwrite warnings** — Discovery commands (`/research`, `/prd`, `/architecture`, `/roadmap`) now ask before overwriting
- **Enhanced `/onboard`** — Now offers to create STATUS.md, identify infrastructure, and create CLAUDE.md for existing projects
- **`/milestone` command** — Transition between milestones with completion verification and issue creation (NEW)
- **`/backlog` command** — View features ready to build vs. needing definition, with refinement help (NEW)
- **Dependency visualization in `/status`** — Shows blocked vs ready issues with dependency graph
- **Project archetypes** — 8 pre-configured tech stacks (Next.js+Supabase, FastAPI, React+Vite, Express, React Native, CLI, Astro, Chrome Extension)
- **Testing framework setup in `/setup`** — Interactive setup for Vitest/Jest/pytest and Playwright/Cypress
- **CI/CD guidance in `/setup`** — Workflow creation and branch protection recommendations
- **`/infra costs` subcommand** — Estimate infrastructure costs with pricing reference table
- **`.env.example` creation** — `/infra` now offers to create `.env.example` template
- **Rollback guidance** — Discovery commands now include git checkout instructions

### Changed
- **`/fix-issue`** — Now the **primary build command** with full staged builds, commit per stage, and automatic next-issue suggestion
- **`/build`** — Demoted to ad-hoc use only (when no GitHub issue exists)
- **`/resume-work`** — Clarified it reads STATUS.md (different from native `/resume`)
- **`/checkpoint`** — Clarified it saves to STATUS.md (team-shareable state)
- **Section numbering** — Added sections 6 (Native Commands), 8 (Context Management), 9 (Pro Tips)
- **Build command** — Now includes Plan Mode recommendation and rollback instructions
- **`/infra`** — Now updates STATUS.md when infrastructure is fully provisioned
- **STATUS.md template** — Added infrastructure checkbox to Progress section; simplified tech debt to reference TECH-DEBT.md
- **Next action messages** — Standardized format across all discovery commands
- **CHEATSHEET** — Added clarifying note about stage numbering differences
- **`/status`** — Now shows dependency visualization (blocked vs ready issues) in Build phase
- **`/init-playbook`** — Now offers 8 project archetypes for quick tech stack setup
- **Feature issue template** — Aligned with `/sprint` output format (added Context, Dependencies sections)

### Fixed
- Removed duplicate functionality with native Claude Code features
- Updated all command counts from 19 to 22 (added `/infra`, `/milestone`, `/backlog`)
- Fixed `/prd` summary saying "roadmap" instead of "architecture"

---

## [1.0.0] - 2026-01-29

### Added

**19 Slash Commands:**

*Discovery (6):*
- `/research` - Product research and market analysis
- `/prd` - Product Requirements Document creation
- `/architecture` - Technical architecture planning
- `/adr` - Architecture Decision Records
- `/roadmap` - Milestone planning from PRD
- `/sprint` - GitHub issue generation from roadmap

*Build (8):*
- `/plan` - Feature planning with assumption checking
- `/build` - Staged build with approval gates
- `/fix-issue` - GitHub issue implementation
- `/security-check` - Shift-left security scanning
- `/deps` - Dependency auditing
- `/audit` - Security, logic, accessibility review
- `/design-check` - Design system compliance
- `/pre-release` - Pre-deployment checklist

*Session (3):*
- `/status` - Project state tracking
- `/checkpoint` - Progress saving
- `/resume-work` - Session continuity

*Utility (2):*
- `/onboard` - Codebase orientation
- `/challenge` - Ambiguity surfacing

**Documentation:**
- `CLAUDE.md` - Project constitution template
- `README.md` - Full documentation
- `CHEATSHEET.md` - Quick reference guide
- `FEEDBACK.md` - Continuous improvement log

**Templates:**
- `docs/planning/STATUS.md` - Status tracking
- `docs/planning/TECH-DEBT.md` - Technical debt tracker
- `docs/decisions/README.md` - ADR index and template

**GitHub Integration:**
- `.github/workflows/claude.yml` - @claude automation
- `.github/ISSUE_TEMPLATE/feature.md` - Feature request template
- `.github/ISSUE_TEMPLATE/bug.md` - Bug report template

**Global Installer:**
- `playbook-global/init-playbook.md` - All-in-one installer
- `playbook-global/install-global-command.ps1` - Windows installer
- `playbook-global/install-global-command.sh` - Mac/Linux installer

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 1.0.0 | 2026-01-29 | Initial release with 19 commands |

---

## Upgrade Guide

### From v0.x to v1.0

If you have an older version, run `/init-playbook` and select "Update all commands to latest versions".

---

*For feedback or contributions, see FEEDBACK.md*
