import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../components/layout";
import { faC, faCheck, faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Table from "../components/table";

const TableColumns = ['Nama Tujuan', 'Kode Indikator', 'Status', 'Aksi']

const dummies = [
    {
        id: 1,
        nama_tujuan: 'Tujuan 1: Tanpa Kemiskinan',
        kode_indikator: '1.1.1.a',
        status: 'pending',
    },
    {
        id: 2,
        nama_tujuan: 'Tujuan 1: Tanpa Kemiskinan',
        kode_indikator: '1.1.1.b',
        status: 'approve',
    },
    {
        id: 3,
        nama_tujuan: 'Tujuan 3: Tanpa Kemiskinan',
        kode_indikator: '3.1.a',
        status: 'pending',
    },
]

export default function CapaianSdgs () {
    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Indikator Tujuan SDGs</span>
        </>
    )

    const handleStatusIcon = (status) => {
        if (status == 'pending') {
            return <FontAwesomeIcon icon={faClock} />;
        } else if (status == 'approve') {
            return <FontAwesomeIcon icon={faCheck} />;
        }
    }

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className="overflow-x-auto">
                <Table columns={TableColumns}>
                    {
                        dummies.map(dummy => (
                            <tr key={dummy.id} className="bg-white border-b">
                                <td scope="row" className="font-bold whitespace-nowrap">
                                    {dummy.nama_tujuan}
                                </td>
                                <td className="px-6 py-4">
                                    {dummy.kode_indikator}
                                </td>
                                <td className="px-6 py-4">
                                    {handleStatusIcon(dummy.status)}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link className="mx-auto" href="/dashboard/capaian-sdgs/detail/1.1">
                                        <FontAwesomeIcon icon={faEye} color="green" />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </div>
        </DashboardLayout>
    )
}
