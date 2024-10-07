'use client';

import { useForm } from "react-hook-form";

const { default: DashboardLayout } = require("../../components/layout")

const PageCardContent = () => (
    <>
        <span className="text-lg font-bold">Indikator {'>'} Tambah</span>
    </>
)

const AddCapaianSDGs = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => console.log(data);

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
                                    <Alert>Target tidak boleh kosong.</Alert>
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
                                    <Alert>capaian tidak boleh kosong.</Alert>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="target" className="block text-md text-green-900 font-bold leading-6 text-black">Dokumen Pendukung</label>
                        <div className="mt-2">
                            <input type="file" name="proof" id="proof" />
                        </div>
                    </div>
                    <div>
                        <button className="flex justify-center items-center gap-4 px-4 py-2 mt-12 font-bold text-white bg-blue-500 w-full transition-all ease-in ease-out hover:bg-white hover:text-blue-500 hover:ring-offset-2 hover:ring-2 hover:ring-blue-500" type="submit">Masukkan Data</button>
                    </div>
                </form>
            </div> 
        </DashboardLayout>
    )
}

export default AddCapaianSDGs;