import MathDisplay from "@/components/ui/mathdisplay";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function DetailIndikator (props) {
    const {handleEditCapaianModal, detail} = props;

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Indikator {detail.kode_indikator}</h1>
            <p className="text-sm text-justify">Pada Tahun 2030, mengentaskan kemiskinan ekstrim bagi semua orang yang saat ini berpendapatan kurang dari 1,25 dolar amerika per hari.</p>
            <hr />
            <table className="table border-separate border-spacing-y-4 text-sm">
                <tbody>
                    <tr>
                        <th className="w-[180px]">Sumber Data</th>
                        <td colSpan={2}>{detail.sumber}</td>
                    </tr>
                    <tr>
                        <th>Satuan</th>
                        <td colSpan={2}>{detail.satuan}</td>
                    </tr>
                    <tr>
                        <th>Baseline (2022)</th>
                        <td colSpan={2}>2.18</td>
                    </tr>
                    {
                        detail.rumus != 0 && (
                            <tr>
                                <th>Rumus</th>
                                <td colSpan={2}>
                                    <MathDisplay formula={detail.rumus} />
                                </td>
                            </tr>   
                        )
                    }
                    {
                        detail.variabel != 0 && (
                            <tr>
                                <th className="align-top">Keterangan Rumus</th>
                                <td colSpan={2}>
                                    <ul>
                                        {
                                            Object.entries(JSON.parse(detail.variabel)).map(([key, value]) => (
                                                <li key={key}><strong>{key}</strong> = {value}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                            </tr>
                        )
                    }
                    <tr className="text-center">
                        <td>
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
