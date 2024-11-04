import LinkButton from "@/components/ui/button";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


export default function DetailIndikator () {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Target 1.1</h1>
            <p className="text-sm text-justify">Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari.</p>
            <hr />
            <table className="table text-sm">
                <tbody>
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
                        <td className="py-3">
                            <button className="text-left font-medium text-blue-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 1</button>
                        </td>
                        <td>
                            <button className="text-left font-medium text-blue-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 2</button>
                        </td>
                        <td>
                            <button className="text-left font-medium text-blue-500 hover:text-gray-400 transition-all ease-in ease-out">Dokumen Pendukung 3</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 className="p-2 font-medium border rounded border-green-900 text-center">Target / Capaian / %Capaian / Status</h1>
            <hr />
            <table className="table text-sm text-center">
                <thead>
                    <tr>
                        <th>Target</th>
                        <th>Capaian</th>
                        <th>% Capaian</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2.10</td>
                        <td>1.23</td>
                        <td>170.73</td>
                        <td>pending</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <LinkButton href="/" icon={faEdit} color="#0ea5e9">Atur Capaian</LinkButton>
        </div>
    )
}
