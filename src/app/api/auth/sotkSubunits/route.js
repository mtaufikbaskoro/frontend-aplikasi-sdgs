import { getApi } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET () {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) return NextResponse.json({
        message: 'No cookies found.',
        error: true,
        data: null
    })

    const response = await fetch(getApi(`/auth/get-subunits`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    if (response.ok) {
        const result = await response.json()
        const { error } = result
        return NextResponse.json(result, { status: error ? 404 : 200 })
    }
}