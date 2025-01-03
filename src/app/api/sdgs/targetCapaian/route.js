import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL

    if (!token) return NextResponse.json({
        message: 'No token found.',
        error: true,
        data: null
    })

    const { searchParams } = new URL(request.url)
    const kd_indikator = searchParams.get('kd_indikator')
    const kd_subindikator = searchParams.get('kd_subindikator')
    const year = searchParams.get('year')

    const response = await fetch(`${url}/target-capaian/view?year=${year}&kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (response.ok) {
        const result = await response.json()
        const { data, error, message } = result
        if (error) return NextResponse.json(result)
        return NextResponse.json(result)
    }
}

export async function POST (request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')
        const year = cookieStore.get('year').value
        const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL
        const data = await request.json()

        const response = await fetch(`${url}/target-capaian/create?year=${year}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        return NextResponse.json({success: true})
        

    } catch (err) {
        return NextResponse.json({message: err.message})
    }
}

export async function PUT (request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')
        const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_API_URL : process.env.PRODUCTION_API_URL
        const data = await request.json()

        const { searchParams } = new URL(request.url)
        const targetCapaianId = searchParams.get('targetCapaianId');

        const response = await fetch(`${url}/target-capaian/update?target_capaian_id=${targetCapaianId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        return NextResponse.json({success: true})

    } catch (err) {
        return NextResponse.json({message: err.message})
    }
}

