import { NextResponse } from "next/server";
import { buildJob, type Order } from "@/lib/job";

// Receives a BuildMap order, turns it into a job package and hands it on.
// ORDER_WEBHOOK_URL (optional): where the job goes next, e.g. a Zapier/Make hook that saves
// buildmap.json into a new Google Drive job folder and emails Paul. Without it the job is only logged.
export async function POST(req: Request) {
  let body: Partial<Order>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Could not read the form." }, { status: 400 });
  }
  const missing = (["address", "name", "email", "clientType", "levels"] as const).filter((k) => !String(body[k] ?? "").trim());
  if (missing.length) return NextResponse.json({ error: `Please fill in: ${missing.join(", ")}` }, { status: 400 });
  if (!["1", "1,2", "1,2,3"].includes(String(body.levels))) return NextResponse.json({ error: "Pick a level." }, { status: 400 });

  const { pkg, ok, errors } = buildJob({ ...(body as Order), website: body.website !== false });
  if (!ok) return NextResponse.json({ error: "Some details don't look right.", details: errors }, { status: 400 });

  const hook = process.env.ORDER_WEBHOOK_URL;
  let forwarded = false;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pkg) });
      forwarded = r.ok;
    } catch {
      forwarded = false;
    }
  }
  console.log("buildmap-order", JSON.stringify({ id: pkg.job.id, forwarded, pkg }));
  return NextResponse.json({ job: pkg, forwarded });
}
