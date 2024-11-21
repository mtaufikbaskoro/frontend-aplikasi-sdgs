import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET () {
    const cookieStore = cookies();
    const user = cookieStore.get('user')?.value

    const parseUser = JSON.parse(user)
    const { username, sub_unit_id } = parseUser

    const role = sub_unit_id === 'admin' ? 'admin' : 'user'

    return NextResponse.json({role: role, username: username})

}