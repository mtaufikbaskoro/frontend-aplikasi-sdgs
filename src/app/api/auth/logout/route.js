import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET (request) {
    const cookieStore = await cookies()

    try {
        cookieStore.delete('token')
        cookieStore.delete('user')
        cookieStore.delete('year')
        return NextResponse.json({message: 'logout successful'})
    } catch (error) {
        return NextResponse.json({message: error})
        
    }
}