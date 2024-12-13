'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DashboardLayout from "@/app/dashboard/components/layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Loading from "@/app/dashboard/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faChevronCircleUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Alert from "@/components/ui/alert";


export default function Add () {
    const [ currentSubUnit, setCurrentSubUnit ] = useState(0)
    const [ subUnits, setSubUnits ] = useState([])
    const [ goals, setGoals ] = useState([])
    const [ indikators, setIndikators ] = useState([])
    const [ subkegiatans, setSubkegiatans ] = useState([]) 
    const [ indikatorDropdown, setIndikatorDropdown ] = useState(false)
    const [ goalDropdown, setGoalDropdown ] = useState(false)
    const [ selectedGoal, setSelectedGoal ] = useState(0)
    const [ selectedIndikator, setSelectedIndikator ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ indikatorStatus, setIndikatorStatus ] = useState(true)
    const [ showAlert, setShowAlert ] = useState(false)
    const [ messageAlert, setMessageAlert ] = useState('')
    const [ errorAlert, setErrorAlert ] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: {errors}, setError, clearErrors, setValue, watch } = useForm({
        defaultValues: {
            selectedSubkegiatans: [],
            sub_unit_id: currentSubUnit ? currentSubUnit : ''
        }
    })

    const selectedSubUnit = watch('sub_unit_id')

    const fetchSubUnit = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/auth/role`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        if (res.ok) {
            const result = await res.json()
            const { data } = result
            const { sub_unit_id } = data
            setCurrentSubUnit(sub_unit_id)
            setValue('sub_unit_id', sub_unit_id)
            if (isNaN(sub_unit_id)) fetchSubUnits()
        }
        setIsLoading(false)
    }

    const fetchSubUnits = async () => {
        const res = await fetch(`/api/auth/sotkSubunits`, {
            method: 'GET', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) setSubUnits(data)
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
            const { items } = data
            if (!error) setGoals(items)
        }
        setIsLoading(false)
    }

    const fetchIndikators = async (kode) => {
        const res = await fetch(`/api/sdgs/indikators?kode=${kode}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) return setIndikators(data)
        } else setIndikators([])
    }

    const fetchSubkegiatan = async (sub_unit_id) => {
        setIsLoading(true)
        const res = await fetch(`/api/realisasi/daerah/subKegiatan?sub_unit_id=${sub_unit_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) setSubkegiatans(data)
        }
        setIsLoading(false)
    }

    const onSubmit = async (form) => {
        setIsLoading(true)
        if (!selectedIndikator) {
            setIndikatorStatus(false)
            setIsLoading(false)
            return false
        }
        const fixData = { sdgs_indikator_id: selectedIndikator.id, ...form }
        const res = await fetch(`/api/realisasi/daerah/action`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fixData)
        })

        if (res.ok) {
            const result = await res.json()
            const { data, error, message } = result
            setMessageAlert(message)
            setShowAlert(!error)
            setErrorAlert(error)
            setTimeout(() => {
                setShowAlert(false)
                router.push('/dashboard/realisasi-program/pemerintah-daerah')
            }, 3000)
        } 
        
        setIsLoading(false)
    }

    useEffect(() => {
        fetchGoals()
        fetchSubUnit()
    }, [])

    useEffect(() => {
        if (selectedGoal) fetchIndikators(selectedGoal.kode)
    }, [selectedGoal])

    useEffect(() => {
        fetchSubkegiatan(isNaN(currentSubUnit) ? selectedSubUnit : currentSubUnit)
    }, [currentSubUnit, selectedSubUnit])

    return (
        <DashboardLayout Content={<Breadcrumb />}>
            { isLoading && (<Loading />) }
            <div>
                <div className="flex flex-col items-center mt-6 px-4 py-12 gap-6 border-2 border-slate-700 rounded-md bg-white drop-shadow-md">
                    <h1 className="px-2 py-1.5 font-bold text-lg text-center text-sky-800 border-2 border-sky-800 bg-sky-200 rounded-md w-full drop-shadow-sm">Tambah Sub-Kegiatan</h1>
                    <div className="w-full flex flex-col md:flex-row justify-evenly gap-4">
                        <div className="flex flex-col items-center w-full gap-2">
                            <div 
                                className="w-full flex justify-between items-center py-1.5 px-3 text-sm text-slate-700 font-bold text-center border border-slate-300 hover:border-slate-400 appearance-none rounded cursor-pointer"
                                role="input"
                                tabIndex={0}
                                onClick={() => {
                                    setGoalDropdown(!goalDropdown)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setGoalDropdown(!goalDropdown)
                                    }
                                }}
                                aria-expanded={goalDropdown}
                                aria-haspopup="listbox" >
                                <span>{selectedGoal ? `Tujuan ${selectedGoal.kode} - ${selectedGoal.name}` : 'Pilih tujuan SDGs...'}</span>
                                <FontAwesomeIcon icon={ goalDropdown ? faChevronCircleUp : faChevronCircleDown } />
                            </div>
                            <ul 
                                className={`w-full px-1.5 py-1 bg-slate-100 overflow-auto shadow-md scrollbar-thin transition-all duration-300 ${goalDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                role="listbox" >
                                {
                                    goalDropdown && goals && goals.map(goal => (
                                        <li 
                                            key={goal.kode} 
                                            value={goal.kode}
                                            className="my-1 px-1 py-1.5 text-xs rounded-md opacity-100 hover:bg-slate-200 transition-opacity duration-300 cursor-pointer"
                                            onClick={() => {
                                                setSelectedGoal({kode: goal.kode, name: goal.nama})
                                                setGoalDropdown(!goalDropdown)
                                            }} >
                                            {`Tujuan ${goal.kode} - ${goal.nama}`}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col items-center w-full gap-2">
                            <div 
                                className={`w-full flex justify-between items-center py-1.5 px-3 ${selectedIndikator == 0 ? 'bg-red-100' : 'bg-green-100'} text-sm text-slate-700 font-bold text-center border ${indikatorStatus ? 'border-slate-300' : 'border-red-700'} hover:border-slate-400 appearance-none rounded cursor-pointer`}
                                role="input"
                                tabIndex={0}
                                onClick={() => {
                                    setIndikatorDropdown(!indikatorDropdown)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setIndikatorDropdown(!indikatorDropdown)
                                    }
                                }}
                                aria-expanded={indikatorDropdown}
                                aria-haspopup="listbox" >
                                <span>{selectedIndikator ? selectedIndikator.kode : 'Pilih indikator SDGs...'}</span>
                                <FontAwesomeIcon icon={ indikatorDropdown ? faChevronCircleUp : faChevronCircleDown } />
                            </div>
                            { !indikatorStatus && (<span className="text-xs text-red-500">Mohon untuk diisi</span>) }
                            <ul 
                                className={`w-full px-1.5 py-1 bg-slate-100 overflow-auto shadow-md scrollbar-thin transition-all duration-300 ${indikatorDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                role="listbox" >
                                {
                                    indikatorDropdown && indikators.length > 0 ? indikators.map(indikator => (
                                        <li 
                                            key={indikator.id} 
                                            value={indikator.id}
                                            className="my-1 px-1 py-1.5 text-xs rounded-md opacity-100 hover:bg-slate-200 transition-opacity duration-300 cursor-pointer"
                                            onClick={() => {
                                                setSelectedIndikator({id: indikator.id, kode: indikator.kode})
                                                setIndikatorStatus(true)
                                                setIndikatorDropdown(!indikatorDropdown)
                                            }} >
                                            {indikator.kode} - {indikator.kriteria}
                                        </li>
                                    )) : <li className="my-2 p-1 text-xs rounded-md opacity-100 hover:bg-slate-200 transition-opacity duration-300 cursor-pointer">tidak ada data</li>
                                }
                            </ul>
                        </div>
                    </div>
                    <hr className="w-full border-2 rounded border-slate-500" />
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
                        {
                            isNaN(currentSubUnit) && (
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <label className="font-semibold">Pilih OPD</label>
                                    <select 
                                        className="w-full bg-transparent text-slate-600 text-sm border border-slate-300 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:drop-shadow-md appearance-none cursor-pointer"
                                        {...register("sub_unit_id")}>
                                        <option value="">pilih opd...</option>
                                        {
                                            subUnits && subUnits.map(opd => (
                                                <option key={opd.id} value={opd.id}>{opd.sub_unit}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }
                        <div className="flex flex-col items-center">
                            <span className="font-semibold">Pilih Sub-kegiatan</span>
                            <ul className="flex flex-col px-2.5 w-full max-h-72 overflow-y-auto scrollbar-thin gap-4">
                                {
                                    subkegiatans.map((subkegiatan, index) => (
                                        <li key={index} className="border-b-2 border-b-slate-300 py-2">
                                            <label className="flex justify-between">
                                                <span className="text-sm">{subkegiatan.nama_subkegiatan}</span>
                                                <input 
                                                    type='checkbox' 
                                                    value={subkegiatan.renja_subkegiatan.id}
                                                    {...register('selectedSubkegiatans', { valueAsArray: true })} />
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <button type="submit" className="px-4 py-1.5 w-full font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:text-slate-800 hover:ring-2 hover:ring-slate-800">Submit</button>
                        </div>
                    </form>
                    <Alert
                        className={`${showAlert ? 'opacity-100' : 'opacity-0'} transition-all ease-in ease-out`}
                        message={messageAlert}
                        type={ errorAlert ? 'failed' : 'success' }
                        onClose={() => setShowAlert(false)} />
                </div>
            </div>
        </DashboardLayout>
    )
}
