---
description: View features and issues ready to build vs. needing definition
---

# Role: Backlog Manager

Show what's ready to build and what needs more definition.

## Step 1: Gather Sources

Read these files:
1. `docs/planning/prd.md` — Feature definitions
2. `docs/planning/roadmap.md` — Milestone groupings
3. `docs/planning/INFRASTRUCTURE.md` — Check for blockers
4. GitHub issues: `gh issue list --state open --limit 50 --json number,title,body,labels,milestone`

---

## Step 2: Analyze Feature Readiness

For each feature in PRD and roadmap, evaluate:

**✅ Ready to Build** (all must be true):
- [ ] Clear description of what it does
- [ ] Acceptance criteria defined (specific, testable)
- [ ] Has a GitHub issue created
- [ ] Dependencies identified
- [ ] No blocking infrastructure (or infra is 🟢)

**⚠️ Needs Definition** (any of these):
- [ ] Vague or missing description
- [ ] No acceptance criteria or criteria are fuzzy ("should work well")
- [ ] Missing GitHub issue
- [ ] Unknown dependencies
- [ ] Open questions not resolved

---

## Step 3: Present Backlog

```
📋 BACKLOG OVERVIEW
===================

INFRASTRUCTURE: [🟢 Ready | 🔴 Blocking - run /infra first]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ READY TO BUILD ([X] features)
================================

These features are fully defined with GitHub issues:

Milestone 1:
├── #12: Create user table schema
│   └── Acceptance: [3 criteria] ✓
├── #13: Build user API  
│   └── Acceptance: [4 criteria] ✓ | Depends on: #12
└── #14: User signup UI
    └── Acceptance: [5 criteria] ✓ | Depends on: #13

Milestone 2:
├── #18: Payment integration
│   └── Acceptance: [4 criteria] ✓
└── ...

🟢 Recommended next: #12 (no dependencies, ready now)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ NEEDS DEFINITION ([Y] features)
==================================

These features need more work before building:

FROM PRD (no GitHub issue yet):
├── F5: "Admin dashboard"
│   └── ❌ Missing: acceptance criteria, no issue created
│   └── 💡 Action: Define what admin can do, then /sprint to create issue
│
└── F7: "Email notifications"  
    └── ❌ Missing: which notifications? triggers? templates?
    └── 💡 Action: List notification types in PRD, add acceptance criteria

FROM ROADMAP (mentioned but undefined):
├── "Analytics" (Milestone 2)
│   └── ❌ Missing: not in PRD, no specifications
│   └── 💡 Action: Add to PRD with user stories and acceptance criteria
│
└── "Export feature" (Milestone 3)
    └── ❌ Missing: export what? formats? 
    └── 💡 Action: Define scope in PRD

FROM GITHUB (issues need refinement):
├── #22: "Improve performance"
│   └── ❌ Missing: no acceptance criteria, too vague
│   └── 💡 Action: Define specific metrics (e.g., "page load < 2s")
│
└── #25: "Better error handling"
    └── ❌ Missing: which errors? what behavior?
    └── 💡 Action: List specific error cases and expected UX

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY
==========

| Status | Count |
|--------|-------|
| ✅ Ready to build | [X] |
| ⚠️ Needs definition | [Y] |
| 🔴 Blocked by infra | [Z] |

RECOMMENDATIONS:
1. [If ready items exist] Start building: /fix-issue [lowest-ready-number]
2. [If items need definition] Refine features: [specific action]
3. [If infra blocking] Provision first: /infra
```

---

## Step 4: Offer Actions

Based on the backlog state:

**If features need definition:**
"Would you like me to help define [feature name]? I can:
1. Draft acceptance criteria
2. Identify dependencies
3. Create the GitHub issue"

**If ready to build:**
"Ready to start? Run `/fix-issue [#]` for the recommended issue."

**If infra blocking:**
"Infrastructure is blocking. Run `/infra` first."

---

## Subcommands

**`/backlog ready`** — Show only ready-to-build items
**`/backlog undefined`** — Show only items needing definition
**`/backlog [milestone]`** — Filter by milestone (e.g., `/backlog Milestone 2`)

---

## Definition Checklist

When helping define a feature, ensure:

```
FEATURE DEFINITION CHECKLIST
============================

Feature: [Name]

□ One-sentence description
□ User story: "As a [user], I want [action] so that [benefit]"
□ Acceptance criteria (3-5 specific, testable items):
  □ Criterion 1
  □ Criterion 2
  □ ...
□ Dependencies identified (other features, infra, APIs)
□ Edge cases considered
□ Out of scope clarified (what this does NOT include)
□ GitHub issue created

Missing any? Let's fill them in.
```
