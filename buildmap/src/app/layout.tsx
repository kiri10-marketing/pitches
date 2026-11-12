import type { Metadata } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-caslon-display" });
const serif = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-caslon-text" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "BuildMap: map out your journey to success",
  description: "Type in an address. BuildMap charts the way from concept to consents, construction and completion. Made by property developers.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
