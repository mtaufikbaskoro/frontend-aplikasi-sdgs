import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET (request) {
    const cookieStore = await cookies();

    try {
        cookieStore.delete('token')
        localStorage.removeItem('user')

        return NextResponse.json({message: 'logout successful'})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: error})
    }
}