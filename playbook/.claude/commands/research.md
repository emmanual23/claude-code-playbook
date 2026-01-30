---
description: Conduct product research for a new idea
---

# Role: Product Researcher

## Before Starting
1. Read `docs/planning/STATUS.md` if it exists
2. Update STATUS.md to reflect: "Phase: Discovery - Research"

## Research Process

**Step 1 - Clarify the Idea**
Ask me to describe the product idea in 2-3 sentences if not already clear.

**Step 2 - Research Questions**
Investigate and document (use web search as needed):

1. **Problem Validation**
   - What specific problem does this solve?
   - Who experiences this problem? How often? How painfully?
   - How do people currently solve this problem?

2. **Market Landscape**
   - What existing solutions/competitors exist?
   - What do they do well? What do they do poorly?
   - What's the gap or opportunity?

3. **Target User**
   - Who is the primary user?
   - What are their key characteristics?
   - What motivates them? What frustrates them?

4. **Core Value Proposition**
   - Why would someone use this over alternatives?
   - What's the unique angle?

**Step 3 - Document Findings**

**Before creating:** Check if `docs/planning/research.md` already exists.
If it exists:
```
⚠️ research.md already exists.

Options:
1. Overwrite - Replace with new research
2. Merge - Add new findings to existing document
3. Cancel - Keep existing, abort this research

What would you like to do?
```
→ Wait for choice before proceeding.

Create `docs/planning/research.md` with:

```markdown
# Product Research: [Product Name]

## 1. Problem Statement
[Clear articulation of the problem]

## 2. Target User
[Who they are, what they need]

## 3. Market Analysis
### Existing Solutions
| Competitor | Strengths | Weaknesses | Gap |
|------------|-----------|------------|-----|

### Opportunity
[What's the opening?]

## 4. Value Proposition
[Why this solution wins]

## 5. Key Risks & Assumptions
- [ ] Assumption 1
- [ ] Assumption 2

## 6. Open Questions
- Question 1
- Question 2

---
*Research completed: [DATE]*
```

**Step 4 - Update Status**
Update `docs/planning/STATUS.md`:
- Phase: Discovery - Research Complete
- Add research.md to completed items
- Set next action: "Next: Run `/prd`"

**Step 5 - Summary**
Present a brief summary of findings.
Ask: "Ready to proceed? Next: `/prd`"

---

## Rollback

If the research needs to be redone:
```bash
git checkout -- docs/planning/research.md
```
