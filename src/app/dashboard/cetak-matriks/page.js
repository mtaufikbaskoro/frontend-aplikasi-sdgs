import Breadcrumb from "@/components/ui/breadcrumb";
import DashboardLayout from "../components/layout";
import LinkButton from "@/components/ui/button";

const matriks = [
    {
        id: 1,
        name: 'Laporan Evaluasi Kinerja Pencapaian TPB/SDGs',
        href: '/',
        color: '#65a30d'
    },
    {
        id: 2,
        name: 'Laporan Realisasi Program Pemerintah Daerah',
        href: '/',
        color: '#65a30d'
    },
    {
        id: 3,
        name: 'Laporan Realisasi Program non Pemerintah',
        href: '/',
        color: '#65a30d'
    },
    {
        id: 4,
        name: 'Laporan Realisasi Program Pelaku Usaha',
        href: '/',
        color: '#65a30d'
    },
    {
        id: 5,
        name: 'Laporan Identifikasi Masalah dan Rencana Tindak Lanjut',
        href: '/',
        color: '#65a30d'
    },
    {
        id: 6,
        name: 'Laporan Pembelajaran SDGs',
        href: '/',
        color: '#65a30d'
    },
]

export default function cetakMatriks () {
    const PageCardContent = () => (
        <Breadcrumb>
            <div className="w-[360px] font-bold text-xl text-white">Cetak Matriks</div>
            <p className="mt-4 w-[560px] text-justify text-white text-sm font-medium">Halaman ini terdiri dari semua laporan matriks yang akan digunakan pada pembuatan laporan monitoring dan evaluasi TPB/SDGs</p>
        </Breadcrumb>
    )
    
    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className="grid grid-cols-3 gap-4 text-center">
                {
                    matriks.map((matrik, idx) => (
                        <div className="" key={idx}>
                            <LinkButton color={matrik.color} href={matrik.href}>{matrik.name}</LinkButton>
                        </div>
                    ))
                }
            </div>
        </DashboardLayout>
    )
}
