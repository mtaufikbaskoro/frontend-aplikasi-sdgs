

export default function Sidebar (props) {
    const { isOpen } = props;

    return (
        <div className={`${isOpen ? "w-80" : "shrink w-0"} transition-all ease-in bg-red-100`}>
            <aside className=""></aside>
        </div>
    )
}
