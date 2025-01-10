import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'
import Alert from '@/components/ui/alert'
import { getUrl } from '@/lib/utils'

export default function EditTargetCapaian (props) {
    const { instansis, targetCapaian } = props 
    const [ method, setMethod ] = useState('POST')
    const [ showAlert, setShowAlert ] = useState(false)
    
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            detail_id: targetCapaian.sdgs_detail_id,
            target: '',
            units: [{id: ''}],
        }
    })

    const {fields, append, remove, replace} = useFieldArray({
        control,
        name: 'units',
    })

    useEffect(() => {
        if (targetCapaian.target_capaian) {
            const tempArr = targetCapaian.instansis.map(x => ({id: x.sub_unit_id}))
            reset({
                detail_id: targetCapaian.sdgs_detail_id,
                target: targetCapaian.target_capaian.target,
                units: tempArr
            })
            replace(tempArr)
            setMethod('PUT')
        }
    }, [targetCapaian, reset, replace])

    const onSubmit = async (data) => {
        try {
            const url = method === 'POST' ? getUrl(`/api/sdgs/targetCapaian`) : getUrl(`/api/sdgs/targetCapaian?targetCapaianId=${targetCapaian.target_capaian.id}`)
            const res = await fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if(res.ok) {
                const data = await res.json()
                setShowAlert(data.success)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-6">
            <h4 className="font-medium text-center text-xl">Atur Target</h4>
            <hr className='mt-5' />
            <div className="mt-4 flex flex-col gap-4">
                <input 
                    className='border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-slate-400 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                    type="text" 
                    {...register('detail_id', { required: true })}
                    disabled
                    hidden />
                <label className='text-sm' htmlFor='target'>
                    Target Capaian
                </label>
                <input 
                    className='border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-slate-400 focus:ring-1 placeholder:text-gray-400 placeholder:text-sm transition-all ease-in ease-out'
                    type="text" 
                    placeholder="Masukkan target capaian..."
                    {...register('target', { required: true })} />
                <label className='text-sm' htmlFor='instansis'>
                    Instansi Pelaksana
                </label>
                { fields.map((field, index) => (
                    <div key={field.id} className='mb-3 grid grid-cols-4 gap-2'>
                        <select
                            className='col-span-3 bg-transparent text-slate-600 text-sm border border-slate-200 rounded pl-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'
                            {...register(`units.${index}.id`, { required: true })}>
                            <option value="" disabled>Pilih Instansi Pelaksana</option>
                            { instansis.map((inst) => (
                                <option className='text-slate-700' key={inst.id} value={inst.id}>
                                    {inst.sub_unit}
                                </option>
                            ))}
                        </select>
                        { index === 0 && (
                            <span className='flex justify-center gap-3'>
                                <button 
                                    className='bg-sky-500 px-3 rounded-sm text-white hover:bg-sky-400 shadow-sm transition-all ease-in ease-out' 
                                    type='button'
                                    onClick={() => append({ id: '' })}
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
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-8 flex flex-col">
                <button 
                    className="px-4 py-1.5 font-medium text-gray-100 bg-sky-500 rounded-sm transition-all ease-in ease-out hover:bg-white hover:text-sky-500 hover:ring-2 hover:ring-sky-500"
                    type="submit">
                    Atur
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
