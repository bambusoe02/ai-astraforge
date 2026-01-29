import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@astraforge/ui";
import "../styles/globals.css";

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AstraForge - AI-Powered Monorepo Factory",
    template: "%s | AstraForge",
  },
  description: "Generate production-ready applications across 4 platforms in 4 minutes using AI. 5 specialized agents handle everything from architecture to deployment.",
  keywords: [
    "AI code generation",
    "monorepo",
    "Next.js",
    "FastAPI",
    "React Native",
    "AI agents",
    "LangGraph",
    "Turborepo",
    "code automation",
    "full-stack development",
    "cross-platform",
    "AI-powered development",
    "automated code generation",
    "monorepo factory",
    "production-ready code",
  ],
  authors: [{ name: "Marcin Baran", url: "https://github.com/bambusoe02" }],
  creator: "Marcin Baran",
  publisher: "AstraForge",
  metadataBase: new URL("https://ai-astraforge.vercel.app"),
  alternates: {
    canonical: "/",
  },
  
  // Open Graph
  openGraph: {
    title: "AstraForge - AI-Powered Monorepo Factory",
    description: "Build full-stack apps across 4 platforms in 4 minutes with AI. Generate production-ready code with 5 specialized AI agents.",
    url: "https://ai-astraforge.vercel.app",
    siteName: "AstraForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AstraForge Dashboard Preview - AI-Powered Monorepo Factory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "AstraForge - AI-Powered Monorepo Factory",
    description: "Build full-stack apps in 4 minutes with AI. Generate production-ready code across Web, API, Mobile, and Extension.",
    creator: "@bambusoe02",
    images: ["/og-image.png"],
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Category
  category: "technology",
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
        <div className="bg-blue-500/10 border-b border-blue-500/20 p-2 text-center">
          <p className="text-sm text-blue-200">
            🔐 Authentication Disabled - Using Public Access
          </p>
        </div>
      )}
      {children}
      <Analytics />
    </>
  );

  // Demo mode without authentication (Clerk disabled for demo)
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://ai-astraforge.vercel.app" />
      </head>
      <body className={cn(inter.className, inter.variable)}>
        {content}
      </body>
    </html>
  );
}
