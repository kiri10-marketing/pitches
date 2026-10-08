import Link from "next/link";
import { chooser } from "@/content/copy";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-green text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <Logo href="/" light />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-20 sm:px-6">
        <h1 className="max-w-3xl text-5xl font-extrabold text-white sm:text-6xl">{chooser.title}</h1>
        <p className="mt-5 max-w-2xl text-xl text-white/85">{chooser.body}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {chooser.cards.map((c) => (
            <Link key={c.aud} href={`/${c.aud}`} className="group rounded-3xl bg-cream p-8 text-ink transition hover:-translate-y-1 hover:shadow-2xl">
              <h2 className="text-3xl font-extrabold">{c.title}</h2>
              <p className="mt-3 text-lg text-muted">{c.body}</p>
              <span className="btn btn-gold mt-8">Go to Sitely for {c.aud === "agents" ? "Agents" : "Builders"} →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
