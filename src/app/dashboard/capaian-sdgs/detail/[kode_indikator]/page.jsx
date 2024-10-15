'use client';

import Link from "next/link";
import LinkButton from "@/app/dashboard/components/button";
import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAdd, faExclamation, faPencil } from "@fortawesome/free-solid-svg-icons";


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
            <div className="flex gap-4">
                <LinkButton color="#3b82f6" href="/dashboard/capaian-sdgs/add" icon={faAdd}>Tambah</LinkButton>
                <LinkButton color="#facc15" href="/dashboard/capaian-sdgs/validasi/1" icon={faExclamation}>Periksa Data</LinkButton>
            </div>
            <div className="py-6 px-8 flex flex-col gap-4 border-green-900 border-2 rounded">
                <div className="px-4 py-2 border-2 border-tujuan-1 rounded">
                    <div className="text-center font-semibold text-xl uppercase">Tujuan 1: Tanpa Kelaparan</div>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <div className="text-md">
                        Kode Target : <span className="font-semibold">[1.1]</span>
                    </div>
                    <div className="text-sm">Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari</div>
                    <hr />
                    <div className="text-md">
                        Kode Indikator : <span className="font-semibold">[1.1.1.*]</span>
                    </div>
                    <div className="text-sm">Tingkat Kemiskinan Ekstrim</div>
                    <hr />
                    <div className="text-md">
                        Kode Indikator : <span className="font-semibold">[1.1.1.a]</span>
                    </div>
                    <div className="text-sm">Persentase penduduk yang hidup dibawah garis kemiskinan internasional</div>
                    <hr />
                    <div className="text-md">
                        Sumber Data : <span className="font-semibold">Renstra Dinas</span>
                    </div>
                    <div className="text-md">
                        Satuan Data : <span className="font-semibold">Persen (%)</span>
                    </div>
                    <div className="text-md">
                        Baseline (2021) : <span className="font-semibold">2.61</span>
                    </div>
                    <div className="text-md">
                        Dokumen Pendukung : <Link href="/" className="font-medium text-blue-600 hover:underline">nama_file.pdf</Link>
                    </div>
                </div>
            </div>
            <Table columns={tableColumns}>
                <tr className="bg-green-50">
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                        <Link className="mx-auto" href="/dashboard/capaian-sdgs/edit/1">
                            <FontAwesomeIcon icon={faPencil} color="#333333" />
                        </Link>
                    </td>
                </tr>
            </Table>
        </DashboardLayout>
    )
}