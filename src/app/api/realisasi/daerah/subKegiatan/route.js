import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const user = cookieStore.get('user').value
    const year = cookieStore.get('year').value

    const parseUser = JSON.parse(user)
    const { sub_unit_id } = parseUser

    const { searchParams } = new URL(request.url)
    const selectedSubUnit = searchParams.get('sub_unit_id') ? searchParams.get('sub_unit_id') : sub_unit_id 

    const res = await fetch(getApi(`/program/renja/get-subkegiatan?year=${year}&sub_unit_id=${selectedSubUnit}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    if (!res.ok) return NextResponse.json({
        message: 'Terjadi kesalahan pada server.',
        error: true,
        data: null
    }, {status: res.status}) 
    const result = await res.json()
    return NextResponse.json(result, {status: res.status}) 
}
