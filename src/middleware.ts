import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In production, only allow access from localhost
    if (process.env.NODE_ENV === 'production') {
      const hostname = request.headers.get('host') || request.nextUrl.hostname;
      const isLocalhost =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('localhost:') ||
        hostname.startsWith('127.0.0.1:') ||
        hostname === '[::1]' ||
        hostname.startsWith('[::1]:');

      if (!isLocalhost) {
        // Redirect to landing page instead of showing error
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

