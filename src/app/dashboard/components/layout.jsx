'use client';

import { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';
import PageCard from './pageCard';

export default function DashboardLayout (props) {
    const { children, Content } = props;
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className='fkex flex-col h-screen'>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex flex-1 gap-4">
                <Sidebar isOpen={isOpen} />
                <div className="flex-1 p-6 transition-all ease-in">
                    <PageCard>{Content}</PageCard>
                    {children}
                </div>
            </div>
        </div>
    )
}
