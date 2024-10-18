

export default function Table (props) {
    const {columns, children} = props;
    return (
        <table className="w-full p-6 text-sm text-center text-green-950">
            <thead className="text-xs uppercase bg-green-950 text-white">
                <tr>
                    {
                        columns.map((column, idx) => (
                            <th key={idx} scope="col" className="px-6 py-3">
                                {column}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
