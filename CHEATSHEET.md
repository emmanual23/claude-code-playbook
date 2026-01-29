# Claude Code Playbook — Cheat Sheet

## Commands by Phase

### Discovery (6)
| Command | Purpose |
|---------|---------|
| `/research` | Research product idea, competitors, market |
| `/prd` | Create Product Requirements Document |
| `/architecture` | Define data model, APIs, components |
| `/adr` | Document architecture decisions |
| `/roadmap` | Create milestones from PRD |
| `/sprint` | Generate GitHub issues from roadmap |

### Build (8)
| Command | Purpose |
|---------|---------|
| `/plan` | Plan a feature with assumptions |
| `/build` | Build in stages with approval gates |
| `/fix-issue [#]` | Implement a GitHub issue |
| `/security-check` | Scan for secrets, vulnerabilities |
| `/deps` | Audit dependencies |
| `/audit` | Review security, logic, accessibility |
| `/design-check` | Verify UI matches design system |
| `/pre-release` | Pre-deployment checklist |

### Session (3)
| Command | Purpose |
|---------|---------|
| `/status` | View/update project state |
| `/checkpoint` | Save progress before stepping away |
| `/resume-work` | Continue from last session |

### Utility (2)
| Command | Purpose |
|---------|---------|
| `/onboard` | Orient Claude to existing codebase |
| `/challenge` | Surface ambiguity in vague requests |

---

## Workflows

### New Project
```
/init-playbook → /research → /prd → /architecture → /adr → /roadmap → /sprint → /fix-issue 1
```

### Existing Codebase
```
/init-playbook → /onboard → /status
```

### Daily Development
```
/resume-work → /fix-issue [#] → /checkpoint
```

### Before Shipping
```
/security-check → /deps → /audit → /design-check → /pre-release
```

---

## Key Files

| File | Purpose | When to Read |
|------|---------|--------------|
| `docs/planning/STATUS.md` | Current project state | Every session start |
| `CLAUDE.md` | Project rules & design system | Before building |
| `docs/planning/prd.md` | Product requirements | Before features |
| `docs/planning/architecture.md` | Technical structure | Before coding |
| `docs/planning/roadmap.md` | Milestones & tasks | Sprint planning |
| `docs/planning/TECH-DEBT.md` | Shortcuts taken | Before releases |
| `docs/decisions/` | Architecture Decision Records | When deciding |

---

## Build Stages

`/build` executes in stages — wait for "proceed" after each:

1. **Data** — Schema/database changes
2. **Logic** — Core functions, API routes
3. **UI** — Components (design system enforced)
4. **Test** — Behavior tests
5. **Verify** — Lint + test pass
6. **Tech Debt** — Log any shortcuts

---

## Escape Hatches

| Problem | Solution |
|---------|----------|
| Same error 3+ times | "Do not retry. Explain the cause." |
| Output wrong | `/challenge` |
| Context confused | `/compact` |
| Totally wrong direction | Exit, run `claude` fresh |
| Vague request | `/challenge` before building |
| UI looks wrong | `/design-check` |
| Secret detected | `/security-check`, fix immediately |
| Vulnerable dependency | `/deps`, fix or log debt |
| Taking shortcut | Log in `TECH-DEBT.md` |
| Before deploy | `/pre-release` |

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
