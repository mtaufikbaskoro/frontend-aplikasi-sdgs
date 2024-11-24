'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFoundPage () {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/dashboard')
        }, 2000)
    }, [router])

    return (
        <div className="min-w-full h-full flex flex-col items-center justify-center">
            <div>Halaman tidak ditemukan, mengalihkan...</div>
            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin-slow"></div>  
        </div>
    )
}