# Pitches

Pitch websites, one folder per pitch. Each folder is a standalone Next.js app.

| Folder | Style | Live link |
|---|---|---|
| `sitely` | Sitely brand (agents and builders portals) | https://pitch-sitely-agents.vercel.app, https://pitch-sitely-builders.vercel.app (pending) |

- Each folder deploys to its own Vercel project, `pitch-<folder>`, live at `https://pitch-<folder>.vercel.app`.
- Pitch sites are noindex until the job is won.
- When a job is won, the client's domain is added to that Vercel project. If the client needs to own the code, the folder can be split into its own repo.
