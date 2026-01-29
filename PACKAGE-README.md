# Claude Code Playbook - Complete Package

Everything you need to set up an AI-native development workflow with Claude Code.

## What's Included

```
├── playbook/                    # GitHub Template files
│   ├── CLAUDE.md                # Project constitution
│   ├── README.md                # Template usage guide
│   ├── .claude/commands/        # All 14 slash commands
│   ├── .github/                 # Workflows + issue templates
│   └── docs/                    # Planning + design reference folders
│
└── playbook-global/             # Global command setup
    ├── init-playbook.md         # The /init-playbook command
    ├── install-global-command.sh
    ├── SETUP-GUIDE.md           # Detailed instructions
    └── README.md
```

## Quick Start

### Option A: Set Up Both (Recommended)

**1. Install the global command:**

*Windows (PowerShell):*
```powershell
cd playbook-global
.\install-global-command.ps1
```

*Mac/Linux:*
```bash
cd playbook-global
./install-global-command.sh
```

**2. Create GitHub template repo:**
```bash
gh repo create claude-playbook-template --public
cd claude-playbook-template
# Copy playbook contents here (drag and drop, or use cp/Copy-Item)
git add . && git commit -m "Initial playbook template"
git push
# Then mark as template in GitHub Settings
```

**3. Use it:**
```bash
# New project from template:
gh repo create my-app --template YOUR_USERNAME/claude-playbook-template --clone

# Or add to existing project:
cd existing-project
claude
> /init-playbook
```

### Option B: Just the Global Command

*Windows (PowerShell):*
```powershell
cd playbook-global
.\install-global-command.ps1
```

*Mac/Linux:*
```bash
cd playbook-global
./install-global-command.sh
```

Then run `/init-playbook` in any project.

### Option C: Just the Template

Copy `playbook/` contents to a GitHub repo and mark it as a template.

## Commands Reference

| Phase | Commands |
|-------|----------|
| **Discovery** | `/research`, `/prd`, `/roadmap`, `/sprint` |
| **Build** | `/plan`, `/build`, `/fix-issue`, `/audit`, `/design-check` |
| **Session** | `/status`, `/checkpoint`, `/resume-work` |
| **Utility** | `/onboard`, `/challenge`, `/init-playbook` (global) |

## Workflow Overview

```
/init-playbook  →  Set up project structure
       ↓
/research  →  /prd  →  /roadmap  →  /sprint  (Discovery)
       ↓
/fix-issue #N  or  /plan + /build  (Build)
       ↓
/checkpoint  (Save progress)
       ↓
/resume-work  (Next session)
```

## Documentation

- `playbook-global/SETUP-GUIDE.md` - Full setup instructions
- `playbook/README.md` - Day-to-day usage guide
- `playbook/CLAUDE.md` - Project constitution template

## Requirements

- Claude Code CLI installed
- GitHub CLI (`gh`) for GitHub integration
- GitHub account (for template repo)
