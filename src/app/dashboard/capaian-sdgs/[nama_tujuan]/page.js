'use client';

import { Fragment, useState, useEffect } from 'react';

import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";
import Breadcrumb from "@/components/ui/breadcrumb";
import Modal from "@/app/dashboard/components/modal";
import DetailIndikator from "./components/detailIndikator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AddCapaian from './components/addCapaian';


const tableColumns = ['Kode Indikator', 'Kriteria', 'Capaian', 'Aksi'];
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
                        deskripsi: 'Persentase penduduk yang hidup dibawah garing kemiskinan internasional.',
                        nilai: 2.3
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
                nilai: 1.9
            },
            {
                kode_indikator: '1.2.2*',
                deskripsi: "Persentase laki-laki, perempuan dan anak-anak dari semua usia yang hidup dalam kemiskinan dalam berbagai dimensi sesuai dengan definisi nasional.",
                points: [
                    {
                        nomor: '1.c',
                        deskripsi: 'Persentase penduduk yang mengalami gangguan kesehatan (tingkat morbilitas)',
                        nilai: 1.1
                    }, 
                    {
                        nomor: '3.a',
                        deskripsi: 'Persentase rumah tangga yang sumber penerangan utamanya bukan listrik',
                        nilai: 8.2
                    },
                    {
                        nomor: '3.b',
                        deskripsi: 'Persentase rumah tangga tanpa akses pada air minum bersih.',
                        nilai: 2.1
                    }
                ]
            }
        ]
    } 

]

export default function Detail({params}) {
    const { nama_tujuan } = params;
    const [ detailModal, setDetailModal ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ selectedId, setSelectedId ] = useState(0);

    useEffect(() => {
        setSelectedId(0);
    }, []);

    const handleDetailModal = (id) => {
        setSelectedId(id);
        setDetailModal(!detailModal);
    }

    const handleAddModal = (id) => {
        if (selectedId != 0) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
        setAddModal(!addModal);
    }

    const PageCardContent = () => (<Breadcrumb>Indikator Tujuan SDGs {'>'} Detail {'>'} {nama_tujuan}</Breadcrumb>)

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <Modal isOpen={detailModal} setIsOpen={setDetailModal} id={selectedId}>
                <DetailIndikator />
            </Modal>
            <Modal isOpen={addModal} setIsOpen={setAddModal} id={selectedId}>
                <AddCapaian />
            </Modal>
            <Table columns={tableColumns}>
                {
                    dummies.map((dummy) => (
                        <Fragment key={dummy.id}>
                            <tr key={dummy.id} className='text-left h-12 font-semibold bg-green-200'>
                                <td className='text-center'>{dummy.kode}</td>
                                <td>{dummy.deskripsi}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            {
                                dummy.indikators.map((indikator, idx) => (
                                    <Fragment key={idx}>
                                    <tr key={idx} className='text-left h-12 font-medium bg-green-100'>
                                        <td className='text-center'>{indikator.kode_indikator}</td>
                                        <td>{indikator.deskripsi}</td>
                                        <td className='text-center'>{indikator.nilai ? indikator.nilai : ''}</td>
                                        <td className='text-center'>
                                            {indikator.nilai ? (
                                                <div className='flex'>
                                                    <button onClick={() => handleDetailModal(indikator.kode_indikator)} className="mx-auto bg-green-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                    </button>
                                                    <button onClick={() => handleAddModal(indikator.kode_indikator)} className="mx-auto bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                        <FontAwesomeIcon icon={faEdit} color="white" />
                                                    </button>
                                                </div>
                                            ) : (<></>)}
                                        </td>
                                    </tr>
                                    {
                                        indikator.points !== undefined ? (
                                            <>
                                                {
                                                    indikator.points.map((point, idx) => (
                                                        <tr key={idx} className='text-left h-12'>
                                                            <td></td>
                                                            <td>{point.nomor}. {point.deskripsi}</td>
                                                            <td className='text-center'>{point.nilai}</td>
                                                            <td className='text-center'>
                                                                <div className='flex justify-evenly'>
                                                                    <button onClick={() => handleDetailModal(indikator.kode_indikator)} className="bg-green-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                                    </button>
                                                                    <button onClick={() => handleAddModal(indikator.kode_indikator)} className="bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
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