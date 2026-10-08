"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { landing, type Audience } from "@/content/copy";
import { getSession, signOut, type Session } from "@/lib/portal";
import { to } from "@/lib/links";
import { Logo } from "../Logo";

export const word = (a: Audience) => (a === "agents" ? { one: "pitch", many: "pitches", New: "New pitch" } : { one: "project", many: "projects", New: "New project" });

export function PreviewNote() {
  return (
    <div className="bg-gold/20 px-4 py-2 text-center text-sm text-ink">
      <b>Preview portal.</b> Sign-in and your list are saved in this browser only. Briefs are sent to Sitely; uploaded files are not stored yet.
    </div>
  );
}

/** Wraps signed-in portal pages; sends visitors without a session to the sign-in page. */
export function PortalShell({ audience, children }: { audience: Audience; children: (s: Session) => React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const s = getSession(audience);
    setSession(s);
    if (!s) router.replace(to(audience, "/portal"));
  }, [audience, router]);

  if (!session) return <div className="min-h-screen bg-cream" />;

  const w = word(audience);
  return (
    <div className="min-h-screen bg-cream">
      <PreviewNote />
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Logo product={landing[audience].product} href={to(audience, "/portal/dashboard")} />
          <nav className="flex items-center gap-2 text-[16px] font-semibold">
            <Link href={to(audience, "/portal/dashboard")} className="rounded-full px-3 py-2 hover:bg-sand">
              My {w.many}
            </Link>
            <Link href={to(audience, "/portal/new")} className="btn btn-gold px-4 py-2">
              + {w.New}
            </Link>
            <button
              onClick={() => {
                signOut(audience);
                router.push(to(audience));
              }}
              className="rounded-full px-3 py-2 text-muted hover:bg-sand"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children(session)}</main>
    </div>
  );
}

export const verdictStyle = {
  green: { dot: "bg-[#2f9e5b]", label: "Green", text: "text-[#1f7a43]", bg: "bg-[#2f9e5b]/12" },
  amber: { dot: "bg-gold", label: "Amber", text: "text-[#8a5d00]", bg: "bg-gold/20" },
  red: { dot: "bg-[#d0473a]", label: "Red", text: "text-[#a2281d]", bg: "bg-[#d0473a]/12" },
};
