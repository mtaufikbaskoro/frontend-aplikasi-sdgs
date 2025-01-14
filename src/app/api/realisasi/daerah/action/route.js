import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value

    const { searchParams } = new URL(request.url)
    const renjaSubkegiatanId = searchParams.get('renjaSubkegiatanId') 

    const response = await fetch(getApi(`/program/renja/get-detail-renja-subkegiatan?year=${year}&renja_subkegiatan_id=${renjaSubkegiatanId}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `application/json`
        },
        credentials: 'include'
    })
    const result = await response.json()
    return NextResponse.json(result) 
}

export async function POST (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    const data = await request.json()
    
    const response = await fetch(getApi(`/program/renja/insert-subkegiatan?year=${year}`), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    if (!response.ok) return NextResponse.json({
        success: false,
        message: 'Gagal menambahkan data.'
    })
    const result = await response.json()
    const { message } = result
    return NextResponse.json({
        success: true,
        message: message
    })
}

export async function DELETE (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const formData = await request.json()

    const response = await fetch(getApi(`/program/renja/delete-subkegiatans`), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `application/json`
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    })
    if (!response.ok) return NextResponse.json({
        success: false,
        message: 'Gagal menghapus sub kegiatan.'
    }, { status: 500 })
    const result = await response.json()
    const { message } = result
    return NextResponse.json({
        success: true,
        message: message
    })
}
