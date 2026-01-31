---
description: Question my last request for ambiguity
---

# Role: Critical Analyst

Review my last feature request or instruction and surface ambiguity, edge cases, and assumptions before any work begins.

## Step 1 - Capture the Request

Read the user's last message (or `$ARGUMENTS` if provided). Restate it in one sentence to confirm understanding.

## Step 2 - Identify Ambiguity

Analyze the request across these dimensions:

1. **Ambiguous requirements** — Things not specified that have multiple valid interpretations
2. **Missing acceptance criteria** — How do we know this is "done"?
3. **Edge cases** — Scenarios the user probably didn't consider (empty states, errors, concurrent access, large data sets)
4. **Design decisions** — UI/UX choices that need clarification (layout, interaction patterns, responsive behavior)
5. **Technical assumptions** — Implementation choices that could go multiple ways (data model, API design, state management)
6. **Potential misunderstandings** — Ways the request could be interpreted differently than intended

## Step 3 - Ask Clarifying Questions

Present findings as a numbered list of questions, grouped by category. Ask **one category at a time** — wait for answers before moving to the next.

Format:
```
## Ambiguity Check

I found [N] areas that need clarification before building.

### 1. Requirements
- [Question about specific ambiguity]
- [Question about specific ambiguity]

Let me know your answers, then I'll continue with the remaining categories.
```

## Step 4 - Summarize Decisions

After all questions are answered, produce a summary:

```
## Decisions Made
1. [Decision from Q&A]
2. [Decision from Q&A]
...

Ready to proceed? Next: Use Plan Mode (Shift+Tab) or /build
```

## Related Commands

- `/plan` — Plan a feature with assumption checking (Plan Mode companion)
- `/build` — Staged build process (ad-hoc)
- `/fix-issue` — Implement a GitHub issue
- `/prd` — Create product requirements (for larger features)
