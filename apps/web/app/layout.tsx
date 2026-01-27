import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@astraforge/ui";
import "../styles/globals.css";

// Conditional Clerk import (only if keys are available)
let ClerkProvider: any = null;
if (typeof window === "undefined" && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  try {
    ClerkProvider = require("@clerk/nextjs").ClerkProvider;
  } catch (e) {
    // Clerk not available, continue without it
  }
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstraForge - AI-Powered Monorepo Factory",
  description: "Build full-stack applications across platforms with AI agents",
};

// Check if Clerk keys are available (only at runtime, not build time)
const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <>
      {!hasClerkKeys && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-2 text-center">
          <p className="text-sm text-yellow-200">
            🚧 Demo Mode - Authentication Disabled
          </p>
        </div>
      )}
      {children}
      <Analytics />
    </>
  );

  // Only wrap with ClerkProvider if keys are available and component loaded
  if (hasClerkKeys && ClerkProvider && typeof ClerkProvider !== "undefined") {
    const Clerk = ClerkProvider;
    return (
      <Clerk>
        <html lang="en" className="dark">
          <body className={cn(inter.className, "min-h-screen bg-background")}>
            {content}
          </body>
        </html>
      </Clerk>
    );
  }

  // Demo mode without authentication
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {content}
      </body>
    </html>
  );
}
