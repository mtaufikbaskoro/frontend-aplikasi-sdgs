import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Pagination ({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page !== currentPage) {
            onPageChange(page)
        }
    };
    
    return (
        <div className="pt-6 pb-7 flex justify-evenly w-full">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-green-700 text-white rounded-sm drop-shadow hover:bg-slate-400 disabled:bg-slate-300 disabled:text-slate-200 transition-all ease-in ease-out"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="flex gap-5">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{
                    fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
                className="px-2 border-2 rounded-full"
                >
                {index + 1}
                </button>
            ))}
            </div>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-green-700 text-white rounded-sm drop-shadow hover:bg-slate-400 disabled:bg-slate-300 disabled:text-slate-200 transition-all ease-in ease-out"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}