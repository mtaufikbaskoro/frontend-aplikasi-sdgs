import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET () {
    const cookieStore = await cookies()
    const year = cookieStore.get('year')


    if (year) return NextResponse.json({
        message: 'Berhasil',
        error: false,
        data: year.value
    }) 

    return NextResponse.json({
        message: 'Gagal mengambil tahun.',
        error: true,
        data: null
    })

}