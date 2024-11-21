import { useState } from "react";

const Tooltip = ({text, children}) => {
    const [ showTooltip, setShowTooltip ] = useState(false)

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)} >
            {children}
            {showTooltip && (
                <span className="mt-5 px-2 py-1 absolute z-10 w-max left-1/2 -translate-x-1/2 transform bg-slate-800 text-white text-xs rounded-md shadow-lg">
                    {text}
                </span>
            )}
        </span>
    )
}

export default Tooltip;