import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has('auth_token')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isAuthRoute = request.nextUrl.pathname === '/login'

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated and not already on login page
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if authenticated and trying to access login page
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

