'use client'
import { use } from 'react'

import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

import goals from '@/app/data/goals.json'

export default function Metadata ({params}) {
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    const goal = goals.find(
        (goal) => slug === goal.name.toLowerCase().replace(/\s+/g, '-')
    );
    
    return (
        <div className='min-h-full'>
            <Navbar color={goal.color} />
            <main className='flex flex-col px-36 mt-32'>
                <div className="relative flex justify-center items-center gap-10 row-start-2 items-center sm:items-start">
                    <div className="my-auto">
                        <Image src={`/assets/img/sdgs_icons${goal.img}`} width={240} height={240} alt="tujuan logo" loading='eager' priority />
                    </div>
                    <div className="max-w-[800px] my-auto">
                        <h1 style={{color: goal.color}} className="text-4xl font-bold uppercase">{goal.name}</h1>
                        <p className="mt-6 font-medium text-justify tracking-wide">
                            {goal.desc}
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-6 grid-row gap-10 my-32'>
                    {
                        goal.targets.map((target, index) => (
                            <div className="transition-all ease-in ease-out hover:scale-[1.2]" key={index}>
                                <Image src={`/assets/img/sdgs_icons/goal_${goal.id}_target${target}`} width={240} height={240} alt={`image ${index}`} />
                            </div>
                        ))
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}
