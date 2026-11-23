# Pitches

Pitch websites, one folder per pitch. Each folder is a standalone Next.js app.

| Folder | Style | Live link |
|---|---|---|
| `central-circle` | The Rise style, Circle Living cohousing | https://pitch-central-circle.vercel.app |
| `deploy-test` | Pipeline test page | https://pitch-deploy-test.vercel.app |

- Each folder deploys to its own Vercel project, `pitch-<folder>`, live at `https://pitch-<folder>.vercel.app`.
- Pitch sites are noindex until the job is won.
- When a job is won, the client's domain is added to that Vercel project. If the client needs to own the code, the folder can be split into its own repo.
