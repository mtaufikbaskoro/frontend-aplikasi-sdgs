'use client';

import { useState } from 'react';
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";


export default function Dashboard () {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex min-h-screen">
                <Sidebar isOpen={isOpen} />
                <div className="grow bg-green-100"></div>
            </div>
        </div>
    )
}
