'use client'

import { useState, useEffect } from 'react'

export const Detail = (props) => {
    const { data } = props

    const formatNumber = (number) => {
        return number.toLocaleString('id-ID')
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-center">Detail Sub Kegiatan</h1>
            <p className="text-sm text-muted">kode - {data && data.nama_subkegiatan}</p>
            <hr className="my-4" />
            <div className='flex flex-col gap-2'>
                <table className='border-separate border-spacing-x-2'>
                    <tbody>
                        <tr>
                            <td className='font-bold py-2'>Satuan</td>
                            <td>{ data && data.satuan_vol }</td>
                        </tr>
                        <tr>
                            <td className='font-bold py-2'>Lokasi Kegiatan</td>
                            <td>{ data && data.lokasi == 'semua_lokasi' ? 'Kota Medan' : data.lokasi }</td>
                        </tr>
                        <tr>
                            <td className='font-bold py-2'>Sumber Dana</td>
                            <td>{ data && data.sumber_dana }</td>
                        </tr>
                        {/* <tr>
                            <td className='font-bold py-2'>Instansi Pelaksana</td>
                            <td>Dinas Perumahan dan Permukiman Cipta Karya Tata Ruang</td>
                        </tr> */}
                    </tbody>
                </table>
                <table className="border-separate border-spacing-y-4">
                    <tbody>
                        <tr className='h-12 text-center'>
                            <td></td>
                            <td className='font-bold text-left'>Anggaran</td>
                            <td className='font-bold text-right'>Volume</td>
                        </tr>
                        <tr>
                            <td className='font-bold border-b-2 border-slate-300'>Target</td>
                            <td className="text-left border-b-2 border-slate-300">Rp. { data && formatNumber(data.target_rp) }</td>
                            <td className="text-right border-b-2 border-slate-300">{ data && formatNumber(data.target_vol) }</td>
                        </tr>
                        <tr>
                            <td className='font-bold border-b-2 border-slate-300'>Realisasi Semester 1</td>
                            <td className="text-left border-b-2 border-slate-300">Rp. { data && formatNumber(data.realisasi_rp_sems_1) }</td>
                            <td className="text-right border-b-2 border-slate-300">{ data && formatNumber(data.realisasi_vol_sems_1) }</td>
                        </tr>
                        <tr>
                            <td className='font-bold border-b-2 border-slate-300'>Realisasi Semester 2</td>
                            <td className="text-left border-b-2 border-slate-300">Rp. { data && formatNumber(data.realisasi_rp_sems_2) }</td>
                            <td className="text-right border-b-2 border-slate-300">{ data && formatNumber(data.realisasi_vol_sems_2) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Detail;