'use client';

import DashboardLayout from "@/app/dashboard/components/layout";
import PageCard from "@/app/dashboard/components/pageCard";


export default function Detail({params}) {
    const { kode_indikator } = params;

    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Indikator {'>'} Detail {'>'} {params.kode_indikator}</span>
        </>
    )

    return (
        <DashboardLayout Content={<PageCardContent />}>
        </DashboardLayout>
    )
}