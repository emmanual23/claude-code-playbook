---
description: Research and plan an enhancement to an existing product
---

# Role: Product Iterator

Use this command when you have an enhancement idea for a product that's already built and you want to research it, validate fit, and integrate it into the existing planning structure.

## Before Starting
1. Read `CLAUDE.md` — Understand the product
2. Read `docs/planning/prd.md` — Current feature set
3. Read `docs/planning/architecture.md` — Current technical structure
4. Read `docs/planning/roadmap.md` — Current milestones

## Step 1 - Capture the Enhancement Idea

If `$ARGUMENTS` provided, use that as the idea.

If not, ask:
"What enhancement are you considering? Describe the idea, user need, or feedback that prompted it."

→ Wait for response

## Step 2 - Research & Validate

Research the enhancement:
- How do similar products handle this?
- What are the common approaches?
- Are there potential pitfalls?
- What's the effort vs. impact?

If `$ARGUMENTS` contains "quick" or the idea is straightforward, skip deep research and go to Step 3.

If `$ARGUMENTS` contains "--research-only", stop after this step and do not update planning docs.

If `$ARGUMENTS` contains "--from-feedback", frame research around the user problem rather than the solution.

Present findings:

```
🔍 ENHANCEMENT RESEARCH
=======================

Idea: [Enhancement description]

MARKET CONTEXT
- How others do it: [Brief summary]
- Common patterns: [Patterns]
- Potential pitfalls: [Risks to avoid]

FIT ANALYSIS
- Aligns with product vision? [Yes/No + why]
- Impacts existing features? [List any]
- Architecture implications? [Changes needed]

EFFORT ESTIMATE
- Complexity: [Low / Medium / High]
- Suggested milestone: [New / Existing milestone name]

RECOMMENDATION
[Proceed / Modify / Defer / Reject] — [Reasoning]
```

Ask: "Does this analysis align with your thinking? Any adjustments before I propose the specification?"

→ Wait for confirmation

## Step 3 - Draft Feature Specification

Create a feature spec for the enhancement:

```
📋 FEATURE SPECIFICATION
========================

Feature: [Name]
Type: [New Feature / Enhancement / Extension]

USER STORY
As a [user type], I want [capability] so that [benefit].

DESCRIPTION
[2-3 sentences on what this does]

ACCEPTANCE CRITERIA
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]
- [ ] Tests pass

TECHNICAL NOTES
- Dependencies: [Existing features this builds on]
- Architecture impact: [None / Minor / Significant]
- New components: [List any]

OUT OF SCOPE
- [What this explicitly does NOT include]

OPEN QUESTIONS
- [Any unresolved questions]
```

Ask: "Does this specification capture what you want? Any changes?"

→ Wait for confirmation

## Step 4 - Integrate into Planning

**Step 4a - Update PRD**

⚠️ `docs/planning/prd.md` already exists.

Options:
1. Add — Append this feature to the existing PRD
2. Review — Show me where it would go first
3. Skip — Don't update PRD

→ Wait for choice

If Add or Review approved:
- Add feature to appropriate section of PRD
- Include user story and acceptance criteria
- Note it as "Added: [DATE]" to distinguish from original features

**Step 4b - Update Roadmap**

⚠️ `docs/planning/roadmap.md` already exists.

Ask: "Which milestone should this feature belong to?"
- Show existing milestones with their themes
- Offer: "Or create a new milestone?"

→ Wait for choice

Then:
- Add feature to selected milestone in roadmap.md
- Include dependency notes if any

**Step 4c - Update Architecture (if needed)**

If architecture impact was Minor or Significant in the spec:

⚠️ `docs/planning/architecture.md` may need updates.

Options:
1. Update — Add new components/routes/tables
2. ADR — Create an Architecture Decision Record for significant changes
3. Skip — No architecture changes needed

→ Wait for choice

## Step 5 - Create GitHub Issue

Ask: "Create a GitHub issue for this enhancement?"

If yes:
```bash
gh issue create \
  --title "[Enhancement]: [Feature name]" \
  --body "[Generated from spec]" \
  --label "enhancement" \
  --milestone "[Selected milestone]"
```

Show:
```
✅ ENHANCEMENT PLANNED
======================

Feature: [Name]
Issue: #[number]
Milestone: [Name]

Files updated:
- docs/planning/prd.md ✓
- docs/planning/roadmap.md ✓
- docs/planning/architecture.md [✓ if updated]

Ready to build? Run `/fix-issue [#]`
```

## Step 6 - Update STATUS.md

Update `docs/planning/STATUS.md`:
- Add to Recently Completed: "Enhancement planned: [Feature name]"
- Set Next Action based on context

---

## Related Commands

- `/research` — Initial product research (use for new products)
- `/prd` — Create initial PRD (use for new products)
- `/sprint` — Create GitHub issues from roadmap
- `/backlog` — See what's defined vs. needs definition
- `/fix-issue` — Implement the enhancement

## Rollback

If the enhancement was added to planning docs and you want to undo:
```bash
git checkout -- docs/planning/prd.md docs/planning/roadmap.md docs/planning/architecture.md
```
