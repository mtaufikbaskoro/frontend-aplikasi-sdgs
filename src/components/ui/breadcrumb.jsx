'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb () {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter((segment) => segment);

    return (
        <div className="mb-4 py-4 px-3.5 border-2 border-green-950 text-white rounded-md drop-shadow-xl">
            <span className="text-sm font-medium">
                <ol className='flex space-x-2 text-slate-300'>
                    {
                        pathSegments.map((segment, index) => {
                            const path = '/' + pathSegments.slice(0, index+1).join('/');
                            const name = segment.charAt(0) + segment.slice(1);
                            return (
                                <li key={index} className='flex items-center'>
                                    <span className='mx-1'>|</span>
                                    <Link href={path} className={`${index === pathSegments.length - 1 ? 'text-slate-500' : 'text-green-950'} hover:text-slate-300`}>
                                        {name == '0' ? '' : name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ol>
            </span>
        </div>
    )
}
