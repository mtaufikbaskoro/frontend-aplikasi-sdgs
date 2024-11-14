import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        const { searchParams } = new URL(request.url)
        const detailId = searchParams.get('detail_id')

        const res = await fetch(`http://v3.test/api/index/v1/astra/detail/view-target-capaian?sdgs_detail_id=${detailId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

    } catch (error) {
        return NextResponse.json({message: error, status: 404})
    }
}