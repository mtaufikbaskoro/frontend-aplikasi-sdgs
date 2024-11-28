'use client';

import { useState, useEffect } from 'react'

import Navbar from './navbar'
import Sidebar from './sidebar'
import Breadcrumb from '@/components/ui/breadcrumb'

export default function DashboardLayout (props) {
    const { children } = props
    const [ isOpen, setIsOpen ] = useState(true)
    const [ windowSize, setWindowSize ] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            setWindowSize({ width, height })
            setIsOpen(width >= 768)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex flex-1 gap-4">
                <Sidebar isOpen={isOpen} />
                <div className={`flex-1 p-6 ${isOpen ? 'md:ml-72' : ''} transition-all ease-in`}>
                    <Breadcrumb />
                    {children}
                </div>
            </div>
        </div>
    )
}
