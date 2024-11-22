'use client'
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import DashboardLayout from "../../components/layout"
import Breadcrumb from "@/components/ui/breadcrumb"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Table from "../../components/table"

const goalColors = {
    1: 'bg-tujuan-1',
    2: 'bg-tujuan-2',
    3: 'bg-tujuan-3',
    4: 'bg-tujuan-4',
    5: 'bg-tujuan-5',
    6: 'bg-tujuan-6',
    7: 'bg-tujuan-7',
    8: 'bg-tujuan-8',
    9: 'bg-tujuan-9',
    10: 'bg-tujuan-10',
    11: 'bg-tujuan-11',
    12: 'bg-tujuan-12',
    13: 'bg-tujuan-13',
    14: 'bg-tujuan-14',
    15: 'bg-tujuan-15',
    16: 'bg-tujuan-16',
    17: 'bg-tujuan-17',
}

const TableColumns = ['kode', 'Program / Kegiatan / SubKegiatan', 'Aksi']

export default function PemerintahDaerah () {
    const [ goals, setGoals ] = useState([])
    const [ selectedGoal, setSelectedGoal ] = useState(null)
    const [ color, setColor ] = useState('')
    const { register, watch } = useForm({
        defaultValues: {goal: ''}
    })

    const goalInput = watch('goal')

    const fetchGoals = async () => {
        const res = await fetch(`/api/sdgs`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const data = await res.json()
            if (data) setGoals(data?.data)
            // console.log(data)
        }
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    useEffect(() => {
        const goal = goals.find(goal => goal.id == goalInput)
        setSelectedGoal(goal || null)
        setColor(goalInput[goalColors[goalInput]])
    }, [goalInput])


    return (
        <DashboardLayout Content={<Breadcrumb />}>
            <div className="flex flex-col gap-8">
                <form className="mt-6 px-2 flex flex-none justify-between">
                    <Link 
                        className="flex items-center justify-center w-[240px] py-2.5 gap-3 bg-sky-400 rounded-sm text-white text-sm hover:text-sky-400 hover:bg-white hover:ring-2 hover:ring-sky-400 transition-all ease-in ease-out" 
                        href='/' >
                            <FontAwesomeIcon icon={faAdd} />
                            Tambah Sub Kegiatan
                    </Link>
                    <div className="flex flex-col">
                        <select 
                            className="mt-2 px-1.5 py-2 text-sm border-b-4 border-green-900 focus:outline-none"
                            {...register('goal')} >
                            <option value=''>Pilih Tujuan SDGs</option>
                            {goals.length > 0 ? goals.map(goal => (
                                <option 
                                    key={goal.kode} 
                                    value={goal.kode}
                                    className="capitalize" >{`Tujuan ${goal.kode} - ${goal.nama}`}</option>
                            )) : <option value={''} disabled>Tidak ada tujuan</option>}
                        </select>
                    </div>
                </form>
                <div className={`${selectedGoal != null ? 'opacity-100' : 'opacity-0 hidden'} flex flex-col gap-6 transition-all ease-in ease-out`}>
                    <div className={`mx-3 px-3 py-2.5 bg-tujuan-${goalInput} text-white rounded-md drop-shadow-md`}>
                        <h1 className="capitalize text-lg font-regular">tujuan {selectedGoal?.kode} - {selectedGoal?.nama}</h1>
                    </div>
                    <div className="mx-3 drop-shadow-md">
                        <Table columns={TableColumns}>
                            <tr className={`h-14 bg-tujuan-${goalInput} bg-opacity-75 text-center text-black font-semibold`}>
                                <td className="px-4">1.1.1*</td>
                                <td className="text-left" colSpan={TableColumns.length-1} >Tingkat kemiskinan ekstrim</td>
                            </tr>
                            <tr className={`h-14 bg-slate-300 text-center text-black`}>
                                <td>1.06.05</td>
                                <td 
                                    className='text-left'
                                    colSpan={TableColumns.length-1} >
                                    Program Perlindungan dan Jaminan Sosial
                                </td>
                            </tr>
                            <tr className={`h-14 bg-slate-200 text-center text-black`}>
                                <td>1.06.05.2.01</td>
                                <td 
                                    className='text-left'
                                    colSpan={TableColumns.length-1} >
                                    Pemeliharaan anak-anak terlantar
                                </td>
                            </tr>
                            <tr className={`h-14 text-center bg-slate-100 text-black`}>
                                <td>1.06.05.2.01.01</td>
                                <td className='text-left'>
                                    Penjangkauan anak-anak terlantar
                                </td>
                                <td>
                                    <div className="py-2">
                                        <Link href={`/`} className="bg-sky-300 px-2 py-1 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            <tr className={`h-14 text-center bg-slate-100 text-black`}>
                                <td>1.06.05.2.01.03</td>
                                <td className='text-left'>
                                    Pemantauan terhadap pelaksanaan pemeliharaan anak terlantar
                                </td>
                                <td>
                                    <div className="py-2">
                                        <Link href={`/`} className="bg-sky-300 px-2 py-1 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>

                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
