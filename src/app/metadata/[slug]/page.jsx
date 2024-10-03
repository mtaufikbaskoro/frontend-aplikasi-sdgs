'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

import goals from '@/app/data/goals.json';
import Footer from '@/components/Footer';

const getGoal = (goalName) => {
    return goals.filter((goal) => goalName === goal.name.toLowerCase().replace(/\s+/g, '-'))
}

export default function Metadata ({params}) {
    const { slug } = params;
    const goal = getGoal(slug);
    
    return (
        <div className='min-h-full'>
            <Navbar color={goal[0].color} />
            <main className='flex flex-col px-36 mt-32'>
                <div className="relative flex justify-center items-center gap-10 row-start-2 items-center sm:items-start">
                    <div className="my-auto">
                        <Image src={`/assets/img/sdgs_icons${goal[0].img}`} width={240} height={240} alt="tujuan logo" loading='eager' priority />
                    </div>
                    <div className="max-w-[800px] my-auto">
                        <h1 style={{color: goal[0].color}} className="text-4xl font-bold uppercase">{goal[0].name}</h1>
                        <p className="mt-6 font-medium text-justify tracking-wide">
                            {goal[0].desc}
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-6 grid-row gap-10 my-32'>
                    {
                        goal[0].targets.map((target, index) => (
                            <div key={target}>
                                <Image className="transition-all ease-out hover:scale-[1.2]" src={`/assets/img/sdgs_icons/goal_${goal[0].id}_target${target}`} width={240} height={240} alt={`image ${index}`} loading="eager" />
                            </div>
                        ))
                    }
                </div>
            </main>
            {/* <div className='mt-80'></div> */}
            <Footer />
        </div>
    )
}
