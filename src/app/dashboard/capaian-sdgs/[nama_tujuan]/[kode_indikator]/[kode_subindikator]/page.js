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
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [capaianModal, setCapaianModal] = useState(false);

    const fetchDetail = async (kd_indikator, kd_subindikator = 0) => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/sdgs/detailByKode?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
    
            if (res.ok) {
                res.json().then(data => setDetail(data.data))
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
        fetchDetail(kode_indikator, kode_subindikator)
    }, [])

    const PageCardContent = () => (<Breadcrumb>Indikator Tujuan SDGs {'>'} Detail {'>'} {nama_tujuan} {'>'} {kode_indikator}</Breadcrumb>)

    return (
        <DashboardLayout Content={<PageCardContent />}>
            { isLoading && (<Loading />) }
            <div className="flex flex-col gap-4">
                <Modal isOpen={capaianModal} setIsOpen={setCapaianModal}>
                    <EditCapaian />
                </Modal>
                <h1 className="font-semibold">Indikator {detail.kode_indikator}</h1>
                <p className="text-sm text-justify">{detail.indikator_kriteria}</p> 
                {
                    kode_subindikator !== 0 && (
                        <p className="text-sm text-justify">{detail.kode_subindikator}. {detail.subindikator_kriteria}</p>
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
                                    <li>Dinas Pendidikan</li>
                                    <li>Dinas Pendidikan</li>
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
                            <th>Target ({detail.target_capaian ? detail.target_capaian.tahun : ''})</th>
                            <th>Capaian</th>
                            <th>% Capaian</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{detail.target_capaian ? detail.target_capaian.target : 'Belum ada target'}</td>
                            <td>1.23</td>
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