import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    if (!token) return NextResponse.json({
        message: 'Token tidak dapat ditemukan.',
        error: true,
        data: null   
    })

    const { searchParams } = new URL(request.url)
    const kode = searchParams.get('kode')
    const year = searchParams.get('year')
    if (!kode) return NextResponse.json({
        message: 'Kode not found.',
        error: true,
        data: null
    })
    
    const response = await fetch(getApi(`/sdgs/get-goal-progress?kode=${kode}&year=${year}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    if (!response.ok) return NextResponse.json({
        message: 'Internal server error',
        error: true,
        data: null
    }, { status: 500 })
    const result = await response.json()
    const { data, error, message } = result
    if (error) return NextResponse.json({
        message: 'Internal server error',
        error: true,
        data: null
    }, { status: 500 })
    return NextResponse.json({
        message: message,
        error: false,
        data: data
    })
}
