import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get("access_token")?.value;
	// If the user is not logged in and trying to access a protected route


	// If the user is logged in and trying to access auth pages
	if (
		!isAuthenticated &&
		(request.nextUrl.pathname.startsWith("/login") ||
			request.nextUrl.pathname.startsWith("/register"))
	) {
		// Redirect to the welcome page
		return NextResponse.redirect(new URL("/scrap", request.url));
	}

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
