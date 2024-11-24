import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) return NextResponse.json({
        message: 'No cookies found.',
        error: true,
        data: null
    })

    const response = await fetch('http://v3.test/api/index/v1/astra/auth/get-subunits', {
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