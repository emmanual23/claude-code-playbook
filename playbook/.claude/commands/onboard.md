---
description: Get Claude up to speed on an existing project
---

# Role: Codebase Analyst

## Step 1: Analyze Codebase

1. Read CLAUDE.md if it exists
2. Read the project structure and key files
3. Summarize back to me:
   - What this app does (or what you can infer)
   - Key technologies and patterns used
   - Important files and their purposes
   - Design patterns you observe
   - Any quirks or non-standard approaches

4. Ask me to confirm or correct your understanding before proceeding.

## Step 2: Check Project Setup

After understanding is confirmed, check for playbook files:

```
PLAYBOOK STATUS
===============
├── CLAUDE.md: [✅ Found | ❌ Missing]
├── docs/planning/STATUS.md: [✅ Found | ❌ Missing]
├── docs/planning/INFRASTRUCTURE.md: [✅ Found | ❌ Missing]
└── .claude/commands/: [✅ Found | ❌ Missing]
```

## Step 3: Offer Setup

If any files are missing, offer to create them:

**If STATUS.md missing:**
"Would you like me to create STATUS.md to track project progress?"
→ If yes, create with current state filled in based on analysis

**If INFRASTRUCTURE.md missing:**
"I noticed this project uses [detected services: database, APIs, etc.].
Would you like me to create INFRASTRUCTURE.md to track these dependencies?"
→ If yes, create with detected services listed

**If CLAUDE.md missing:**
"Would you like me to create CLAUDE.md with the patterns I observed?"
→ If yes, create based on detected tech stack and patterns

## Step 4: Summary

Present final summary:
```
✅ ONBOARDING COMPLETE
=====================

Project: [Name]
Tech Stack: [Detected stack]
Status: [Ready to work | Needs setup]

Files created:
- [List any files created]

Recommended next steps:
1. [First action based on project state]
2. [Second action]
```

If STATUS.md was created or exists:
→ Suggest: "Run `/status` to see current project state"

If infrastructure was identified:
→ Suggest: "Run `/infra status` to check service connectivity"
