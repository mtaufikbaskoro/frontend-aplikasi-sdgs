
import LinkButton from "@/components/ui/button"
import DashboardLayout from "../../components/layout"
import Breadcrumb from "@/components/ui/breadcrumb"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import Table from "../../components/table"

const tableColumns = [ 'No', 'Program / Kegiatan', 'Output Kegiatan', '']

const dummies = [
    {
        id: 1,
        tujuan: 1,
        indikator: [
            {
                kode: '3.8.1*b',
                deskripsi: 'Penyakit menular',
                programs: [
                    {
                        id: 1,
                        nama_program: 'Penelitian Dasar',
                        kegiatans : [
                            {
                                id: 1,
                                nama_kegiatan: 'Perbedayaan Daya Tahan Stres Ditinjau dari Jenis Kelamin pada Mahasiswa Jurusan Ilmu keolahragaan FIK UNIMED Tahun 2022',
                                output_kegiatan: 'Perbedaan Daya Tahan Stress Ditinjau dari jenis Kelamin pada Mahasiswa Jurusan Ilmu Keolahragaan FIK UNIMED Tahun 2022',
                                sumber_pendanaan: 'PNBP',
                                lokasi_aktual: ['Kota Medan', 'Deli Serdang']
                            }
                        ]
                    }
                ]
            }

        ]
    }
]

export default function NonPemerintah () {
    const PageCardContent = () => (
        <Breadcrumb>
            <p className='w-[480px] font-bold text-xl text-white'>Realisasi Program Non-Pemerintah</p>
            <p className='mt-4 w-[560px] text-justify text-white text-sm'>Mohon untuk periksa kembali hasil status data yang telah diinput, data selesai jika status sudah diubah ke “approve”</p>
        </Breadcrumb>
    )

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className="flex">
                <LinkButton href="/" icon={faAdd} color="#38bdf8">Tambah</LinkButton>
            </div>
            <Table columns={tableColumns}>
                <tr>
                    
                </tr>
            </Table>
        </DashboardLayout>
    )
}
