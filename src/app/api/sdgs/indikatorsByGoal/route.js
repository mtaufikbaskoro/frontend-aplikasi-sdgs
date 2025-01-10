import { getApi } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const user = cookieStore.get('user').value

    if (!token) return NextResponse.json({
        message: 'No cookies found',
        error: true,
        data: null
    }, {status: 404})

    const parseUser = JSON.parse(user)
    const { sub_unit_id } = parseUser

    const { searchParams } = new URL(request.url)
    const kode = searchParams.get('kode')
    const year = searchParams.get('year')

    const response = await fetch(getApi(`/sdgs/get-indikators-by-goal?kode=${kode}&year=${year}&sub_unit_id=${sub_unit_id != 'admin' ? sub_unit_id : 0}`), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!response.ok) return NextResponse.json({
        message: 'Internal server error.',
        error: true,
        data: null
    }, { status: 500 }) 

    const result = await response.json()
    const { error } = result
    return NextResponse.json(result, { status: error ? 404 : 200 })
}