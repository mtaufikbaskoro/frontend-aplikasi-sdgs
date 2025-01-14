'use client'

import { getUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function PemerintahDaerah () {
    const router = useRouter()
    router.push(getUrl('/dashboard/realisasi-program/pemerintah-daerah'))

    return <div></div>
}