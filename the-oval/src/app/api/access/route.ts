import { NextResponse } from "next/server";
import { ACCESS_COOKIE, CLAUSE, CLAUSE_VERSION, holderOf, normalise } from "@/lib/access";
import { recordAcceptance } from "@/lib/acceptances";

// Only same-site paths, so the gate can't be used to bounce people elsewhere.
function safeNext(value: FormDataEntryValue | null): string {
  const next = String(value ?? "/");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function POST(req: Request) {
  const form = await req.formData();
  const code = normalise(String(form.get("code") ?? ""));
  const next = safeNext(form.get("next"));
  const name = String(form.get("name") ?? "").trim().slice(0, 120);
  const agreed = form.get("agree") === "yes";
  const holder = holderOf(code);
  const error = !holder ? "code" : !name ? "name" : !agreed ? "agree" : null;

  if (error) {
    const back = new URL("/access", req.url);
    back.searchParams.set("error", error);
    if (next !== "/") back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  await recordAcceptance({
    acceptedAt: new Date().toISOString(),
    name,
    holder: holder!,
    code,
    clause: `${CLAUSE_VERSION}: ${CLAUSE.join(" ")}`,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "",
    userAgent: req.headers.get("user-agent") ?? "",
  });

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
