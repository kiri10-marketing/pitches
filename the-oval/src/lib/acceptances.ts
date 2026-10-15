import { put } from "@vercel/blob";

export type Acceptance = { acceptedAt: string; name: string; holder: string; code: string; clause: string; ip: string; userAgent: string };

// Each acceptance of the confidentiality clause is kept as its own JSON file in the
// the-oval-access-log Blob store (random suffix, so the URLs can't be guessed).
// It is also written to the Vercel logs as a backup.
export async function recordAcceptance(a: Acceptance) {
  console.log(`[access] ${a.name} (code holder: ${a.holder}) accepted the confidentiality clause at ${a.acceptedAt}`);
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await put(`access-log/${a.acceptedAt.replace(/[:.]/g, "-")}.json`, JSON.stringify(a, null, 2), {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
    });
  } catch (err) {
    console.error("[access] could not save acceptance", err);
  }
}
