---
description: Verify UI matches design system
---

# Role: Design Reviewer

Review the current UI against the DESIGN SYSTEM section in CLAUDE.md. Produce a violation report with specific file/line references and fixes.

## Before Starting
1. Read `CLAUDE.md` — specifically the DESIGN SYSTEM section
2. Read any files in `docs/design-references/` for approved visual examples
3. If `$ARGUMENTS` specifies files or components, scope the review to those

## Step 1 - Identify Review Scope

Determine which files to review:
- If `$ARGUMENTS` provided: review those files/components
- If no arguments: review all UI files changed since last commit (`git diff --name-only HEAD~1` filtered to component/page files)
- If no changes: ask what to review

List the files that will be reviewed.

## Step 2 - Color Audit

Check against the approved palette in CLAUDE.md:
- Any colors not in the approved palette? (check hex values, Tailwind classes, CSS variables)
- Accent color used sparingly? (only primary buttons, active states, links)
- Any gradients, bright colors, or saturated tones?
- Any inline color styles bypassing the design system?

## Step 3 - Typography Audit

- Correct sizes and weights per hierarchy? (page title, section header, body, caption)
- Using approved fonts only? (Inter / system font stack)
- Any decorative fonts or inappropriate all-caps?
- Line heights within 1.5-1.75 for body text?

## Step 4 - Spacing Audit

- Consistent with 4px grid? (p-4, m-6, gap-4 — no arbitrary values like m-5)
- Adequate whitespace between sections? (py-8 or py-12)
- Card padding at least p-6?
- No mixing of inconsistent spacing within the same view?

## Step 5 - Component Audit

- Buttons styled correctly? (solid primary with bg-slate-600, outline secondary)
- Cards with appropriate borders/shadows? (border-gray-200, shadow-sm max)
- Tables clean? (no zebra striping, py-3 row padding minimum)
- Icons correct? (Lucide only, 16-20px, text-gray-400 default)
- Forms with proper borders, labels, and error states?

## Step 6 - Layout Audit

- Content width appropriate? (max-w-6xl mx-auto)
- Sidebar dimensions correct? (w-64 if used)
- Content has room to breathe but no excessive empty space?
- Responsive behavior acceptable?

## Step 7 - Forbidden Pattern Check

Scan for any of these violations:
- Gradients (background or text)
- Decorative illustrations or background shapes
- Hero sections with large images
- Colored section backgrounds (except subtle gray)
- `rounded-full` on buttons (should be `rounded-md` max)
- Animated gradients, glow effects, or shimmer
- Testimonial carousels or marketing-style layouts
- Emojis in the UI
- Multiple font families
- Icon colors outside the palette

## Step 8 - Report

Present findings:

```
## Design Check Report

**Scope:** [files/components reviewed]
**Design System:** [reference from CLAUDE.md]

### Violations Found

| # | Category | File:Line | Issue | Fix |
|---|----------|-----------|-------|-----|
| 1 | Color | `src/app/page.tsx:42` | Uses `bg-blue-500` (not in palette) | Change to `bg-slate-600` |
| 2 | Spacing | `src/components/Card.tsx:15` | Uses `p-3` (below minimum) | Change to `p-6` |

### Passed
- [List categories with no violations]

### Summary
- Violations: X | Passed: X categories
- Recommendation: [COMPLIANT / FIX VIOLATIONS / NEEDS REWORK]
```

If violations found, ask: "Want me to fix these violations?"

## Related Commands

- `/audit` — Security and logic review
- `/autopilot` — Autonomous build orchestrator
- `/pre-release` — Full pre-deployment checklist (includes design check)

## Rollback

This command is read-only unless fixes are approved. If fixes were applied:
```bash
git checkout -- [modified files]
```
