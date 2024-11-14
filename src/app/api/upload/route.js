import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const formData = await request.formData();

        const response = await fetch('http://v3.test/api/index/v1/astra/detail/create-capaian', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
            credentials: 'include',
            body: formData
        })

        const result = await response.json()

        return NextResponse.json(result);
    } catch (err) {
        console.error('Error communicating with backend : ', err)
        return NextResponse.json({error: 'Failed to upload files'}, {status: 500})
    }
}