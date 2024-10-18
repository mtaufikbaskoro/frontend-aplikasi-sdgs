

export default function DetailIndikator () {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Target 1.1</h1>
            <p className="text-sm text-justify">Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari.</p>
            <hr />
            <table className="table text-sm">
                <tr>
                    <th>Sumber Data</th>
                    <td>Renstra Dinas</td>
                </tr>
                <tr>
                    <th>Satuan</th>
                    <td>Persen (%)</td>
                </tr>
                <tr>
                    <th>Baseline (2022)</th>
                    <td>2.18</td>
                </tr>
                <tr>
                    <th>Dokumen Pendukung</th>
                    <td><span className="font-semibold text-blue-500">dokumen.pdf</span></td>
                </tr>
            </table>
            <h1 className="p-2 font-medium border rounded border-green-900 text-center">Target / Capaian / %Capaian / Status</h1>
            <hr />
            <table className="table text-sm text-center">
                <thead>
                    <th>Target</th>
                    <th>Capaian</th>
                    <th>% Capaian</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    <td>2.10</td>
                    <td>1.23</td>
                    <td>170.73</td>
                    <td>pending</td>
                </tbody>
            </table>

        </div>
    )
}
