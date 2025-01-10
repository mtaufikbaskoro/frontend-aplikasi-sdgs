import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    const user = cookieStore.get('user') || undefined

    if (!token) return NextResponse.json({
        message: 'No cookies found',
        error: true,
        data: null,
    }, { status: 404 })

    const parseUser = user ? JSON.parse(user.value) : undefined 
    const { sub_unit_id } = parseUser

    // Extract query from pagination
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') ?? false
    const limit = searchParams.get('limit') ?? false

    const fetchUrl = page || limit ? isNaN(sub_unit_id) ?
    getApi(`/sdgs?page=${page}&limit=${limit}`) :
    getApi(`/sdgs/get-goals-by-user?sub_unit+id=${sub_unit_id}&year=${year}&page=${page}&limit=${limit}`) :
    getApi('/sdgs')

    const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if (!response.ok) return NextResponse.json({
        message: 'Internal server error.',
        error: true,
        data: response
    }, { status: 500 })

    const result = await response.json()
    const { error } = result
    return NextResponse.json(result, { status: error ? 404 : 200 })
}