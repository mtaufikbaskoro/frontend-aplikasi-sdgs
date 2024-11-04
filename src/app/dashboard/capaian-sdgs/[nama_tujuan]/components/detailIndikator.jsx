import LinkButton from "@/components/ui/button";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function DetailIndikator (props) {
    const {editCapaianModal, handleEditCapaianModal} = props;

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
            <button 
                className="flex items-center justify-center gap-3 bg-sky-500 py-2.5 rounded-sm text-white text-sm hover:text-sky-500 hover:bg-white hover:ring-2 hover:ring-sky-500 transition-all ease-in ease-out"
                onClick={() => handleEditCapaianModal()}
            >
                <FontAwesomeIcon icon={faEdit} />
                <span>Atur Capaian</span>
            </button>
        </div>
    )
}
