'use client';

import { Input, Textarea, Select } from "@headlessui/react";
import DashboardLayout from "../../../components/layout"
import { useForm, Controller } from "react-hook-form";


export default function Validate ({params}) {
    const {id_input} = params
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            target: 4.1,
            capaian: 9.1,
            inputStatus: {},
            catatanPerbaikan: "",
        }
    })
    const onSubmit = (data) => console.log(data);

    const PageCardContent = () => (<span className="text-lg font-bold">Indikator {'>'} Validasi {'>'} {id_input}</span>)

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
                        <Controller 
                            name="target"
                            control={control}
                            render={({ field }) => <Input 
                                                        {...field}
                                                        className="mt-2 block w-full text-sm font-medium border border-gray-200 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400"
                                                        disabled />
                                    }
                        />
                    </div>
                    <div>
                        <label htmlFor="capaian" className="block text-md text-green-900 font-bold leading-6 text-black">Target SDGs</label>
                        <Controller 
                            name="capaian"
                            control={control}
                            render={({ field }) => <Input 
                                                        {...field}
                                                        className="mt-2 block w-full text-sm font-medium border border-gray-200 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400"
                                                        disabled />
                                    }
                        />
                    </div>
                    <div>
                        <label className="block text-md text-green-900 font-bold leading-6 text-black" htmlFor="file_input">Dokumen Pendukung</label>
                        <div className="mt-2 text-blue-500 text-sm hover:underline cursor-pointer">dokumen.pdf</div>
                    </div>
                    <div>
                        <label htmlFor="inputStatus" className="block text-md text-green-900 font-bold leading-6 text-black">Status</label>
                        <Controller 
                            name="inputStatus"
                            control={control}
                            render={({ field }) => (<>
                                                        <Select 
                                                            name="inputStatus" 
                                                            id="inputStatus"
                                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            {...field}
                                                        >
                                                            <option selected>Pilih status</option>
                                                            <option value="1">Diterima</option>
                                                            <option value="2">Menunggu perbaikan</option>
                                                            <option value="3">Ditolak</option>
                                                        </Select>
                                                    </>)
                                    }
                        />
                    </div>
                    <div>
                        <label htmlFor="catatanPerbaikan" className="block text-md text-green-900 font-bold leading-6 text-black">Catatan Perbaikan</label>
                        <Controller 
                            name="catatanPerbaikan"
                            control={control}
                            render={({ field }) => <Textarea 
                                                        {...field}
                                                        className="mt-2 p-2 block w-full text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400"
                                                    />
                                    }
                        />
                    </div>
                    <div>
                        <button className="mt-12 px-4 py-2 flex justify-center items-center gap-4 font-medium text-green-900 bg-green-500 w-full transition-all ease-in ease-out hover:bg-white hover:text-green-500 hover:ring-offset-2 hover:ring-2 hover:ring-green-500" type="submit">Konfirmasi</button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}
