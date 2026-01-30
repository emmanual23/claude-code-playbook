# The AI-Native CLI Playbook (Final Version)

A workflow system for building apps with Claude Code when you want speed, predictability, and consistency—without deep technical expertise.

---

## 1. Team Structure

| Role | Tool | Responsibility |
|------|------|----------------|
| Product Manager | You | Strategy, requirements, approval gates |
| Architect + Engineer | Claude Code (Plan Mode → Execute) | Plans, builds, tests, commits |
| Visual Design | Claude Code + Screenshots (v0.dev only when Claude fails) | UI implementation |
| Quality Gate | Claude Code (`/audit`, `/design-check`) | Security, logic, and design review |

---

## 2. Setup (Do This Once Per Project)

### A. Project Structure

```
your-project/
├── CLAUDE.md                    # Constitution (copy from this playbook)
├── .claudeignore                # Files for Claude to ignore
├── .claude/
│   ├── settings.json            # Hooks and permissions
│   └── commands/                # Slash commands (22 total)
│       ├── research.md          # Product research
│       ├── prd.md               # Create PRD
│       ├── architecture.md      # Technical architecture
│       ├── adr.md               # Architecture decision records
│       ├── roadmap.md           # Create roadmap
│       ├── sprint.md            # Create GitHub issues from roadmap
│       ├── infra.md             # Provision infrastructure
│       ├── fix-issue.md         # Implement GitHub issues (primary)
│       ├── build.md             # Staged build process (ad-hoc)
│       ├── milestone.md         # Transition between milestones
│       ├── audit.md             # Security review
│       ├── security-check.md    # Shift-left security scan
│       ├── deps.md              # Dependency audit
│       ├── design-check.md      # UI consistency check
│       ├── pre-release.md       # Pre-release checklist
│       ├── status.md            # View/update project status
│       ├── backlog.md           # View ready vs. undefined features
│       ├── checkpoint.md        # Save progress mid-session
│       ├── resume-work.md       # Continue from last session
│       ├── setup.md             # Check environment configuration
│       ├── onboard.md           # Codebase orientation
│       └── challenge.md         # Surface ambiguity
├── .github/
│   ├── workflows/
│   │   └── claude.yml           # @claude automation
│   └── ISSUE_TEMPLATE/
│       ├── feature.md           # Feature request template
│       └── bug.md               # Bug report template
├── docs/
│   ├── planning/                # Planning documents
│   │   ├── STATUS.md            # Current project state (always read first)
│   │   ├── TECH-DEBT.md         # Technical debt tracker
│   │   ├── INFRASTRUCTURE.md    # External service requirements
│   │   ├── research.md          # Market research (created by /research)
│   │   ├── prd.md               # Product requirements (created by /prd)
│   │   ├── architecture.md      # Technical structure (created by /architecture)
│   │   └── roadmap.md           # Milestones (created by /roadmap)
│   ├── decisions/               # Architecture Decision Records
│   │   └── README.md            # ADR index
│   └── design-references/       # Screenshot references
└── [your app code]
```

### B. Copy the Files

1. Copy `CLAUDE.md` to your project root
2. Copy the `.claude/commands/` folder to your project
3. Create `docs/design-references/` folder
4. Fill in the PROJECT CONTEXT section of CLAUDE.md for your specific app

### C. Model Strategy

Run `/model` in Claude Code and select:

**"Use Opus 4.5 in plan mode, Sonnet 4.5 otherwise"**

- Opus (stronger reasoning) for: planning, assumption checking, architecture decisions
- Sonnet (faster execution) for: writing code, running tests, routine tasks

### D. Design References Folder

1. When you see a UI pattern you like (on Stripe, Linear, FT, etc.), screenshot it
2. Save to `/docs/design-references/` with a descriptive name
3. Reference in prompts: "Build the sidebar. Match the style in `/docs/design-references/stripe-sidebar.png`"

### E. Connect GitHub (Required for Full Workflow)

**Step 1: Get a GitHub Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with scopes: `repo`, `read:org`, `read:user`
3. Copy the token

**Step 2: Install GitHub MCP Server**
```powershell
claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer YOUR_GITHUB_PAT"
```

**Step 3: Install Claude GitHub App (enables @claude mentions)**
```
# In Claude Code terminal:
/install-github-app
```

Follow the prompts to:
1. Install the Claude app on your repo
2. Add your Anthropic API key to repo secrets (Settings → Secrets → Actions → New secret → ANTHROPIC_API_KEY)
3. Merge the generated workflow file

