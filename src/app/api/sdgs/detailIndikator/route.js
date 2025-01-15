import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value

    if (!token) return NextResponse.json({
        message: 'Token tidak ditemukan.',
        error: true,
        data: null
    }, { status: 404 })

    const { searchParams } = new URL(request.url)
    const kd_indikator = searchParams.get('kd_indikator')
    const kd_subindikator = searchParams.get('kd_subindikator')

    if (!kd_indikator || !kd_subindikator) return NextResponse.json({
        message: 'kode indikator atau kode subindikator tidak ditemukan',
        error: true,
        data: null
    }, {status: 400}) 

    const response = await fetch(getApi(`/detail?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (response.ok) {
        const result = await response.json()
        const { error } = result
        return NextResponse.json(result, { status: error ? 400 : 200 })   
    }
}

