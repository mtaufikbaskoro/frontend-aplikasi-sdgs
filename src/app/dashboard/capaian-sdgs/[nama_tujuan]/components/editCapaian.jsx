import { useForm } from 'react-hook-form'

export default function EditCapaian () {
    const { register, handleSubmit, watch } = useForm();

    const dokumen1FileUpload = watch('dokumen1')
    const dokumen2FileUpload = watch('dokumen2')
    const dokumen3FileUpload = watch('dokumen3')

    const onSubmit = (data) => {
        const dokumen1File = data.dokumen1[0];
        const dokumen2File = data.dokumen2[0];
        const dokumen3File = data.dokumen3[0];

        console.log('dokumen 1 : ', dokumen1File)
        console.log('dokumen 2 : ', dokumen2File)
        console.log('dokumen 3 : ', dokumen3File)
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
                    {...register('capaian', {required: true})}
                />
            </div>
            <div className='mb-5'>
                <label 
                    className='text-sm font-medium'
                    htmlFor="dokumen1"
                >
                    Dokumen Pendukung 1
                </label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    {...register('dokumen1', {required: true})} 
                />
                {
                    dokumen1FileUpload && dokumen1FileUpload.length > 0 && (
                        <p>Dokumen Pendukung 1 : {dokumen1FileUpload[0].name}</p>
                    )
                }
            </div>
            <div className='mb-5'>
                <label 
                    className='text-sm font-medium'
                    htmlFor="dokumen2"
                >
                    Dokumen Pendukung 2
                </label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    {...register('dokumen2', {required: true})} 
                />
                {
                    dokumen2FileUpload && dokumen2FileUpload.length > 0 && (
                        <p>Dokumen Pendukung 2 : {dokumen2FileUpload[0].name}</p>
                    )
                }
            </div>
            <div className='mb-5'>
                <label htmlFor="dokumen3">Dokumen Pendukung 3</label>
                <input 
                    className="block w-full file:transition-all file:ease-in file:ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-gray-600 file:text-white file:hover:bg-gray-400 file:cursor-pointer text-xs text-gray-400 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                    {...register('dokumen3', {required: true})} 
                />
                {
                    dokumen1FileUpload && dokumen1FileUpload.length > 0 && (
                        <p>Dokumen Pendukung 3 : {dokumen3FileUpload[0].name}</p>
                    )
                }
            </div>
            <div className="mt-8 flex flex-col">
                <button 
                    className="px-4 py-1.5 font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500"
                    type="submit" 
                >
                    Ubah
                </button>
            </div>
        </form>
    )
}