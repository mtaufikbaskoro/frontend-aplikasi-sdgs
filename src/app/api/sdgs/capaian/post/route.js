import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const formData = await request.formData();

    try {
        const response = await fetch(`http://v3.test/api/index/v1/astra/detail/create-capaian`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token.value}`},
            body: formData
        })

        if (response) {
            const data = await response.json()
            return NextResponse.json({success: true})
        } else {
            console.log('gagal')
        } 

    } catch (error) {
        console.log(error.message)
    }
}