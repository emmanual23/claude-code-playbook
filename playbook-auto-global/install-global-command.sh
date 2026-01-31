#!/bin/bash

# Claude Code Playbook (Autopilot Edition) - Global Command Installer
# Run: ./install-global-command.sh

set -e

COMMANDS_DIR="$HOME/.claude/commands"

echo "Installing Claude Code Playbook (Autopilot Edition) global command..."

# Create directory if needed
mkdir -p "$COMMANDS_DIR"

# Check if init-playbook-auto.md exists in current directory
if [ -f "init-playbook-auto.md" ]; then
    cp init-playbook-auto.md "$COMMANDS_DIR/"
    echo "Copied init-playbook-auto.md to $COMMANDS_DIR/"
elif [ -f "playbook-auto-global/init-playbook-auto.md" ]; then
    cp playbook-auto-global/init-playbook-auto.md "$COMMANDS_DIR/"
    echo "Copied init-playbook-auto.md to $COMMANDS_DIR/"
else
    echo "init-playbook-auto.md not found in current directory"
    echo "   Please run this script from the playbook folder"
    exit 1
fi

echo ""
echo "Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Open any project folder"
echo "  2. Run: claude"
echo "  3. Type: /init-playbook-auto"
echo ""
echo "The command will create all playbook files in your project."
echo "Run /research to start discovery. After roadmap approval, run /autopilot."
