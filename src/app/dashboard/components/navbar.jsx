'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import logoPemko from '@assets/img/logo_pemko_medan.png';

export default function Navbar (props) {
    const { isOpen, setIsOpen } = props;
    const [ username, setUsername ] = useState();

    const fetchUser = async () => {
        const res = await fetch(`/api/auth/role`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const data = await res.json()
            setUsername(data?.username)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <nav className={`sticky top-0 flex justify-between items-center bg-white z-10 ${isOpen ? "pl-64" : "pl-16"} transition-all ease-in ease-out py-6 border-b-4 border-green-900 bg-white`}>
            <div className={`${isOpen ? "hidden" : ""}`}>
                <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                    <FontAwesomeIcon icon={faBars} color='black' />
                </button>
            </div>
            <div className={`${isOpen ? "" : "hidden"}`}>
                <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                    <FontAwesomeIcon icon={faClose} color='black' />
                </button>
            </div>
            <div className="flex justify-center items-center">
                <div className='w-6 h-6'>
                    <Image src={logoPemko} width="auto" height="auto" alt="logo pemko medan" />
                </div>
                <div className="flex flex-col">
                    <p className="ml-4 text-lg font-bold uppercase">astra</p>
                </div>
            </div>
            <div className="pr-16 flex justify-end items-center gap-12 min-w-80">
                <p className='text-sm'>Selamat datang, <span className='font-bold'>{username}</span></p>
            </div>
        </nav>
    )
}
