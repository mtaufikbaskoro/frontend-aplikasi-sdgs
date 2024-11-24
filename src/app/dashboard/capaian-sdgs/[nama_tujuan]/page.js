'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import DashboardLayout from "@/app/dashboard/components/layout";
import Table from "@/app/dashboard/components/table";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCrosshairs, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@/components/ui/tooltip';


const tableColumns = ['Kode Indikator', 'Kriteria', 'Status', 'Aksi Detail'];

export default function Detail({params}) {
    const router = useRouter();
    const { nama_tujuan } = params;
    const kode_tujuan = nama_tujuan.split('-')[1];

    if (kode_tujuan === undefined) router.push('/404')

    const [ indikatorsData, setIndikatorsData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleFetchIndikators = async (kode) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/sdgs/indikatorsByGoal?kode=${kode}`, {
                method: 'GET',
                headers: {"Content-Type": 'application/json'},
                credentials: 'include'
            })

            if (res.ok) {
                const { data, error } = await res.json();
                if (!error) setIndikatorsData(data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const getInfo = (targetCapaianStatus, capaianStatus) => {
        if (targetCapaianStatus) {
            if (capaianStatus) return 'Data telah selesai diinput'
            else return 'Capaian belum diinput'
        } else {
            return 'Target belum diinput'
        }
    } 

    useEffect(() => {
        handleFetchIndikators(kode_tujuan);
    }, []);

    return (
        <DashboardLayout>
            <Table columns={tableColumns}>
                {
                    indikatorsData.length > 0 ?
                    indikatorsData.map((dummy) => (
                        <Fragment key={dummy.id}>
                            <tr key={dummy.id} className='text-left h-14 font-semibold bg-green-700 text-white'>
                                <td className='text-center'>{dummy.kode}</td>
                                <td colSpan={tableColumns.length - 2}>{dummy.kriteria}</td>
                                <td></td>
                            </tr>
                            {
                                dummy.indikators.map((indikator, idx) => (
                                    <Fragment key={idx}>
                                    <tr key={idx} className='text-left h-14 font-medium bg-green-200'>
                                        <td className='text-center'>{indikator.kode}</td>
                                        <td colSpan={!indikator.subindikator.length < 1 ? tableColumns.length - 2 : 0}>{indikator.kriteria}</td>
                                        {!indikator.subindikator.length < 1 && <td></td>}
                                        {
                                            indikator.subindikator.length === 0 && (
                                                    <td className='text-center'>  
                                                        <Tooltip text={getInfo(indikator.target_capaian_status, indikator.capaian_status)}>
                                                        {
                                                            indikator.target_capaian_status ? 
                                                            indikator.capaian_status ? <FontAwesomeIcon icon={faCheckCircle} color='green' /> : <FontAwesomeIcon icon={faExclamationCircle} color='orange' /> 
                                                            : <FontAwesomeIcon icon={faCrosshairs} color='red' />
                                                        }
                                                        </Tooltip>
                                                    </td>
                                            )
                                        }
                                        {indikator.subindikator.length === 0 && (
                                            <td className='text-center'>
                                                <div className='py-2'>
                                                    <Link href={`/dashboard/capaian-sdgs/${nama_tujuan}/${indikator.kode}/0`} className="mx-auto bg-sky-300 px-2 py-1 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                    </Link>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                    {
                                        indikator.subindikator !== undefined ? (
                                            <>
                                                {
                                                    indikator.subindikator.map((point, idx) => (
                                                        <tr key={idx} className='text-left h-14 bg-green-100'>
                                                            <td></td>
                                                            <td>{point.kode}. {point.kriteria}</td>
                                                            <td className='text-center'>
                                                                <Tooltip text={getInfo(point.target_capaian_status, point.capaian_status)}>
                                                                {
                                                                    point.target_capaian_status ? 
                                                                    point.capaian_status ? <FontAwesomeIcon icon={faCheckCircle} color='green' /> : <FontAwesomeIcon icon={faExclamationCircle} color='orange' /> 
                                                                    : <FontAwesomeIcon icon={faCrosshairs} color='red' />
                                                                }
                                                                </Tooltip>
                                                            </td>
                                                            <td className='text-center'>
                                                                <div className='py-2'>
                                                                    <Link href={`/dashboard/capaian-sdgs/${nama_tujuan}/${indikator.kode}/${point.kode}`} className="mx-auto bg-sky-300 px-2 py-1 rounded-sm hover:ring-offset-0.5 hover:ring-2 hover:ring-green-950 transition-all ease-in ease-out">
                                                                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                                                                    </Link>
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
                    )) : (<tr className='text-center h-12 font-semibold bg-green-50'><td colSpan={tableColumns.length}>{isLoading ? 'Memuat data...' : 'Tidak ada data'}</td></tr>)
                }
            </Table>
        </DashboardLayout>
    )
}