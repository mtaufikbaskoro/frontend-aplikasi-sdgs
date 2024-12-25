import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST (request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token').value
    const year = cookieStore.get('year').value
    const data = await request.json()
    
    try {
        const response = await fetch(`http://v3.test/api/index/v1/astra/program/renja/insert-subkegiatan?year=${year}`, {
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
        const cookieStore = cookies()
        const token = cookieStore.get('token').value
        const formData = await request.json()

        const response = await fetch(`http://v3.test/api/index/v1/astra/program/renja/delete-subkegiatans`, {
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
