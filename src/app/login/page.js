'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Image from 'next/image'
import Link from 'next/link'
import Footer from './components/footer'
import Alert from '@/components/ui/alert'

import logoPemko from '@assets/img/logo_pemko_medan.png'
import logoSDGs from '@assets/img/logo_sdgs.png'
import Loading from '../dashboard/components/loading'

export default function Login () {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ notification, setNotification ] = useState(false)
    const router = useRouter();

    const year = watch('year')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('isLogin')) {
            setNotification(params.get('isLogin'));
            setMessage('Anda Perlu login terlebih dahulu');
        }
    }, [])

    async function onSubmit (form) {
        setIsLoading(true)
        const { username, password } = form
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, year})
        })
        const result = await response.json()
        if (!response.ok) {
            const { data, error, message } = result
            setNotification(error)
            setMessage(message)
        } 
        const { error, message } = result
        if (!error) {
            setShowAlert(true)
            sessionStorage.setItem('year', year)
            router.push('/dashboard')
        } else {
            setNotification(error)
            setMessage(message)
        }
        setIsLoading(false)
    }

    return (
        <>
        <div className="flex min-w-full h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            {isLoading && (<Loading />)}
            <div className="flex items-center justify-center h-32 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-x-4">
                    <Image src={logoPemko} width={120} height={120} alt="Logo Pemerintah Kota Medan" />
                    <Image src={logoSDGs} width={120} height={120} alt="Logo SDGs" />
                </div>
            </div>

            <div className="mt-10 border-2 rounded-md border-first p-12 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex flex-col items-center w-full gap-2">
                    <label className="font-semibold">Tahun Monev</label>
                    <select 
                        className="w-full bg-transparent text-slate-700 text-sm border border-gray-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                        {...register("year", {required: true})}>
                        <option value=''>Masukkan tahun monev SDGs...</option>
                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                        <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                    </select>
                    { errors.year && 
                        <span className='text-red-500 text-xs'>Tahun tidak boleh kosong</span>
                    }
                </div>
                <hr className='my-6' />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm text-green-950 font-bold leading-6 text-black">Username</label>
                        <div className="mt-2">
                            <input {...register("username", { required:true })} placeholder="Masukkan username anda" className="block w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm" />
                            { errors.username && 
                                <span className='text-red-500 text-xs'>Username tidak boleh kosong</span>
                            }
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm text-green-950 font-bold leading-6 text-black">Password</label>
                        </div>
                        <div className="mt-1">
                            <input {...register("password", {required: true, })} type="password" placeholder="Masukkan password anda" className="block w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm" />
                            { errors.password &&
                                <span className='text-red-500 text-xs'>Password tidak boleh kosong</span>
                            }
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center mt-12 rounded-sm bg-green-600 px-3 py-1.5 text-sm text-white uppercase font-semibold">
                            masuk
                        </button>
                    </div>
                </form>

                <p className="mt-3 text-center text-xs text-green-950 font-semibold">
                    <Link href="/" className="font-regular leading-6 hover:underline">Kembali</Link>
                </p>
            </div>
            {showAlert && (
                <Alert
                    className={`${showAlert ? 'opacity-100' : 'opacity-0'} transition-all ease-in ease-out`}
                    message="Login success!"
                    type="success"
                    onClose={() => setShowAlert(false)} />
            )}
            {
                <Alert 
                    className={`${notification ? 'opacity-100' : 'opacity-0'} transition-all ease-in ease-out`}
                    message={message}
                    type="failed"
                    onClose={() => setNotification(false)} />
            }
        </div>
        <Footer />
        </>
    )
}