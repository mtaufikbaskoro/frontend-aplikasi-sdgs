

export default function Badge (props) {
    const { children, color } = props;


    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-gray-100 ${color}`}>{children}</span>
    )
}