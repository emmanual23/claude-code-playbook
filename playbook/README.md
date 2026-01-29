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
├── .claude/
│   └── commands/                # Slash commands (copy from this playbook)
│       ├── plan.md              # Feature planning
│       ├── build.md             # Staged build process
│       ├── audit.md             # Security review
│       ├── security-check.md    # Shift-left security scan
│       ├── deps.md              # Dependency audit
│       ├── onboard.md           # Codebase orientation
│       ├── challenge.md         # Surface ambiguity
│       ├── design-check.md      # UI consistency check
│       ├── fix-issue.md         # Implement GitHub issues
│       ├── research.md          # Product research
│       ├── prd.md               # Create PRD
│       ├── architecture.md      # Technical architecture
│       ├── adr.md               # Architecture decision records
│       ├── roadmap.md           # Create roadmap
│       ├── sprint.md            # Create GitHub issues from roadmap
│       ├── status.md            # View/update project status
│       ├── checkpoint.md        # Save progress mid-session
│       └── resume-work.md       # Continue from last session
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
- Creates docs/planning/architecture.md
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
- Claude reads roadmap.md
- Creates GitHub issues for each task
- Links issues to milestones
- Updates STATUS.md with issue numbers

Output: List of created issues with recommended build order.
Now you're ready to build with /fix-issue [number].
```

---

## 4. Build Phase (Day-to-Day)

### Starting a Session

| Situation | Command |
|-----------|---------|
| First time on a project | `/status` (creates STATUS.md if needed) |
| Continuing work | `/resume-work` (reads STATUS.md, shows where you left off) |
| Context getting long | `/compact` |
| Quick status check | `/status` |

### Step 1: Plan

```
Type: /plan
Input: "I want a dashboard widget showing monthly revenue"

What happens:
- Claude reads STATUS.md, PRD, and roadmap for context
- Enters Plan Mode (read-only)
- Lists assumptions and asks clarifying questions
- Proposes implementation plan
- Updates STATUS.md

Action: Review assumptions. Answer questions. Say "proceed" when satisfied.
```

### Step 2: Visual Direction (If Needed)

**Option A - Reference screenshot:**
> "Build the revenue chart. Match the style in `/docs/design-references/stripe-chart.png`"

**Option B - Describe in design system terms:**
> "Build a card showing revenue. Use the standard card style from our design system. Bar chart inside, muted colors, no decorations."

**Option C - Use v0.dev (only if Claude's output fails twice):**
1. Go to v0.dev
2. Prompt: "Revenue widget, minimal style, shadcn/ui, slate color palette"
3. Copy code
4. Tell Claude: "Use this UI code as the starting point: [paste]"

### Step 3: Build

```
Type: /build
Input: "Implement the revenue widget based on the approved plan"

What happens:
Claude executes in stages, pausing for approval (and updating STATUS.md):

