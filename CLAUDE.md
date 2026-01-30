# CLAUDE.md — Playbook Development

## Project Context

This is the Claude Code Playbook — a workflow system of 22 slash commands that users copy into their projects. This repo is the **source**, not a consumer of the playbook.

Users copy `playbook/` into their projects. `playbook-global/init-playbook.md` is a global installer that bootstraps everything.

## Repository Structure

```
playbook/                        # Source files users copy
├── .claude/commands/            # 22 slash commands (the core product)
├── CLAUDE.md                    # Constitution template for user projects
├── docs/planning/               # Templates (STATUS.md, TECH-DEBT.md, INFRASTRUCTURE.md)
├── docs/decisions/              # ADR template
├── .github/                     # Workflow + issue templates
└── README.md                    # User-facing documentation

playbook-global/                 # Global installer
├── init-playbook.md             # All-in-one installer command
├── install-global-command.ps1   # Windows installer
└── install-global-command.sh    # Mac/Linux installer

STATUS.md                        # Development tracking
CHANGELOG.md                     # Release history
E2E-REVIEW.md                    # Review report for v1.1.0
CHEATSHEET.md                    # Quick reference card
```

## Command Editing Rules

1. Every command needs: `description` frontmatter, `# Role:` heading, clear steps
2. Format steps as `**Step N - Name**` with code blocks using triple backticks
3. End discovery commands with: `Ready to proceed? Next: /command`
4. Include a `## Related Commands` section where helpful
5. Include a `## Rollback` section for commands that create or modify files
6. Keep commands self-contained but cross-reference appropriately

## File Conventions

- Commands added to `playbook/.claude/commands/` **must also** be added to `playbook-global/init-playbook.md`
- Update command counts in README.md, CHANGELOG.md, and CHEATSHEET.md when adding/removing commands
- Update `STATUS.md` after significant changes

## Workflow Chain

Commands follow this sequence — preserve the chain when editing:

```
/research → /prd → /architecture → /roadmap → /sprint → /infra → /fix-issue (loop) → /milestone
```

Session commands: `/status`, `/checkpoint`, `/resume-work`
Quality commands: `/audit`, `/security-check`, `/deps`, `/design-check`, `/pre-release`
Utilities: `/setup`, `/onboard`, `/challenge`, `/backlog`, `/build`
