
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import logoPemko from '@assets/img/logo_pemko_medan.png';

export default function Navbar (props) {
    const { isOpen, setIsOpen } = props;

    return (
        <nav className={`sticky top-0 flex justify-between items-center ${isOpen ? "pl-48" : "pl-16"} transition-all ease-in ease-out py-6 border-b-4 border-green-900 bg-white`}>
            <div className={`${isOpen ? "hidden" : ""}`}>
                <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                    <FontAwesomeIcon icon={faBars} color='black' />
                </button>
            </div>
            <div className={`${isOpen ? "" : "hidden"}`}>
                <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "ml-1" : "ml-0"} w-6 h-6 text-white`}>
                    <FontAwesomeIcon icon={faClose} color='black' />
                </button>
            </div>
            <div className="flex justify-center items-center">
                <div>
                    <Image src={logoPemko} width={24} height={24} alt="logo pemko medan" />
                </div>
                <div className="flex flex-col">
                    <p className="ml-4 text-lg font-bold uppercase">pemerintah kota medan</p>
                </div>
            </div>
            <div className="pr-16 flex justify-end items-center gap-12 min-w-80">
                <p className='text-sm'>Selamat datang, <span className='font-bold'>Dinas Pendidikan</span></p>
            </div>
        </nav>
    )
}
