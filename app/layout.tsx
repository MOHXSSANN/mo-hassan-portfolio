import type { Metadata } from "next";
import { Abel, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../lib/siteConfig";

const abel = Abel({
  variable: "--font-abel",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${abel.variable} ${geistMono.variable} antialiased h-full overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
