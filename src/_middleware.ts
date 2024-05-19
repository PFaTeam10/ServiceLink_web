import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
   const { cookies } = request;
   const token = cookies['token-cookie']
   const baseUrl = request.nextUrl.origin
   console.log(request.nextUrl.pathname)
   if(request.nextUrl.pathname == "/auth/signin/" || request.nextUrl.pathname == "/auth/signup/" )
   {
    console.log(request.nextUrl.pathname)
    if(token != undefined) 
        return NextResponse.redirect(baseUrl + '/')
   } else
    {
        console.log("hna2")
        if(token == undefined)
            return NextResponse.redirect(baseUrl + "/auth/signin/")
    }
}