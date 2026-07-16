// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Check if the user is trying to access /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Get the authentication token from cookies
    const authCookie = request.cookies.get('admin_token');

    // 3. Compare with a secret stored in your Environment Variables
    // You must set ADMIN_SECRET in your Cloudflare Pages / Vercel dashboard
    if (!authCookie || authCookie.value !== process.env.ADMIN_SECRET) {
      // Redirect to a login page (you must create /admin/login)
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// 4. Matcher tells Next.js which paths to run this on
export const config = {
  matcher: ['/admin/:path*'],
};