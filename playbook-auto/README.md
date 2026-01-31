# The AI-Native CLI Playbook — Autopilot Edition

A workflow system for building apps with Claude Code featuring **guided discovery** followed by **fully autonomous build**. After you approve the roadmap, Claude runs sprint planning, implementation, testing, and PR creation without stopping.

---

## How It Differs From the Guided Playbook

| Aspect | Guided (`playbook/`) | Autopilot (`playbook-auto/`) |
|--------|---------------------|------------------------------|
| Discovery | Guided (you approve each step) | Guided (same) |
| Build | Staged with approval gates | Fully autonomous |
| Decisions | Claude asks you | Claude decides + logs ADR |
| PRs | One per issue | One per milestone |
| Branching | One branch per issue | One branch per milestone |
| Commands | 23 total | 18 total (no build/fix-issue/sprint/milestone/backlog/challenge) |

---

## Two Phases

### Phase 1: Guided Discovery (You Drive)

```
/research → /prd → /architecture → /roadmap
```

You review and approve each step. This is identical to the guided playbook. The approval boundary is the **roadmap** — once you approve it, autopilot can take over.

### Phase 2: Autonomous Build (Claude Drives)

```
/autopilot [milestone]
```

Claude autonomously:
1. Creates GitHub issues from the roadmap
2. Implements each issue (data → logic → UI → tests)
3. Makes architectural decisions and logs them as ADRs
4. Runs the full quality gate (tests, lint, build, security, coverage)
5. Creates a milestone PR with a complete summary
6. Reports what was completed, skipped, and decided

---

## Prerequisites

Before running `/autopilot`:

1. **Discovery complete** — roadmap.md must exist with milestones
2. **Infrastructure provisioned** — all services in INFRASTRUCTURE.md must be 🟢
3. **GitHub CLI authenticated** — `gh auth status` must pass
4. **Test/lint scripts configured** — `npm run test` and `npm run lint` must work

---

## Quick Start

1. Install the playbook in your project (run `/init-playbook-auto` globally, or copy files manually)
2. Run `/research` to start product discovery
3. Work through `/prd` → `/architecture` → `/roadmap`
4. Run `/infra` to provision all external services
5. Run `/autopilot` — Claude builds Milestone 1 autonomously
6. Review the PR, merge, then run `/autopilot` for the next milestone

---

## What to Expect

### ADRs (Architecture Decision Records)
When Claude faces an ambiguous decision during autonomous build, it makes the best choice and documents it as an ADR in `docs/decisions/`. Review these in the PR.

### Failure Handling
- **Test failures:** Claude retries up to 3 times per stage
- **Persistent failures:** Issue is skipped, logged as a blocker in STATUS.md
- **Blocked issues:** If an issue depends on a skipped issue, it's also skipped
- **All skipped issues** are listed in the PR body and final summary

### Coverage
Coverage uses a soft threshold (60%). Claude logs the coverage percentage but does not block the PR. You decide if coverage is adequate when reviewing.

---

## Handling Skipped Issues

After autopilot completes, some issues may be skipped. To resolve them:

1. Review the "Skipped" section in the PR body
2. Fix the underlying blocker manually or provide guidance
3. Run `/autopilot` again — it will pick up remaining issues

Alternatively, switch to the guided playbook's `/fix-issue` command for manual control over specific issues.

---

## Commands Included (18)

### Discovery (guided)
| Command | Purpose |
|---------|---------|
| `/research` | Product research |
| `/prd` | Product requirements |
| `/architecture` | Technical architecture |
| `/roadmap` | Milestone planning |
| `/adr` | Architecture decision records |
| `/enhance` | Research & plan enhancements |

### Autonomous Build
| Command | Purpose |
|---------|---------|
| `/autopilot` | Run autonomous build for a milestone |

### Infrastructure & Quality
| Command | Purpose |
|---------|---------|
| `/infra` | Provision external services |
| `/setup` | Check environment readiness |
| `/audit` | Security and logic review |
| `/security-check` | Shift-left security scan |
| `/deps` | Dependency audit |
| `/design-check` | UI consistency check |
| `/pre-release` | Pre-release checklist |

### Session Management
| Command | Purpose |
|---------|---------|
| `/status` | View/update project status |
| `/checkpoint` | Save progress to STATUS.md |
| `/resume-work` | Continue from last session |

### Utilities
| Command | Purpose |
|---------|---------|
| `/onboard` | Get Claude up to speed on existing code |

---

## Commands NOT Included

These guided build commands are replaced by `/autopilot`:

- `/build` — autopilot builds autonomously
- `/fix-issue` — autopilot handles all issues in the milestone
- `/sprint` — autopilot creates issues internally
- `/milestone` — autopilot advances milestones internally
- `/backlog` — autopilot builds everything in the milestone
- `/challenge` — autopilot decides and logs as ADR

---

## Project Structure

```
your-project/
├── CLAUDE.md                    # Constitution
├── .claudeignore                # Files for Claude to ignore
├── .claude/
│   ├── settings.json            # Hooks and permissions
│   └── commands/                # 18 slash commands
│       ├── research.md
│       ├── prd.md
│       ├── architecture.md
│       ├── roadmap.md
│       ├── adr.md
│       ├── enhance.md
│       ├── autopilot.md         # The autonomous orchestrator
│       ├── infra.md
│       ├── setup.md
│       ├── audit.md
│       ├── security-check.md
│       ├── deps.md
│       ├── design-check.md
│       ├── pre-release.md
│       ├── status.md
│       ├── checkpoint.md
│       ├── resume-work.md
│       └── onboard.md
├── .github/
│   ├── workflows/claude.yml
│   └── ISSUE_TEMPLATE/
│       ├── feature.md
│       └── bug.md
├── docs/
│   ├── planning/
│   │   ├── STATUS.md
│   │   ├── TECH-DEBT.md
│   │   └── INFRASTRUCTURE.md
│   ├── decisions/
│   │   └── README.md
│   └── design-references/
│       └── README.md
└── [your app code]
```

---

## Customization

### Changing the Tech Stack
Edit the TECH STACK section in CLAUDE.md. Autopilot adapts to whatever stack is configured.

### Changing the Design System
Edit the DESIGN SYSTEM section in CLAUDE.md. Autopilot follows these rules during UI implementation.
