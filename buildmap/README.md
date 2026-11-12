# BuildMap

From an address to a sale-ready website. This folder holds the first pieces of the BuildMap product:

| Path | What it is |
| --- | --- |
| `spec/HANDOFF.md` | The hand-off contract between Paul's agent (Levels 1 to 3) and the website builder, in plain words |
| `spec/buildmap.schema.json` | The same contract as a JSON Schema (`buildmap.json`, v0.2) |
| `examples/275-montreal/` | The contract filled in from the 08 Oct 2026 concept report for 275 Montreal Street, plus the generated website brief |
| `tools/validate.mjs` | Checks a job package: `node tools/validate.mjs <job folder>` |
| `tools/to-site-brief.mjs` | Turns a package into `site-brief.md` and `copy-seed.json` for the website-generator skill |
| `src/` | The BuildMap order page (Next.js): address in, job file out |

## Order page

`npm install && npm run dev` (port 3100). The form posts to `/api/order`, which builds the `job` and `site` part of a `buildmap.json`, checks it against the schema and returns it. If `ORDER_WEBHOOK_URL` is set (Vercel env), the job is also POSTed there, for example to a Zapier or Make hook that creates the Google Drive job folder and emails Paul. Without it the job is only logged.

Deploys like every pitch folder: Vercel project `pitch-buildmap`, noindex.
