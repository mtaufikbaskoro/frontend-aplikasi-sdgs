'use client';

import { Fragment, useState, useEffect } from 'react';

import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";
import Breadcrumb from "@/components/ui/breadcrumb";
import Modal from "@/app/dashboard/components/modal";
import DetailIndikator from "./components/detailIndikator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../components/loading';

import { faEdit, faMagnifyingGlass, faAdd, faCrosshairs, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import EditTargetCapaian from './components/editTargetCapaian';
import EditCapaian from './components/editCapaian';


const tableColumns = ['Kode Indikator', 'Kriteria', 'Status', 'Aksi Detail'];

export default function Detail({params}) {
    const { nama_tujuan } = params;
    const kode_tujuan = nama_tujuan.split('-')[1];
    const [ indikatorsData, setIndikatorsData ] = useState([]);
    const [ detailIndikator, setDetailIndikator ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ detailModal, setDetailModal ] = useState(false);
    const [ editTargetCapaianModal, setEditTargetCapaianModal ] = useState(false);
    const [ editCapaianModal, setEditCapaianModal ] = useState(false);
    const [ selectedId, setSelectedId ] = useState(0);

    const handleFetchIndikators = async (kode) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/sdgs/indikatorsByGoal?kode=${kode}`, {
                method: 'GET',
                headers: {"Content-Type": 'application/json'},
                credentials: 'include'
            })

            if (res.ok) {
                const data = await res.json();
                setIndikatorsData(data.data)
            }

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleFetchIndikators(kode_tujuan);
    }, []);

    useEffect(() => {
        setSelectedId(0);
    }, []);

    const handleDetailModal = async (kd_indikator, kd_subindikator = 0) => {
        try {
            const res = await fetch(`/api/sdgs/detailByKode?kd_indikator=${kd_indikator}&kd_subindikator=${kd_subindikator}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setDetailIndikator(data.data);
            }
        } catch (error) {
            setError(error)
        } finally {
            setDetailModal(!detailModal)
        }
    }

    const handleEditTargetCapaianModal = (id) => {
        if (selectedId != 0) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
        if (detailModal !== false) {
            setDetailModal(false);
        }
        setEditTargetCapaianModal(!editTargetCapaianModal);
    }

    const handleEditCapaianModal = (id) => {
        if (selectedId != 0) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
        if (detailModal === true) {
            setDetailModal(false)
        }

        setEditCapaianModal(!editCapaianModal);
    }

    const PageCardContent = () => (<Breadcrumb>Indikator Tujuan SDGs {'>'} Detail {'>'} {nama_tujuan}</Breadcrumb>)

    if (error) {
        return (<Loading>Error : {error}</Loading>)
    }

    return (
        <DashboardLayout Content={<PageCardContent />}>
            {isLoading && <Loading />}
            <Modal isOpen={detailModal} setIsOpen={setDetailModal}>
                <DetailIndikator handleEditCapaianModal={handleEditCapaianModal} detail={detailIndikator} />
            </Modal>
            <Modal isOpen={editTargetCapaianModal} setIsOpen={setEditTargetCapaianModal} id={selectedId}>
                <EditTargetCapaian />
            </Modal>
            <Modal isOpen={editCapaianModal} setIsOpen={setEditCapaianModal} id={selectedId}>
                <EditCapaian />
            </Modal>

            <Table columns={tableColumns}>
                {
                    indikatorsData.map((dummy) => (
                        <Fragment key={dummy.id}>
                            <tr key={dummy.id} className='text-left h-12 font-semibold bg-green-700 text-white'>
                                <td className='text-center'>{dummy.kode}</td>
                                <td colSpan={tableColumns.length - 1}>{dummy.kriteria}</td>
                            </tr>
                            {
                                dummy.indikators.map((indikator, idx) => (
                                    <Fragment key={idx}>
                                    <tr key={idx} className='text-left h-12 font-medium bg-green-200'>
                                        <td className='text-center'>{indikator.kode}</td>
                                        <td colSpan={!indikator.subindikator.length < 1 ? tableColumns.length - 1 : 0}>{indikator.kriteria}</td>
                                        {
                                            indikator.subindikator.length === 0 && (
                                                <td className='text-center'>{
                                                    indikator.status_target_capaian ? 
                                                    indikator.status_capaian ? <FontAwesomeIcon icon={faCheckCircle} color='blue' /> : <FontAwesomeIcon icon={faExclamationCircle} color='orange' /> 
                                                    : <FontAwesomeIcon icon={faCrosshairs} color='red' />
                                                }</td>
                                            )
                                        }
                                        {indikator.subindikator.length === 0 && (
                                            <td>
                                                <div className='grid grid-cols-2 gap-2 py-2'>
                                                    <button onClick={() => handleDetailModal(indikator.kode)} className="mx-3 bg-sky-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                    </button>
                                                    <button onClick={() => handleEditTargetCapaianModal(indikator.kode_indikator)} className="mx-3 bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                        <FontAwesomeIcon icon={faEdit} color="white" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                    {
                                        indikator.subindikator !== undefined ? (
                                            <>
                                                {
                                                    indikator.subindikator.map((point, idx) => (
                                                        <tr key={idx} className='text-left h-12 bg-green-100'>
                                                            <td></td>
                                                            <td>{point.kode}. {point.kriteria}</td>
                                                            <td className='text-center'>
                                                                {
                                                                point.status_target_capaian ? 
                                                                point.status_capaian ? <FontAwesomeIcon icon={faCheckCircle} color='blue' /> : <FontAwesomeIcon icon={faExclamationCircle} color='orange' /> 
                                                                : <FontAwesomeIcon icon={faCrosshairs} color='red' />
                                                                }
                                                            </td>
                                                            <td className='text-center'>
                                                                <div className='grid grid-cols-2 gap-2 py-2'>
                                                                    <button onClick={() => handleDetailModal(indikator.kode, point.kode)} className="mx-3 bg-sky-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                                    </button>
                                                                    <button onClick={() => handleEditTargetCapaianModal(indikator.kode_indikator)} className="mx-3 bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                                        <FontAwesomeIcon icon={faEdit} color="white" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </>
                                        ) : (<></>)
                                        
                                    }
                                    </Fragment>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </Table>
        </DashboardLayout>
    )
}