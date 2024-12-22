import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')
    const user = cookieStore.get('user') || undefined
    const year = cookieStore.get('year').value

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

    const url = page || limit ? isNaN(sub_unit_id) ? 
    `http://v3.test/api/index/v1/astra/sdgs?page=${page}&limit=${limit}` :
    `http://v3.test/api/index/v1/astra/sdgs/get-goals-by-user?sub_unit_id=${sub_unit_id}&year=${year}&page=${page}&limit=${limit}` :
    `http://v3.test/api/index/v1/astra/sdgs` 

    const response = await fetch(url, {
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