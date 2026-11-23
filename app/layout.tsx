import type { Metadata } from "next";
import { Cairo, Inter, JetBrains_Mono, Syne } from "next/font/google";

import "./globals.css";

const displayFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const arabicFont = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zoro",
    template: "%s | Zoro",
  },
  description:
    "A next-generation storefront for digital banking, crypto, and telecom services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${arabicFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
