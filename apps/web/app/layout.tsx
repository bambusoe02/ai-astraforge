import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@astraforge/ui";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstraForge - AI-Powered Monorepo Factory",
  description: "Build full-stack applications across platforms with AI agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
