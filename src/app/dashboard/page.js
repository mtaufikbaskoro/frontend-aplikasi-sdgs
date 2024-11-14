
import Link from 'next/link';
import Card from './components/card';
import DashboardLayout from './components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFileCircleQuestion, faFileCircleCheck, faFileCircleExclamation, faFilePen } from '@fortawesome/free-solid-svg-icons';

const statuses = [
    {
        'id': 1,
        'name': 'Indikator tanpa target capaian',
        'total': 12,
        'icon': faFileCircleQuestion,
        'color': '#FF3A21'
    },
    {
        'id': 2,
        'name': 'Indikator tanpa capaian',
        'total': 5,
        'icon': faFileCircleExclamation,
        'color': '#FCC30B' 
    },
    {
        'id': 3,
        'name': 'Indikator telah selesai',
        'total': 7,
        'icon': faFileCircleCheck,
        'color': 'green'
    }
]

export default function Dashboard () {

    return (
        <DashboardLayout>
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
            </div>
        </DashboardLayout>
    )
}
