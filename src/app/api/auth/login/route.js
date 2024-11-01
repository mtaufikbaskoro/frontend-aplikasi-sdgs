import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST (request) {
    const {username, password} = await request.json();

    // console.log(username);

    // return NextResponse.json({message: 'success'});

    // const username = formData.get('username');
    // const password = formData.get('password');
    
    try {

        const res = await fetch('http://v3.test/api/index/v1/astra/auth/masuk', {
            method: 'POST', 
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })

        if (!res.ok) {
            // const errorData = await res.json();
            return NextResponse.json({message: 'login failed'}, { status: res.status});
        }

        const data = await res.json();

        if (data.ok) {
            const jwt = data.token;
            const roles = data.user.roles;
            const json_arr = JSON.stringify(roles);

            if (jwt) {
                const nextResponse = NextResponse.json({ message: 'login successful', user: data.user});
                nextResponse.cookies.set('token', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24,
                    path: '/'
                });
                
                // localStorage.setItem('roles', json_arr);
                
                return nextResponse;
            }
        } else {
            const nextResponse = NextResponse.json(data);
            return nextResponse;
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message || 'Internal Server Error.'}, {status: 500})
    }
}