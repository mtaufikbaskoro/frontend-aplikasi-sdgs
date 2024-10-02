

export default function Card (props) {
    const { children, color } = props;
    return (
        <div style={{borderColor: color}} className="flex justify-between items-center py-6 px-3.5 border-2 rounded-md">{children}</div>
    )
}