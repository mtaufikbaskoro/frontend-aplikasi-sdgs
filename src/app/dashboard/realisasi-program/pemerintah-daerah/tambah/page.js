'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import DashboardLayout from "@/app/dashboard/components/layout";
import Breadcrumb from "@/components/ui/breadcrumb";


export default function Add () {
    const { register, handleSubmit, formState: {errors}, setError, clearErrors, watch } = useForm({
        defaultValues: {
            selectedSubkegiatan: []
        }
    })
    const [ subUnitId, setSubUnitId ] = useState('')
    const [ goals, setGoals ] = useState([])
    const [ indikators, setIndikators ] = useState([]) 
    const [ isLoading, setIsLoading ] = useState(false)

    const fetchSubUnit = async () => {
        setIsLoading(true)
        const res = await fetch('/api/auth/role', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error, message } = result
            if (!error) return data
        }
    }

    const fetchGoals = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/sdgs`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) setGoals(data.items)
            setIsLoading(false)
        }
    }

    const fetchIndikators = async (kode) => {
        setIsLoading(true)
        const res = await fetch(`/api/sdgs/indikators?kode=${kode}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            console.log(data)
            if (!error) return setIndikators(data)
            setIsLoading(false)
        }
    }

    const selectedGoal = watch('goal')
    const selectedTargetSdgs = watch('indikator_sdgs')
    const selectedSubkegiatans = watch('selectedSubkegiatan') 

    const onSubmit = (form) => console.log(form)

    useEffect(() => {
        const user = fetchSubUnit()
        const { role, username, sub_unit_id } = user
        setSubUnitId(isNaN(sub_unit_id) ? sub_unit_id : 0) 
        fetchGoals()
    }, [])

    useEffect(() => {
        if (selectedGoal) fetchIndikators(selectedGoal)
    }, [selectedGoal])

    return (
        <DashboardLayout Content={<Breadcrumb />}>
            <div>
                <div className="flex flex-col items-center mt-6 py-12 gap-6 border-2 border-slate-700 rounded-md bg-white drop-shadow-md">
                    <h1 className="px-2 py-1.5 font-bold text-lg text-center text-sky-800 border-2 border-sky-800 bg-sky-200 rounded-md w-1/2 drop-shadow-sm">Tambah Sub-Kegiatan</h1>
                    <hr className="bg-green-950" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
                        <div className="flex flex-col md:flex-row justify-evenly mx-auto w-1/2 gap-4">
                            <div className="flex flex-col items-center w-full gap-2">
                                <label className="font-semibold">Pilih Tujuan SDGs</label>
                                <select 
                                    className="w-full bg-transparent text-slate-700 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                    {...register("goal")}>
                                    <option value="">pilih tujuan sdgs...</option>
                                    {
                                        goals && goals.map(goal => (
                                            <option key={goal.id} value={goal.kode}>{`Tujuan ${goal.kode} - ${goal.nama}`}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex flex-col items-center w-full gap-2">
                                <label className="font-semibold">Pilih Target SDGs</label>
                                <select 
                                    className="w-full bg-transparent text-slate-600 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                    {...register("indikator_sdgs")}>
                                    <option value="1">pilih indikator sdgs...</option>
                                    {
                                        indikators && indikators.map(indikator => (
                                            <option key={indikator.id} value={indikator.id}>{indikator.kriteria}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {
                            subUnitId !== 0 && (
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <label className="font-semibold">Pilih OPD</label>
                                    <select 
                                        className="w-1/2 bg-transparent text-slate-600 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                        {...register("sub_unit")}>
                                        <option value="">pilih opd...</option>
                                        <option value="1">opd 1</option>
                                        <option value="2">opd 2</option>
                                    </select>
                                </div>
                            )
                        }
                        <div className="flex flex-col items-center gap-2 w-full">
                            <label className="font-semibold">Pilih Program</label>
                            <select 
                                className="w-1/2 bg-transparent text-slate-600 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                {...register("program")}>
                                <option value="">pilih program...</option>
                                <option value="1">program nomor 1</option>
                                <option value="2">program nomor 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <label className="font-semibold">Pilih Kegiatan</label>
                            <select 
                                className="w-1/2 bg-transparent text-slate-600 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                {...register("kegiatan")}>
                                <option value="">pilih kegiatan...</option>
                                <option value="1">kegiatan nomor 1</option>
                                <option value="2">kegiatan nomor 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-center px-2 gap-2">
                            <span className="font-semibold">Pilih Sub-kegiatan</span>
                            <ul className="flex flex-col w-1/2 gap-4">
                                <li className="border-b-2 border-b-slate-300 py-2">
                                    <label className="flex justify-between">
                                        <span className="text-sm">Nama Sub kegiatan 1</span>
                                        <input 
                                            type='checkbox' 
                                            value={1}
                                            {...register('selectedSubkegiatan')} />
                                    </label>
                                </li>
                                <li className="border-b-2 border-b-slate-300 py-2">
                                    <label className="flex justify-between">
                                        <span className="text-sm">Nama Sub kegiatan 2</span>
                                        <input 
                                            type='checkbox' 
                                            value={2}
                                            {...register('selectedSubkegiatan')} />
                                    </label>
                                </li>
                                <li className="border-b-2 border-b-slate-300 py-2">
                                    <label className="flex justify-between">
                                        <span className="text-sm">Nama Sub kegiatan 3</span>
                                        <input 
                                            type='checkbox' 
                                            value={3}
                                            {...register('selectedSubkegiatan')} />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <button type="submit" className="px-4 py-1.5 w-1/2 font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
