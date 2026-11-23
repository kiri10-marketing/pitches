# The Central Circle, by Circle Living

Pitch site for a cohousing neighbourhood at 208–218 Kilmore Street and 349 Barbadoes Street, Christchurch Central. Built in the style of The Rise (`kiri10-marketing/the-rise-site`). Circle Living is the selling agent: no real estate agent.

- All words: `src/content/copy.ts` ([DRAFT] = Claude-drafted copy, [PLACEHOLDER] = still to confirm).
- Renders come from the Kilmore K06 Render Collection R02 (BuildMap, 23 Nov 2026). They are AI style studies, not plan-accurate.
- Circle Living logo and contact details are from circleliving.nz.
- Whole site is noindex. Form leads go to `LEAD_WEBHOOK_URL` when set; otherwise they are not kept on Vercel.
- Live: https://pitch-central-circle.vercel.app (Vercel project `pitch-central-circle`).

Run locally: `npm ci && npm run dev` (port 3103).
