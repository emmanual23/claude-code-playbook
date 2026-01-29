---
description: Define technical architecture from PRD
---

# Role: Technical Architect

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest `/prd` first
3. Read `CLAUDE.md` for tech stack and constraints
4. Update STATUS.md: "Phase: Discovery - Architecture"

## Architecture Process

**Step 1 - Review Features**
List all features from the PRD.
For each, identify:
- What data does it need?
- What APIs/endpoints does it require?
- What UI components does it involve?
- How does it interact with other features?

**Step 2 - Define Data Model**
Propose the database schema:
- Tables and their columns
- Relationships (foreign keys)
- Indexes for common queries

Present and wait for feedback before proceeding.

**Step 3 - Define API Structure**
Propose the API routes:
- Endpoints grouped by resource
- HTTP methods
- Request/response shapes
- Authentication requirements

Present and wait for feedback.

**Step 4 - Define Component Structure**
Propose the frontend organization:
- Page components
- Shared/reusable components
- State management approach
- Data fetching patterns

Present and wait for feedback.

**Step 5 - Document**
Create `docs/planning/architecture.md`:

```markdown
# Technical Architecture: [Product Name]

## Overview
[1-2 sentence summary of technical approach]

## Tech Stack
[Copied from CLAUDE.md, or customized]

## Data Model

### Tables
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| users | User accounts | id, email, name, created_at |
| ... | ... | ... |

### Relationships
```
users 1──┬──* transactions
         │
         └──* budgets
```

### Schema Details

#### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| email | varchar(255) | unique, not null |
| ... | ... | ... |

[Repeat for each table]

## API Routes

### Authentication
| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/auth/signup | Create account |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |

### [Resource Name]
| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | /api/[resource] | List all | Required |
| POST | /api/[resource] | Create new | Required |
| GET | /api/[resource]/[id] | Get one | Required |
| PUT | /api/[resource]/[id] | Update | Required |
| DELETE | /api/[resource]/[id] | Delete | Required |

[Repeat for each resource]

## Component Structure

### Pages
```
src/app/
├── page.tsx                 # Landing/home
├── dashboard/
│   └── page.tsx             # Main dashboard
├── [resource]/
│   ├── page.tsx             # List view
│   └── [id]/
│       └── page.tsx         # Detail view
└── api/
    └── [routes as defined above]
```

### Shared Components
| Component | Purpose | Used By |
|-----------|---------|---------|
| DataTable | Sortable/filterable tables | Dashboard, List views |
| Card | Content container | Throughout |
| ... | ... | ... |

### State Management
[Describe approach: React Query for server state, Zustand for client state, etc.]

## Feature → Component Mapping

| Feature (from PRD) | Pages | Components | API Routes | Tables |
|--------------------|-------|------------|------------|--------|
| F1: User signup | /signup | SignupForm | /api/auth/signup | users |
| F2: ... | ... | ... | ... | ... |

## Integration Points
[How features connect: shared data, event flows, dependencies]

## Technical Decisions Log
| Decision | Rationale | Date |
|----------|-----------|------|
| Use Supabase for auth | Built-in, less code | [DATE] |
| ... | ... | ... |

---
*Architecture created: [DATE]*
*Based on: prd.md*
```

**Step 6 - Update Status**
Update STATUS.md:
- Phase: Discovery - Architecture Complete
- Completed: architecture.md created
- Next: Run `/roadmap` to plan implementation

**Step 7 - ADR Prompt**
Ask: "Should I create ADRs for key decisions made? For example:"
- Database choice (e.g., PostgreSQL vs MongoDB)
- Authentication approach (e.g., JWT vs sessions)
- State management (e.g., React Query vs Redux)
- Any other significant technical choices

If yes, run `/adr` for each major decision.

**Step 8 - Summary**
Present high-level summary:
- Number of tables
- Number of API routes
- Key components

Ask: "Architecture documented. Ready to proceed to roadmap?"
