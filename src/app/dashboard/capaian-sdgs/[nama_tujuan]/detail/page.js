'use client' 

import { useEffect, useState } from "react"
import { getUrl } from "@/lib/utils"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

import DashboardLayout from "@/app/dashboard/components/layout"
import Loading from "@/app/dashboard/components/loading"
import MathDisplay from "@/components/ui/mathdisplay"
import Modal from "@/app/dashboard/components/modal"
import EditCapaian from "../components/editCapaian"
import EditTargetCapaian from "../components/editTargetCapaian"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

export default function Detail () {
    const searchParams = useSearchParams()
    const kode_indikator = searchParams.get('kode_indikator')
    const kode_subindikator = searchParams.get('kode_subindikator')

    const [ role, setRole ] = useState('')
    const [ indikator, setIndikator ] = useState({})
    const [ subindikator, setSubindikator ] = useState({})
    const [ year, setYear ] = useState(null)
    const [ detail, setDetail ] = useState({})
    const [ targetCapaianForm, setTargetCapaianForm ] = useState([])
    const [ targetCapaian, setTargetCapaian ] = useState(0)
    const [ capaian, setCapaian ] = useState(0)
    const [ units, setUnits ] = useState([])
    const [ files, setFiles ] = useState([])
    const [ instansis, setInstansis ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ capaianModal, setCapaianModal ] = useState(false)
    const [ targetCapaianModal, setTargetCapaianModal ] = useState(false)

    const fetchDetail = async (kd_indikator, kd_subindikator = 0) => {
        setIsLoading(true)
        const res = await fetch(getUrl(`/api/sdgs/detailIndikator?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`), {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        const result = await res.json()
        const { data } = result
        if (res.ok) {
            setDetail(data.detail)
            setIndikator(data.indikator)
            setSubindikator(data.subindikator)
        }
        setIsLoading(false)
    }

    const fetchRole = async () => {
        const res = await fetch(getUrl(`/api/auth/role`), {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        if (res.ok) {
            const { data } = await res.json()
            const { role } = data
            setRole(role)
        }
    }

    const fetchTargetCapaianForm = async (kode_indikator, kode_subindikator) => {
        setIsLoading(true)
        const res = await fetch(getUrl(`/api/sdgs/targetCapaian?year=${year}&kd_indikator=${kode_indikator}&kd_subindikator=${kode_subindikator}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if(res.ok) {
            const result = await res.json()
            const { data, error } = result
            if (!error) setTargetCapaianForm(data)
        }
        setIsLoading(false)
        setTargetCapaianModal(true)
    }

    const fetchAllInstansis = async () => {
        const res = await fetch(getUrl('/api/auth/sotkSubunits'), {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        if (res.ok) {
            const result = await res.json()
            const { data } = result
            setInstansis(data)
        }
    }

    const calculatePercentage = (type, capaian, target) => {
        switch (type) {
            case 0:
                return ((target / capaian) * 100).toFixed(3)
            case 1:
                return ((capaian / target) * 100).toFixed(3) 
            case 2:
                return capaian === 'ada' ? 100 : 0
            default:
                return 'wrong case'
        }
        
    }
    const handleCapaianModal = () => setCapaianModal(!capaianModal)
    const handleTargetCapaianModal = async (kd_indikator, kd_subindikator = 0) => await fetchTargetCapaianForm(kd_indikator, kd_subindikator)

    useEffect(() => {
        setYear(sessionStorage.getItem('year'))
        if (!year) {
            fetchAllInstansis()
            fetchRole()
        }
    }, [year])
    
    useEffect(() => {
        if (targetCapaianModal === false || capaianModal === false) fetchDetail(kode_indikator, kode_subindikator ? kode_subindikator : 0)
    }, [targetCapaianModal, capaianModal, kode_indikator, kode_subindikator])

    useEffect(() => {
        const fetchTargetCapaian = async (detailId) => {
            setIsLoading(true)
            const res = await fetch(getUrl(`/api/sdgs/detailTargetCapaian?year=${year}&detail_id=${detailId}`), {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            if (res.ok) {
                const result = await res.json()
                const { data, error } = result
                if (!error) {
                    const { target_capaian, capaian } = data
                    setTargetCapaian(target_capaian ?? '')
                    setUnits(target_capaian.units ?? [])
                    if (capaian != undefined) {
                        setCapaian(capaian ?? '')
                        setFiles(capaian.files ?? [])
                    }
                } 
            }
            setIsLoading(false)
        }
        if (detail.id != undefined) fetchTargetCapaian(detail.id)
    }, [detail, year])
    

    return (
        <DashboardLayout>
            { isLoading && (<Loading />) }
            { indikator == {} && <div>No Data...</div>}
            <div className="flex flex-col gap-4 px-2.5 py-3 border-2 border-green-900 rounded-md drop-shadow-xl">
                <Modal isOpen={capaianModal} setIsOpen={setCapaianModal}>
                    <EditCapaian 
                        targetCapaianId={targetCapaian.id}
                        capaian={capaian ? capaian : ''}
                        files={capaian ? capaian.files : []} />
                </Modal>
                <Modal isOpen={targetCapaianModal} setIsOpen={setTargetCapaianModal}>
                    <EditTargetCapaian instansis={instansis} targetCapaian={targetCapaianForm} />
                </Modal>
                <div>
                    <h1 className="font-semibold">Indikator {indikator.kode}</h1>
                    <p className="text-sm text-justify">{indikator.kriteria}</p>
                </div>
                <div>    
                    { subindikator && (
                        <p className="text-sm text-justify"><span className="font-bold">{subindikator.kode}.</span> {subindikator.kriteria}</p>
                    )} 
                </div>
                <hr />
                <table className="table px-2 border-separate border-spacing-y-4 text-sm">
                    <tbody>
                        <tr>
                            <th className="text-left">Sumber Data</th>
                            <td colSpan={2}>{detail.sumber}</td>
                        </tr>
                        <tr>
                            <th className="text-left">Satuan</th>
                            <td colSpan={2}>{detail.satuan}</td>
                        </tr>
                        <tr>
                            <th className="text-left">Baseline ({year - 1})</th>
                            <td colSpan={2}>-</td>
                        </tr>
                        { detail.rumus != undefined && (
                            <tr>
                                <th className="text-left">Rumus</th>
                                <td colSpan={2}>
                                    <MathDisplay formula={detail.rumus} />
                                </td>
                            </tr>   
                        )}
                        { detail.variabel != undefined && (
                            <tr>
                                <th className="align-top text-left">Keterangan Rumus</th>
                                <td colSpan={2}>
                                    <ul>
                                        { Object.entries(JSON.parse(detail.variabel)).map(([key, value]) => (
                                            <li key={key}><strong>{key}</strong> = {value}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th className="align-top text-left">Instansi Pelaksana</th>
                            <td colSpan={2}>
                                <ul>
                                    { units != false ?
                                        units.map((unit, index) => (
                                            <li key={index}>{unit}</li>
                                    )) : (<li>-</li>)}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th className="align-top text-left">Dokumen Pendukung</th>
                            <td colSpan={2}>
                                <ul className="flex flex-col gap-2">
                                    { files != false ? 
                                        files.map((file, index) => (
                                            <li key={index} className="font-medium text-sky-500 hover:text-gray-400 transition-all ease-in ease-out cursor-pointer">
                                                <Link rel="preload" href={file.url} as={file.url}>{file.nama_file_asli}</Link>
                                            </li>
                                    )) : (<li>-</li>) }
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <table className="table text-sm text-center">
                    <thead>
                        <tr>
                            <th>Target ({targetCapaian ? targetCapaian.tahun : '-'})</th>
                            <th>Capaian ({targetCapaian ? targetCapaian.tahun : '-'})</th>
                            <th>% Capaian</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{targetCapaian ? targetCapaian.target : 'Belum ada target'}</td>
                            <td>{capaian ? capaian.capaian : 'Belum ada capaian'}</td>
                            <td>{capaian ? calculatePercentage(detail.tipe_capaian, capaian.capaian, targetCapaian.target) : '-'}</td>
                            <td>pending</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="flex gap-2">
                    <button 
                        className={`flex flex-1 items-center justify-center gap-3 py-2.5 bg-yellow-300 rounded-sm text-black text-sm hover:text-yellow-300 hover:bg-white hover:ring-2 hover:ring-yellow-300 ${role === 'admin' ? '' : 'hidden'} transition-all ease-in ease-out`}
                        onClick={() => handleTargetCapaianModal(kode_indikator, kode_subindikator)}
                        disabled={role === 'admin' ? false : true} >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Atur Target Capaian</span>
                    </button>
                    <button 
                        className="flex flex-1 items-center justify-center gap-3 py-2.5 bg-sky-500 rounded-sm text-white text-sm hover:text-sky-500 hover:bg-white hover:ring-2 hover:ring-sky-500 disabled:bg-slate-300 disabled:hover:ring-0 disabled:hover:text-white transition-all ease-in ease-out"
                        onClick={() => handleCapaianModal()}
                        disabled={targetCapaian == '' ? true : false} >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Atur Capaian</span>
                    </button>   
                </div>                                 
            </div>
        </DashboardLayout>
    )
}