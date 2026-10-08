import type { Audience } from "@/content/copy";

// NEXT_PUBLIC_SITE is set per Vercel project: "agents" or "builders".
// Unset (local, or a combined deploy) shows a chooser at "/" with both sides.
export const SITE = (process.env.NEXT_PUBLIC_SITE || "") as "" | Audience;

const SPLIT_URLS: Record<Audience, string> = {
  agents: "https://pitch-sitely-agents.vercel.app",
  builders: "https://pitch-sitely-builders.vercel.app",
};

/** Link to a page on one side. Same side keeps a relative path; the other side links across when split. */
export function to(aud: Audience, path = "") {
  const p = `/${aud}${path}`;
  if (!SITE || SITE === aud) return p;
  return `${SPLIT_URLS[aud]}${p}`;
}
