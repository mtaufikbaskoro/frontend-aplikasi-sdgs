'use client';

import Image from "next/image";

import logoPemko from '@assets/img/logo_pemko_medan.png';
import Button from "./ui/button";


export default function Navbar (props) {
    const { color } = props;

    return (
        <nav className={`flex justify-between px-36 py-6 border-b-4`}>
            <div className="flex justify-center">
                <div>
                    <Image src={logoPemko} width={24} height={24} alt="logo pemko medan" />
                </div>
                <div className="flex flex-col">
                    <p className="ml-4 text-xl font-bold uppercase">pemerintah kota medan</p>
                </div>
            </div>
            <div className="flex justify-end items-center gap-12 min-w-80">
                <a className="font-bold hover:underline" href="/">Beranda</a>
                <a className="font-bold hover:underline" href="/">Metadata</a>
                <Button href="/login">Masuk</Button>
            </div>
        </nav>
    )
}