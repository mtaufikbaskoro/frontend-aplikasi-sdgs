'use client';

import { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function DashboardLayout ({children}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex min-h-screen">
                <Sidebar isOpen={isOpen} />
                <div className="grow flex flex-col gap-8 p-6 transition-all ease-in">
                    {children}
                </div>
            </div>
        </div>
    )
}
