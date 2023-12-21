import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login"  || path === "/signup";
  const isProfile = path === "/profile" || path === "/profile/*"
  const isToken = request.cookies.get("token")?.value || "";

  if (isPublicPath && isToken){
    return NextResponse.redirect(new URL("/profile", request.nextUrl))
  }
  if(!isPublicPath && !isToken){
    return NextResponse.redirect(new URL ('/login', request.nextUrl))
  }
  if (isProfile && !isToken){
    return NextResponse.redirect( new URL ("/login",request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/login','/signup','/profile','/profile/:path*']
}