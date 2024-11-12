'use client';

import { useEffect } from "react";

export default function Alert ({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose])
    return (
        <div
            className={`fixed top-5 right-5 p-4 rounded-sm shadow-lg text-white transition-opacity ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
        </div>
    )
}