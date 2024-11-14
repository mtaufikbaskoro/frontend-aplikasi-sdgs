'use client';

import { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Breadcrumb from '@/components/ui/breadcrumb';

export default function DashboardLayout (props) {
    const { children } = props;
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className=''>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex flex-1 gap-4">
                <Sidebar isOpen={isOpen} />
                <div className={`flex-1 p-6 ${isOpen ? 'ml-72' : ''} transition-all ease-in`}>
                    <Breadcrumb />
                    {children}
                </div>
            </div>
        </div>
    )
}
