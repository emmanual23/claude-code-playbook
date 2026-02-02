---
description: Check environment readiness and guide through configuration
---

# Role: Setup Assistant

## Purpose
Check if all required tools and integrations are configured for the playbook workflow.

## Step 1: Check Core Tools

Run these checks silently and collect results:

```bash
# Git
git --version 2>/dev/null

# Node.js (if JS project)
node --version 2>/dev/null

# npm (if JS project)
npm --version 2>/dev/null

# Python (if Python project)
python3 --version 2>/dev/null

# GitHub CLI
gh --version 2>/dev/null

# Check if logged into GitHub CLI
gh auth status 2>/dev/null
```

## Step 2: Check Project Files

Look for:
- `package.json` or `pyproject.toml` or `Cargo.toml` (project type)
- Test script configured (`npm test`, `pytest`, etc.)
- Lint script configured (`npm run lint`, `ruff`, etc.)
- `.env.example` if app needs environment variables
- `CLAUDE.md` exists
- `.claudeignore` exists
- `docs/planning/STATUS.md` exists

## Step 3: Check GitHub MCP

```bash
# List configured MCP servers
claude mcp list 2>/dev/null | grep -i github
```

## Step 4: Present Results

Format:
```
🔧 ENVIRONMENT CHECK
====================

CORE TOOLS
├── Git: [✅ Installed (version) | ❌ Not found]
├── [Node.js/Python/etc.]: [✅ Installed (version) | ❌ Not found]
├── Package Manager: [✅ Installed | ❌ Not found]
└── GitHub CLI (gh): [✅ Installed & authenticated | ⚠️ Installed but not logged in | ❌ Not found]

GITHUB INTEGRATION
├── GitHub MCP: [✅ Configured | ❌ Not configured]
│   [If not configured:]
│   → Run: claude mcp add github
│   → Need PAT: https://github.com/settings/tokens
│   → Required scopes: repo, read:org, workflow
│
├── GitHub App (@claude): [Cannot verify - check manually]
│   → Run: /install-github-app (if not done)
│
└── ANTHROPIC_API_KEY: [Cannot verify - check repo secrets]
    → Add at: https://github.com/[user]/[repo]/settings/secrets/actions

PROJECT FILES
├── CLAUDE.md: [✅ Found | ❌ Missing - run /init-playbook]
├── .claudeignore: [✅ Found | ⚠️ Missing - recommended]
├── docs/planning/STATUS.md: [✅ Found | ❌ Missing]
├── Test script: [✅ Found | ❌ Missing]
│   **Use web search to verify current best practices and recommended tools for this stack.** Check that installation commands, config formats, and recommended versions are up to date.
│   [If missing, offer to set up:]
│   "No test script found. Would you like me to set up testing?"
│   
│   **For JavaScript/TypeScript projects:**
│   1. Vitest (recommended, fast, Vite-compatible)
│   2. Jest (popular, many integrations)
│   
│   **For Python projects:**
│   1. pytest (recommended, simple and powerful)
│   2. unittest (built-in)
│   
│   [If user selects, run the appropriate setup:]
│   
│   **Vitest setup:**
│   npm install -D vitest @vitest/ui
│   → Add to package.json: "test": "vitest", "test:ui": "vitest --ui"
│   → Create vitest.config.ts with basic config
│   
│   **Jest setup:**
│   npm install -D jest @types/jest ts-jest
│   → Add to package.json: "test": "jest"
│   → Create jest.config.js with basic config
│   
│   **pytest setup:**
│   pip install pytest pytest-cov
│   → Create pytest.ini with basic config
│   → Create tests/ directory
│
├── E2E script: [✅ Found | ⚠️ Missing - recommended for UI projects]
│   [If missing and project has UI, offer to set up:]
│   "No E2E tests found. Would you like me to set up E2E testing?"
│   
│   1. Playwright (recommended, cross-browser, fast)
│   2. Cypress (popular, good DX)
│   
│   **Playwright setup:**
│   npm install -D @playwright/test
│   npx playwright install
│   → Add to package.json: "test:e2e": "playwright test"
│   → Create playwright.config.ts
│   → Create tests/e2e/ directory
│   
│   **Cypress setup:**
│   npm install -D cypress
│   → Add to package.json: "test:e2e": "cypress run", "cypress:open": "cypress open"
│   → Create cypress.config.ts
│
└── Lint script: [✅ Found | ❌ Missing]
    [If missing, suggest based on project type:]
    → Add to package.json: "lint": "eslint ."

OPTIONAL MCP SERVERS
├── Puppeteer: [✅ Configured | ○ Not configured] (UI testing)
├── PostgreSQL: [✅ Configured | ○ Not configured] (database)
└── Sentry: [✅ Configured | ○ Not configured] (error monitoring)

CI/CD PIPELINE
├── GitHub Actions workflow: [✅ Found | ❌ Missing]
│   [If .github/workflows/claude.yml missing:]
│   "No CI workflow found. Would you like me to create one?"
│   
│   **Basic CI workflow includes:**
│   - Runs on: push to main, pull requests
│   - Steps: install deps, lint, test, build
│   - Optional: deploy preview on PR
│   
│   [If user wants it, create .github/workflows/ci.yml:]
│   ```yaml
│   name: CI
│   on: [push, pull_request]
│   jobs:
│     test:
│       runs-on: ubuntu-latest
│       steps:
│         - uses: actions/checkout@v4
│         - uses: actions/setup-node@v4
│         - run: npm ci
│         - run: npm run lint
│         - run: npm test
│   ```
│
├── @claude workflow: [✅ Found | ⚠️ Missing]
│   [If .github/workflows/claude.yml missing but user wants it:]
│   → Create from playbook template (enables @claude mentions in PRs)
│   
└── Branch protection: [Cannot verify - check manually]
    → Recommended: Require PR reviews, require status checks
    → Settings: https://github.com/[user]/[repo]/settings/branches

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKFLOW READINESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Discovery Phase (/research → /prd → /architecture → /roadmap):
[✅ Ready | ❌ Missing: list items]

Autonomous Build (/autopilot):
[✅ Ready | ❌ Blocked - needs: GitHub MCP]

[✅ Ready | ⚠️ Partially ready - needs: list items]

Quality Checks (/audit, /security-check, /deps, /pre-release):
[✅ Ready | ⚠️ Partially ready - needs: test/lint scripts]

CI/CD (@claude mentions):
[✅ Ready | ❌ Blocked - needs: GitHub App, ANTHROPIC_API_KEY]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 5: Prioritized Next Steps

If issues found, list in order of importance:

```
NEXT STEPS (in priority order):

1. [Most blocking issue]
   → [Exact command or action]
   
2. [Second issue]
   → [Exact command or action]

...

Run /setup again after completing these steps.
```

If everything ready:
```
✅ ALL SYSTEMS READY

You can now run the full workflow:
/research → /prd → /architecture → /roadmap → /autopilot

Happy building!
```

## Rollback

This command may create config files (CI workflows, test configs, .env.example). To revert:
```bash
git checkout -- [created config files]
```

## Related Commands

- `/onboard` — Orient Claude to an existing codebase
- `/infra` — Provision external services
- `/research` — Start product discovery (new projects)
- `/status` — View current project state
