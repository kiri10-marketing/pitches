import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Leads and portal briefs. Forwards to LEAD_WEBHOOK_URL when set (CRM, Zapier, email).
// Without it: saved to data/leads.jsonl locally; on Vercel (no lasting disk) it goes to the server log only.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const lead = { ...body, receivedAt: new Date().toISOString(), site: process.env.NEXT_PUBLIC_SITE || "combined" };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    } catch (e) {
      console.error("LEAD_WEBHOOK_FAILED", e);
    }
  }
  console.log("SITELY_LEAD", JSON.stringify(lead));
  if (!process.env.VERCEL) {
    try {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n");
    } catch {}
  }
  return NextResponse.json({ ok: true });
}
