'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LinkButton = (props) => {
    const { color, icon, children, href } = props;

    return (
        <div>
            <Link style={{backgroundColor: color}} href={href} className="transition-all ease-in ease-out flex items-center gap-4 px-2 py-2 rounded font-medium text-white hover:ring-offset-2 hover:ring-2 hover:ring-black">
                <FontAwesomeIcon icon={icon} />
                <div>{children}</div>
            </Link>
        </div>
    )
}

export default LinkButton;
