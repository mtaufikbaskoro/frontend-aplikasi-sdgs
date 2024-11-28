

export default function Card (props) {
    const { children, color } = props;
    
    const hexToRgba = (hex, alpha = 1) => {
        const [ r, g, b ] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    return (
        <div style={{borderColor: color, backgroundColor: hexToRgba(color, 0.2)}} className={`py-2 px-2.5 flex items-center justify-between border-2 rounded-md text-black`}>{children}</div>
    )
}