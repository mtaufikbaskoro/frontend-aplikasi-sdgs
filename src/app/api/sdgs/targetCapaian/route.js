import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const { searchParams } = new URL(request.url);

        const kd_indikator = searchParams.get('kd_indikator')
        const kd_subindikator = searchParams.get('kd_subindikator')

        const response = await fetch(`http://v3.test/api/index/v1/astra/target-capaian/view?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
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

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({message: err.message});
    }
}

export async function POST (request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const data = await request.json();

        const response = await fetch(`http://v3.test/api/index/v1/astra/target-capaian/create`, {
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
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const { searchParams } = new URL(request.url);
        const data = await request.json();
        const targetCapaianId = searchParams.get('targetCapaianId');

        const response = await fetch(`http://v3.test/api/index/v1/astra/target-capaian/update?target_capaian_id=${targetCapaianId}`, {
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

