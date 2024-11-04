import { useForm, useFieldArray } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function EditTarget () {
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
                <label htmlFor='target'>Target Capaian</label>
                <input 
                    className='border border-gray-300 rounded p-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                    type="text" 
                    placeholder="Masukkan capaian..."
                    {...register('target', {required: true})} 
                />
                <label htmlFor='instansis'>Instansi Pelaksana</label>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='mb-3 grid grid-cols-4 gap-2'>
                            <select
                                className='col-span-3'
                                {...register(`instansis.${index}.instansi`, { required: true})}
                                defaultValue="" 
                            >
                                <option value="" disabled>Pilih Instansi Pelaksana</option>
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
                                    <span className='flex justify-end gap-6'>
                                        <button 
                                            className='bg-sky-500 px-2 py-1 rounded-sm text-white hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500 transition-all ease-in ease-out' 
                                            type='button'
                                            onClick={() => append({instansi: ''})}
                                        >
                                            <FontAwesomeIcon icon={faAdd}/>
                                        </button>
                                        <button 
                                            className='bg-red-400 px-2 py-1 rounded-sm text-white hover:bg-white hover:text-red-400 hover:ring-2 hover:ring-red-400 transition-all ease-in ease-out'
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
            </div>
            <div className="mt-8 flex flex-col">
                <button type="submit" className="bg-blue-500 text-white py-2 rounded cursor-pointer hover:text-blue-500 hover:bg-white hover:ring-offset-2 hover:ring-2 hover:ring-blue-500 transition-all ease-in ease-out">Atur</button>
            </div>
        </form>
    )
}
