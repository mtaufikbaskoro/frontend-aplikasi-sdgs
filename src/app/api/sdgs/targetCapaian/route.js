import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    if (!token) return NextResponse.json({
        message: 'No token found.',
        error: true,
        data: null
    })

    const { searchParams } = new URL(request.url)
    const kd_indikator = searchParams.get('kd_indikator')
    const kd_subindikator = searchParams.get('kd_subindikator')
    const year = searchParams.get('year')

    const response = await fetch(getApi(`/target-capaian?year=${year}&kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`), {
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

export async function POST (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    if (!token) return NextResponse.json({
        message: 'No token found.',
        error: true,
        data: null
    })

    const data = await request.json()
    const response = await fetch(getApi(`/target-capaian/create?year=${year}`), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    return NextResponse.json({ success: true })
}

export async function PUT (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const data = await request.json()

    const { searchParams } = new URL(request.url)
    const targetCapaianId = searchParams.get('targetCapaianId')

    const response = await fetch(getApi(`/target-capaian/update?target_capaian_id=${targetCapaianId}`), {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    return NextResponse.json({ success: true })
}

