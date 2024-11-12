'use client';

import DashboardLayout from "@/app/dashboard/components/layout";
import Loading from "@/app/dashboard/components/loading";
import Breadcrumb from "@/components/ui/breadcrumb";
import MathDisplay from "@/components/ui/mathdisplay";
import Modal from "@/app/dashboard/components/modal";
import EditCapaian from "../../components/editCapaian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


export default function Detail ({ params }) {
    const {nama_tujuan, kode_indikator, kode_subindikator} = params;
    const [indikator, setIndikator] = useState({});
    const [subindikator, setSubindikator] = useState({});
    const [detail, setDetail] = useState({});
    const [targetCapaian, setTargetCapaian] = useState({});
    const [capaian, setCapaian] = useState({});
    const [units, setUnits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [capaianModal, setCapaianModal] = useState(false);

    const fetchData = async (kd_indikator, kd_subindikator = 0) => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/sdgs/detailIndikator?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
    
            if (res.ok) {
                const data = await res.json();
                setIndikator(data.data.indikator);
                setDetail(data.data.detail);
                setTargetCapaian(data.data.target_capaian);
                setCapaian(data.data.capaian)
                setUnits(data.data.units);
                setSubindikator(data.data.subindikator);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCapaianModal = () => {
        setCapaianModal(!capaianModal);
    }
    
    useEffect(() => {
        fetchData(kode_indikator, kode_subindikator)
    }, [])

    const PageCardContent = () => (<Breadcrumb>Indikator Tujuan SDGs {'>'} Detail {'>'} {nama_tujuan} {'>'} {kode_indikator}</Breadcrumb>)

    return (
        <DashboardLayout Content={<PageCardContent />}>
            { isLoading && (<Loading />) }
            <div className="flex flex-col gap-4">
                <Modal isOpen={capaianModal} setIsOpen={setCapaianModal}>
                    <EditCapaian />
                </Modal>
                <h1 className="font-semibold">Indikator {indikator.kode}</h1>
                <p className="text-sm text-justify">{indikator.kriteria}</p>
                {
                    subindikator && (
                        <p className="text-sm text-justify">{subindikator.kode}. {subindikator.kriteria}</p>
                    )
                } 
                <hr />
                <table className="table border-separate border-spacing-y-4 text-sm">
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
                                        units &&
                                        units.map((unit, index) => (
                                            <li key={index}>{unit}</li>
                                        ))
                                    }
                                </ul>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>
                                <button className="font-medium text-sky-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 1</button>
                            </td>
                            <td>
                                <button className="font-medium text-sky-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 2</button>
                            </td>
                            <td>
                                <button className="font-medium text-sky-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 3</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 className="p-2 font-medium border rounded border-green-900 text-center">Target / Capaian / %Capaian / Status</h1>
                <hr />
                <table className="table text-sm text-center">
                    <thead>
                        <tr>
                            <th>Target ({targetCapaian ? targetCapaian.tahun : ''})</th>
                            <th>Capaian ({targetCapaian ? targetCapaian.tahun : ''})</th>
                            <th>% Capaian</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{targetCapaian ? targetCapaian.target : 'Belum ada target'}</td>
                            <td>{capaian ? capaian.capaian : 'Belum ada capaian'}</td>
                            <td>170.73</td>
                            <td>pending</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button 
                    className="flex items-center justify-center gap-3 bg-sky-500 py-2.5 rounded-sm text-white text-sm hover:text-sky-500 hover:bg-white hover:ring-2 hover:ring-sky-500 transition-all ease-in ease-out"
                    onClick={() => handleCapaianModal()}
                >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Atur Capaian</span>
                </button>
            </div>
        </DashboardLayout>
    )
}