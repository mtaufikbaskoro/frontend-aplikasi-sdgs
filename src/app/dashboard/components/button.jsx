'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


const LinkButton = (props) => {
    const { type, icon, children, href } = props;

    return (
        <div>
            <Link href={href} className={"flex justify-between items-center px-4 py-2 rounded font-bold text-white bg-blue-500 w-[160px] transition-all ease-in ease-out hover:bg-white hover:text-blue-500 hover:ring-offset-2 hover:ring-2 hover:ring-blue-500"}>
                <FontAwesomeIcon icon={icon} />
                <span>{children}</span>
            </Link>
        </div>
    )
}

export default LinkButton;
