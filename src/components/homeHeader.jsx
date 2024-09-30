import Image from "next/image";

import logoPemko from '@assets/img/logo_pemko_medan.png';
import horizontalLogoSdgs from '@assets/img/horizontal_logo_sdgs.png';
import Button from "./ui/button";


export default function HomeHeader () {
    return (
        <nav className="flex justify-between px-36 py-12 h-64 border-b-4 border-green-900">
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
            <div className="flex justify-end gap-12 min-w-80">
                <a className="font-bold hover:underline" href="/">Metadata</a>
                <Button href="/login">Masuk</Button>
            </div>
        </nav>
    )
}