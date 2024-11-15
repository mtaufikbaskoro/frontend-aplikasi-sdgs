'use client';

import { useEffect } from "react";

export default function Alert ({ message, type, onClose, duration = 3000, className }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)
        return () => clearTimeout(timer);
    }, [duration, onClose])
    return (
        <div
            className={`${className} fixed top-5 right-5 p-4 rounded-sm shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
        </div>
    )
}