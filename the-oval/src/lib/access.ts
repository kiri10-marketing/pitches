// Named access codes for the private preview.
// Set ACCESS_CODES on Vercel as "Name=CODE;Name=CODE". Remove a pair to cut that person off.
// With no codes configured the gate lets nobody in.

export const ACCESS_COOKIE = "oval_access";

export function accessCodes(): Map<string, string> {
  const codes = new Map<string, string>();
  for (const pair of (process.env.ACCESS_CODES ?? "").split(";")) {
    const i = pair.lastIndexOf("=");
    if (i < 1) continue;
    const name = pair.slice(0, i).trim();
    const code = normalise(pair.slice(i + 1));
    if (name && code) codes.set(code, name);
  }
  return codes;
}

export function normalise(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

// Returns the holder's name, or null when the code is unknown or revoked.
export function holderOf(code: string | undefined): string | null {
  if (!code) return null;
  return accessCodes().get(normalise(code)) ?? null;
}

// Shown on the gate page and saved word for word with each acceptance.
export const CLAUSE_VERSION = "2026-10-15";
export const CLAUSE = [
  "The concept for 120 Main South Road, Sockburn (\"The Oval\"), including this website, the brochure, the development documents and all images, plans and figures, is confidential.",
  "It is provided to me only so I can evaluate this proposal with Bayleys and the developer.",
  "I will not share it, or my access code, with any other agency, agent or party, and I will not use it to market or develop the site with anyone else.",
  "I will not copy, forward, publish or reproduce it, in whole or in part, without written consent.",
  "I understand it is a concept only, has not been consented, and may change.",
];
