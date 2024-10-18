
import { useForm } from 'react-hook-form';

import Alert from '@/components/ui/alert';

export default function AddCapaian () {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-6">
            <h4 className="font-semibold text-center text-xl">Update Capaian</h4>
            <hr className='mt-5' />
            <div className="mt-4 flex flex-col gap-4">
                <label htmlFor="capaian">Target</label>
                <input {...register("capaian", {required: true, })} placeholder="Masukkan capaian dari indikator" className="border border-gray-300 rounded p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out" />
                { errors.capaian &&
                    <div className='mt-2'> 
                        <Alert>Capaian tidak boleh kosong.</Alert>
                    </div>
                }
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <label htmlFor="file_input">Dokumen Pendukung</label>
                <input className="block w-full transition-all ease-in ease-out file:py-3 file:border-none file:px-2 file:mr-2 file:bg-blue-500 hover:file:bg-gray-200 file:text-white file:font-medium text-sm text-gray-400 border border-gray-300 rounded bg-gray-50 focus:outline-none file:cursor-pointer file:transition-all file:ease-in file:ease-out" id="file_input" name='file_input' type="file" />
            </div>
            <div className="mt-8 flex flex-col">
                <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer hover:text-blue-500 hover:bg-white hover:ring-offset-2 hover:ring-2 hover:ring-blue-500 transition-all ease-in ease-out">Update</button>
            </div>
        </form>
    )
}