**Step 4: Copy GitHub Templates**
Copy these folders from the playbook to your project:
- `.github/workflows/claude.yml` - Enables @claude automation
- `.github/ISSUE_TEMPLATE/` - Structured issues for better Claude implementations

### F. GitHub Workflow Summary

After setup, you can:

| Action | How |
|--------|-----|
| Implement an issue from CLI | `/fix-issue 42` |
| Implement an issue from GitHub | Add `claude` label to any issue |
| Get Claude's help on a PR | Comment `@claude review this` or `@claude fix the tests` |
| Create commits | Tell Claude "commit with an appropriate message" |
| Create PRs | Tell Claude "create a PR for this branch" |
| Create branches | Tell Claude "create a branch for this feature" |

---

## 3. Discovery Phase (New Products)

Run this phase once when starting a new product idea. Skip if adding features to an existing product with established requirements.

### Step 1: Research

```
Type: /research
Input: "I want to build a personal finance tracker"

What happens:
- Claude researches the market (competitors, user needs, gaps)
- Creates docs/planning/research.md
- Updates STATUS.md

Action: Review findings. Provide feedback. Say "proceed to PRD" when satisfied.
```

### Step 2: Product Requirements

```
Type: /prd

What happens:
- Claude reads research.md
- Proposes features (MVP vs later)
- Creates docs/planning/prd.md
- Updates STATUS.md

Action: Review features and priorities. Adjust as needed. Say "proceed to architecture".
```

### Step 3: Architecture

```
Type: /architecture

What happens:
- Claude reads prd.md
- Designs data model (tables, relationships)
- Defines API routes
- Plans component structure
- Identifies infrastructure requirements (databases, APIs, hosting)
- Creates docs/planning/architecture.md
- Creates docs/planning/INFRASTRUCTURE.md
- Updates STATUS.md

Action: Review technical decisions. Say "proceed to roadmap".
```

### Step 4: Roadmap

```
Type: /roadmap

What happens:
- Claude reads prd.md and architecture.md
- Groups features into milestones
- Breaks features into implementable tasks
- Creates docs/planning/roadmap.md
- Updates STATUS.md

Action: Review milestones. Say "proceed to sprint planning".
```

### Step 5: Sprint Planning

```
Type: /sprint
Input: (optionally specify milestone, e.g., "Milestone 1")

What happens:
- Claude reads roadmap.md and INFRASTRUCTURE.md
- Creates infrastructure issue if services need provisioning
- Creates GitHub issues for each task
- Links issues to milestones (with dependencies)
- Updates STATUS.md with issue numbers

Output: List of created issues. If infrastructure needed, it's issue #0.
```

**Tip:** Run `/backlog` anytime to see which features are fully defined and ready to build vs. which need more definition.

### Step 6: Provision Infrastructure (If Needed)

```
Type: /infra

What happens:
- Claude reads INFRASTRUCTURE.md
- Guides through provisioning each service step-by-step
- Helps set up environment variables
- Runs database migrations
- Verifies connections
- Updates INFRASTRUCTURE.md status

Action: Follow prompts. Say "done" after each step.

Skip this step if INFRASTRUCTURE.md shows all 🟢.
```

Now you're ready to build with `/fix-issue [number]`.

---

## 4. Build Phase (Day-to-Day)

### Two Workflows

| Workflow | When to Use | Commands |
|----------|-------------|----------|
| **Issue-driven** (recommended) | Following /sprint, have GitHub issues | `/fix-issue [#]` |
| **Ad-hoc** | Quick prototypes, no issue created | `/build` |

**Primary workflow:** After `/sprint` creates issues, use `/fix-issue` repeatedly:

```
/fix-issue 1  →  PR  →  "Next: #2?" →  /fix-issue 2  →  PR  →  ...
```

### Starting a Session

| Situation | Command |
|-----------|---------|
| First time on a project | `/status` (creates STATUS.md if needed) |
| Continuing work | `/resume-work` (reads STATUS.md, shows where you left off) |
| What's ready to build? | `/backlog` (shows defined vs. undefined features) |
| Context getting long | `/compact` |
| Quick status check | `/status` |

### Issue-Driven Workflow (Recommended)

```
Type: /fix-issue 1
Input: (issue number from /sprint)

What happens:
- Reads GitHub issue #1
- Plans implementation (with your approval)
- Builds in stages (Data → Logic → UI → Test → Verify)
- Commits after each stage
- Creates PR
- Suggests next issue

Action: Say "proceed" after each stage. Say "next" to continue to next issue.
```

