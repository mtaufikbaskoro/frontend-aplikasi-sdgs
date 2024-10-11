'use client';

import { useState } from 'react';

import DashboardLayout from "../components/layout";
import Table from "../components/table";
import Modal from "../components/modal";
import Add from './form/add';
import Edit from './form/edit';
import Confirmation from '@/components/confirmation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import Badge from '@/components/ui/badge';

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
    }
]

const Users = () => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const handleDeleteModal = (id) => {
        setConfirmModal(!confirmModal);
        if (editModal && confirmModal == false) {
            setSelectedId(0)
        } else {
            setSelectedId(id)
        }
    }

    const handleAddModal = () => {
        setAddModal(!addModal);
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
        <>
            <span className="text-lg font-bold">Akun Terdaftar</span>
        </>
    )

    return (
        <>
        <Modal isOpen={addModal} setIsOpen={setAddModal} id={0}><Add /></Modal>
        <Modal isOpen={editModal} setIsOpen={setEditModal} id={selectedId}><Edit /></Modal>
        <DashboardLayout Content={<PageCardContent />}>
            <button type="button" onClick={() => handleAddModal()} className={"flex justify-between items-center px-4 py-2 rounded font-semubold text-white bg-blue-500 w-[240px] transition-all ease-in ease-out hover:bg-white hover:text-blue-500 hover:ring-offset-2 hover:ring-2 hover:ring-blue-500"}>
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
                            <td className="px-6 py-4 flex justify-center">
                                <button onClick={() => handleEditModal(dummy.id)} className="mx-auto" href="/dashboard/capaian-sdgs/detail/1.1">
                                    <FontAwesomeIcon icon={faPencil} color="yellow" />
                                </button>
                                <button onClick={() => handleDeleteModal(dummy.id)} className="mx-auto">
                                    <FontAwesomeIcon icon={faTrash} color="red" />
                                </button>
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