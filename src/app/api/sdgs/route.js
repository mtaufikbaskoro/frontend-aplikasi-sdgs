import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        // extract queries parameter for pagination
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page')
        const limit = searchParams.get('limit')

        const response = await fetch(`http://v3.test/api/index/v1/astra/sdgs/get-goals?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data  = await response.json();
        return NextResponse.json({
            data: data.items,
            totalItems: data.totalItems
        })
    } catch (error) {
        return NextResponse.json({message: 'no cookies found', status: 404})
    }
    
}