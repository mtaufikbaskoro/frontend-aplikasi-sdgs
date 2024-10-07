

import Card from './components/card';
import { faFileCircleQuestion, faFileCircleCheck, faFileCircleExclamation, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import DashboardLayout from './components/layout';
import PageCard from './components/pageCard';

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
        'color': '#333'
    }
]

const PageCardContent = () => (
    <>
        <p className='w-[480px] font-bold text-2xl text-white'>Selamat Data di Data Center SDGs Kota Medan</p>
        <p className='mt-4 w-[560px] text-justify text-white text-sm'>Mohon untuk periksa kembali hasil status data yang telah diinput, data selesai jika status sudah diubah ke “approve”</p>
    </>
)

export default function Dashboard () {

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className='grid grid-cols-3 gap-4'>
                {
                    statuses.map(status => (
                        <Card key={status.id} color={status.color}>
                            <FontAwesomeIcon className='my-auto ml-2' size='2xl' icon={status.icon} />
                            <div className='flex flex-col text-right'>
                                <p className='text-md'>{status.name}</p>
                                <p className={`${status.total != null ? '' : 'hidden'} text-2xl font-bold mt-2`}>{status.total != null ? status.total : ''}</p>
                            </div>
                        </Card>
                    ))
                }
                <div className='col-span-3'></div>
                <div className='border-2 border-[#333] rounded-md'>
                    <ul className='py-4 px-6 flex flex-col gap-2'>
                        <li>
                            <Link href="/" className='font-bold text-md hover:underline'>Kode Indikator : 12.1.1.a</Link>
                            <p className='text-sm'>Dokumen pendukung belum menunjukan hasil capaian yang dimasukkan</p>
                        </li>
                        <li>
                            <Link href="/" className='font-bold text-md hover:underline'>Kode Indikator : 12.1.1.a</Link>
                            <p className='text-sm'>Dokumen pendukung belum menunjukan hasil capaian yang dimasukkan</p>
                        </li>
                        <li>
                            <Link href="/" className='font-bold text-md hover:underline'>Kode Indikator : 12.1.1.a</Link>
                            <p className='text-sm'>Dokumen pendukung belum menunjukan hasil capaian yang dimasukkan</p>
                        </li>
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    )
}
