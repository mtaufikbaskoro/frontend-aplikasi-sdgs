import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const user = cookieStore.get('user')?.value

        const parseUser = JSON.parse(user)
        const { username, sub_unit_id } = parseUser;

        // if (sub_unit_id != true) 

        const { searchParams } = new URL(request.url)
        const kode = searchParams.get('kode')

        const response = await fetch(`http://v3.test/api/index/v1/astra/sdgs/get-indikators-by-goal?kode=${kode}&sub_unit_id=${sub_unit_id != 'admin' ? sub_unit_id : 0}`, {
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

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({message: error, status: 404})
    }
}