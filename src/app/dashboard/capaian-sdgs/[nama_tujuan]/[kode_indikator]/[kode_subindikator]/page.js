'use client';

import Link from "next/link";
import DashboardLayout from "@/app/dashboard/components/layout";
import Loading from "@/app/dashboard/components/loading";
import MathDisplay from "@/components/ui/mathdisplay";
import Modal from "@/app/dashboard/components/modal";
import EditCapaian from "../../components/editCapaian";
import EditTargetCapaian from "../../components/editTargetCapaian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export default function Detail ({ params }) {
    const { kode_indikator, kode_subindikator } = params;
    const [ role, setRole ] = useState('');
    const [ indikator, setIndikator ] = useState({});
    const [ subindikator, setSubindikator ] = useState({});
    const [ detail, setDetail ] = useState({});
    const [ targetCapaianForm, setTargetCapaianForm ] = useState([]);
    const [ targetCapaian, setTargetCapaian ] = useState('');
    const [ capaian, setCapaian ] = useState('');
    const [ units, setUnits ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ instansis, setInstansis ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ capaianModal, setCapaianModal ] = useState(false);
    const [ targetCapaianModal, setTargetCapaianModal ] = useState(false);

    const fetchDetail = async (kd_indikator, kd_subindikator = 0) => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/sdgs/detailIndikator?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
    
            if (res.ok) {
                const data = await res.json();
                setDetail(data.detail);
                setIndikator(data.indikator);
                setSubindikator(data.subindikator);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchRole = async () => {
        const res = await fetch(`/api/auth/role`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            setRole(data?.role)
        }
    }

    const fetchTargetCapaian = async (detailId) => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/sdgs/detailTargetCapaian?detail_id=${detailId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                if (!data.empty) {
                    setTargetCapaian(data.target_capaian ?? '')
                    setUnits(data.target_capaian.units ?? [])
                    if (data.capaian != undefined) {
                        setCapaian(data.capaian ?? '')
                        setFiles(data.capaian.files ?? [])
                    }
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchTargetCapaianForm = async (kode_indikator, kode_subindikator) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/sdgs/targetCapaian?kd_indikator=${kode_indikator}&kd_subindikator=${kode_subindikator}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if(res.ok) {
                const data = await res.json();
                setTargetCapaianForm(data);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setTargetCapaianModal(true);
        }
    }

    const fetchAllInstansis = async () => {
        try {
            const res = await fetch('/api/auth/sotkSubunits', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json()
                setInstansis(data)
            }
        } catch (error) {
            console.log(error)   
        }
    }

    const calculatePercentage = (capaian, target) => {
        if (!capaian || !target) return 0
        const targetValue = parseFloat(target);
        const capaianValue = parseFloat(capaian);
        if (isNaN(targetValue) && isNaN(capaianValue)) {
            if (capaian === "tidak ada") return 0
            else if (capaian === "ada") return 100
        } else {
            return ((capaianValue/targetValue)*100).toFixed(2)
        }
    }

    const handleCapaianModal = () => {
        setCapaianModal(!capaianModal);
    }

    const handleTargetCapaianModal = async (kd_indikator, kd_subindikator = 0) => {
        await fetchTargetCapaianForm(kd_indikator, kd_subindikator);
    }

    useEffect(() => {
        fetchAllInstansis();
        fetchRole();
    }, [])
    
    useEffect(() => {
        if (targetCapaianModal === false || capaianModal === false) fetchDetail(kode_indikator, kode_subindikator)
    }, [targetCapaianModal, capaianModal])

    useEffect(() => {
        if (detail.id != undefined) fetchTargetCapaian(detail.id)
    }, [detail])

    // console.log(capaian);

    return (
        <DashboardLayout>
            { isLoading && (<Loading />) }
            <div className="flex flex-col gap-4 p-6 border-2 border-green-900 rounded-md">
                <Modal isOpen={capaianModal} setIsOpen={setCapaianModal}>
                    <EditCapaian 
                        targetCapaianId={targetCapaian.id}
                        capaian={capaian ? capaian : ''}
                        files={capaian ? capaian.files : []} />
                </Modal>
                <Modal isOpen={targetCapaianModal} setIsOpen={setTargetCapaianModal}>
                    <EditTargetCapaian instansis={instansis} targetCapaian={targetCapaianForm} />
                </Modal>
                <h1 className="font-semibold">Indikator {indikator.kode}</h1>
                <p className="text-sm text-justify">{indikator.kriteria}</p>
                {
                    subindikator && (
                        <p className="text-sm text-justify">{subindikator.kode}. {subindikator.kriteria}</p>
                    )
                } 
                <hr />
                <table className="table px-2 border-2 border-slate-200 border-separate rounded-sm border-spacing-y-4 text-sm">
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
                            <th className="text-left">Baseline (2022)</th>
                            <td colSpan={2}>2.18</td>
                        </tr>
                        {
                            detail.rumus != undefined && (
                                <tr>
                                    <th className="text-left">Rumus</th>
                                    <td colSpan={2}>
                                        <MathDisplay formula={detail.rumus} />
                                    </td>
                                </tr>   
                            )
                        }
                        {
                            detail.variabel != undefined && (
                                <tr>
                                    <th className="align-top text-left">Keterangan Rumus</th>
                                    <td colSpan={2}>
                                        <ul>
                                            {
                                                Object.entries(JSON.parse(detail.variabel)).map(([key, value]) => (
                                                    <li key={key}><strong>{key}</strong> = {value}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                </tr>
                            )
                        }
                        <tr>
                            <th className="align-top text-left">Instansi Pelaksana</th>
                            <td colSpan={2}>
                                <ul>
                                    {
                                        units != false ?
                                        units.map((unit, index) => (
                                            <li key={index}>{unit}</li>
                                        )) : (<li>-</li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th className="align-top text-left">Dokumen Pendukung</th>
                            <td colSpan={2}>
                                <ul className="flex flex-col gap-2">
                                    {
                                        files != false ? 
                                        files.map((file, index) => (
                                            <li key={index} className="font-medium text-sky-500 hover:text-gray-400 transition-all ease-in ease-out cursor-pointer">
                                                <Link rel="preload" href={file.url} as={file.url}>{file.nama_file_asli}</Link>
                                            </li>
                                        )) : (<li>-</li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 className="p-2 font-medium border rounded border-green-900 text-center">Target / Capaian / %Capaian / Status</h1>
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
                            <td>{capaian ? calculatePercentage(capaian.capaian, targetCapaian.target) : '-'}</td>
                            <td>pending</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="flex gap-6">
                    <button 
                        className={`flex flex-1 items-center min-w-[240px] justify-center gap-3 bg-yellow-300 py-2.5 rounded-sm text-black text-sm hover:text-yellow-300 hover:bg-white hover:ring-2 hover:ring-yellow-300 ${role === 'admin' ? '' : 'hidden'} transition-all ease-in ease-out`}
                        onClick={() => handleTargetCapaianModal(kode_indikator, kode_subindikator)}
                        disabled={role === 'admin' ? false : true} >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Atur Target Capaian</span>
                    </button>
                    <button 
                        className="flex flex-1 items-center min-w-[240px] justify-center gap-3 bg-sky-500 py-2.5 rounded-sm text-white text-sm hover:text-sky-500 hover:bg-white hover:ring-2 hover:ring-sky-500 disabled:bg-slate-300 disabled:hover:ring-0 disabled:hover:text-white transition-all ease-in ease-out"
                        onClick={() => handleCapaianModal()}
                        disabled={!targetCapaian && true} >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Atur Capaian</span>
                    </button>   
                </div>                                 
            </div>
        </DashboardLayout>
    )
}