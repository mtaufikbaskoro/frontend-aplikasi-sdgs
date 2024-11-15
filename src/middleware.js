import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const loginUrl = `${request.nextUrl.origin}/login?isLogin=${false}`

    if (!token) return NextResponse.redirect(loginUrl)

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}