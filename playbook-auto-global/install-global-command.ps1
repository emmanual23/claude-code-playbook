# Claude Code Playbook (Autopilot Edition) - Global Command Installer (PowerShell)
# Run: .\install-global-command.ps1

$CommandsDir = "$env:USERPROFILE\.claude\commands"

Write-Host "Installing Claude Code Playbook (Autopilot Edition) global command..." -ForegroundColor Cyan

# Create directory if needed
if (-not (Test-Path $CommandsDir)) {
    New-Item -ItemType Directory -Force -Path $CommandsDir | Out-Null
    Write-Host "   Created: $CommandsDir" -ForegroundColor Gray
}

# Find and copy init-playbook-auto.md
$SourceFile = $null

if (Test-Path "init-playbook-auto.md") {
    $SourceFile = "init-playbook-auto.md"
} elseif (Test-Path "playbook-auto-global\init-playbook-auto.md") {
    $SourceFile = "playbook-auto-global\init-playbook-auto.md"
}

if ($SourceFile) {
    Copy-Item $SourceFile -Destination $CommandsDir -Force
    Write-Host "Copied init-playbook-auto.md to $CommandsDir" -ForegroundColor Green
} else {
    Write-Host "init-playbook-auto.md not found in current directory" -ForegroundColor Red
    Write-Host "   Please run this script from the playbook folder" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Open any project folder"
Write-Host "  2. Run: claude"
Write-Host "  3. Type: /init-playbook-auto"
Write-Host ""
Write-Host "The command will create all playbook files in your project."
Write-Host "Run /research to start discovery. After roadmap approval, run /autopilot."
