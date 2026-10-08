# Sitely for Agents and Sitely for Builders

Two landing pages and two client portals from one Next.js app, in Sitely branding.

| Side | Landing | Portal | Vercel project |
|---|---|---|---|
| Agents | `/agents` | `/agents/portal` | `pitch-sitely-agents` (`NEXT_PUBLIC_SITE=agents`) |
| Builders | `/builders` | `/builders/portal` | `pitch-sitely-builders` (`NEXT_PUBLIC_SITE=builders`) |

With `NEXT_PUBLIC_SITE` set, `/` shows that side's landing page and links to the other side go to its own site. Unset (local), `/` is a chooser.

All copy is in `src/content/copy.ts`. Prices are starting points from the strategy doc, not tested rates.

## What works and what is a mock

| Feature | State |
|---|---|
| Landing pages, examples, pricing, FAQ | Working |
| "Request a call back" form | Working: posts to `/api/lead`, forwarded to `LEAD_WEBHOOK_URL` when set, otherwise server log only on Vercel (`data/leads.jsonl` locally) |
| Portal sign-in (magic link) | Mock: no email is sent; the "link" is a button. Session stored in the browser |
| Dashboard and status view | Mock data: sample pitches/projects plus anything submitted, stored in the browser's localStorage |
| New pitch / new site form | Half working: the brief (text fields and file names) is sent to `/api/lead` like a lead; the files themselves are not uploaded |
| Status updates, verdicts | Mock: set in sample data; nobody at Sitely can update them yet |
| Viewing alerts | Placeholder card only |

## To wire later

1. Auth: real magic-link email (Auth.js with Resend, or Clerk).
2. Database for pitches/projects and status updates (Vercel Postgres, Supabase or Neon), plus a small admin view for Kiri and Paul to move stages and post updates.
3. File uploads to storage (Vercel Blob or S3).
4. `LEAD_WEBHOOK_URL` for leads and briefs (CRM, Zapier or email).
5. Viewing alerts: analytics events on pitch sites, sent to the agent.
6. Domain (e.g. sitely.co.nz/agents) and removing noindex when ready to go public.

## Deploy

```
npx -y vercel@62 link --yes --project pitch-sitely-agents --scope team_SxiKXovNpL2mnFpJjt9JoJgN --token "$VERCEL_TOKEN"
npx -y vercel@62 deploy --prod --yes --build-env NEXT_PUBLIC_SITE=agents --scope team_SxiKXovNpL2mnFpJjt9JoJgN --token "$VERCEL_TOKEN"
```
Then the same with `builders`.
