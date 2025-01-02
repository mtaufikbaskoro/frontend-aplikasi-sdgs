import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    const url = process.env.NEXT_PUBLIC_API_URL

    const { searchParams } = new URL(request.url)
    const renjaSubkegiatanId = searchParams.get('renjaSubkegiatanId') 
    
    try {
        const response = await fetch(`${url}/program/renja/get-detail-renja-subkegiatan?year=${year}&renja_subkegiatan_id=${renjaSubkegiatanId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/json`
            },
            credentials: 'include'
        })

        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`)
        
        const result = await response.json()

        return NextResponse.json(result) 
    } catch (error) {
        console.error(error)
    }

}

export async function POST (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    const url = process.env.NEXT_PUBLIC_API_URL
    const data = await request.json()
    
    try {
        const response = await fetch(`${url}/program/renja/insert-subkegiatan?year=${year}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
    
        if (!response.ok) {
            const errorResult = await response.json()
            console.error('API Request Error:', errorResult)
            return NextResponse.json({
                message: 'Terjadi kesalahan.',
                error: true,
                data: null
            }, {status: response.status})
        }
        
        const result = await response.json()
        return NextResponse.json(result, {status: response.status})
    } catch (error) {
        console.error('Request failed:', error)
        return NextResponse.json({
            message: 'Request failed.',
            error: true,
            data: null
        }, { status: 500 })
    }
}

export async function DELETE (request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token').value
        const url = process.env.NEXT_PUBLIC_API_URL
        const formData = await request.json()

        const response = await fetch(`${url}/program/renja/delete-subkegiatans`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/json`
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        
        if (!response.ok) {
            return NextResponse.json({
                message: 'Terjadi kesalahan.',
                error: true,
                data: null
            })
        }

        const result = await response.json()
        return NextResponse.json(result)

    } catch (error) {
        console.error('Request failed: ', error)
    }

}
