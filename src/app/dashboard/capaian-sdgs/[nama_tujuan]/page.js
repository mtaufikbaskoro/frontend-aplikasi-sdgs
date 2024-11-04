'use client';

import { Fragment, useState, useEffect } from 'react';

import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";
import Breadcrumb from "@/components/ui/breadcrumb";
import Modal from "@/app/dashboard/components/modal";
import DetailIndikator from "./components/detailIndikator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '@/components/ui/button';

import { faEdit, faMagnifyingGlass, faAdd } from '@fortawesome/free-solid-svg-icons';
import AddCapaian from './components/addCapaian';
import EditTargetCapaian from './components/editTargetCapaian';
import EditCapaian from './components/editCapaian';


const tableColumns = ['Kode Indikator', 'Kriteria', 'Keterangan', 'Aksi Detail'];
const dummies = [
    {
        id: 1,
        kode: '1.1',
        deskripsi: 'Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari.',
        indikators: [
            {
                kode_indikator: '1.1.1*',
                deskripsi: "Tingkat kemiskinan ekstrim",
                points: [
                    {
                        nomor: 'a',
                        deskripsi: 'Persentase penduduk yang hidup dibawah garis kemiskinan internasional.',
                        nilai: 'Capaian belum diisi.'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        kode: '1.2',
        deskripsi: 'Pada Tahun 2030, mengurangi setidaknya setengah proporsi laki-laki perempuan dan anak-anak dari semua usia, yang hidup dalam kemiskinan di semua dimensi, sesuai dengan definisi nasional.',
        indikators: [
            {
                kode_indikator: '1.2.1*',
                deskripsi: "Persentase penduduk yang hidup di bawah garis kemiskinan nasional, menurut jenis kelamin dan kelompok umur.",
                nilai: 'Sudah terpenuhi.'
            },
            {
                kode_indikator: '1.2.2*',
                deskripsi: "Persentase laki-laki, perempuan dan anak-anak dari semua usia yang hidup dalam kemiskinan dalam berbagai dimensi sesuai dengan definisi nasional.",
                points: [
                    {
                        nomor: '1.c',
                        deskripsi: 'Persentase penduduk yang mengalami gangguan kesehatan (tingkat morbilitas)',
                        nilai: 'Target belum diisi.'
                    }, 
                    {
                        nomor: '3.a',
                        deskripsi: 'Persentase rumah tangga yang sumber penerangan utamanya bukan listrik',
                        nilai: 'Target belum diisi.'
                    },
                    {
                        nomor: '3.b',
                        deskripsi: 'Persentase rumah tangga tanpa akses pada air minum bersih.',
                        nilai: 'Capaian belum dimasukkan'
                    }
                ]
            }
        ]
    } 

]

export default function Detail({params}) {
    const { nama_tujuan } = params;
    const kode_tujuan = nama_tujuan.split('-')[1];

    const [ detailModal, setDetailModal ] = useState(false);
    const [ editTargetCapaianModal, setEditTargetCapaianModal ] = useState(false);
    const [ editCapaianModal, setEditCapaianModal ] = useState(false);
    const [ selectedId, setSelectedId ] = useState(0);

    useEffect(() => {
        setSelectedId(0);
    }, []);

    const handleDetailModal = (id) => {
        setSelectedId(id);
        setDetailModal(!detailModal);
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

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <Modal isOpen={detailModal} setIsOpen={setDetailModal} id={selectedId}>
                <DetailIndikator editCapaian={editCapaianModal} handleEditCapaianModal={handleEditCapaianModal} />
            </Modal>
            <Modal isOpen={editTargetCapaianModal} setIsOpen={setEditTargetCapaianModal} id={selectedId}>
                <EditTargetCapaian />
            </Modal>
            <Modal isOpen={editCapaianModal} setIsOpen={setEditCapaianModal} id={selectedId}>
                <EditCapaian />
            </Modal>

            <Table columns={tableColumns}>
                {
                    dummies.map((dummy) => (
                        <Fragment key={dummy.id}>
                            <tr key={dummy.id} className='text-left h-12 font-semibold bg-green-700 text-white'>
                                <td className='text-center'>{dummy.kode}</td>
                                <td colSpan={tableColumns.length - 1}>{dummy.deskripsi}</td>
                            </tr>
                            {
                                dummy.indikators.map((indikator, idx) => (
                                    <Fragment key={idx}>
                                    <tr key={idx} className='text-left h-12 font-medium bg-green-200'>
                                        <td className='text-center'>{indikator.kode_indikator}</td>
                                        <td colSpan={!indikator.nilai ? tableColumns.length - 2 : 0}>{indikator.deskripsi}</td>
                                        <td className='text-center'>{indikator.nilai && indikator.nilai}</td>
                                        {indikator.nilai && (
                                            <td>
                                                <div className='grid grid-cols-2 gap-2 py-2'>
                                                    <button onClick={() => handleDetailModal(indikator.kode_indikator)} className="mx-3 bg-sky-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
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
                                        indikator.points !== undefined ? (
                                            <>
                                                {
                                                    indikator.points.map((point, idx) => (
                                                        <tr key={idx} className='text-left h-12 bg-green-100'>
                                                            <td></td>
                                                            <td>{point.nomor}. {point.deskripsi}</td>
                                                            <td className='text-center'>{point.nilai}</td>
                                                            <td className='text-center'>
                                                                <div className='grid grid-cols-2 gap-2 py-2'>
                                                                    <button onClick={() => handleDetailModal(indikator.kode_indikator)} className="mx-3 bg-sky-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
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