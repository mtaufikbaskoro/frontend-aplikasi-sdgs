import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET () {
    const cookieStore = await cookies()

    try {
        cookieStore.getAll().forEach((cookie) => {
            cookieStore.delete(cookie.name);
        });
        return NextResponse.json({message: 'logout successful'})
    } catch (error) {
        return NextResponse.json({message: error})
        
    }
}