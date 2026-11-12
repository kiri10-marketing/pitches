import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";

const head = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", weight: ["600", "700", "800"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "BuildMap: from an address to a sale-ready website",
  description: "Order a BuildMap by address: a construction manager's concept, technical and build reports, and a website ready to sell the project.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
