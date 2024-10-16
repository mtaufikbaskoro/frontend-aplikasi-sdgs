'use client';

import Image from "next/image";
import Link from "next/link";

import logoPemko from '@assets/img/logo_pemko_medan.png';
import LinkButton from "@components/ui/button";


export default function Navbar (props) {
    const { color } = props;
    
    return (
        <nav style={{borderColor: color}} className="flex justify-between px-36 py-6 border-b-4">
            <div className="flex justify-center">
                <div>
                    <Image src={logoPemko} width={24} height={24} alt="logo pemko medan" />
                </div>
                <div className="flex flex-col">
                    <p className="ml-4 text-xl font-bold uppercase">pemerintah kota medan</p>
                </div>
            </div>
            <div className="flex items-center gap-12 min-w-80">
                <Link className="font-bold hover:underline" href="/">Beranda</Link>
                <Link className="font-bold hover:underline" href="/#metadata">Metadata</Link>
                <LinkButton color={color} href="/login">Masuk</LinkButton>
            </div>
        </nav>
    )
}