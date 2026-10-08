import { NextResponse, type NextRequest } from "next/server";

// On a single-side deploy (NEXT_PUBLIC_SITE=agents|builders) the home page is that side's landing page.
export function middleware(req: NextRequest) {
  const site = process.env.NEXT_PUBLIC_SITE;
  if (site && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${site}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
