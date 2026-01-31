# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) documenting significant technical decisions made in this project.

## What is an ADR?

An ADR captures a single architectural decision along with its context and consequences. They help future developers (including yourself) understand:
- **What** was decided
- **Why** it was decided
- **What alternatives** were considered
- **What the consequences** are

## When to Write an ADR

Create an ADR when you make a decision that:
- Affects the structure of the system
- Is hard to reverse
- Has significant trade-offs
- Might be questioned later
- Involves choosing between alternatives

Examples:
- Choosing a database (PostgreSQL vs MongoDB)
- Selecting an authentication approach
- Deciding on a state management pattern
- Choosing between microservices vs monolith
- Adopting a specific library for a core function

## Index

| ADR | Title | Date | Status |
|-----|-------|------|--------|
| - | *No decisions recorded yet* | - | - |

## Statuses

- **Proposed** — Under discussion
- **Accepted** — Decision made and in effect
- **Deprecated** — No longer applies
- **Superseded** — Replaced by another ADR

## Creating a New ADR

Run `/adr` in Claude Code to create a new decision record.

Or manually:
1. Copy the template below
2. Create `ADR-[NUMBER]-[short-title].md` (e.g., `ADR-001-use-postgresql.md`, `ADR-002-jwt-authentication.md`)
3. Fill in all sections
4. Update this index

> **Naming convention:** Use zero-padded three-digit numbers (ADR-001, ADR-002, ...) and lowercase kebab-case titles.

## Template

```markdown
# ADR-[NUMBER]: [Title]

**Date:** [DATE]
**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-X]
**Deciders:** [Who made this decision]

## Context
[Why is this decision needed?]

## Decision
[What was decided?]

## Alternatives Considered
[What other options were evaluated?]

## Consequences
[What are the positive, negative, and neutral effects?]
```

---

*"The best time to document a decision is when you make it. The second best time is now."*
