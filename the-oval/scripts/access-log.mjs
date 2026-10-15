// Prints every confidentiality acceptance as CSV.
// Run from this folder after `vercel env pull .env.production.local`:  node --env-file=.env.production.local scripts/access-log.mjs
import { list } from "@vercel/blob";

const rows = [];
let cursor;
do {
  const page = await list({ prefix: "access-log/", cursor });
  for (const b of page.blobs) rows.push(await (await fetch(b.url)).json());
  cursor = page.cursor;
} while (cursor);

rows.sort((a, b) => a.acceptedAt.localeCompare(b.acceptedAt));
const q = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
console.log("accepted_at_utc,name,code_holder,code,ip");
for (const r of rows) console.log([r.acceptedAt, r.name, r.holder, r.code, r.ip].map(q).join(","));
