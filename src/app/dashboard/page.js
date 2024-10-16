
import Link from 'next/link';
import Card from './components/card';
import DashboardLayout from './components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFileCircleQuestion, faFileCircleCheck, faFileCircleExclamation, faFilePen } from '@fortawesome/free-solid-svg-icons';

const statuses = [
    {
        'id': 1,
        'name': 'Indikator yang belum diisi',
        'total': 12,
        'icon': faFileCircleQuestion,
        'color': '#FCC30B'
    },
    {
        'id': 2,
        'name': 'Indikator perlu perbaikan',
        'total': 5,
        'icon': faFileCircleExclamation,
        'color': '#FF3A21' 
    },
    {
        'id': 3,
        'name': 'Indikator telah selesai',
        'total': 7,
        'icon': faFileCircleCheck,
        'color': '#00554C'
    },
    {
        'id': 4,
        'name': 'Catatan Perbaikan',
        'total': null,
        'icon': faFilePen,
        'color': '#333333'
    }
]

const notes = [
    {
        id: 1,
        kode_indikator: '2.a',
        catatan_perbaikan: 'data tidak sesuai dengan dokumen pendukung',
    },
    {
        id: 2,
        kode_indikator: '1.1.1.a',
        catatan_perbaikan: 'tidak ada tanda tangan penanggung jawab data pada dokumen pendukung',
    },

]

const PageCardContent = () => (
    <div className='py-3'>
        <p className='w-[360px] font-bold text-xl text-white'>Selamat Data di Data Center SDGs Kota Medan</p>
        <p className='mt-4 w-[560px] text-justify text-white text-sm'>Mohon untuk periksa kembali hasil status data yang telah diinput, data selesai jika status sudah diubah ke “approve”</p>
    </div>
)

export default function Dashboard () {

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className='grid max-w-[1620px] grid-cols-4 gap-x-2 gap-y-4 mx-auto'>
                {
                    statuses.map(status => (
                        <Card key={status.id} color={status.color}>
                            <FontAwesomeIcon className='my-auto ml-2' size='2xl' icon={status.icon} color={status.color} />
                            <div className='flex flex-col text-right'>
                                <p className='text-md'>{status.name}</p>
                                <p className={`${status.total != null ? '' : 'hidden'} text-2xl font-bold mt-2`}>{status.total != null ? status.total : ''}</p>
                            </div>
                        </Card>
                    ))
                }
                <div className='col-span-3'></div>
                <div className='border-2 border-[#333] rounded-md h-[480px] overflow-y-auto'>
                    <ul className='py-4 px-6 flex flex-col gap-2'>
                        {
                            notes.map((note, idx) => (
                                <li key={idx}>
                                    <Link href={`/dashboard/capaian-sdgs/detail/${note.kode_indikator}`} className='font-bold text-md hover:underline'>Kode Indikator : {note.kode_indikator}</Link>
                                    <p className='text-sm'>{note.catatan_perbaikan}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    )
}
