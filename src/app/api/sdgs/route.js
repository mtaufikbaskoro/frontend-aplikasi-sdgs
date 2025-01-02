import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const user = cookieStore.get('user') || undefined
    const year = cookieStore.get('year').value
    const url = process.env.NEXT_PUBLIC_API_URL + '/sdgs'

    if (!token) return NextResponse.json({
        message: 'No cookies found',
        error: true,
        data: null,
    }, {status: 404})

    const parseUser = user ? JSON.parse(user.value) : undefined 
    const { sub_unit_id } = parseUser

    // extract queries parameter for pagination
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? false
    const limit = searchParams.get('limit') ?? false

    const fetchUrl = page || limit ? isNaN(sub_unit_id) ?
    `${url}?page=${page}&limit=${limit}` :
    `${url}/get-goals-by-user?sub_unit+id=${sub_unit_id}&year=${year}&page=${page}&limit=${limit}` :
    url

    const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if (!response.ok) {
        return NextResponse.json({
            message: url,
            error: true,
            data: response
        })
    }

    const result = await response.json()
    const { data, error, message } = result
    if (error) return NextResponse.json({
        message: message,
        error: error,
        data: data
    }, {status: 404})
    return NextResponse.json({
        message: message,
        error: error,
        data: data 
    })

}