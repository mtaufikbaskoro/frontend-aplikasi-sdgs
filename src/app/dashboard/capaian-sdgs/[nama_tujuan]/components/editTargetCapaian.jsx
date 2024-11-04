import { useForm, useFieldArray } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function EditTargetCapaian () {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            target: '',
            instansis: [{instansi: ''}],
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'instansis',
    });

    const selectInstansis = [
        {value: 'dinaspendidikan', label: 'Dinas Pendidikan'},
        {value: 'sekwan', label: 'Sekretariat DPRD'},
        {value: 'disdukcapil', label: 'Disdukcapil'},
    ]

    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-6">
            <h4 className="font-medium text-center text-xl">Atur Target</h4>
            <hr className='mt-5' />
            <div className="mt-4 flex flex-col gap-4">
                <label
                    className='text-sm' 
                    htmlFor='target'
                >
                    Target Capaian
                </label>
                <input 
                    className='border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-slate-400 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                    type="text" 
                    placeholder="Masukkan target capaian..."
                    {...register('target', {required: true})} 
                />
                <label 
                    className='text-sm' 
                    htmlFor='instansis'
                >
                    Instansi Pelaksana
                </label>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='mb-3 grid grid-cols-4 gap-2'>
                            <select
                                className='col-span-3 bg-transparent text-slate-400 text-sm border border-slate-200 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                                {...register(`instansis.${index}.instansi`, { required: true})}
                                defaultValue="" 
                            >
                                <option className='text-slate-700' value="" disabled>Pilih Instansi Pelaksana</option>
                                {
                                    selectInstansis.map((inst) => (
                                        <option key={inst.value} value={inst.value}>
                                            {inst.label}
                                        </option>
                                    ))
                                }
                            </select>
                            {
                                index === 0 && (
                                    <span className='flex justify-center gap-3'>
                                        <button 
                                            className='bg-sky-500 px-3 rounded-sm text-white hover:bg-sky-400 shadow-sm transition-all ease-in ease-out' 
                                            type='button'
                                            onClick={() => append({instansi: ''})}
                                        >
                                            <FontAwesomeIcon icon={faAdd} size='sm'/>
                                        </button>
                                        <button 
                                            disabled={fields.length <= 1 && true}
                                            className='bg-red-400 px-3 rounded-sm text-white disabled:bg-slate-400 hover:bg-red-300 shadow-sm transition-all ease-in ease-out'
                                            type='button'  
                                            onClick={() => remove(index)}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </span>
                                )
                            }
                        </div>
                    ))
                }
                {console.log(fields)}
            </div>
            <div className="mt-8 flex flex-col">
                <button 
                    className="px-4 py-1.5 font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500"
                    type="submit" 
                >
                    Atur
                </button>
            </div>
        </form>
    )
}
