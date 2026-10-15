import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

// Leads save to a local file until LEAD_WEBHOOK_URL is set, then forward to it (CRM, Zapier, email).
// On Vercel only /tmp is writable and it does not persist, so set LEAD_WEBHOOK_URL before real launch.
const LEADS_DIR = process.env.VERCEL ? "/tmp/leads" : path.join(process.cwd(), "leads");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  if (body.company) return NextResponse.json({ ok: true }); // spam trap filled: drop quietly

  const clean = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);
  const lead = {
    receivedAt: new Date().toISOString(),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    interest: clean(body.interest, 60),
    buyer: clean(body.buyer, 60),
    message: clean(body.message, 2000),
    source: "theoval-website",
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.phone) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    await mkdir(LEADS_DIR, { recursive: true });
    await appendFile(path.join(LEADS_DIR, "leads.jsonl"), JSON.stringify(lead) + "\n");
  }
  return NextResponse.json({ ok: true });
}
