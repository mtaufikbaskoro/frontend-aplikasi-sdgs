import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function middleware(request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    
    const url = request.nextUrl.clone()
    
    if (!token) {
        url.pathname = `/login`
        url.searchParams.set('isLogin', false)
        return NextResponse.redirect(url)
    } 

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
}