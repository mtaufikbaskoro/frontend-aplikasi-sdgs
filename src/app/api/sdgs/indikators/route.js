import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')
        const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL
        
        if (!token) return NextResponse.json({
            message: 'No Cookie Found.',
            error: true,
            data: null
        }, {status: 400})

        const { searchParams } = new URL(request.url)
        const kode = searchParams.get('kode')

        const res = await fetch(`${url}/sdgs/get-indikators-by-kode?kode=${kode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
        })

        if (!res.ok) return NextResponse.json({
            message: 'Terjadi kesalahan pada backend.',
            error: true,
            data: null
        })

        const result = await res.json()
        const { data, error, message } = result
        return NextResponse.json(result, {status: error ? 500 : 200})

    } catch (error) {
        return NextResponse.json({
            message: 'server error.',
            error: true,
            data: null
        }, {status: 500})
    }
}
