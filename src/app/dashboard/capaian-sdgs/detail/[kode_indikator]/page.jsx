'use client';

import LinkButton from "@/app/dashboard/components/button";
import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faExclamation, faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const tableColumns = ['Target (2022)', 'Capaian (2022)', '%Capaian', 'Status'];

export default function Detail({params}) {
    const { kode_indikator } = params;

    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Indikator {'>'} Detail {'>'} {kode_indikator}</span>
            
        </>
    )

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <LinkButton color="#3b82f6" href="/dashboard/capaian-sdgs/add" icon={faAdd}>Tambah</LinkButton>
            <LinkButton color="#facc15" href="/dashboard/capaian-sdgs/validasi" icon={faExclamation}>Periksa Data</LinkButton>
            <div className="py-6 px-8 flex flex-col gap-4 border-green-900 border-2 rounded">
                <div className="font-bold text-2xl">Tujuan 1: Tanpa Kelaparan</div>
                <div>
                    <span>Kode Target 1.1 : Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari</span>
                </div>
                <div>
                    <span>Kode Indikator 1.1.1.* : Tingkat Kemiskinan Ekstrim</span>
                </div>
                <div>
                    <span>Kode Indikator 1.1.1.a : Persentase penduduk yang hidup dibawah garis kemiskinan internasional</span>
                </div>
                
                <div>
                    <span>Sumber Data : Renstra Dinas</span>
                </div>
                <div>
                    <span>Satuan Data : Persen (%)</span>
                </div>
                <div>
                    <span>Baseline (2021) : 2,61</span>
                </div>
                <div>
                    <span>Dokumen Pendukung : <Link href="/" className="text-blue-600 hover:underline">dokumen pendukung.pdf</Link></span>
                </div>
            </div>
            <Table columns={tableColumns}>
                <tr className="bg-green-50">
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                        <Link className="mx-auto" href="/dashboard/capaian-sdgs/detail/1.1">
                            <FontAwesomeIcon icon={faPencil} color="#333" />
                        </Link>
                    </td>
                </tr>
            </Table>
        </DashboardLayout>
    )
}