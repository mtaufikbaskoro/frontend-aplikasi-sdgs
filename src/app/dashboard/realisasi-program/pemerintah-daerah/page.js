'use client'
import { Fragment, useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import DashboardLayout from "../../components/layout"
import Breadcrumb from "@/components/ui/breadcrumb"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Table from "../../components/table"
import Modal from "../../components/modal"
import Detail from "./components/detail"
import goalColors from '@/app/data/textColorGoals.json'
import Loading from "../../components/loading"

const ITEMS_PER_PAGE = 3
const TableColumns = ['kode', 'Program / Kegiatan / SubKegiatan', 'Aksi']

export default function PemerintahDaerah () {
    const [ goals, setGoals ] = useState([])
    const [ indikators, setIndikators ] = useState(null)
    const [ selectedGoal, setSelectedGoal ] = useState(null)
    const [ color, setColor ] = useState('')
    const [ detailModal, setDetailModal ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(0)
    const { register, watch } = useForm({
        defaultValues: {goal: ''}
    })

    const goalInput = watch('goal')

    const fetchGoals = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/sdgs`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error, message } = result
            if (!error) setGoals(data.items)
            setIsLoading(false)
        }
    }

    const fetchProgramsInIndikatorsByKode = async (goal, page) => {
        setIsLoading(true)
        const pagination = {
            limit: ITEMS_PER_PAGE,
            page: page
        }
        const stringPagination = encodeURIComponent(JSON.stringify(pagination))
        const res = await fetch(`/api/realisasi/daerah/subKegiatanByKode?sdgs_tujuan_kode=${goal}&pagination=${stringPagination}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error, message } = result
            if (!error) setIndikators(data)
            else setIndikators(null)
        }
        setIsLoading(false)
    }

    useEffect(() => { fetchGoals() }, [])

    useEffect(() => {
        const goal = goals.find(goal => goal.id == goalInput)
        setSelectedGoal(goal || null)
        setColor(goalColors[0][goalInput])
    }, [goalInput])

    useEffect(() => {
        if (selectedGoal !== null) fetchProgramsInIndikatorsByKode(selectedGoal.kode, currentPage)
    }, [selectedGoal, currentPage])

    return (
        <DashboardLayout Content={<Breadcrumb />}>
            {isLoading && <Loading />}
            <div className="flex flex-col gap-8">
                <Modal isOpen={detailModal} setIsOpen={setDetailModal}><Detail /></Modal>
                <form className="mt-6 px-2 flex flex-none justify-between">
                    <Link 
                        className="flex items-center justify-center w-[240px] py-2.5 gap-3 bg-sky-400 rounded-sm text-white drop-shadow-lg text-sm hover:text-sky-400 hover:bg-white hover:ring-2 hover:ring-sky-400 transition-all ease-in ease-out" 
                        href="/dashboard/realisasi-program/pemerintah-daerah/tambah" >
                            <FontAwesomeIcon icon={faAdd} />
                            Tambah Sub Kegiatan
                    </Link>
                    <div className="flex flex-col">
                        <select 
                            className="mt-2 px-1.5 py-2 text-sm border-b-4 border-slate-800 focus:outline-none"
                            {...register('goal')} >
                            {isLoading ? (<option value=''>Sedang Memuat...</option>) : (<option value=''>Pilih Tujuan SDGs</option>)}
                            
                            {goals.length > 0 ? goals.map(goal => (
                                <option 
                                    key={goal.kode} 
                                    value={goal.kode}
                                    className="capitalize" >{`Tujuan ${goal.kode} - ${goal.nama}`}</option>
                            )) : <option value={''} disabled>Tidak ada tujuan</option>}
                        </select>
                    </div>
                </form>
                <div className={`${selectedGoal != null ? 'opacity-100' : 'opacity-0'} flex flex-col gap-6 transition-all ease-in ease-out`}>
                    <div className={`mx-3 px-3 py-2.5 border-2 border-slate-700 bg-slate-100 rounded-md drop-shadow-md`}>
                        <h1 className={`capitalize text-md font-semibold ${color}`}>tujuan {selectedGoal?.kode} - {selectedGoal?.nama}</h1>
                    </div>
                    <div className="mx-3 drop-shadow-md">
                        <Table columns={TableColumns}>
                            {
                                indikators ? indikators.map((indikator, index) => (
                                    <Fragment key={index} >
                                        <tr className={`h-14 ${color} bg-slate-300 text-center text-black font-semibold`}>
                                            <td className="text-center pl-4">{indikator.kode_indikator}</td>
                                            <td className="text-left" colSpan={TableColumns.length-1} >{indikator.nama_indikator}</td>
                                        </tr>
                                        {indikator.programs.map((program, index) => (
                                            <Fragment key={index}>
                                                <tr className={`h-14 bg-slate-300 text-center text-black`}>
                                                    <td className="text-left pl-4"></td>
                                                    <td 
                                                        className='text-left font-bold'
                                                        colSpan={TableColumns.length-1} >
                                                        {program.nama_program}
                                                    </td>
                                                </tr>
                                                {program.kegiatans.map((kegiatan, index) => (
                                                    <Fragment key={index}>
                                                        <tr className={`h-14 bg-slate-200 text-center text-black`}>
                                                            <td className="text-left pl-4"></td>
                                                            <td 
                                                                className='text-left'
                                                                colSpan={TableColumns.length-1} >
                                                                {kegiatan.nama_kegiatan}
                                                            </td>
                                                        </tr>
                                                        {kegiatan.sub_kegiatans.map((sub_kegiatan, index) => (
                                                            <Fragment key={index}>
                                                                <tr className={`h-14 text-center bg-white text-black`}>
                                                                    <td className="text-left pl-4"></td>
                                                                    <td className='text-left'>
                                                                        {sub_kegiatan.nama_sub_kegiatan}
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => {setDetailModal(!detailModal)}} className="bg-sky-300 px-2 py-1 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                                            <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                    </Fragment>                       
                                                ))}
                                            </Fragment>
                                        ))}
                                    </Fragment>
                                )) : 
                                (<tr className={`h-14 bg-slate-300 text-center text-black font-semibold`}>
                                    <td colSpan={TableColumns.length} className="text-center pl-4">tidak ada data</td>
                                </tr>)
                            }
                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
