'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChartBar, faSignOut, faTableColumns, faFileAlt, faUsers, faWrench, faWindowMaximize, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar (props) {
    const router = useRouter();
    const pathname = usePathname();
    const { isOpen } = props;
    const [ submenu, setSubmenu ] = useState('');
    const [ menuActive, setMenuActive ] = useState('');

    useEffect(() => {
        const pathArray = pathname.split('/');
        if (pathArray[2]) {
            setMenuActive(pathArray[2]);
        }
    }, [pathname])

    const handleLink = (route) => {
        router.push(route);
    };

    const handleSubMenu = (menu) => {
        if(submenu !== '') {
            setSubmenu('');
        } else {
            setSubmenu(menu);
        }
    };

    return (
        <div className={`${isOpen ? "w-[280px]" : "shrink w-0"} bg-white rounded transition-all ease-in ease-out`}>
            <aside className="py-4 fixed left-0 w-[280px]">
                <ul className={`flex flex-col gap-2 ${isOpen ? '' : 'hidden'} transition-all ease-in ease-out`}>
                    <li onClick={() => handleLink("/dashboard")} className={`px-2 py-3 hover:bg-gray-100 transition-all ease-in ease-out cursor-pointer ${menuActive == '' ? 'bg-green-100' : ''}`}>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faTableColumns} />
                            <span className="sm">Dashboard</span>
                        </div>
                    </li>
                    <li onClick={() => handleLink("/dashboard/capaian-sdgs")} className={`px-2 py-3 hover:bg-gray-100 transition-all ease-in ease-out cursor-pointer ${menuActive == 'capaian-sdgs' ? 'bg-green-100' : ''}`}>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faChartBar} />
                            <span className="sm">Capaian SDGs</span>
                        </div>
                    </li>
                    <li onClick={() => handleSubMenu('realisasi-program')} className={`px-2 py-3 hover:bg-gray-100 transition-all ease-in ease-out cursor-pointer ${menuActive == 'realisasi-program' ? 'bg-green-100' : ''}`}>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Realisasi Program</span>
                            <FontAwesomeIcon size='xs' icon={submenu == 'realisasi-program' ? faChevronDown : faChevronRight} />
                        </div>
                    </li>
                    <li className={`px-2 py-3 ${submenu == 'realisasi-program' ? '' : 'hidden'}`}>
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
                    <li onClick={() => handleLink("/")} className='px-2 py-3 hover:bg-gray-100'>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Identifikasi Masalah</span>
                        </div>
                    </li>
                    <li onClick={() => handleLink("/")} className='px-2 py-3 hover:bg-gray-100'>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                            <span className="sm">Pembelajaran SDGs</span>
                        </div>
                    </li>
                    <li onClick={() => handleLink("/dashboard/cetak-matriks")} className={`px-2 py-3 hover:bg-gray-100 transition-all ease-in ease-out cursor-pointer ${menuActive == 'cetak-matriks' ? 'bg-green-100' : ''}`}>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faFileAlt} />
                            <span className="sm">Cetak Matriks</span>
                        </div>
                    </li>

                    <div className='mx-6 my-4 border-b-2 border-green-900'></div>

                    <li onClick={() => handleLink("/dashboard/pengguna")} className={`px-2 py-3 hover:bg-gray-100 transition-all ease-in ease-out cursor-pointer ${menuActive == 'pengguna' ? 'bg-green-100' : ''}`}>
                        <div className='ml-6 flex gap-5 justify-start items-center'>
                            <FontAwesomeIcon size='sm' icon={faUsers} />
                            <span className="sm">Atur Pengguna</span>
                        </div>
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
