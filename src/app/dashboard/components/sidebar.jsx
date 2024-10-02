import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faChartBar, faSignOut, faTableColumns, faFileAlt, faUsers, faWrench } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar (props) {
    const { isOpen } = props;

    return (
        <div className={`${isOpen ? "w-[460px]" : "w-0"} rounded transition-all ease-in`}>
            <aside className="py-9">
                <ul className={`flex flex-col gap-4 ${isOpen ? '' : '-translate-x-[460px] overflow-x-hidden'} transition-all ease-in`}>
                    <li className='px-2 py-3 transition-all ease-in hover:bg-gray-100 hover:ease-out'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faTableColumns} />
                            <span className='text-lg'>Dashboard</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faChartBar} />
                            <span className='text-lg'>Capaian SDGs</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faDashboard} />
                            <span className='text-lg'>Matriks 2</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faFileAlt} />
                            <span className='text-lg'>Cetak Matriks</span>
                        </Link>
                    </li>
                    <div className='mx-6 my-4 border-b-2 border-green-900'></div>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faUsers} />
                            <span className='text-lg'>Atur Pengguna</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faWrench} />
                            <span className='text-lg'>Atur Peran</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-10 justify-start items-center'>
                            <FontAwesomeIcon size='lg' icon={faSignOut} />
                            <span className='text-lg'>Keluar</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}
