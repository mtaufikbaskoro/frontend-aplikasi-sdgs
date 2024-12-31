'use client';
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import Alert from '@/components/ui/alert';
import Link from 'next/link';

export default function EditCapaian (props) {
    const [ showAlert, setShowAlert ] = useState(false);
    const [ api, setApi ] = useState(''); 
    const [ oldFiles, setOldFiles ] = useState([]);
    const { targetCapaianId, capaian, files } = props;
    const { register, handleSubmit, formState: {errors}, setError, clearErrors } = useForm();
    const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

    useEffect(() => {
        setApi(capaian != false ? `/api/sdgs/capaian/update?capaianId=${capaian.id}` : `/api/sdgs/capaian/post`)
        setOldFiles(files != false ? files : [])
    }, [capaian, files])

    const handleFileChange = (e, fieldName, maxFileSize = MAX_FILE_SIZE) => {
        const files = e.target.files;
        if (files.length > 0 && files[0].size > maxFileSize) {
            setError(fieldName, {
                type: 'manual',
                message: 'File tidak boleh lebih dari 1MB'
            })
            return
        }

        clearErrors(fieldName)
    }

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('sdgs_target_capaian_id', data.sdgs_target_capaian_id)
        formData.append('capaian', data.capaian)
        if (data.file1[0]) formData.append('file1', data.file1[0])
        if (data.file2[0]) formData.append('file2', data.file2[0])
        if (data.file3[0]) formData.append('file3', data.file3[0])

        try {
            const response = await fetch(api, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                const data = await response.json()   
                setShowAlert(data.success);
            }
        } catch (err) {
            console.error('Error uploading files: ', err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <h2 className='font-semibold text-center text-xl'>Atur Capaian</h2>
            <hr className='my-5' />
            <input 
                className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-slate-400 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                type="text"
                defaultValue={targetCapaianId}
                {...register('sdgs_target_capaian_id')}
                hidden
            />
            <div className='mb-5 flex flex-col gap-3'>
                <label
                    className='text-sm font-medium' 
                    htmlFor="capaian"
                >
                    Angka Capaian
                </label>
                <input 
                    className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-slate-400 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                    type="text"
                    placeholder='Masukkan capaian...'
                    defaultValue={capaian ? capaian.capaian : ''}
                    {...register('capaian', {required: 'Capaian belum diisi'})}
                />
                {errors.capaian && <p className='pl-2 text-xs text-red-400'>{errors.capaian.message}</p>}
            </div>
            <div className='mb-5'>
                <label 
                    className='text-sm font-medium'
                    htmlFor="file1"
                >
                    Dokumen Pendukung 1
                </label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    accept='application/pdf'
                    {...register('file1')}
                    onChange={(e) => handleFileChange(e, 'file1')} 
                />
                {errors.file1 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file1.message}</p>}
                {
                    oldFiles[0] && (
                        <div className='text-xs mt-2'>
                            <span>Dokumen Sebelumnya : </span> 
                            <Link 
                                className='text-blue-500 hover:underline' 
                                rel='preload' 
                                as={oldFiles[0].url} 
                                href={oldFiles[0].url} >
                                    {oldFiles[0].nama_file_asli}
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className='mb-5'>
                <label 
                    className='text-sm font-medium'
                    htmlFor="file2"
                >
                    Dokumen Pendukung 2
                </label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    accept='application/pdf'
                    {...register('file2')}
                    onChange={(e) => handleFileChange(e, 'file2')}
                />
                {errors.file2 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file2.message}</p>}
                {
                    oldFiles[1] && (
                        <div className='text-xs mt-2'>
                            <span>Dokumen Sebelumnya : </span> 
                            <Link 
                                className='text-blue-500 hover:underline' 
                                rel='preload' 
                                as={oldFiles[1].url} 
                                href={oldFiles[1].url} >
                                    {oldFiles[1].nama_file_asli}
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className='mb-5'>
                <label htmlFor="file3">Dokumen Pendukung 3</label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    accept='application/pdf'
                    {...register('file3')}
                    onChange={(e) => handleFileChange(e, 'file3')}
                />
                {errors.file3 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file3.message}</p>}
                {
                    oldFiles[2] && (
                        <div className='text-xs mt-2'>
                            <span>Dokumen Sebelumnya : </span> 
                            <Link 
                                className='text-blue-500 hover:underline' 
                                rel='preload' 
                                as={oldFiles[2].url} 
                                href={oldFiles[2].url} >
                                    {oldFiles[2].nama_file_asli}
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="mt-8 flex flex-col">
                <button 
                    className="px-4 py-1.5 font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500 disabled:bg-slate-400 disabled:text-white disabled:hover:ring-0"
                    type="submit" 
                    disabled={Object.keys(errors).length > 0}
                >
                    Ubah
                </button>
            </div>
            {showAlert && (
                <Alert
                    className={`${showAlert ? 'opacity-100' : 'opacity-0'} transition-all ease-in ease-out`}
                    message="Data saved successfully!"
                    type="success"
                    onClose={() => setShowAlert(false)} />
            )}
        </form>
    )
}