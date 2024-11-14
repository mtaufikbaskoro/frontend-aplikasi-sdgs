'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChartBar, faSignOut, faTableColumns, faFileAlt, faUsers, faWrench, faWindowMaximize, faChevronRight, faChevronDown, faPuzzlePiece, faLightbulb } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar (props) {
    const { isOpen } = props;
    const router = useRouter();
    const pathname = usePathname();
    const [ submenu, setSubmenu ] = useState('');
    const [ menuActive, setMenuActive ] = useState('');
    const [ submenuActive, setSubmenuActive ] = useState('');

    async function handleLogout () {
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            router.push('/login')
        } else {
            console.log('gagal logout')
        }
    }

    useEffect(() => {
        const pathArray = pathname.split('/');
        if (pathArray[2]) {
            setMenuActive(pathArray[2]);
        } else {
            setMenuActive(pathArray[1]);
        }
        if (pathArray[3]) {
            setSubmenuActive(pathArray[3]);
        }
        if (pathArray[2] == 'realisasi-program') {
            setSubmenu(pathArray[2]);
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
        <div className={`${isOpen ? "" : "-translate-x-72"} w-72 fixed top-[64px] left-0 h-[calc(100vh-64px)] py-6 bg-slate-100 drop-shadow-xl rounded transition-all ease-in ease-out`}>
            <ul className={`${isOpen ? '' : '-translate-x-72'} space-y-4 transition-all ease-in ease-out`}>
                <li onClick={() => handleLink("/dashboard")} className={`pl-6 py-3 hover:bg-slate-300 transition-all ease-in ease-out cursor-pointer ${menuActive == 'dashboard' ? 'bg-green-100' : ''}`}>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faTableColumns} />
                        <span className="sm">Dashboard</span>
                    </div>
                </li>
                <li onClick={() => handleLink("/dashboard/capaian-sdgs")} className={`pl-6 py-3 hover:bg-slate-300 transition-all ease-in ease-out cursor-pointer ${menuActive == 'capaian-sdgs' ? 'bg-green-100' : ''}`}>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faChartBar} />
                        <span className="sm">Capaian SDGs</span>
                    </div>
                </li>
                <li onClick={() => handleSubMenu('realisasi-program')} className={`pl-6 py-3 hover:bg-slate-300 transition-all ease-in ease-out cursor-pointer ${menuActive == 'realisasi-program' ? 'bg-green-100' : ''}`}>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faWindowMaximize} />
                        <span className="sm">Realisasi Program</span>
                        <FontAwesomeIcon size='xs' icon={submenu == 'realisasi-program' ? faChevronDown : faChevronRight} />
                    </div>
                </li>
                <li className={`${submenu == 'realisasi-program' ? '' : 'hidden'}`}>
                    <ul className='flex flex-col gap-3 justify-start text-gray-700 text-sm transition-all ease-in ease-out'>
                        <li onClick={() => handleLink('/dashboard/realisasi-program/pemerintah-daerah')} className={`pl-14 py-3 hover:bg-slate-300 cursor-pointer ${submenuActive == 'pemerintah-daerah' ? 'bg-green-50' : ''}`}>
                            <span>Pemerintah Daerah</span>
                        </li>
                        <li onClick={() => handleLink('/dashboard/realisasi-program/non-pemerintah')} className={`pl-14 py-3 hover:bg-slate-300 cursor-pointer ${submenuActive == 'non-pemerintah' ? 'bg-green-50' : ''}`}>
                            <span>Non Pemerintah</span>
                        </li>
                        <li onClick={() => handleLink('/dashboard/realisasi-program/pelaku-usaha')} className={`pl-14 py-3 hover:bg-slate-300 cursor-pointer ${submenuActive == 'pelaku-usaha' ? 'bg-green-50' : ''}`}>
                            <span>Pelaku Usaha</span>
                        </li>
                    </ul>
                </li>
                <li onClick={() => handleLink("/")} className='pl-6 py-3 hover:bg-slate-300'>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faPuzzlePiece} />
                        <span className="sm">Identifikasi Masalah</span>
                    </div>
                </li>
                <li onClick={() => handleLink("/")} className='pl-6 py-3 hover:bg-slate-300'>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faLightbulb} />
                        <span className="sm">Pembelajaran SDGs</span>
                    </div>
                </li>
                <li onClick={() => handleLink("/dashboard/cetak-matriks")} className={`pl-6 py-3 hover:bg-slate-300 transition-all ease-in ease-out cursor-pointer ${menuActive == 'cetak-matriks' ? 'bg-green-100' : ''}`}>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faFileAlt} />
                        <span className="sm">Cetak Matriks</span>
                    </div>
                </li>

                <div className='mx-6 my-4 border-b-2 border-green-900'></div>

                <li onClick={() => handleLink("/dashboard/pengguna")} className={`pl-6 py-3 hover:bg-slate-300 transition-all ease-in ease-out cursor-pointer ${menuActive == 'pengguna' ? 'bg-green-100' : ''}`}>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faUsers} />
                        <span className="sm">Atur Pengguna</span>
                    </div>
                </li>
                <li className='pl-6 py-3 hover:bg-slate-300'>
                    <div className='flex gap-5 justify-start items-center transition-all ease-in ease-out cursor-pointer'>
                        <FontAwesomeIcon size='sm' icon={faWrench} />
                        <span className="sm">Atur Instansi</span>
                    </div>
                </li>
                <li onClick={() => handleLogout()} className='pl-6 py-3 hover:bg-slate-300 cursor-pointer'>
                    <div className='flex gap-5 justify-start items-center'>
                        <FontAwesomeIcon size='sm' icon={faSignOut} />
                        <span className="sm">Keluar</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}
