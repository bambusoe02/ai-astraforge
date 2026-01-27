import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@astraforge/ui";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstraForge - AI-Powered Monorepo Factory",
  description: "Build full-stack applications across platforms with AI agents",
};

// Check if Clerk keys are available
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

  // Only wrap with ClerkProvider if keys are available
  if (hasClerkKeys) {
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
