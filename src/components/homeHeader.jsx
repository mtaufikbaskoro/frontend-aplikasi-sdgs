import Image from "next/image";
import Link from 'next/link';
import LinkButton from "@components/ui/button";

import logoPemko from '@assets/img/logo_pemko_medan.png';
import horizontalLogoSdgs from '@assets/img/horizontal_logo_sdgs.png';



export default function HomeHeader () {
    return (
        <nav className="flex justify-between px-36 py-12 h-64 bg-white border-b-8 border-green-900">
            <div className="flex justify-center">
                <div>
                    <Image src={logoPemko} width={48} height={48} alt="logo pemko medan" />
                </div>
                <div className="flex flex-col">
                    <p className="ml-4 text-3xl font-bold uppercase">pemerintah kota medan</p>
                    <div>
                        <Image src={horizontalLogoSdgs} width={640} height={120} alt="sdgs horizontal logo" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center gap-12 min-w-80">
                <Link className="px-2 py-1 font-semibold text-lg hover:text-gray-500 hover:underline transition-all ease-in ease-out" href="#metadata">Metadata</Link>
                <LinkButton color="#14532d" href="/login">Masuk</LinkButton>
            </div>
        </nav>
    )
}