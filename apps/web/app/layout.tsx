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

// Check if Clerk keys are available (only at runtime, not build time)
const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY
);

// Dynamic import for ClerkProvider (client-side only, avoids build errors)
async function getClerkProvider() {
  if (typeof window !== "undefined" && hasClerkKeys) {
    try {
      const { ClerkProvider } = await import("@clerk/nextjs");
      return ClerkProvider;
    } catch (e) {
      return null;
    }
  }
  return null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ClerkProvider = await getClerkProvider();
  
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

  // Only wrap with ClerkProvider if available
  if (hasClerkKeys && ClerkProvider) {
    return (
      <ClerkProvider>
        <html lang="en" className="dark">
          <body className={cn(inter.className, "min-h-screen bg-background")}>
            {content}
          </body>
        </html>
      </ClerkProvider>
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
