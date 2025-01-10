'use client'
// react
import { use } from 'react'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/autoplay'

// components
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

import goals from '@/app/data/goals.json'

export default function Metadata ({ params }) {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH : ''
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    const goal = goals.find(
        (goal) => slug === goal.name.toLowerCase().replace(/\s+/g, '-')
    );
    
    return (
        <div className='relative'>
            <Navbar color={goal.color} />
            <main className='flex flex-col p-36'>
                <div className="flex justify-start gap-6 sm:items-start">
                    <div>
                        <Image src={`${baseUrl}/assets/img/sdgs_icons${goal.img}`} width={720} height={720} alt="tujuan logo" loading='eager' priority />
                    </div>
                    <div className="flex grow flex-col gap-4">
                        <h1 style={{color: goal.color}} className="text-4xl font-bold uppercase">{goal.name}</h1>
                        <p className="font-medium text-justify tracking-wide">
                            {goal.desc}
                        </p>
                        <div style={{borderColor: goal.color}} className='max-w-[1260px] mt-4 p-4 border-2 rounded-md'>
                            <Swiper
                                modules={[ Autoplay ]}
                                autoplay={{delay: 3000}}
                                spaceBetween={50}
                                slidesPerView={8} >
                                {
                                    goal.targets.map((target, index) => (
                                        <SwiperSlide key={index}>
                                                <Image
                                                    src={`${baseUrl}/assets/img/sdgs_icons/goal_${goal.id}_target${target}`} 
                                                    width={132} 
                                                    height={132} 
                                                    alt={`image ${index}`}
                                                    priority />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </main>
            <Footer className="fixed" />
        </div>
    )
}
