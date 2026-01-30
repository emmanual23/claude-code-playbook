# Claude Code Playbook v1.1.0 — Gap Analysis Checklist

> Generated: January 29, 2026
> Status: 21 gaps identified across 5 categories

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| 🔴 Workflow Breaks | 4 | ✅ 4/4 |
| 🟡 Missing Error Handling | 5 | ✅ 5/5 |
| 🟡 Documentation Inconsistencies | 3 | ✅ 3/3 |
| 🟡 Missing Features | 6 | ✅ 6/6 |
| 🔵 Template Gaps | 3 | ✅ 3/3 |
| **Total** | **21** | **✅ 21/21** |

---

## 🔴 HIGH SEVERITY — Workflow Breaks

### GAP-001: `/fix-issue` doesn't check infrastructure status ✅ FIXED
- [x] **Identify:** User can run `/fix-issue` without infrastructure provisioned
- [x] **Impact:** Build fails when code connects to unprovisioned services
- [x] **Fix:** Add INFRASTRUCTURE.md check to `/fix-issue` Before Starting
- [x] **Test:** Run `/fix-issue` with 🔴 infra items, verify it warns user
- [x] **Files:** `.claude/commands/fix-issue.md`

### GAP-002: `/fix-issue` without argument handling ✅ FIXED
- [x] **Identify:** `gh issue view $ARGUMENTS` fails if no issue number provided
- [x] **Impact:** Confusing error, user doesn't know what went wrong
- [x] **Fix:** Add validation — if no number, list open issues and ask
- [x] **Test:** Run `/fix-issue` with no argument, verify it prompts for issue
- [x] **Files:** `.claude/commands/fix-issue.md`

### GAP-003: `/prd` summary text inconsistent ✅ FIXED
- [x] **Identify:** Step 5 says "proceed to roadmap" but next action says `/architecture`
- [x] **Impact:** User confusion about workflow order
- [x] **Fix:** Change Step 5 to "proceed to architecture"
- [x] **Test:** Review `/prd` output, verify consistent messaging
- [x] **Files:** `.claude/commands/prd.md`

### GAP-004: `/infra` doesn't update STATUS.md ✅ FIXED
- [x] **Identify:** After provisioning, STATUS.md still shows infra incomplete
- [x] **Impact:** `/resume-work` won't know infrastructure is ready
- [x] **Fix:** Add STATUS.md update after successful provisioning
- [x] **Test:** Run `/infra`, verify STATUS.md updated
- [x] **Files:** `.claude/commands/infra.md`, `docs/planning/STATUS.md`

---

## 🟡 MEDIUM SEVERITY — Missing Error Handling

### GAP-005: No GitHub MCP check before GitHub commands ✅ FIXED
- [x] **Identify:** Commands fail with confusing error if GitHub MCP not configured
- [x] **Impact:** Poor user experience, unclear how to fix
- [x] **Fix:** Add GitHub check to `/sprint` (only command needing it besides `/fix-issue`)
- [x] **Test:** Run `/sprint` without GitHub auth, verify helpful message
- [x] **Files:** `.claude/commands/sprint.md` (fix-issue already had check from Phase 1)
- **Note:** `/adr`, `/deps`, `/pre-release` don't actually use `gh` commands directly

### GAP-006: No file overwrite warnings ✅ FIXED
- [x] **Identify:** Running discovery commands twice overwrites without warning
- [x] **Impact:** User loses previous work unexpectedly
- [x] **Fix:** Add check: "If [file] exists, ask: Overwrite/Merge/Cancel"
- [x] **Test:** Run `/prd` twice, verify it asks about existing file
- [x] **Files:** `.claude/commands/research.md`, `prd.md`, `architecture.md`, `roadmap.md`

### GAP-007: `/onboard` doesn't set up project structure ✅ FIXED
- [x] **Identify:** For existing codebases, no STATUS.md or infra identification
- [x] **Impact:** Missing tracking for existing projects
- [x] **Fix:** Add STATUS.md creation offer, infra identification, CLAUDE.md creation
- [x] **Test:** Run `/onboard` on existing project, verify offers setup
- [x] **Files:** `.claude/commands/onboard.md`

