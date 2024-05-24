import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export default function middleware(request: NextRequest) {
   const { cookies } = request;
   const token = cookies.get('token-cookie')?.value
   const baseUrl = request.nextUrl.origin
    if(request.nextUrl.pathname == "/auth/signin" || request.nextUrl.pathname == "/auth/signup" )
    {
        console.log("hna1")
     console.log(request.nextUrl.pathname)
     if(token != undefined) 
         return NextResponse.redirect(baseUrl + '')
    } 
}