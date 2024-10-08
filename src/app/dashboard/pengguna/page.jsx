'use client';

import React from 'react';
import { useState } from 'react';
import DashboardLayout from "../components/layout";
import Table from "../components/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/modal";
import Add from './form/add';

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
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal)
    }

    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Akun Terdaftar</span>
        </>
    )

    return (
        <>
        <Modal isOpen={modal} setIsOpen={setModal}><Add></Add></Modal>
        <DashboardLayout Content={<PageCardContent />}>
            <button type="button" onClick={() => handleModal()} className={"flex justify-between items-center px-4 py-2 rounded font-semubold text-white bg-blue-500 w-[240px] transition-all ease-in ease-out hover:bg-white hover:text-blue-500 hover:ring-offset-2 hover:ring-2 hover:ring-blue-500"}>
                    <FontAwesomeIcon icon={faAdd} />
                    <span>Tambah Pengguna</span>
            </button>
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
                                {dummy.status}
                            </td>
                            <td className="px-6 py-4 flex justify-center gap-1">
                                <Link className="mx-auto" href="/dashboard/capaian-sdgs/detail/1.1">
                                    <FontAwesomeIcon icon={faPencil} color="yellow" />
                                </Link>
                                <Link className="mx-auto" href="/dashboard/capaian-sdgs/detail/1.1">
                                    <FontAwesomeIcon icon={faTrash} color="red" />
                                </Link>
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