---
description: Set up monitoring and observability for production
---

# Role: Site Reliability Engineer

Use this command to set up error tracking, uptime monitoring, analytics, and performance monitoring for your production application.

## Before Starting
1. Read `CLAUDE.md` for project tech stack
2. Read `docs/planning/INFRASTRUCTURE.md` for current services
3. Read `docs/planning/STATUS.md` for current state

## Step 1 - Detect Project Type

Read `package.json`, `requirements.txt`, or tech stack from `CLAUDE.md` to determine:
- Framework (Next.js, FastAPI, Django, etc.)
- Hosting platform (Vercel, Railway, Fly.io, etc.)
- Existing monitoring (check for Sentry, LogRocket, etc. in dependencies)

```
PROJECT MONITORING ASSESSMENT
==============================

Framework: [detected]
Hosting: [detected]
Existing monitoring: [list or "None"]
```

## Step 2 - Error Tracking

**Recommended options:**
| Tool | Best For | Free Tier |
|------|----------|-----------|
| Sentry | Most projects | 5K errors/month |
| LogRocket | Frontend-heavy apps | 1K sessions/month |
| Bugsnag | Alternative to Sentry | 7.5K events/month |

**Setup steps:**
1. Install the SDK for the chosen tool
2. Configure with environment variable (e.g., `SENTRY_DSN`)
3. Add to error boundaries and API error handlers
4. Verify by triggering a test error

```
Error tracking: [Tool]
Status: [Installed / Configured / Verified]
```

→ Wait for user to choose a tool and confirm setup.

## Step 3 - Uptime Monitoring

**Recommended options:**
| Tool | Best For | Free Tier |
|------|----------|-----------|
| BetterStack | Full-featured | 5 monitors |
| UptimeRobot | Simple uptime | 50 monitors |
| Checkly | API + browser checks | 5 checks |

**Setup steps:**
1. Create a health endpoint:
```typescript
// /api/health
export function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}
```
2. Configure the monitoring service to check `/api/health`
3. Set alert channels (email, Slack, SMS)
4. Verify by checking the monitoring dashboard

→ Wait for user to choose and confirm.

## Step 4 - Analytics

**Recommended options:**
| Tool | Best For | Free Tier |
|------|----------|-----------|
| PostHog | Open-source, full suite | 1M events/month |
| Vercel Analytics | Next.js projects | Included with Vercel |
| Plausible | Privacy-first | Self-hosted free |

**Setup steps:**
1. Install the analytics SDK
2. Configure with environment variable
3. Verify events are arriving in the dashboard

→ Wait for user to choose and confirm.

## Step 5 - Performance Monitoring

**Recommended options:**
| Tool | Best For | Free Tier |
|------|----------|-----------|
| Vercel Speed Insights | Next.js on Vercel | Included |
| Web Vitals tracking | Any web app | Free (via analytics) |
| Lighthouse CI | CI/CD pipeline | Free |

**Setup steps:**
1. Install performance monitoring
2. Set up Core Web Vitals tracking (LCP, FID, CLS)
3. Add to CI if applicable

→ Wait for user to choose and confirm.

## Step 6 - Update Infrastructure Docs

Update `docs/planning/INFRASTRUCTURE.md` — add monitoring services to the Monitoring & Observability section.

Update `docs/planning/STATUS.md` — record monitoring setup.

```
✅ MONITORING CONFIGURED
=========================

Error tracking: [Tool] — [status]
Uptime monitoring: [Tool] — [status]
Analytics: [Tool] — [status]
Performance: [Tool] — [status]

Dashboard URLs:
- [Tool]: [URL]
- [Tool]: [URL]
```

## Rollback

This command modifies infrastructure and status docs. To revert:
```bash
git checkout -- docs/planning/INFRASTRUCTURE.md docs/planning/STATUS.md
```

## Related Commands

- `/infra` — Provision other infrastructure services
- `/deploy` — Deploy with monitoring in place
- `/setup` — Check overall environment configuration
