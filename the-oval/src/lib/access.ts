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