### Ad-Hoc Workflow (When No Issue Exists)

Use `/build` for quick prototypes or requests not worth creating an issue for:

```
Press: Shift+Tab (enters Plan Mode)
Say: "I want a dashboard widget showing monthly revenue"

What happens:
- Claude enters Plan Mode (read-only exploration)
- Reads codebase, STATUS.md, PRD, architecture
- Proposes implementation approach
- Waits for your approval before writing code

Action: Review the plan. Ask questions. Say "proceed" when satisfied.
```

Then run `/build`:
```
Type: /build
Input: "Implement the revenue widget based on the approved plan"

What happens:
Claude executes in stages, pausing for approval:

Stage 1 (Data): "Here's the schema change..." → You: "proceed"
Stage 2 (Logic): "Here's the API route..." → You: "proceed"  
Stage 3 (UI): "Here's the component..." → You: "proceed"
Stage 4 (Unit Tests): "Here are the unit tests..." → You: "proceed"
Stage 5 (E2E Tests): "Here are the E2E tests..." → You: "proceed" (if UI changed)
Stage 6 (Verify): "All tests pass." → You: "proceed"
```

### Visual Direction (Both Workflows)

**Option A - Reference screenshot:**
> "Build the revenue chart. Match the style in `/docs/design-references/stripe-chart.png`"

**Option B - Describe in design system terms:**
> "Build a card showing revenue. Use the standard card style from our design system. Bar chart inside, muted colors, no decorations."

