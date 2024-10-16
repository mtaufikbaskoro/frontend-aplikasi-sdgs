'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChartBar, faSignOut, faTableColumns, faFileAlt, faUsers, faWrench, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar (props) {
    const { isOpen } = props;
    const [ submenu, setSubmenu ] = useState('');

    const handleSubMenu = (menu) => {
        if(submenu !== '') {
            setSubmenu('');
        } else {
            setSubmenu(menu);
        }
    }

    return (
        <div className={`${isOpen ? "w-[280px]" : "shrink w-0"} bg-white rounded transition-all ease-in ease-out`}>
            <aside className="py-4 fixed left-0 w-[280px]">
                <ul className={`flex flex-col gap-2 ${isOpen ? '' : 'hidden'} transition-all ease-in ease-out`}>
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
                    <li onClick={() => handleSubMenu('realisasi_program')} className='px-2 py-3 hover:bg-gray-100 cursor-pointer'>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Realisasi Program</span>
                        </div>
                    </li>
                    <li className={`px-2 py-3 ${submenu == 'realisasi_program' ? '' : 'hidden'}`}>
                        <ul className='ml-6 flex flex-col gap-5 justify-start text-gray-700 text-sm transition-all ease-in ease-out'>
                            <li className='px-2 py-3 hover:bg-gray-100'>
                                <Link href="/">Pemerintah Daerah</Link>
                            </li>
                            <li className='px-2 py-3 hover:bg-gray-100'>
                                <Link href="/">Non Pemerintah</Link>
                            </li>
                            <li className='px-2 py-3 hover:bg-gray-100'>
                                <Link href="/">Pelaku Usaha</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Identifikasi Masalah</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Pembelajaran SDGs</span>
                        </Link>
                    </li>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/dashboard/cetak-matriks" className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faFileAlt} />
                            <span className="sm">Cetak Matriks</span>
                        </Link>
                    </li>
                    <div className='mx-6 my-4 border-b-2 border-green-900'></div>
                    <li className='px-2 py-3 hover:bg-gray-100'>
                        <Link href="/dashboard/pengguna" className='ml-6 flex gap-5 justify-start items-center'>
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
