import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const user = cookieStore.get('user') || undefined;

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

    const url = page && limit ? sub_unit_id === 'admin' ? 
    `http://v3.test/api/index/v1/astra/sdgs?page=${page}&limit=${limit}` :
    `http://v3.test/api/index/v1/astra/sdgs/get-goals-by-user?page=${page}&limit=${limit}&sub_unit_id=${sub_unit_id}` :
    'http://v3.test/api/index/v1/astra/sdgs'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if (!response.ok) return NextResponse.json({
        message: 'Internal Server Error',
        error: true,
        data: null
    })

    const data  = await response.json();
    if (!data) return NextResponse.json({
        message: 'Failed to get data from server',
        error: true,
        data: null,
    })
    
    return NextResponse.json({
        message: 'Berhasil',
        error: false,
        data: data
    })
}