**Option C - Use v0.dev (only if Claude's output fails twice):**
1. Go to v0.dev
2. Prompt: "Revenue widget, minimal style, shadcn/ui, slate color palette"
3. Copy code
4. Tell Claude: "Use this UI code as the starting point: [paste]"

### Design Check

```
Type: /design-check

What happens:
- Claude reviews UI against DESIGN SYSTEM rules
- Reports any violations (wrong colors, spacing issues, forbidden patterns)

Action: If violations found, say "Fix the violations"
```

### Step 5: Security & Audit

```
Type: /security-check
Then: /deps
Then: /audit

What happens:
- /security-check: Scans for secrets, vulnerable dependencies, risky code patterns
- /deps: Checks for outdated packages and known vulnerabilities
- /audit: Reviews logic, accessibility, general code quality

Action: Fix any CRITICAL or HIGH issues before shipping
```

### Step 6: Ship

```
Option A - Let Claude handle it:
"Commit these changes with an appropriate message, then create a PR"

Option B - Manual:
Input: "Run all tests. If passing, commit with message 'feat: add revenue widget'"
Then: git push origin main

STATUS.md is updated automatically with completion.
```

### Ending a Session

```
Type: /checkpoint

What happens:
- Claude saves current progress to STATUS.md
- Records exactly where you stopped
- Notes any pending decisions
- Sets clear next steps

Next time: Run /resume-work to pick up where you left off.
```

### Completing Milestones

When all issues in a milestone are done, `/fix-issue` will detect it:

```
✅ ISSUE #14 COMPLETE

🎉 MILESTONE 1 COMPLETE!
All issues in Milestone 1 are now closed.

Next: Run `/milestone` to start Milestone 2
```

Then run `/milestone`:

```
Type: /milestone

What happens:
- Verifies all issues in current milestone are closed
- Closes the milestone in GitHub
- Creates issues for next milestone (if needed)
- Updates STATUS.md and roadmap.md
- Recommends first issue to work on

Action: Say "proceed" to start the next milestone.
```

---

## 5. Session Management

| Situation | Command |
|-----------|---------|
| Start of any session | `/resume-work` (reads STATUS.md for project state) |
| Before stepping away | `/checkpoint` (saves progress to STATUS.md) |
| Quick status check | `/status` |
| Context getting long/Claude forgetting | `/compact` (native) |
| Switch to a different past session | `/resume` (native) |
| Quick commit with auto-message | `claude commit` |
| Reference a specific file in prompt | `@filename` |
| Show Claude a visual reference | Paste screenshot directly in terminal |

---

## 6. Native Claude Code Commands

These are built-in commands — learn them, they're powerful:

| Command / Shortcut | What It Does |
|--------------------|--------------|
| `Shift+Tab` | **Plan Mode** — Claude explores and proposes without writing code |
| `Escape` | **Stop immediately** — Press when Claude goes wrong direction |
| `Escape` `Escape` | **Rewind** — Restore conversation AND code to last checkpoint |
| `/clear` | Wipe context, start fresh (use between unrelated tasks) |
| `/compact` | Summarize conversation to reduce tokens |
| `/compact Focus on [X]` | Summarize but preserve specific topic |
| `/resume` | Continue a previous chat session |
| `/rewind` | Restore to previous checkpoint |
| `/cost` | Check token usage |
| `/model` | Switch models (Opus/Sonnet/Haiku) |
| `/doctor` | Diagnose configuration issues |

**When to use what:**
- **`/clear`** — Switching to unrelated task, completed a milestone, context messy
- **`/compact`** — Context filling up, want to preserve some history
- **`/rewind`** — Claude made changes you want to undo
- **Plan Mode** — Uncertain about approach, change spans multiple files

---

## 7. Escape Hatch Rules

| Signal | Action |
|--------|--------|
| Same error 3+ times | Stop. Say: "Do not retry. Explain what you think is causing this." |
| Claude going wrong direction | Press `Escape` immediately to stop |
| Need to undo recent changes | Press `Escape` twice or use `/rewind` |
| Output doesn't match request | Use `/challenge` to surface misunderstanding |
| Context getting full | Run `/compact` before it auto-compacts at 95% |
| Fundamentally wrong direction | Run `/clear` and re-explain from scratch |
| Your instructions were vague | Use `/challenge` before Claude builds anything |
| UI looks wrong | Run `/design-check` to identify specific violations |
| Hardcoded secret detected | Run `/security-check`, fix immediately |
| Dependency vulnerability found | Run `/deps`, fix critical issues or log to tech debt |
| Taking a shortcut | Log in `TECH-DEBT.md` with remediation plan |
| Before deploying | Run `/pre-release` to verify everything is ready |

---

## 8. Context Management

Claude's context window fills up fast. Manage it proactively:

**Clear between tasks:**
```
/clear
```
Use after completing a feature, before starting unrelated work.

**Compact when context fills:**
```
/compact Focus on the authentication implementation
```
Tells Claude what to preserve during summarization.

**Be specific in prompts:**
```
# Bad (forces Claude to search)
"Fix the bug"

# Good (direct path)
"Fix the off-by-one error in utils/pagination.ts line 42"
```

**Use file references:**
```
@src/auth/login.ts   — Reference specific file
@src/components/     — Reference directory
```

**Token-saving tips:**
- Keep CLAUDE.md under 500 lines
- Disable unused MCP servers (they consume context)
- Use sub-agents for heavy tasks (test runs, log analysis)
- Clear after every distinct task completion

**Sub-agents for heavy work:**
```
"Run the test suite in a sub-agent and report results"
"Analyze the error logs in a sub-agent"
```
Sub-agents run in isolated context, keeping your main session clean.

---

## 9. Pro Tips

**File references save tokens:**
```
@src/auth/login.ts           # Specific file
@src/components/             # Entire directory
@docs/planning/STATUS.md     # Planning docs
```

**Headless mode for automation:**
```bash
claude -p "Fix lint errors in src/" --output-format json
```
Use in CI/CD, pre-commit hooks, or scripts.

**Skip permissions for autonomous work:**
```bash
claude --dangerously-skip-permissions
```
Use when you trust Claude to run without confirmation prompts.

**Name sessions before clearing:**
```
/rename "auth-refactor-jan29"
/clear
```
Makes it easy to `/resume` later.

**MCP servers to consider:**
| Server | Purpose |
|--------|---------|
| GitHub | Issues, PRs, repo management |
| Puppeteer | Browser automation, UI testing |
| PostgreSQL | Database queries |
| Sentry | Error monitoring |
| Slack | Team notifications |

Install with: `claude mcp add <server-name>`

**Disable unused MCP servers:**
Each enabled MCP server consumes context. Use `/mcp` to manage.

---

## 10. Quick Reference Card

### Discovery Phase
| Goal | Command |
|------|---------|
| Research a product idea | `/research` |
| Create product requirements | `/prd` |
| Define technical architecture | `/architecture` |
| Document architecture decisions | `/adr` |
| Create milestone roadmap | `/roadmap` |
| Create GitHub issues from roadmap | `/sprint` |
| Provision external services | `/infra` |

### Build Phase
| Goal | Command |
|------|---------|
| **Implement a GitHub issue** | `/fix-issue [number]` ⭐ Primary |
| Build without an issue (ad-hoc) | `/build` |
| Check UI against design system | `/design-check` |
| Security and logic review | `/audit` |
| Security scan (shift-left) | `/security-check` |
| Audit dependencies | `/deps` |
| Pre-release checklist | `/pre-release` |

### Session Management
| Goal | Command |
|------|---------|
| View/update project status | `/status` |
| Continue from last session | `/resume-work` |
| Save progress before stepping away | `/checkpoint` |
| Compress long context | `/compact` |
| Switch models | `/model` |

### Utilities
| Goal | Command |
|------|---------|
| Check environment setup | `/setup` |
| Get Claude up to speed on codebase | `/onboard` |
| Question your vague request | `/challenge` |
| Reference a file | `@filename` in prompt |
| Visual reference | Paste screenshot or reference `/docs/design-references/` |
| Commit changes | "commit with an appropriate message" |
| Create a PR | "create a PR for this branch" |
| Create a branch | "create a branch for this feature" |

---

## 11. New Project Checklist

### Initial Setup
- [ ] Copy `CLAUDE.md` to project root
- [ ] Fill in PROJECT CONTEXT section with your app's details
- [ ] Copy `.claudeignore` to project root
- [ ] Copy `.claude/` folder to project (commands + settings.json)
- [ ] Copy `.github/` folder to project (workflows + issue templates)
- [ ] Copy `docs/` folder structure to project
- [ ] Add 2-3 screenshot references to `/docs/design-references/`

### GitHub Setup
- [ ] Set up GitHub MCP server (see Section 2.E)
- [ ] Run `/install-github-app` to enable @claude mentions
- [ ] Add `ANTHROPIC_API_KEY` to repo secrets

### First Session
- [ ] Run `/setup` to check environment readiness
- [ ] Fix any missing dependencies reported by `/setup`
- [ ] Run `/research` to start product discovery (new product)
- [ ] Or run `/onboard` if this is an existing codebase

---

## 12. Files Included

```
playbook/
├── README.md                    # This file
├── CLAUDE.md                    # Constitution template
├── .claudeignore                # Files for Claude to ignore
├── .claude/
│   ├── settings.json            # Hooks configuration
│   └── commands/
│       │── # Discovery Phase
│       ├── research.md          # Product research
│       ├── prd.md               # Product requirements document
│       ├── architecture.md      # Technical architecture
│       ├── adr.md               # Architecture decision records
│       ├── roadmap.md           # Milestone planning
│       ├── sprint.md            # Create GitHub issues from roadmap
│       ├── infra.md             # Provision infrastructure
│       │
│       │── # Build Phase
│       ├── fix-issue.md         # Implement GitHub issues (primary)
│       ├── build.md             # Ad-hoc builds (no issue)
│       ├── audit.md             # Security and logic review
│       ├── security-check.md    # Shift-left security scan
│       ├── deps.md              # Dependency audit
│       ├── design-check.md      # UI consistency check
│       ├── pre-release.md       # Pre-release checklist
│       │
│       │── # Session Management
│       ├── status.md            # View/update project status
│       ├── checkpoint.md        # Save progress to STATUS.md
│       ├── resume-work.md       # Read STATUS.md and continue
│       │
│       │── # Utilities
│       ├── setup.md             # Environment check
│       ├── onboard.md           # Codebase orientation
│       └── challenge.md         # Surface ambiguity
├── .github/
│   ├── workflows/
│   │   └── claude.yml           # GitHub Action for @claude automation
│   └── ISSUE_TEMPLATE/
│       ├── feature.md           # Feature request template
│       └── bug.md               # Bug report template
└── docs/
    ├── planning/
    │   ├── STATUS.md            # Status tracking template
    │   ├── TECH-DEBT.md         # Technical debt tracker
    │   └── INFRASTRUCTURE.md    # External service requirements
    ├── decisions/
    │   └── README.md            # ADR index and template
    └── design-references/
        └── README.md            # Design reference instructions
```

---

## 13. Customization

### Changing the Tech Stack

Edit the TECH STACK section in CLAUDE.md. The commands will still work.

### Changing the Design System

Edit the DESIGN SYSTEM section in CLAUDE.md. Update:
- Color palette
- Typography rules
- Component styles
- Forbidden patterns

### Adding New Commands

Create a new `.md` file in `.claude/commands/`. Format:

```markdown
---
description: What this command does (shows in Claude's command list)
---

# Role: [Role name]

[Instructions for Claude]
```
