'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import logoPemko from '@assets/img/logo_pemko_medan.png';
import { getUrl } from '@/lib/utils';

export default function Navbar (props) {
    const { isOpen, setIsOpen } = props
    const [ username, setUsername ] = useState()
    const [ year, setYear ] = useState('')

    const fetchUser = async () => {
        const res = await fetch(getUrl('/api/auth/role'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) {
                const { username } = data
                setUsername(username)
            }
        }
    }

    const fetchYear = async () => {
        const res = await fetch(getUrl('/api/cookie/year'), { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) {
                sessionStorage.setItem('year', data)
                setYear(sessionStorage.getItem('year'))
            } else {
                console.log('gagal mengambil tahun.')
            }   
        }
        return true
    }

    useEffect(() => {
        const year = sessionStorage.getItem('year')
        if (!year) fetchYear()
        else setYear(sessionStorage.getItem('year'))
        fetchUser()
    }, [])

    return (
        <nav className="sticky top-0 flex justify-between items-center bg-white z-30 px-16 transition-all ease-in ease-out py-4 border-b-4 border-green-900">
            { isOpen ? (
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                        <FontAwesomeIcon icon={faClose} color='black' />
                    </button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                        <FontAwesomeIcon icon={faBars} color='black' />
                    </button>
                </div>
            ) }
            <div className='grow flex flex-col items-end md:flex-row md:items-center md:justify-between gap-1'>
                <div></div>
                <div className='flex justify-center items-center'>
                    <div className='w-6'>
                        <Image src={logoPemko} width="auto" height="auto" alt="logo pemko medan" />
                    </div>
                    <p className="ml-4 text-lg font-bold uppercase">astra <span>({year})</span></p>
                </div>
                <div>
                    <p className='text-sm'>Selamat datang, <span className='font-bold'>{username}</span></p>
                </div>
            </div>
        </nav>
    )
}
