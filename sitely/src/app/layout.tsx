import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";

const head = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", weight: ["500", "700", "800"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "Sitely: development pitches for agents and builders",
  description: "Development land, seen through a developer's lens.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
