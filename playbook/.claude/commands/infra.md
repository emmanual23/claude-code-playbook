---
description: Provision and manage infrastructure dependencies
---

# Role: Infrastructure Guide

## Purpose
Guide through provisioning all required external services, one step at a time.

## Before Starting
1. Read `docs/planning/INFRASTRUCTURE.md`
2. If file doesn't exist: "No infrastructure requirements found. Run `/architecture` first."

## Subcommands

Handle these if specified in $ARGUMENTS:
- `status` → Jump to Step 1 only (show status, don't provision)
- `verify` → Jump to Step 5 only (test connections)
- `env` → Show environment variables status only
- `[service-name]` → Provision only that specific service

If no arguments, run full provisioning flow.

---

## Step 1 - Show Current Status

```
🔧 INFRASTRUCTURE STATUS
========================

DATABASES
├── [Service]: [🔴/🟡/🟢] [Status description]
│   Purpose: [From INFRASTRUCTURE.md]
│   Blocks: [What can't work without this]

API KEYS
├── [Service]: [🔴/🟡/🟢] [Status description]
│   Purpose: [From INFRASTRUCTURE.md]
│   Blocks: [What can't work without this]

AUTHENTICATION
├── [Service]: [🔴/🟡/🟢] [Status description]
│   Purpose: [From INFRASTRUCTURE.md]
│   Blocks: [What can't work without this]

HOSTING
├── [Service]: [🔴/🟡/🟢] [Status description]
│   Purpose: [From INFRASTRUCTURE.md]
│   Blocks: [What can't work without this]

OTHER
├── [Service]: [🔴/🟡/🟢] [Status description]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENVIRONMENT VARIABLES: [X]/[Y] configured
OVERALL STATUS: [🔴 Not Ready / 🟡 Partial / 🟢 Ready]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If all 🟢: "All infrastructure ready! You can proceed with `/fix-issue`."

If any 🔴: "Ready to start provisioning? I'll guide you through each service."

---

## Step 2 - Provisioning Flow

For each 🔴 service (in order from INFRASTRUCTURE.md provisioning order):

### General Pattern

```
PROVISIONING: [Service Name]
============================
Purpose: [Why this is needed]
Blocks: [What depends on this]

Step [N] of [Total]: [Step Title]

[Clear instruction - ONE action only]

[If there's something to copy, show it in a code block]

[If there's a URL to visit, show it]

Let me know when done, or say "skip" to handle later.
```

### Service-Specific Guides

**For Supabase:**
1. Create project at supabase.com
2. Get API credentials (Settings → API)
3. Add env vars to .env.local
4. Run migrations
5. Verify connection

**For OpenAI/Anthropic API:**
1. Get API key from provider dashboard
2. Add to .env.local
3. Verify with test call (optional)

**For Vercel:**
1. Install Vercel CLI (if needed)
2. Run `vercel link`
3. Configure environment variables
4. Verify deployment settings

**For Auth providers (Clerk, Auth0):**
1. Create application
2. Get credentials
3. Add env vars
4. Configure OAuth providers (if needed)

**For Stripe:**
1. Create account / get test keys
2. Add env vars
3. Set up webhook endpoint (if needed)

---

## Step 3 - Environment Variables Check

After each service, verify env vars:

```bash
# Check if .env.local exists
test -f .env.local && echo "✅ .env.local exists" || echo "❌ .env.local missing"

# Check for specific variables (without revealing values)
grep -q "SUPABASE_URL" .env.local && echo "✅ SUPABASE_URL set" || echo "❌ SUPABASE_URL missing"
```

Show:
```
ENVIRONMENT VARIABLES
=====================
✅ SUPABASE_URL
✅ SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_KEY
❌ OPENAI_API_KEY ← Still needed
❌ CRON_SECRET ← Still needed

Missing variables block: [list affected features]
```

**Create .env.example:**
If `.env.example` doesn't exist, create it with all required variables:

```bash
# Check if .env.example exists
test -f .env.example || echo "Creating .env.example..."
```

```
# .env.example - Copy to .env.local and fill in values

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# AI Services
OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...

# Other
# CRON_SECRET=generate-a-random-string
```

Ask: "Would you like me to create/update .env.example with these variables?"

---

## Step 4 - Run Migrations/Setup

After database is provisioned:

```
DATABASE SETUP
==============

Found migration files:
- supabase/migrations/001_initial_schema.sql

Ready to apply migrations?

This will run:
  npx supabase db push
  
Or for raw SQL:
  psql $DATABASE_URL -f supabase/migrations/001_initial_schema.sql

Proceed? (yes/no/manual)
```

If "manual": Show the SQL and let them run it themselves.

---

## Step 5 - Verify Connections

Test each provisioned service:

```
VERIFYING CONNECTIONS
=====================

Testing Supabase...
→ [Run a simple query or connection test]
✅ Supabase connected

Testing OpenAI API...
→ [Optional: make a tiny test request]
✅ OpenAI API key valid

Testing [other services]...
```

If any fail, show troubleshooting steps.

---

## Step 6 - Update INFRASTRUCTURE.md and STATUS.md

After each service is provisioned:

**Update INFRASTRUCTURE.md:**
1. Update status from 🔴 to 🟢
2. Add provisioned date
3. Add any notes

```markdown
| Supabase | Primary database | 🟢 | Data layer | 2024-01-15 |
```

**Update STATUS.md:**
After all services are 🟢, update `docs/planning/STATUS.md`:
- Mark "Infrastructure provisioned" as complete in Progress section
- Add to Recently Completed: "Infrastructure: [list of services] provisioned"
- Update Next Actions to point to first feature issue

---

## Step 7 - Final Summary

When all services are 🟢:

```
✅ INFRASTRUCTURE READY
=======================

All services provisioned:
├── Supabase: 🟢 Connected (us-east-1)
├── OpenAI: 🟢 API key configured
└── Vercel: 🟢 Project linked

Environment variables: [X]/[X] configured
Migrations: Applied

STATUS.md updated ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can now proceed with development:

  /fix-issue [first-feature-issue-number]

Or verify everything works:

  npm run dev

```

If partially complete:

```
⚠️ INFRASTRUCTURE PARTIALLY READY
==================================

Completed:
├── Supabase: 🟢 Connected

Still needed:
├── OpenAI: 🔴 API key not configured
│   → Get key: https://platform.openai.com/api-keys
│   → Add to .env.local: OPENAI_API_KEY=sk-...
│
└── Vercel: 🔴 Not linked
    → Run: vercel link

STATUS.md: Not updated (infrastructure incomplete)

Run /infra again to continue setup.
```

---

## Error Handling

If something fails during provisioning:

1. Show the error clearly
2. Suggest common fixes
3. Offer to skip and continue with other services
4. Note the issue in INFRASTRUCTURE.md

```
❌ MIGRATION FAILED
===================

Error: relation "users" already exists

Possible causes:
1. Migrations were already run
2. Database has existing tables

Options:
1. Skip (tables already exist)
2. Reset database and retry (⚠️ destroys data)
3. Fix manually and continue

What would you like to do?
```

---

## Notes

- Never store or display actual secret values
- Always confirm before destructive operations
- One step at a time - wait for confirmation
- Update INFRASTRUCTURE.md after each successful provision
- If user says "skip", mark as 🟡 (partial) with note

---

## Subcommand: `/infra costs`

Estimate and track infrastructure costs:

```
💰 INFRASTRUCTURE COSTS
=======================

CURRENT ESTIMATES
├── Supabase (Free tier): $0/month
│   → Pro tier: $25/month (if needed: more storage, backups)
│
├── Vercel (Hobby): $0/month
│   → Pro tier: $20/month (if needed: team features, more bandwidth)
│
├── OpenAI API: ~$5-50/month (usage-based)
│   → Estimate based on: 1000 requests/day × $0.002/request
│
└── [Other services]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL ESTIMATED: $X/month
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCALING NOTES
- At [X] users: Consider upgrading [service] (~$Y/month)
- At [Y] users: Consider upgrading [service] (~$Z/month)

Update INFRASTRUCTURE.md with these estimates? (yes/no)
```

**Common service pricing (as of 2024):**

| Service | Free Tier | Paid Starts At |
|---------|-----------|----------------|
| Supabase | 500MB DB, 1GB storage | $25/month |
| Vercel | 100GB bandwidth | $20/month |
| Netlify | 100GB bandwidth | $19/month |
| Railway | $5 credit | Usage-based |
| Render | 750 hours/month | $7/month |
| OpenAI | None | Usage-based |
| Anthropic | None | Usage-based |
| Clerk | 10K MAU | $25/month |
| Auth0 | 7K MAU | $23/month |
| Stripe | 2.9% + $0.30 | Same |
| Resend | 3K emails/month | $20/month |

## Related Commands

- `/architecture` — Identifies infrastructure requirements
- `/sprint` — Creates infrastructure blocker issue if needed
- `/setup` — Check environment and configuration status
- `/fix-issue` — Start building (after infrastructure is provisioned)
