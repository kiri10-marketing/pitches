import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site, hero } from "@/content/copy";

const heading = Schibsted_Grotesk({ variable: "--font-heading", subsets: ["latin"], weight: ["600", "700", "800", "900"] });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  // Demo site: keep it out of search engines until launch is approved.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.name} | ${hero.headline}`,
    description: site.description,
    type: "website",
    locale: "en_NZ",
    images: [{ url: "/media/hero-poster.jpg", width: 1920, height: 1080, alt: "Artist's impression of The Oval" }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${hero.headline}`, description: site.description, images: ["/media/hero-poster.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
