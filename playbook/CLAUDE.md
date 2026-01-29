# PROJECT CONSTITUTION

## 1. PROJECT CONTEXT

<!-- 
Fill this in for each project. 3-4 sentences answering:
- What does this app do?
- Who is it for?
- What are the core user flows?

Example:
This is a personal finance tracker for individuals who want to understand their spending patterns.
Core flows: Connect bank account, view transaction history, see spending by category, set budgets.
-->

[FILL IN: What does this app do? Who is it for? What are the core user flows?]

---

## 2. TECH STACK

- **Core:** Next.js (App Router), React, TypeScript
- **State:** React Query (Server), Zustand (Client)
- **DB:** Supabase (PostgreSQL). Use migrations, never raw SQL.
- **UI:** shadcn/ui components, Lucide icons, Tailwind CSS
- **Font:** Inter

---

## 3. CODING RULES

- Run `npm run lint` before any commit
- Use `process.env` for secrets. Never hardcode keys.
- Match existing patterns in the codebase before introducing new ones.
- Prefer explicit over clever. Code should be readable by a non-expert.

---

## 4. TESTING STRATEGY

### Philosophy
Tests verify **expected behavior**, not implementation details. Focus on user-facing outcomes.

### What to Test

| Test Type | What to Cover | Tools |
|-----------|---------------|-------|
| **Unit** | Pure functions, utilities, business logic | Vitest/Jest |
| **Integration** | API routes, database operations, service interactions | Vitest/Jest + test DB |
| **Component** | User interactions, form submissions, state changes | React Testing Library |
| **E2E** | Critical user flows (signup, checkout, core features) | Playwright/Cypress |

### Testing Pyramid

```
        /\
       /E2E\        ← Few: Critical paths only
      /------\
     /Component\    ← Some: Key interactions
    /------------\
   / Integration  \  ← More: API & data layer
  /----------------\
 /      Unit        \ ← Many: Business logic
/____________________\
```

### What to Test (Priority Order)

1. **Always test:**
   - Business logic and calculations
   - API endpoints (happy path + error cases)
   - Form validation
   - Authentication/authorization logic
   - Data transformations

2. **Test when valuable:**
   - Complex component interactions
   - State management logic
   - Error handling and edge cases

3. **Skip tests for:**
   - Styling and layout
   - Trivial getters/setters
   - Third-party library wrappers
   - Static content

### Test Writing Guidelines

```typescript
// ✅ Good: Tests behavior
test('user can add item to cart', async () => {
  render(<ProductPage />);
  await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
});

// ❌ Bad: Tests implementation
test('addToCart function updates state', () => {
  const setState = jest.fn();
  addToCart(setState, item);
  expect(setState).toHaveBeenCalledWith([item]);
});
```

### Test Commands
- `npm run test` — Run all tests (must pass before commit)
- `npm run test:watch` — Run tests in watch mode during development
- `npm run test:coverage` — Check coverage (no minimum required, use judgment)

### When to Write Tests
- **Before fixing a bug:** Write a failing test that reproduces the bug first
- **During /build Stage 4:** Write tests for the feature just implemented
- **For critical paths:** Always have E2E coverage for signup, login, and core flows

---

## 5. ASSUMPTION PROTOCOL

Before writing any code, you must:

1. State all assumptions about requirements, codebase, and dependencies
2. Wait for my explicit approval
3. If uncertain, ask—do not guess

---

## 6. GIT & GITHUB WORKFLOW

### Commit Messages
Use conventional commits format:
- `feat: add revenue dashboard widget`
- `fix: resolve null pointer in user service`
- `refactor: simplify authentication logic`
- `docs: update API documentation`

### Branch Naming
- Features: `feature/short-description`
- Fixes: `fix/issue-number-short-description`
- Refactors: `refactor/short-description`

### Pull Requests
When creating PRs:
- Reference the issue number in the PR body: "Fixes #123"
- Keep PRs focused on a single change
- Ensure all tests pass before requesting review

### PR Review Checklist
Before merging any PR, verify:

**Functionality**
- [ ] Code does what the issue/feature requires
- [ ] Edge cases are handled
- [ ] Error states are handled gracefully

**Code Quality**
- [ ] Follows existing patterns in codebase
- [ ] No hardcoded secrets or sensitive data
- [ ] No commented-out code or debug logs
- [ ] Functions/components have clear, single responsibilities

**Testing**
- [ ] Tests pass (`npm run test`)
- [ ] New logic has test coverage
- [ ] Critical paths have E2E coverage

**Security**
- [ ] No SQL injection vulnerabilities
- [ ] User input is validated/sanitized
- [ ] Auth checks are in place where needed
- [ ] Secrets use environment variables

**Documentation**
- [ ] Complex logic is commented
- [ ] API changes are documented
- [ ] ADR created for significant decisions

**Design (if UI changes)**
- [ ] Follows design system in CLAUDE.md
- [ ] Responsive/mobile-friendly
- [ ] Accessibility basics (labels, contrast, keyboard nav)

### Git Operations
You (Claude) should handle routine git operations:
- Creating branches
- Writing commit messages based on changes
- Creating PRs via `gh pr create`
- Checking git history when needed

---

## 7. PLANNING DOCUMENTS

