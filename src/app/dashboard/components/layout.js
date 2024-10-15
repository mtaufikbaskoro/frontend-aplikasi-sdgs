'use client';

import { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';
import PageCard from './pageCard';

export default function DashboardLayout (props) {
    const { children, Content } = props;
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex min-h-screen">
                <Sidebar isOpen={isOpen} />
                <div className="grow flex flex-col gap-8 p-6 transition-all ease-in">
                    <PageCard>{Content}</PageCard>
                    {children}
                </div>
            </div>
        </div>
    )
}
