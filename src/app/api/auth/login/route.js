import { NextResponse } from "next/server";

export async function POST (request) {
    const {username, password} = await request.json();
    
    try {

        const res = await fetch('http://v3.test/api/index/v1/astra/auth/masuk', {
            method: 'POST', 
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })

        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({message: errorData.message || 'Login failed'}, { status: res.status});
        }

        const data = await res.json();

        if (data.ok) {
            const jwt = data.token;
            const user = data.user;

            if (jwt) {
                const nextResponse = NextResponse.json({ message: 'login successful', ok: data.ok, status: data.status});
                
                nextResponse.cookies.set('token', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24,
                    path: '/'
                });

                nextResponse.cookies.set('user', JSON.stringify(user), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24,
                    path: '/'
                })
                
                return nextResponse;
            }
        } else {
            return NextResponse.json(data);
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message || 'Internal Server Error.'}, {status: 500})
    }
}