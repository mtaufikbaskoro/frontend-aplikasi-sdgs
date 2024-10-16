
import { useForm } from 'react-hook-form';

import Error from '@/components/ui/error';

const Edit = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-6">
            <h4 className="font-semibold text-center text-xl">Edit Pengguna</h4>
            <div className="mt-4 flex flex-col gap-4">
                <label htmlFor="username">Username</label>
                <input {...register("username", {required: true, })} type="username" placeholder="Masukkan username yang ingin dibuat" className="border border-gray-400 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out" />
                { errors.username &&
                    <div className='mt-2'> 
                        <Error>Username tidak boleh kosong.</Error>
                    </div>
                }
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <label htmlFor="password">Password</label>
                <input {...register("password", {required: true, })} type="password" placeholder="Masukkan password anda" className="border border-gray-400 rounded-sm p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out" />
                { errors.password &&
                    <div className='mt-2'> 
                        <Error>Password tidak boleh kosong.</Error>
                    </div>
                }
            </div>
            <div className="mt-8 flex flex-col">
                <button type="submit" className="bg-yellow-500 text-white py-3 rounded cursor-pointer hover:text-yellow-500 hover:bg-white hover:ring-offset-2 hover:ring-2 hover:ring-yellow-500 transition-all ease-in ease-out">Ubah</button>
            </div>
        </form>
    )
}

export default Edit;