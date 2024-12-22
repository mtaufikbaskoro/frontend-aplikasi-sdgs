'use client'

import { useState, useEffect } from 'react'

export const Detail = (props) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-center">Detail Sub Kegiatan</h1>
            <p className="text-xs text-muted text-center">kode - nama_subkegiatan</p>
            <hr className="my-4" />
            <div className='flex flex-col gap-8'>
                <table>
                    <tbody>
                        <tr>
                            <td className='font-bold py-2'>Satuan</td>
                            <td>Orang</td>
                        </tr>
                        <tr>
                            <td className='font-bold py-2'>Lokasi Kegiatan</td>
                            <td>Kota Medan</td>
                        </tr>
                        <tr>
                            <td className='font-bold py-2'>Sumber Dana</td>
                            <td>APBD Kota Medan</td>
                        </tr>
                        <tr>
                            <td className='font-bold py-2'>Instansi Pelaksana</td>
                            <td>Dinas Perumahan dan Permukiman Cipta Karya Tata Ruang</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex flex-col gap-6'>
                    <h4 className='font-bold'>Anggaran</h4>
                    <table className="table-auto">
                        <thead>
                            <tr className='font-medium'>
                                <td className='p-2 border border-slate-300'>Target</td>
                                <td className='p-2 border border-slate-300'>Realisasi Semester 1</td>
                                <td className='p-2 border border-slate-300'>Realisasi Semester 2</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='h-12'>
                                <td className='p-2 border border-slate-300'>Rp. 20.000.000.000</td>
                                <td className='p-2 border border-slate-300'>Rp. 13.000.000.000</td>
                                <td className='p-2 border border-slate-300'>Rp. 7.000.000.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col gap-6'>
                    <h4 className='font-bold'>Volume</h4>
                    <table className="table-auto text-center">
                        <thead>
                            <tr className='font-medium'>
                                <td className='p-2 border border-slate-300'>Target</td>
                                <td className='p-2 border border-slate-300'>Realisasi Semester 1</td>
                                <td className='p-2 border border-slate-300'>Realisasi Semester 2</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='h-12'>
                                <td className='p-2 border border-slate-300'>144</td>
                                <td className='p-2 border border-slate-300'>72</td>
                                <td className='p-2 border border-slate-300'>72</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Detail;