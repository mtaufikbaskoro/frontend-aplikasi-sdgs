import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        const { searchParams } = new URL(request.url)
        const kd_indikator = searchParams.get('kd_indikator')
        const kd_subindikator = searchParams.get('kd_subindikator')

        const response = await fetch(`http://v3.test/api/index/v1/astra/sdgs/get-detail-by-kode?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json({data: data, status: 200});

    } catch (error) {
        return NextResponse.json(error);
    }
}

