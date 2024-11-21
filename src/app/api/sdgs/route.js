import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const user = cookieStore.get('user')?.value;

        const parseUser = JSON.parse(user)
        const { sub_unit_id } = parseUser

        // extract queries parameter for pagination
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page')
        const limit = searchParams.get('limit')

        const url = sub_unit_id === 'admin' ? 
        `http://v3.test/api/index/v1/astra/sdgs?page=${page}&limit=${limit}` :
        `http://v3.test/api/index/v1/astra/sdgs/get-goals-by-user?page=${page}&limit=${limit}&sub_unit_id=${sub_unit_id}`

        const response = await fetch(url, {
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