# Pitches

Pitch websites, one folder per pitch. Each folder is a standalone Next.js app.

| Folder | Style | Live link |
|---|---|---|
| downsize | First downsizing concept ("Level"), superseded by decant | Private preview only |
| decant | Decant downsizing concierge: site, quiz, demand map | Private preview only |

- Each folder deploys to its own Vercel project, `pitch-<folder>`, live at `https://pitch-<folder>.vercel.app`.
- Pitch sites are noindex until the job is won.
- When a job is won, the client's domain is added to that Vercel project. If the client needs to own the code, the folder can be split into its own repo.
