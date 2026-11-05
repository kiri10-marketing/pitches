import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site, hero } from "@/content/copy";

// Luxury pairing: a light, high-contrast serif for display, a clean geometric sans for reading.
const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"] });
const body = Jost({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  // Pitch demo: keep it out of search engines until launch is approved.
  robots: { index: false, follow: false },
  openGraph: {
    title: "The Mantra · 26–28 Whitmore Street",
    description: site.description,
    type: "website",
    locale: "en_NZ",
    images: [{ url: hero.poster, width: 1536, height: 1024, alt: hero.imageAlt }],
  },
  twitter: { card: "summary_large_image", title: "The Mantra · 26–28 Whitmore Street", description: site.description, images: [hero.poster] },
};

export const viewport: Viewport = { themeColor: "#1d1e22" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
