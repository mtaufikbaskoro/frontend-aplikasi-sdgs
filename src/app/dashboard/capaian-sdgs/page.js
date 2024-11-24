'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import DashboardLayout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import Loading from "../components/loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock, faTimes, faPrint } from "@fortawesome/free-solid-svg-icons";


const ITEMS_PER_PAGE = 5;
const TableColumns = ['', 'Nama Tujuan', 'Status', ''];

export default function CapaianSdgs () {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGoals = async (page) => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/sdgs?page=${page}&limit=${ITEMS_PER_PAGE}`, {
                    method: 'GET',
                    headers: {"Content-Type": 'application/json'},
                    credentials: 'include'
                })
        
                if (res.ok) {
                    const { data } = await res.json()
                    setItems(data.items)
                    setTotalPages(Math.ceil(data.totalItems / ITEMS_PER_PAGE))

                }
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchGoals(currentPage)
    }, [currentPage])


    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const createSlug = (kode, nama) => {
        let slug = `tujuan-${kode}-${nama.replace(/,/g, "").replace(/ /g, "-")}`
        return slug
    }

    const handleStatusIcon = (status) => {
        if (status == 2) {
            return <FontAwesomeIcon icon={faClock} color="orange" />;
        } else if (status == 1) {
            return <FontAwesomeIcon icon={faCheck} color="green" />;
        } else if (status == 3) {
            return <FontAwesomeIcon icon={faTimes} color="red" />;
        }
    }

    if (error) {
        return (<Loading>Error : {error}</Loading>)
    }

    return (
        <DashboardLayout>
            <div className="overflow-x-auto">
                <Table columns={TableColumns}>
                    {
                        items.length > 0 ?
                        items.map(dummy => (
                            <tr key={dummy.id} className={`border-b ${dummy.id % 2 == 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <Image src={`/assets/img/sdgs_icons/E_SDG_PRINT-${dummy.kode}.jpg`} width={56} height={56} alt="goal image" />
                                    </div>
                                </td>
                                <td scope="row" className="px-6 py-4">
                                    <div className="font-bold flex flex-col justify-center items-start gap-2">
                                        <Link href={`/dashboard/capaian-sdgs/${createSlug(dummy.kode, dummy.nama)}`} className="hover:underline">{dummy.kode}. {dummy.nama.toUpperCase()}</Link>
                                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                                            <div className="bg-blue-400 h-2.5 rounded-full" style={{width: '45%'}}></div>
                                        </div>
                                        <span className="font-light text-xs">Progress : 45%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {handleStatusIcon(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <Link className="mx-auto bg-gray-200 px-1 py-0.5 rounded-sm hover:bg-white hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out" href="/dashboard/capaian-sdgs/detail/1.1">
                                            <FontAwesomeIcon icon={faPrint} />
                                        </Link>
                                        {/* <Link className="mx-auto bg-yellow-300 px-1 py-0.5 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out" href="/dashboard/capaian-sdgs/detail/1.1">
                                            <FontAwesomeIcon icon={faEdit} color="white" />
                                        </Link> */}
                                    </div>
                                </td>
                            </tr>
                        )) : (<tr className='text-center h-12 font-semibold bg-green-50'><td colSpan={TableColumns.length}>{isLoading ? 'Memuat data...' : 'tidak ada data'}</td></tr>)
                    }
                </Table>
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}
