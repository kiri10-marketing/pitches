import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, holderOf } from "@/lib/access";

// Everything on the site, including /marketing, the brochure and media, sits behind the access gate.
export function proxy(request: NextRequest) {
  if (holderOf(request.cookies.get(ACCESS_COOKIE)?.value)) return NextResponse.next();

  const gate = request.nextUrl.clone();
  gate.pathname = "/access";
  gate.search = "";
  const next = request.nextUrl.pathname + request.nextUrl.search;
  if (next !== "/") gate.searchParams.set("next", next);
  return NextResponse.redirect(gate);
}

export const config = {
  matcher: ["/((?!access|api/access|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
