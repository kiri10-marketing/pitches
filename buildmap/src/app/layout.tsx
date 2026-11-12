import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "BuildMap: map out your journey to success",
  description: "Type in an address. BuildMap takes it from concept to consents, construction and completion, with the website, sales brochure and marketing assets to sell it.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={figtree.variable}>
      <body>{children}</body>
    </html>
  );
}
