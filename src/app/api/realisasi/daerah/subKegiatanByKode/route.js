import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token').value
    const user = cookieStore.get('user').value
    const year = cookieStore.get('year').value

    const parseUser = JSON.parse(user)
    const { sub_unit_id } = parseUser
    
    const { searchParams } = new URL(request.url)
    const sdgs_tujuan_kode = searchParams.get('sdgs_tujuan_kode')

    const response = await fetch(`http://v3.test/api/index/v1/astra/program/renja/get-all-subkegiatan-by-goal-sdgs?year=${year}&sdgs_tujuan_kode=${sdgs_tujuan_kode}&sub_unit_id=${sub_unit_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (response.ok) {
        const result = await response.json()
        return NextResponse.json(result)
    }

    return NextResponse.json({
        message: 'terjadi kesalahan pada pengambilan data.',
        error: true,
        data: null
    }, {status: 500})

}