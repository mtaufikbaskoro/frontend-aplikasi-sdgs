'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


const LinkButton = (props) => {
    const { color, icon, children, href } = props;

    return (
        <div>
            <Link style={{backgroundColor: color}} href={href} className={"flex justify-between items-center px-4 py-2 rounded font-bold text-white w-[160px] transition-all ease-in ease-out hover:text-black-500 hover:ring-offset-2 hover:ring-2 hover:ring-black"}>
                <FontAwesomeIcon icon={icon} />
                <span>{children}</span>
            </Link>
        </div>
    )
}

export default LinkButton;
