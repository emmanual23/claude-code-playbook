#!/bin/bash

# Claude Code Playbook - Global Command Installer
# Run: curl -fsSL [URL] | bash
# Or:  ./install-global-command.sh

set -e

COMMANDS_DIR="$HOME/.claude/commands"

echo "🚀 Installing Claude Code Playbook global command..."

# Create directory if needed
mkdir -p "$COMMANDS_DIR"

# Check if init-playbook.md exists in current directory
if [ -f "init-playbook.md" ]; then
    cp init-playbook.md "$COMMANDS_DIR/"
    echo "✅ Copied init-playbook.md to $COMMANDS_DIR/"
elif [ -f "playbook-global/init-playbook.md" ]; then
    cp playbook-global/init-playbook.md "$COMMANDS_DIR/"
    echo "✅ Copied init-playbook.md to $COMMANDS_DIR/"
else
    echo "❌ init-playbook.md not found in current directory"
    echo "   Please run this script from the playbook folder"
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Open any project folder"
echo "  2. Run: claude"
echo "  3. Type: /init-playbook"
echo ""
echo "The command will create all playbook files in your project."
