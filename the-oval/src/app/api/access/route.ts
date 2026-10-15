import { NextResponse } from "next/server";
import { ACCESS_COOKIE, holderOf, normalise } from "@/lib/access";

// Only same-site paths, so the gate can't be used to bounce people elsewhere.
function safeNext(value: FormDataEntryValue | null): string {
  const next = String(value ?? "/");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function POST(req: Request) {
  const form = await req.formData();
  const code = normalise(String(form.get("code") ?? ""));
  const next = safeNext(form.get("next"));
  const holder = holderOf(code);

  if (!holder) {
    const back = new URL("/access", req.url);
    back.searchParams.set("error", "1");
    if (next !== "/") back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  // Shows in the Vercel logs, so we can see who opened the site and when.
  console.log(`[access] ${holder} opened The Oval at ${new Date().toISOString()}`);

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(ACCESS_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
