import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

// Add logging for debugging
const debugLog = (message: string, data?: any) => {
  console.log(`[Middleware Debug] ${message}`, data || "");
};

// Route configurations
const AUTH_ROUTES = {
  publicRoutes: new Set(["/", "/login", "/register", "/api/auth"]),
  protectedRoutes: new Set(["/past-messages", "/messages"]),
} as const;

export default withAuth(
  async function middleware(request: NextRequest) {
    console.log(
      `[Middleware Debug] Running middleware for: ${request.nextUrl.pathname}`
    );

    try {
      const pathname = request.nextUrl.pathname;
      debugLog("Current pathname:", pathname);

      // Handle root path variations
      const normalizedPath = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
      debugLog("Normalized path:", normalizedPath);

      // Check if route is public
      if (AUTH_ROUTES.publicRoutes.has(normalizedPath)) {
        debugLog("Public route detected");
        return NextResponse.next();
      }

      // Verify authentication
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      debugLog("Auth token:", token ? "exists" : "none");

      // Protected route check
      if (AUTH_ROUTES.protectedRoutes.has(normalizedPath)) {
        debugLog("Protected route detected");
        if (!token) {
          debugLog("No token - redirecting to login");
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    pages: {
      signIn: "/", // Redirects unauthenticated users to login
    },
  }
);

// Update matcher to be more specific
export const config = {
  matcher: ["/past-messages", "/messages", "/", "/login", "/messages/:id*"],
};
