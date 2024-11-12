'use client';
import { useForm } from 'react-hook-form'

export default function EditCapaian () {
    const { register, handleSubmit, formState: {errors}, setError, clearErrors, setValue } = useForm();
    const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

    const handleFileChange = (e, fieldName, maxFileSize = MAX_FILE_SIZE) => {
        const files = e.target.files;

        if (files.length > 1) {
            setError(fieldName, {
                type: 'manual',
                message: 'Hanya boleh satu file per box input.'
            })
            return
        }

        if (files.length > 0 && files[0].size > maxFileSize) {
            setError(fieldName, {
                type: 'manual',
                message: 'File tidak boleh lebih dari 1MB'
            })
            return
        }

        clearErrors(fieldName)
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        console.log(data.capaian)

        formData.append('capaian', data.capaian);

        if (data.file1?.[0]) formData.append('files[]', data.file1[0], data.file1[0].name)
        if (data.file2?.[0]) formData.append('files[]', data.file2[0], data.file2[0].name)
        if (data.file3?.[0]) formData.append('files[]', data.file3[0], data.file3[0].name)
        

        for (let pair of formData.entries()) {
            const key = pair[0]
            const value = pair[1]

            if (value instanceof File) {
                console.log(`${key} : ${value.name}`)
            } else {
                console.log(`${key} : ${value}`)
            }
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='font-semibold text-center text-xl'>Atur Capaian</h2>
            <hr className='my-5' />
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
                    {...register('file1')}
                    onChange={(e) => handleFileChange(e, 'file1')} 
                />
                {errors.file1 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file1.message}</p>}
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
                    {...register('file2')}
                    onChange={(e) => handleFileChange(e, 'file2')}
                />
                {errors.file2 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file2.message}</p>}
            </div>
            <div className='mb-5'>
                <label htmlFor="file3">Dokumen Pendukung 3</label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    {...register('file3')}
                    onChange={(e) => handleFileChange(e, 'file3')}
                />
                {errors.file3 && <p className='pl-2 mt-2 text-xs text-red-400'>{errors.file3.message}</p>}
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
        </form>
    )
}