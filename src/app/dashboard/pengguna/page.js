'use client';

import { useState } from 'react';

import DashboardLayout from "../components/layout";
import Table from "../components/table";
import Modal from "../components/modal";
import Add from './form/add';
import Edit from './form/edit';
import Confirmation from '@/components/confirmation';
import Badge from '@/components/ui/badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPencil, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from '@/components/ui/breadcrumb';


const tableColumns = ['No', 'username', 'password', 'status', 'aksi']

const dummies = [
    {
        id: 1,
        username: 'dinas_pendidikan',
        password: '12345',
        status: 'aktif'
    },
    {
        id: 2,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
    {
        id: 3,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
    {
        id: 4,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
    {
        id: 5,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
    {
        id: 6,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
    {
        id: 7,
        username: 'dinas_kesehatan',
        password: '23456',
        status: 'tidak aktif'
    },
]

const Users = () => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const handleAddModal = () => {setAddModal(!addModal);}

    const handleDeleteModal = (id) => {
        setConfirmModal(!confirmModal);
        if (editModal && confirmModal == false) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
    }

    const handleEditModal = (id) => {
        setEditModal(!editModal);
        if (editModal && confirmModal == false) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
    }


    const PageCardContent = () => (
        <Breadcrumb>
            <div className="w-[360px] font-bold text-xl text-white">Daftar Pengguna</div>
            <p className="mt-4 w-[560px] text-justify text-white text-sm font-medium">Daftar seluruh akun yang terdaftar pada website monitoring dan evaluasi TPB/SDGs</p>
        </Breadcrumb>
    )

    return (
        <>
        <Modal isOpen={addModal} setIsOpen={setAddModal} id={0}><Add /></Modal>
        <Modal isOpen={editModal} setIsOpen={setEditModal} id={selectedId}><Edit /></Modal>
        <DashboardLayout Content={<PageCardContent />}>
            <button type="button" onClick={() => handleAddModal()} className={"flex justify-between items-center px-4 py-2 rounded font-medium text-white bg-blue-500 w-[240px] transition-all ease-in ease-out hover:ring-offset-2 hover:ring-2 hover:ring-black"}>
                    <FontAwesomeIcon icon={faAdd} />
                    <span>Tambah Pengguna</span>
            </button>
            <Confirmation open={confirmModal} setOpen={setConfirmModal} id={selectedId} header="Konfirmasi non-aktifkan akun">Apakah anda yakin akan menonaktifkan akun ?</Confirmation>
            <Table columns={tableColumns}>
                {
                    dummies.map((dummy, idx) => (     
                        <tr key={idx} className="bg-white border-b">
                            <td scope="row" className="font-bold whitespace-nowrap">
                                {idx+1}
                            </td>
                            <td className="px-6 py-4">
                                {dummy.username}
                            </td>
                            <td className="px-6 py-4">
                                {dummy.password}
                            </td>
                            <td className="px-6 py-4">
                                <Badge color={ dummy.status == 'aktif' ? 'bg-primary' : 'bg-danger'}>
                                    {dummy.status}
                                </Badge>
                            </td>
                            <td>
                                <div className="flex justify-evenly">
                                    <button onClick={() => handleEditModal(dummy.id)} className="bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out" href="/dashboard/capaian-sdgs/detail/1.1">
                                        <FontAwesomeIcon icon={faPencil} color="white" />
                                    </button>
                                    <button onClick={() => handleDeleteModal(dummy.id)} className="bg-red-500 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                        <FontAwesomeIcon icon={faTrash} color="white" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </DashboardLayout>
        </>
    )
}

export default Users;