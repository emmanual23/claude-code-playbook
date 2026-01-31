---
description: Create or view Architecture Decision Records
---

# Role: Technical Architect

## What is an ADR?
Architecture Decision Records document significant technical decisions:
- Why a decision was made
- What alternatives were considered
- What the consequences are

ADRs create institutional memory and help future developers understand the codebase.

## When to Create an ADR
Create an ADR when deciding:
- Technology choices (framework, database, hosting)
- Architectural patterns (monolith vs microservices, state management)
- Integration approaches (API design, third-party services)
- Security approaches (auth strategy, data encryption)
- Major refactoring decisions
- Breaking changes to existing patterns

## ADR Process

**Step 1 - Check for Existing ADRs**
Look in `docs/decisions/` for existing records.
If folder doesn't exist, create it.

**Step 2 - Determine ADR Number**
List existing ADRs and use the next sequential number.
Format: `NNNN-short-title.md` (e.g., `0001-use-supabase-for-auth.md`)

**Step 3 - Gather Context**
If creating a new ADR, ask:
1. "What decision needs to be documented?"
2. "What problem does this solve?"
3. "What alternatives were considered?"

**Step 4 - Create the ADR**
Create `docs/decisions/NNNN-[title].md`:

```markdown
# [NUMBER]. [Title]

**Date:** [YYYY-MM-DD]
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-NNNN]

## Context

[What is the issue that we're seeing that is motivating this decision or change?]
[What constraints do we have?]

## Decision

[What is the change that we're proposing and/or doing?]
[State the decision clearly and concisely.]

## Alternatives Considered

### Alternative 1: [Name]
- **Pros:** [List benefits]
- **Cons:** [List drawbacks]
- **Why rejected:** [Reason]

### Alternative 2: [Name]
- **Pros:** [List benefits]
- **Cons:** [List drawbacks]
- **Why rejected:** [Reason]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Tradeoff 1]
- [Tradeoff 2]

### Risks
- [Risk and mitigation]

## References

- [Link to relevant docs, issues, or discussions]
```

**Step 5 - Update Index**
If `docs/decisions/README.md` exists, add the new ADR to the index.
If not, create it:

```markdown
# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for this project.

| Number | Title | Status | Date |
|--------|-------|--------|------|
| 0001 | [Title] | Accepted | YYYY-MM-DD |
```

## Commands

**View all ADRs:**
User says: `/adr list`
→ List all ADRs with status

**Create new ADR:**
User says: `/adr` or `/adr create [topic]`
→ Walk through ADR creation process

**View specific ADR:**
User says: `/adr [number]`
→ Display the ADR content

**Update ADR status:**
User says: `/adr deprecate [number]` or `/adr supersede [number] with [new-number]`
→ Update the status field

## Example ADRs

**Good ADR titles:**
- `0001-use-nextjs-app-router.md`
- `0002-postgresql-over-mongodb.md`
- `0003-jwt-for-authentication.md`
- `0004-monorepo-structure.md`
- `0005-react-query-for-server-state.md`

**When NOT to create an ADR:**
- Minor implementation details
- Bug fixes
- Style preferences already in CLAUDE.md
- Decisions that are easily reversible

## Related Commands

- `/architecture` — Technical architecture (often triggers ADR creation)
- `/plan` — Plan a feature with assumption checking
- `/challenge` — Surface ambiguity before committing to a decision
