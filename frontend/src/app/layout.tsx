import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musikzentrum Songs",
  description: "Finde schnell deine Lieblingssongs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PlausibleProvider
        domain={process.env.NEXT_PUBLIC_FRONTEND_DOMAIN!}
        selfHosted={true}
        enabled={false}
        trackLocalhost={false}
      />
      <GoogleAnalytics gaId="G-8NYWHGZ1ZH" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
