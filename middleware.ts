import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define the blog subdomain
  const blogSubdomain = 'blog.kennethosorio.dev';

  // Check if we are on the blog subdomain
  // Also support localhost for development (e.g., blog.localhost:3000)
  const isBlogSubdomain = hostname === blogSubdomain || hostname.startsWith('blog.localhost');

  if (isBlogSubdomain) {
    // Avoid infinite loops if the path already starts with /blog
    if (url.pathname.startsWith('/blog')) {
      return NextResponse.next();
    }

    // Rewrite the root of the subdomain to /blog
    // Rewrite /[slug] to /blog/[slug]
    const path = url.pathname === '/' ? '/blog' : `/blog${url.pathname}`;
    
    return NextResponse.rewrite(new URL(path, request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
