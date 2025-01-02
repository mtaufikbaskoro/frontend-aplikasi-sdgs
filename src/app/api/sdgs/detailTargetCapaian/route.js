import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const url = process.env.NEXT_PUBLIC_API_URL

    if (!token) return NextResponse.json({
        message: 'No cookies found.',
        error: true,
        data: null
    }, {status: 404})

    const { searchParams } = new URL(request.url)
    const detailId = searchParams.get('detail_id')
    const year = searchParams.get('year')

    if (!detailId) return NextResponse.json({
        message: 'detailId not found.',
        error: true,
        data: null
    }, {status: 404})

    const res = await fetch(`${url}/detail/view-target-capaian?year=${year}&sdgs_detail_id=${detailId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (res.ok) {
        const result = await res.json()
        const { data, message, error } = result
        if (error) return NextResponse.json(result)
        return NextResponse.json(result)
    } else {
        return NextResponse.json({
            message: 'Internal server error.',
            error: true,
            data: null
        })
    }
}