import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const url = process.env.NEXT_PUBLIC_API_URL

    if (!token) return NextResponse.json({
        message: 'No cookies found.',
        error: true,
        data: null
    })

    const response = await fetch(`${url}/auth/get-subunits`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (response.ok) {
        const result = await response.json()
        const { data, error, message } = result
        if (error) return NextResponse.json(result, {status: 404})
        return NextResponse.json(result)
    }
}