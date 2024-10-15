'use client';

import { useForm } from "react-hook-form";
import DashboardLayout from "@/app/dashboard/components/layout";
import Error from "@/components/ui/Error";

const Edit = ({params}) => {
    const {id_input} = params;
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => console.log(data);

    const PageCardContent = () => (
        <>
            <span className="text-lg font-bold">Indikator {'>'} Detail {'>'} {id_input}</span>
        </>
    )

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div className="py-3 px-2 flex flex-col gap-4">
                <div className="font-bold text-2xl">Tujuan 1: Tanpa Kelaparan</div>
                <div>Kode Target : <span className="font-bold">1.1</span></div>
                <div>Kode Indikator : <span className="font-bold">1.1.1.a</span></div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="target" className="block text-md text-green-900 font-bold leading-6 text-black">Target SDGs</label>
                        <div className="mt-2">
                            <input {...register("target", { required:true })} type="number" placeholder="Masukkan nilai target" className="block w-full border border-gray-200 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm" />
                            { errors.target && 
                                <div className='mt-1'> 
                                    <Error>Target tidak boleh kosong.</Error>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="target" className="block text-md text-green-900 font-bold leading-6 text-black">Capaian SDGs</label>
                        <div className="mt-2">
                            <input {...register("capaian", { required:true })} type="number" placeholder="Masukkan nilai capaian" className="block w-full border border-gray-200 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm" />
                            { errors.capaian && 
                                <div className='mt-1'> 
                                    <Error>capaian tidak boleh kosong.</Error>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <label className="block text-md text-green-900 font-bold leading-6 text-black" htmlFor="file_input">Dokumen Pendukung</label>
                        <input className="block w-full transition-all ease-in ease-out mt-2 file:py-3 file:border-none file:px-2 file:mr-2 file:bg-green-950 file:text-white file:font-medium hover:bg-gray-100 text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />
                        <p className="mt-2 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>
                    <div>
                        <button className="flex justify-center items-center gap-4 py-3 mt-12 font-bold text-black bg-yellow-500 w-full transition-all ease-in ease-out hover:bg-white hover:text-yellow-500 hover:ring-offset-2 hover:ring-2 hover:ring-yellow-500" type="submit">Ubah Data</button>
                    </div>
                </form>
            </div> 
        </DashboardLayout>
    )
}


export default Edit;