### Document Hierarchy
```
docs/
├── planning/
│   ├── STATUS.md        # Current state (always read first)
│   ├── research.md      # Market research and problem validation
│   ├── prd.md           # Product requirements and features
│   ├── architecture.md  # Technical structure (data, APIs, components)
│   ├── roadmap.md       # Milestones and implementation tasks
│   └── TECH-DEBT.md     # Technical debt tracker
└── decisions/
    └── ADR-XXX-*.md     # Architecture Decision Records
```

### Reading Order
When starting any work:
1. Always read `STATUS.md` first
2. Read `prd.md` for product context
3. Read `architecture.md` for technical structure
4. Read `roadmap.md` for current priorities
5. Read relevant sections of `CLAUDE.md`

### Keeping Documents Updated
- Update `STATUS.md` after every significant action
- Update `roadmap.md` when issues are created or completed
- Update `TECH-DEBT.md` when taking shortcuts or identifying debt
- Create ADRs in `docs/decisions/` for significant technical decisions

---

## 8. SESSION CONTINUITY

### Status Tracking
- Project status is tracked in `docs/planning/STATUS.md`
- Always read this file at the start of any session
- Update this file after completing any significant step
- Update this file before ending a session or stepping away

### When Starting a Session
1. Read `docs/planning/STATUS.md`
2. Summarize current state to the user
3. Ask if they want to continue where they left off
4. Don't re-explain context that's already documented

### When Ending a Session
Before the user steps away, update `docs/planning/STATUS.md` with:
- What was accomplished this session
- Exactly where work stopped (stage, file, line if relevant)
- Any blockers or open questions
- Clear next steps
- Session log entry

### Mid-Session Checkpoints
On any major command completion (`/plan`, `/build` stages, `/fix-issue`):
- Automatically update STATUS.md
- Note what was completed
- Note what's next

---

## 9. DESIGN SYSTEM

### Philosophy

This app should feel like a professional tool, not a consumer product.
Think: Financial Times meets Stripe. Editorial quality with modern execution.
Never: Playful, colorful, busy, or decorated.

### Color Palette (Strict)

| Purpose              | Color   | Tailwind Class                    |
| -------------------- | ------- | --------------------------------- |
| Background           | #FFFFFF | bg-white                          |
| Background Alt       | #FAFAFA | bg-gray-50                        |
| Text Primary         | #1A1A1A | text-gray-900                     |
| Text Secondary       | #6B7280 | text-gray-500                     |
| Borders              | #E5E7EB | border-gray-200                   |
| Accent (sparingly)   | #475569 | bg-slate-600 / text-slate-600     |
| Error                | #DC2626 | text-red-600                      |
| Success              | #16A34A | text-green-600                    |

**Rules:**

- NO gradients
- NO multiple accent colors
- NO bright or saturated colors
- Accent color used only for: primary buttons, active states, links

### Typography

| Element          | Size     | Weight   | Class                          |
| ---------------- | -------- | -------- | ------------------------------ |
| Page title       | 24px     | Semibold | text-2xl font-semibold         |
| Section header   | 18px     | Medium   | text-lg font-medium            |
| Body text        | 14-16px  | Normal   | text-sm or text-base           |
| Secondary/caption| 12-14px  | Normal   | text-xs or text-sm text-gray-500|

**Rules:**

- Font: Inter (or system font stack as fallback)
- Line height: 1.5-1.75 for body text
- NO decorative fonts
- NO all-caps except for very small labels (e.g., "STATUS")

### Spacing

- Use Tailwind's 4px grid consistently: p-4, m-6, gap-4
- Section spacing: py-8 or py-12 between major sections
- Card internal padding: p-6 minimum
- Be consistent: don't mix m-4 and m-5 arbitrarily within the same view

### Components (shadcn/ui Rules)

| Component        | Style                                                      |
| ---------------- | ---------------------------------------------------------- |
| Primary Button   | Solid slate background (bg-slate-600), white text, rounded-md |
| Secondary Button | Outline only (border-gray-300), no fill                    |
| Cards            | border border-gray-200, no shadow or shadow-sm max, rounded-lg |
| Tables           | Clean lines, no zebra striping, py-3 row padding minimum   |
| Forms            | Simple borders, inline labels or above field, clear red error states |
| Icons            | Lucide only, 16-20px, text-gray-400 default                |

### Layout

- Max content width: max-w-6xl mx-auto (1152px)
- Sidebar (if used): w-64 (256px), bg-gray-50 or white with right border
- Dense data displays acceptable when needed
- Content should breathe but not float in empty space

### Forbidden Patterns

- ❌ Hero sections with large images
- ❌ Decorative illustrations or background shapes
- ❌ Gradient backgrounds or text
- ❌ Colored section backgrounds (except very subtle gray)
- ❌ rounded-full on buttons (rounded-md max)
- ❌ Animated gradients, glow effects, or shimmer
- ❌ Testimonial carousels or marketing-style layouts
- ❌ Emojis in the UI (acceptable in user-generated content only)
- ❌ Multiple font families
- ❌ Icon colors that don't match the palette

### Reference

When in doubt, look at: Stripe Dashboard, Linear, Notion, Financial Times.
Check `/docs/design-references/` for approved visual examples.