### GAP-008: No rollback guidance in discovery commands ✅ FIXED
- [x] **Identify:** If `/prd` or `/architecture` goes wrong, no undo guidance
- [x] **Impact:** User stuck with bad output
- [x] **Fix:** Added rollback section to each discovery command with git checkout command
- [x] **Test:** Verify rollback instructions present in output
- [x] **Files:** `.claude/commands/research.md`, `prd.md`, `architecture.md`, `roadmap.md`

### GAP-009: `/build` doesn't check infrastructure ✅ FIXED
- [x] **Identify:** Same as GAP-001 but for ad-hoc builds
- [x] **Impact:** Build fails without infrastructure
- [x] **Fix:** Add INFRASTRUCTURE.md check to `/build` Before Starting
- [x] **Test:** Run `/build` with 🔴 infra items, verify warning
- [x] **Files:** `.claude/commands/build.md`

---

## 🟡 MEDIUM SEVERITY — Documentation Inconsistencies

### GAP-010: STATUS.md template missing infrastructure checkbox ✅ FIXED
- [x] **Identify:** Progress checklist has Discovery and Build, no Infrastructure
- [x] **Impact:** No tracking for infrastructure provisioning progress
- [x] **Fix:** Add `- [ ] Infrastructure provisioned` after Sprint Planning
- [x] **Test:** Review STATUS.md template, verify infra checkbox present
- [x] **Files:** `docs/planning/STATUS.md`
- **Note:** Fixed as part of Phase 1 (GAP-004)

### GAP-011: Build stages numbered differently ✅ FIXED
- [x] **Identify:** `/fix-issue` uses 4.1-4.6, `/build` uses 1-7
- [x] **Impact:** Confusing when referencing stages
- [x] **Fix:** Added clarifying note to CHEATSHEET explaining context-dependent numbering
- [x] **Test:** Compare both commands, verify documentation is clear
- [x] **Files:** `CHEATSHEET.md`

### GAP-012: Next action messages inconsistent ✅ FIXED
- [x] **Identify:** Some say "Run /X", others "Run `/X`", others "proceed to X"
- [x] **Impact:** Inconsistent user experience
- [x] **Fix:** Standardized to: STATUS.md says "Next: Run `/command`", summary asks "Ready to proceed? Next: `/command`"
- [x] **Test:** Review all commands, verify consistent format
- [x] **Files:** research.md, prd.md, architecture.md, roadmap.md, sprint.md

---

## 🟡 MEDIUM SEVERITY — Missing Features

### GAP-013: No `/milestone` command ✅ FIXED
- [x] **Identify:** After Milestone 1 done, no clear command to start Milestone 2
- [x] **Impact:** User unsure how to proceed to next milestone
- [x] **Fix:** Created `/milestone` command with completion verification, transition, and issue creation
- [x] **Test:** Complete Milestone 1, verify clear next steps
- [x] **Files:** `.claude/commands/milestone.md` (NEW)

### GAP-014: No dependency visualization ✅ FIXED
- [x] **Identify:** Issues have "depends on" text but no visual graph
- [x] **Impact:** Hard to see what's blocked vs ready
- [x] **Fix:** Enhanced `/status` to show dependency graph with 🟢 READY, 🟡 BLOCKED, 🔴 INFRA BLOCKED
- [x] **Test:** Run `/status` in Build phase, verify dependency info shown
- [x] **Files:** `.claude/commands/status.md`

### GAP-015: No project archetype templates ✅ FIXED
- [x] **Identify:** CLAUDE.md tech stack is generic, user fills everything
- [x] **Impact:** Slow setup, user may miss important settings
- [x] **Fix:** Created 8 archetypes (Next.js+Supabase, FastAPI, React+Vite, Express, React Native, CLI, Astro, Chrome Extension)
- [x] **Test:** Run `/init-playbook`, verify archetype options offered
- [x] **Files:** `docs/ARCHETYPES.md` (NEW), `playbook-global/init-playbook.md`

### GAP-016: No testing framework setup guidance ✅ FIXED
- [x] **Identify:** `/setup` checks for test script but doesn't help create one
- [x] **Impact:** User stuck if no testing configured
- [x] **Fix:** Added interactive setup for Vitest/Jest/pytest and Playwright/Cypress
- [x] **Test:** Run `/setup` with no test script, verify offers setup
- [x] **Files:** `.claude/commands/setup.md`

