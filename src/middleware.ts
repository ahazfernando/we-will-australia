import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    
    // Set no-cache headers for magazine routes to prevent caching
    if (request.nextUrl.pathname.startsWith('/magazine')) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
    }
    
    return response;
}

export const config = {
    matcher: [
        '/magazine',
        '/magazine/:path*',
    ],
};

