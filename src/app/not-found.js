'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFoundPage () {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 1000)
    }, [router])

    return <div className="min-w-full h-full flex items-center justify-center">Page not found. Redirecting...</div>
}