Stage 1 (Data): "Here's the schema change..." → You: "proceed"
Stage 2 (Logic): "Here's the API route..." → You: "proceed"  
Stage 3 (UI): "Here's the component, verified against design system..." → You: "proceed"
Stage 4 (Test): "Here are the behavior tests..." → You: "proceed"
Stage 5 (Verify): "Lint passes, tests pass. Ready to commit." → You: "proceed"
```

### Step 4: Design Check

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

---

## 5. Session Management

| Situation | Command |
|-----------|---------|
| Start of any session | `/resume-work` (reads STATUS.md, continues where you left off) |
| Before stepping away | `/checkpoint` (saves progress to STATUS.md) |
| Quick status check | `/status` |
| Context getting long/Claude forgetting | `/compact` |
| Switch to a different past session | `/resume` (Claude Code built-in) |
| Quick commit with auto-message | `claude commit` |
| Reference a specific file in prompt | `@filename` |
| Show Claude a visual reference | Paste screenshot directly in terminal |

---

## 6. Escape Hatch Rules

| Signal | Action |
|--------|--------|
| Same error 3+ times | Stop. Say: "Do not retry. Explain what you think is causing this and what information you need from me." |
| Output doesn't match request | Use `/challenge` to surface misunderstanding |
| Responses getting confused | Run `/compact` to compress context |
| Fundamentally wrong direction | Exit session. Run `claude` fresh. Re-explain from scratch. |
| Your instructions were vague | Use `/challenge` before Claude builds anything |
| UI looks wrong | Run `/design-check` to identify specific violations |
| Hardcoded secret detected | Run `/security-check`, fix immediately before commit |
| Dependency vulnerability found | Run `/deps`, fix critical issues or add to tech debt with timeline |
| Taking a shortcut to meet deadline | Log in `TECH-DEBT.md` with remediation plan before moving on |
| Before deploying to production | Run `/pre-release` to verify everything is ready |

---

## 7. Quick Reference Card

### Discovery Phase
| Goal | Command |
|------|---------|
| Research a product idea | `/research` |
| Create product requirements | `/prd` |
| Define technical architecture | `/architecture` |
| Document architecture decisions | `/adr` |
| Create milestone roadmap | `/roadmap` |
| Create GitHub issues from roadmap | `/sprint` |

### Build Phase
| Goal | Command |
|------|---------|
| Plan a feature | `/plan` |
| Build with checkpoints | `/build` |
| Implement a GitHub issue | `/fix-issue [number]` |
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
| Get Claude up to speed on codebase | `/onboard` |
| Question your vague request | `/challenge` |
| Reference a file | `@filename` in prompt |
| Visual reference | Paste screenshot or reference `/docs/design-references/` |
| Commit changes | "commit with an appropriate message" |
| Create a PR | "create a PR for this branch" |
| Create a branch | "create a branch for this feature" |

---

## 8. New Project Checklist

### Initial Setup
- [ ] Copy `CLAUDE.md` to project root
- [ ] Fill in PROJECT CONTEXT section with your app's details
- [ ] Copy `.claude/commands/` folder to project
- [ ] Copy `.github/` folder to project (workflows + issue templates)
- [ ] Copy `docs/planning/STATUS.md` template to project
- [ ] Create `/docs/design-references/` folder
- [ ] Add 2-3 screenshot references for the style you want

### GitHub Setup
- [ ] Set up GitHub MCP server (see Section 2.E)
- [ ] Run `/install-github-app` to enable @claude mentions
- [ ] Add `ANTHROPIC_API_KEY` to repo secrets

### First Session
- [ ] Run `/model` and select Opus 4.5 plan mode
- [ ] Run `/status` to initialize status tracking
- [ ] Run `/research` to start product discovery (new product)
- [ ] Or run `/onboard` if this is an existing codebase

---

## 9. Files Included

```
playbook/
├── README.md                    # This file
├── CLAUDE.md                    # Constitution template
├── .claude/
│   └── commands/
│       │── # Discovery Phase
│       ├── research.md          # Product research
│       ├── prd.md               # Product requirements document
│       ├── architecture.md      # Technical architecture
│       ├── adr.md               # Architecture decision records
│       ├── roadmap.md           # Milestone planning
│       ├── sprint.md            # Create GitHub issues from roadmap
│       │
│       │── # Build Phase
│       ├── plan.md              # Feature planning
│       ├── build.md             # Staged build with approval gates
│       ├── fix-issue.md         # Implement GitHub issues
│       ├── audit.md             # Security and logic review
│       ├── security-check.md    # Shift-left security scan
│       ├── deps.md              # Dependency audit
│       ├── design-check.md      # UI consistency check
│       ├── pre-release.md       # Pre-release checklist
│       │
│       │── # Session Management
│       ├── status.md            # View/update project status
│       ├── checkpoint.md        # Save progress mid-session
│       ├── resume-work.md       # Continue from last session
│       │
│       │── # Utilities
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
    │   └── TECH-DEBT.md         # Technical debt tracker
    ├── decisions/
    │   └── README.md            # ADR index and template
    └── design-references/
        └── README.md            # Design reference instructions
```

---

## 10. Customization

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
