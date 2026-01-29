# Claude Code Playbook - Setup Guide

Two ways to use this playbook:

1. **GitHub Template** - For new projects (fastest)
2. **Global `/init-playbook` Command** - For new or existing projects (most flexible)

You should set up both.

---

## Part 1: GitHub Template Repository

### Step 1: Create the Template Repo

```bash
# Create a new repo for your template
gh repo create claude-playbook-template --public --description "My Claude Code project template"
cd claude-playbook-template
```

### Step 2: Copy Playbook Files

Copy all files from this playbook into the repo:

```
claude-playbook-template/
├── CLAUDE.md
├── .claude/
│   └── commands/
│       ├── plan.md
│       ├── build.md
│       ├── audit.md
│       ├── onboard.md
│       ├── challenge.md
│       ├── design-check.md
│       ├── fix-issue.md
│       ├── research.md
│       ├── prd.md
│       ├── roadmap.md
│       ├── sprint.md
│       ├── status.md
│       ├── checkpoint.md
│       └── resume-work.md
├── .github/
│   ├── workflows/
│   │   └── claude.yml
│   └── ISSUE_TEMPLATE/
│       ├── feature.md
│       └── bug.md
├── docs/
│   ├── planning/
│   │   └── STATUS.md
│   └── design-references/
│       └── README.md
└── README.md              # Template instructions (see below)
```

### Step 3: Create Template README

Replace the README.md in your template with:

```markdown
# [Project Name]

> Created from [your-username/claude-playbook-template](https://github.com/your-username/claude-playbook-template)

## Quick Start

1. **Fill in CLAUDE.md** - Update the PROJECT CONTEXT section with your project details
2. **Add design references** - Drop 2-3 screenshots into `docs/design-references/`
3. **Set up GitHub integration:**
   ```bash
   # Add your Anthropic API key to repo secrets
   # Go to: Settings → Secrets → Actions → New secret → ANTHROPIC_API_KEY
   ```
4. **Start working:**
   ```bash
   claude
   > /status          # Initialize status tracking
   > /research        # Start product discovery
   ```

## Commands Available

| Phase | Commands |
|-------|----------|
| Discovery | `/research`, `/prd`, `/roadmap`, `/sprint` |
| Build | `/plan`, `/build`, `/fix-issue`, `/audit`, `/design-check` |
| Session | `/status`, `/checkpoint`, `/resume-work` |
| Utility | `/onboard`, `/challenge` |

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Project constitution and rules
- [docs/planning/STATUS.md](./docs/planning/STATUS.md) - Current project state
```

### Step 4: Mark as Template

1. Go to your repo on GitHub
2. Settings → General → Check "Template repository"
3. Save

### Step 5: Using the Template

For every new project:

```bash
# Option A: GitHub CLI
gh repo create my-new-app --template YOUR_USERNAME/claude-playbook-template --clone
cd my-new-app

# Option B: GitHub Web
# Click "Use this template" button on the repo page
```

---

## Part 2: Global `/init-playbook` Command

This command works anywhere—new folders, existing repos, even repos created from the template (to update commands).

### Step 1: Create Global Commands Folder

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
```

**Mac/Linux:**
```bash
mkdir -p ~/.claude/commands
```

### Step 2: Copy the Init Command

**Windows (PowerShell):**
```powershell
# Option A: Run the installer script
.\install-global-command.ps1

# Option B: Manual copy
Copy-Item "init-playbook.md" -Destination "$env:USERPROFILE\.claude\commands\"
```

**Mac/Linux:**
```bash
# Option A: Run the installer script
./install-global-command.sh

# Option B: Manual copy
cp init-playbook.md ~/.claude/commands/
```

### Step 3: Verify It Works

```powershell
# Windows
cd $env:TEMP
mkdir test-project
cd test-project
claude
# Then type: /init-playbook
```

```bash
# Mac/Linux
cd /tmp
mkdir test-project && cd test-project
claude
# Then type: /init-playbook
```

You should see Claude create all the playbook files.

### Step 4: Updating the Command

When you improve your playbook:
1. Update the init-playbook.md in your global commands folder:
   - Windows: `$env:USERPROFILE\.claude\commands\init-playbook.md`
   - Mac/Linux: `~/.claude/commands/init-playbook.md`
2. Run `/init-playbook` in existing projects and choose "Update all commands"

---

## Recommended Workflow

### For Brand New Projects

```bash
# Create from template (includes git setup)
gh repo create my-app --template YOUR_USERNAME/claude-playbook-template --clone
cd my-app

# Start Claude and begin
claude
> Fill in CLAUDE.md PROJECT CONTEXT section
> /status
> /research
```

### For Existing Projects

```bash
cd existing-project

# Add playbook
claude
> /init-playbook

# Get Claude oriented
> /onboard
> /status
```

### Keeping Projects Updated

When you improve your playbook:

```bash
cd any-project
claude
> /init-playbook
> Choose option 1: "Update all commands"
```

---

## One-Time Setup Checklist

- [ ] Create GitHub template repo (`claude-playbook-template`)
- [ ] Copy all playbook files to template repo
- [ ] Mark repo as template in GitHub settings
- [ ] Create `~/.claude/commands/` folder
- [ ] Copy `init-playbook.md` to global commands
- [ ] Test both methods work

---

## File Reference

| File | Purpose | Location |
|------|---------|----------|
| `init-playbook.md` | Global command to scaffold projects | `~/.claude/commands/` |
| `CLAUDE.md` | Project constitution | Project root |
| `STATUS.md` | Session state tracking | `docs/planning/` |
| `*.md` commands | Slash commands | `.claude/commands/` |
| `claude.yml` | GitHub Actions workflow | `.github/workflows/` |

---

## Troubleshooting

**`/init-playbook` not found:**
- Verify file exists at `~/.claude/commands/init-playbook.md`
- Restart Claude Code

**Template not appearing:**
- Verify "Template repository" is checked in GitHub settings
- Template must be public (or you need access)

**Commands not working after update:**
- Run `/init-playbook` → Option 1 to refresh commands
- Or manually copy new command files

**GitHub Actions not triggering:**
- Verify `ANTHROPIC_API_KEY` is in repo secrets
- Check Actions are enabled for the repo