### GAP-017: No CI/CD pipeline guidance ✅ FIXED
- [x] **Identify:** GitHub Action file exists but no customization help
- [x] **Impact:** CI may not match project needs
- [x] **Fix:** Added CI/CD section to `/setup` with workflow creation and branch protection guidance
- [x] **Test:** Run `/setup`, verify CI configuration guidance
- [x] **Files:** `.claude/commands/setup.md`

### GAP-018: No cost tracking for infrastructure ✅ FIXED
- [x] **Identify:** INFRASTRUCTURE.md has cost section but nothing populates it
- [x] **Impact:** Section is useless clutter
- [x] **Fix:** Added `/infra costs` subcommand with pricing reference table
- [x] **Test:** Run `/infra costs`, verify cost estimates shown
- [x] **Files:** `.claude/commands/infra.md`

---

## 🔵 LOW SEVERITY — Template Gaps

### GAP-019: TECH-DEBT.md in STATUS.md and separate file ✅ FIXED
- [x] **Identify:** Tech debt section exists in both files
- [x] **Impact:** Confusion about which to use
- [x] **Fix:** Simplified STATUS.md to reference TECH-DEBT.md with quick count only
- [x] **Test:** Verify single source of truth for tech debt
- [x] **Files:** `docs/planning/STATUS.md`

### GAP-020: No `.env.example` template ✅ FIXED
- [x] **Identify:** INFRASTRUCTURE.md lists env vars but no `.env.example` created
- [x] **Impact:** User has to manually create env file
- [x] **Fix:** Added `.env.example` creation to `/infra` Step 3
- [x] **Test:** Run `/infra`, verify `.env.example` offered
- [x] **Files:** `.claude/commands/infra.md`

### GAP-021: Issue templates don't match `/sprint` output ✅ FIXED
- [x] **Identify:** `.github/ISSUE_TEMPLATE/feature.md` differs from `/sprint` format
- [x] **Impact:** Inconsistent issue formats
- [x] **Fix:** Updated template to include Context, Dependencies sections matching sprint output
- [x] **Test:** Compare template vs `/sprint` output, verify aligned
- [x] **Files:** `.github/ISSUE_TEMPLATE/feature.md`

---

## Implementation Phases

### Phase 1: Critical (Blocks Usage) ✅ COMPLETE
- [x] GAP-001: `/fix-issue` infra check
- [x] GAP-002: `/fix-issue` argument validation
- [x] GAP-003: `/prd` summary fix
- [x] GAP-004: `/infra` STATUS.md update

### Phase 2: Important (Improves Reliability) ✅ COMPLETE
- [x] GAP-005: GitHub CLI check (added to `/sprint`)
- [x] GAP-006: File overwrite warnings (4 discovery commands)
- [x] GAP-007: `/onboard` enhancements
- [x] GAP-009: `/build` infra check
- [x] GAP-010: STATUS.md infra checkbox (done in Phase 1)
- [x] GAP-011: Stage numbering clarification (CHEATSHEET note)
- [x] GAP-012: Next action message consistency (5 commands)

### Phase 3: Nice to Have (Polish) ✅ COMPLETE
- [x] GAP-008: Rollback guidance (4 discovery commands)
- [x] GAP-013: `/milestone` command (NEW)
- [x] GAP-014: Dependency visualization in `/status`
- [x] GAP-015: Project archetypes (8 templates + init-playbook update)
- [x] GAP-016: Testing framework setup in `/setup`
- [x] GAP-017: CI/CD guidance in `/setup`
- [x] GAP-018: Cost tracking (`/infra costs` subcommand)
- [x] GAP-019: Tech debt consolidation (STATUS.md simplified)
- [x] GAP-020: `.env.example` creation in `/infra`
- [x] GAP-021: Issue template alignment

---

## Progress Log

| Date | Gaps Fixed | Notes |
|------|------------|-------|
| 2026-01-29 | GAP-001, GAP-002, GAP-003, GAP-004, GAP-010 | Phase 1 complete |
| 2026-01-29 | GAP-005, GAP-006, GAP-007, GAP-009, GAP-011, GAP-012 | Phase 2 complete |
| 2026-01-29 | GAP-008, GAP-013-021 | Phase 3 complete. All 21 gaps fixed! |

---

*Checklist created: January 29, 2026*
