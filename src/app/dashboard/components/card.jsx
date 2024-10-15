

export default function Card (props) {
    const { children, color } = props;
    return (
        <div style={{borderColor: color}} className="flex justify-around items-center py-3 px-1 border-2 rounded-md">{children}</div>
    )
}