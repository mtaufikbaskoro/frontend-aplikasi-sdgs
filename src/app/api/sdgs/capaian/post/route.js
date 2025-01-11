import { getApi } from "@/lib/utils"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST (request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token').value
    const formData = await request.formData()

    const response = await fetch(getApi(`/detail/create-capaian`), {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    })
    return NextResponse.json(response.ok ? {
        success: true,
        message: 'Data berhasil disimpan.'
    } : {
        success: false,
        message: 'Data gagal disimpan.'
    }, {status: 200})
}