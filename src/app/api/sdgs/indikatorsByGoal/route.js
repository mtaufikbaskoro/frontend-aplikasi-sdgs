import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const user = cookieStore.get('user')
    const url = process.env.NEXT_PUBLIC_API_URL

    if (!token) {
        return NextResponse.json({
            message: 'No cookies found',
            error: true,
            data: null
        }, {status: 404})
    }

    const parseUser = JSON.parse(user.value)
    const { sub_unit_id } = parseUser;

    const { searchParams } = new URL(request.url)
    const kode = searchParams.get('kode')
    const year = searchParams.get('year')

    const response = await fetch(`${url}/sdgs/get-indikators-by-goal?kode=${kode}&year=${year}&sub_unit_id=${sub_unit_id != 'admin' ? sub_unit_id : 0}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!response.ok) return NextResponse.json({
        message: 'Internal server error.',
        error: true,
        data: null
    }, {status: 500}) 

    const result = await response.json()
    const { error } = result
    if (error) {
        return NextResponse.json(result, {status: 404})
    }
    return NextResponse.json(result);
}