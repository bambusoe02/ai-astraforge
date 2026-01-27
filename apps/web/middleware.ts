import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk keys are available
const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY
);

export function middleware(request: NextRequest) {
  // If Clerk is not configured, skip authentication middleware
  if (!hasClerkKeys) {
    return NextResponse.next();
  }

  // If Clerk is configured, you can add authentication logic here
  // For now, just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
