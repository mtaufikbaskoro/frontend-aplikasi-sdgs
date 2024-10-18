'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/footer';
import Alert from '@/components/ui/alert';

import logoPemko from '@assets/img/logo_pemko_medan.png';
import logoSDGs from '@assets/img/logo_sdgs.png';

export default function Login () {
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <>
        <div className="flex min-w-full h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="flex items-center justify-center h-32 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-x-4">
                    <Image src={logoPemko} width={120} height={120} alt="Logo Pemerintah Kota Medan" />
                    <Image src={logoSDGs} width={120} height={120} alt="Logo SDGs" />
                </div>
            </div>

            <div className="mt-10 border-2 rounded-md border-first p-12 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm text-green-950 font-bold leading-6 text-black">Username</label>
                        <div className="mt-2">
                            <input {...register("username", { required:true })} placeholder="Masukkan username anda" className="block w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm" />
                            { errors.username && 
                                <div className='mt-1'> 
                                    <Alert>Username tidak boleh kosong.</Alert>
                                </div>
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
                                <div className='mt-2'> 
                                    <Alert>Password tidak boleh kosong.</Alert>
                                </div>
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
        </div>
        <Footer />
        </>
    )
}