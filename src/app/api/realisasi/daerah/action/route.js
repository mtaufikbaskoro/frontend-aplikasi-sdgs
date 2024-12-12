import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST (request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value

    const data = request.json()
    return NextResponse.json({test: 'hello'}, {status: 500})

}
