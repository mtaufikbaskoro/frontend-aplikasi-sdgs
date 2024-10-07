import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faChartBar, faSignOut, faTableColumns, faFileAlt, faUsers, faWrench } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar (props) {
    const { isOpen } = props;

    return (
        <div className={`${isOpen ? "w-[240px]" : "shrink w-0"} rounded transition-all ease-in ease-out`}>
            <aside className="py-4">
                <ul className={`flex flex-col gap-2 ${isOpen ? '' : '-translate-x-[460px] overflow-x-hidden'} transition-all ease-in ease-out`}>
                    <li className='px-2 py-3 transition-all ease-in hover:bg-gray-100 hover:ease-out'>
                        <Link href="/dashboard" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faTableColumns} />
                            <span className="sm">Dashboard</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/dashboard/capaian-sdgs" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faChartBar} />
                            <span className="sm">Capaian SDGs</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faDashboard} />
                            <span className="sm">Matriks 2</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faFileAlt} />
                            <span className="sm">Cetak Matriks</span>
                        </Link>
                    </li>
                    <div className='mx-6 my-4 border-b-2 border-green-900'></div>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faUsers} />
                            <span className="sm">Atur Pengguna</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWrench} />
                            <span className="sm">Atur Peran</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faSignOut} />
                            <span className="sm">Keluar</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}
