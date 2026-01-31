# Claude Code Playbook — Cheat Sheet

## Commands by Phase

### Discovery (9)
| Command | Purpose |
|---------|---------|
| `/research` | Research product idea, competitors, market |
| `/prd` | Create Product Requirements Document |
| `/architecture` | Define data model, APIs, components, infrastructure |
| `/adr` | Document architecture decisions |
| `/enhance` | Research & plan an enhancement to existing product |
| `/plan` | Plan a feature with assumption checking |
| `/roadmap` | Create milestones from PRD |
| `/sprint` | Generate GitHub issues from roadmap |
| `/infra` | Provision external services (databases, APIs, hosting) |

### Build (9)
| Command | Purpose |
|---------|---------|
| `/fix-issue [#]` | **Implement GitHub issue** ⭐ Primary |
| `/build` | Build without issue (ad-hoc) |
| `/milestone` | Transition to next milestone |
| `/security-check` | Scan for secrets, vulnerabilities |
| `/deps` | Audit dependencies |
| `/audit` | Review security, logic, accessibility |
| `/design-check` | Verify UI matches design system |
| `/pre-release` | Pre-deployment checklist |
| `/deploy` | Merge PRs, deploy, verify production |

### Session (4)
| Command | Purpose |
|---------|---------|
| `/status` | View/update project state |
| `/backlog` | View features ready vs. needing definition |
| `/checkpoint` | Save progress to STATUS.md |
| `/resume-work` | Read STATUS.md and continue |

### Utility (3)
| Command | Purpose |
|---------|---------|
| `/setup` | Check environment and configuration status |
| `/onboard` | Orient Claude to existing codebase |
| `/challenge` | Surface ambiguity in vague requests |

---

## Native Claude Code Commands

| Command / Shortcut | What It Does |
|--------------------|--------------|
| `Shift+Tab` | **Plan Mode** — Explore without writing code |
| `Escape` | **Stop** — Press when Claude goes wrong |
| `Escape Escape` | **Rewind** — Restore code to checkpoint |
| `/clear` | Wipe context, start fresh |
| `/compact` | Summarize to reduce tokens |
| `/resume` | Continue previous session |
| `/rewind` | Restore to checkpoint |
| `/cost` | Check token usage |
| `/model` | Switch models |

---

## Workflows

### New Project
```
/init-playbook → /setup → /research → /prd → /architecture → /roadmap → /sprint → /infra → /fix-issue 1
```

### Existing Codebase
```
/init-playbook → /setup → /onboard → /status
```

### Daily Development
```
/resume-work → /fix-issue [#] → "next" → /fix-issue [#] → /checkpoint
```

### Before Shipping
```
/security-check → /deps → /audit → /design-check → /pre-release → /deploy
```

---

## Key Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `docs/planning/STATUS.md` | Current project state | Every session start |
| `CLAUDE.md` | Project rules & design system | Before building |
| `docs/planning/prd.md` | Product requirements | Before features |
| `docs/planning/architecture.md` | Technical structure | Before coding |
| `docs/planning/INFRASTRUCTURE.md` | External service dependencies | Before first build |
| `docs/planning/roadmap.md` | Milestones & tasks | Sprint planning |
| `docs/planning/TECH-DEBT.md` | Shortcuts taken | Before releases |
| `docs/decisions/` | Architecture Decision Records | When deciding |

---

## Build Stages

`/fix-issue` and `/build` execute in stages — wait for "proceed" after each:

| Stage | Name | What Happens |
|-------|------|--------------|
| 1 | **Data** | Schema/database changes |
| 2 | **Logic** | Core functions, API routes |
| 3 | **UI** | Components (design system enforced) |
| 4 | **Unit/Integration Tests** | Function and API tests |
| 5 | **E2E Tests** | User flow tests (if UI changed) |
| 6 | **Verify** | Lint + all tests pass |
| 7 | **Tech Debt** | Log any shortcuts taken |

> **Note:** In `/fix-issue`, stages are numbered 4.1-4.6 (under Step 4), with Tech Debt as Step 6.
> In `/build`, stages are numbered 1-7. Same content, different numbering context.

---

## Escape Hatches

| Problem | Solution |
|---------|----------|
| Same error 3+ times | "Do not retry. Explain the cause." |
| Claude going wrong | Press `Escape` immediately |
| Need to undo changes | `Escape Escape` or `/rewind` |
| Output wrong | `/challenge` |
| Context filling up | `/compact` (before 95% auto-compact) |
| Totally wrong direction | `/clear` and re-explain |
| Vague request | `/challenge` before building |
| UI looks wrong | `/design-check` |
| Secret detected | `/security-check`, fix now |
| Vulnerable dependency | `/deps`, fix or log debt |
| Taking shortcut | Log in `TECH-DEBT.md` |
| Before deploy | `/pre-release` → `/deploy` |

---

## Quick Commands

| Action | Command |
|--------|---------|
| Commit | `"commit with appropriate message"` |
| Create PR | `"create a PR for this branch"` |
| Create branch | `"create a branch for this feature"` |
| Reference file | `@filename` in prompt |
| Visual reference | Paste screenshot or reference `/docs/design-references/` |
| Switch models | `/model` |
| Compress context | `/compact` |
| Name session | `/rename "description"` |
| Headless mode | `claude -p "prompt" --output-format json` |
| Skip permissions | `claude --dangerously-skip-permissions` |

---

## Pro Tips

**Before complex work:** Use Plan Mode (`Shift+Tab`) first

**Sub-agents for heavy tasks:**
```
"Run tests in a sub-agent and report results"
```

**File references:**
```
@src/auth/login.ts    # Specific file
@src/components/      # Directory
```

**MCP servers:** `claude mcp add github`

**Disable unused MCPs:** `/mcp` to manage (saves context)

---

## Commit Message Format

```
feat: add revenue dashboard
fix: resolve null pointer (#123)
refactor: simplify auth logic
docs: update API documentation
```

---

## Branch Naming

```
feature/short-description
fix/123-short-description
refactor/short-description
```

---

## PR Checklist (Quick)

- [ ] Code works
- [ ] Tests pass
- [ ] No secrets
- [ ] Follows patterns
- [ ] Design system compliant
- [ ] Documented

---

## Model Strategy

Run `/model` and select:
> "Use Opus 4.5 in plan mode, Sonnet 4.5 otherwise"

- **Opus** → Planning, assumptions, architecture
- **Sonnet** → Writing code, tests, routine tasks

---

## Repository

https://github.com/emmanual23/claude-code-playbook
