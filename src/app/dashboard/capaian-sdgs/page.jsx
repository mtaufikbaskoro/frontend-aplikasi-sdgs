
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../components/layout";
import Table from "../components/table";

import { faCheck, faClock, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";


const TableColumns = ['Nama Tujuan', 'Kode Indikator', 'Status', 'Aksi']

const dummies = [
    {
        id: 1,
        nama_tujuan: 'Tujuan 1: Tanpa Kemiskinan',
        kode_indikator: '1.1.1.a',
        status: 2,
    },
    {
        id: 2,
        nama_tujuan: 'Tujuan 1: Tanpa Kemiskinan',
        kode_indikator: '1.1.1.b',
        status: 1,
    },
    {
        id: 3,
        nama_tujuan: 'Tujuan 3: Tanpa Kemiskinan',
        kode_indikator: '3.1.a',
        status: 3,
    },
]

export default function CapaianSdgs () {
    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Indikator Tujuan SDGs</span>
        </>
    )

    const handleStatusIcon = (status) => {
        if (status == 2) {
            return <FontAwesomeIcon icon={faClock} color="yello" />;
        } else if (status == 1) {
            return <FontAwesomeIcon icon={faCheck} color="green" />;
        } else if (status == 3) {
            return <FontAwesomeIcon icon={faTimes} color="red" />;
        }
    }

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className="overflow-x-auto">
                <Table columns={TableColumns}>
                    {
                        dummies.map(dummy => (
                            <tr key={dummy.id} className={`bg-white border-b ${dummy.id % 2 == 0 ? 'bg-green-100' : ''}`}>
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
                                        <FontAwesomeIcon icon={faEye} color="#3b82f6" />
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
