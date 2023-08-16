import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ecopanda.vercel.app"),
  title: {
    default: "EcoPanda",
    template: "%s | EcoPanda",
  },
  description: "The Panda CSS Ecosystem",
  keywords: ["Panda CSS", "Components"],
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecopanda.vercel.app",
    description: "The Panda CSS Ecosystem",
  },
  twitter: {
    // card: "summary_large_image",
    creator: "@anubra266",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
