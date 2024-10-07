'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LinkButton = (props) => {
    const { type, icon, children } = props;

    return (
        <div>
            <button className={"flex justify-between items-center gap-4 px-4 py-2 rounded font-bold text-white bg-blue-500 min-w-[120px] transition-all ease-in ease-out hover:bg-white hover:text-blue-500 hover:ring-offset-2 hover:ring-2 hover:ring-blue-500"}>
                <FontAwesomeIcon icon={icon} />
                <span>{children}</span>
            </button>
        </div>
    )
}

export default LinkButton;
