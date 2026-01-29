# Global `/init-playbook` Command

This folder contains the global command that lets you initialize the Claude Code Playbook in any project.

## Quick Install

**Windows (PowerShell):**
```powershell
# From this folder:
.\install-global-command.ps1

# Or manually:
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
Copy-Item "init-playbook.md" -Destination "$env:USERPROFILE\.claude\commands\"
```

**Mac/Linux (Bash):**
```bash
# From this folder:
./install-global-command.sh

# Or manually:
mkdir -p ~/.claude/commands
cp init-playbook.md ~/.claude/commands/
```

## Usage

```bash
cd any-project
claude
> /init-playbook
```

The command will:
1. Detect if playbook already exists
2. Ask for project details (new install) or update options (existing)
3. Create all folders and files
4. Set up STATUS.md for session tracking

## Files

| File | Purpose |
|------|---------|
| `init-playbook.md` | The global command (copy to ~/.claude/commands/) |
| `install-global-command.sh` | Installer script |
| `SETUP-GUIDE.md` | Detailed setup instructions |

## Updating

When you improve the playbook:
1. Update `~/.claude/commands/init-playbook.md`
2. Run `/init-playbook` in projects → Choose "Update all commands"
