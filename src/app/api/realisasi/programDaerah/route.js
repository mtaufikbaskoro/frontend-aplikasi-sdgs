import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET (request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    
    if (!token) return NextResponse.json({
        message: 'Token tidak ditemukan.',
        error: true,
        data: null
    }, {status: 404})
    
    const user =  cookieStore.get('user')
    const parseUser = JSON.parse(user.value)
    const { sub_unit_id } = parseUser;

}
