import React from 'react';
import Link from 'next/link';

export default function Button ({children, href}) {
    // console.log(title);
    // const { href } = props;
    return (
        <div>
            <Link href={href} className='px-4 py-2 bg-green-600 text-white font-bold rounded transition-all ease-out hover:bg-white hover:ring-2 hover:ring-offset-2 hover:ring-green-600 hover:text-green-600 hover:ease-in'>{children}</Link>
        </div>
    )
}