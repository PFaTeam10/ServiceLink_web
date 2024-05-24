import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
   const { cookies, nextUrl } = request;
   const token = cookies.get('token-cookie')?.value;
   const baseUrl = nextUrl.origin;

   if (nextUrl.pathname === "/auth/signin" || nextUrl.pathname === "/auth/signup") {
      if (token !== undefined) {
         return NextResponse.redirect(baseUrl + '/');
      } 
   } else {
      if (token === undefined) {
         return NextResponse.redirect(baseUrl + '/auth/signin');
      }
   }

   console.log("Request allowed to proceed");
   return NextResponse.next();
}
export const config = {
matcher: ["/auth/signin", "/auth/signup", "/","/reports","/profile","/settings"]
}
