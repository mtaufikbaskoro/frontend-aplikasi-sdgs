import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET (request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) return NextResponse.json({
        message: 'Token tidak ditemukan.',
        error: true,
        data: null
    }, {status: 404})

    const { searchParams } = new URL(request.url);
    const kd_indikator = searchParams.get('kd_indikator');
    const kd_subindikator = searchParams.get('kd_subindikator');

    if (!kd_indikator || !kd_subindikator) return NextResponse.json({
        message: 'kode indikator atau kode subindikator tidak ditemukan',
        error: true,
        data: null
    }, {status: 400}) 

    const response = await fetch(`http://v3.test/api/index/v1/astra/detail/view?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (response.ok) {
        const result = await response.json()
        const { error } = result
        if (error) return NextResponse.json(result, {status: 400})
        return NextResponse.json(result)   
    }
}

