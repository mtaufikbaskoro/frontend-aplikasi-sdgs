import { NextResponse } from "next/server";

export async function POST (request) {
    const { username, password, year } = await request.json();
    const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL 
    
    const res = await fetch(`${url}/auth/masuk`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })

    if (!res.ok) NextResponse.json({
        message: 'Internal server error',
        error: true,
        data: null
    }, {status: 500})

    const { data, error, message } = await res.json();
    if (error) return NextResponse.json({
        message: message,
        error: true,
        data: null
    }, {status: 404})

    const { token, sub_unit_id } = data
    if (token) {
        const result = NextResponse.json({
            message: 'Berhasil login.',
            error: false,
            data: data
        })
        result.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/'
        })
        result.cookies.set('user', JSON.stringify({username: username, sub_unit_id: sub_unit_id}), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/'
        })
        result.cookies.set('year', year, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/'
        })
        return result
    } else return NextResponse.json({
        message: 'Gagal membuat token.',
        error: true,
        data: null
    }, {status: 500})
}