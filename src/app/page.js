import Footer from "@/components/Footer";
import HomeHeader from "@/components/homeHeader";
import Image from "next/image";
import Link from "next/link";

import aboutImage from '@assets/img/about_image.png';
import goal1Image from '@assets/img/sdgs_icons/E_SDG_PRINT-01.jpg';
import goal2Image from '@assets/img/sdgs_icons/E_SDG_PRINT-02.jpg';
import goal3Image from '@assets/img/sdgs_icons/E_SDG_PRINT-03.jpg';
import goal4Image from '@assets/img/sdgs_icons/E_SDG_PRINT-04.jpg';
import goal5Image from '@assets/img/sdgs_icons/E_SDG_PRINT-05.jpg';
import goal6Image from '@assets/img/sdgs_icons/E_SDG_PRINT-06.jpg';
import goal7Image from '@assets/img/sdgs_icons/E_SDG_PRINT-07.jpg';
import goal8Image from '@assets/img/sdgs_icons/E_SDG_PRINT-08.jpg';
import goal9Image from '@assets/img/sdgs_icons/E_SDG_PRINT-09.jpg';
import goal10Image from '@assets/img/sdgs_icons/E_SDG_PRINT-10.jpg';
import goal11Image from '@assets/img/sdgs_icons/E_SDG_PRINT-11.jpg';
import goal12Image from '@assets/img/sdgs_icons/E_SDG_PRINT-12.jpg';
import goal13Image from '@assets/img/sdgs_icons/E_SDG_PRINT-13.jpg';
import goal14Image from '@assets/img/sdgs_icons/E_SDG_PRINT-14.jpg';
import goal15Image from '@assets/img/sdgs_icons/E_SDG_PRINT-15.jpg';
import goal16Image from '@assets/img/sdgs_icons/E_SDG_PRINT-16.jpg';
import goal17Image from '@assets/img/sdgs_icons/E_SDG_PRINT-17.jpg';

const goals = [
  {
    id: 1,
    desc: 'tujuan 1',
    img: goal1Image
  },
  {
    id: 2,
    desc: 'tujuan 2',
    img: goal2Image
  },
  {
    id: 3,
    desc: 'tujuan 3',
    img: goal3Image
  },
  {
    id: 4,
    desc: 'tujuan 4',
    img: goal4Image
  },
  {
    id: 5,
    desc: 'tujuan 5',
    img: goal5Image
  },
  {
    id: 6,
    desc: 'tujuan 6',
    img: goal6Image
  },
  {
    id: 7,
    desc: 'tujuan 7',
    img: goal7Image
  },
  {
    id: 8,
    desc: 'tujuan 8',
    img: goal8Image
  },
  {
    id: 9,
    desc: 'tujuan 9',
    img: goal9Image
  },
  {
    id: 10,
    desc: 'tujuan 10',
    img: goal10Image
  },
  {
    id: 11,
    desc: 'tujuan 11',
    img: goal11Image
  },
  {
    id: 12,
    desc: 'tujuan 12',
    img: goal12Image
  },
  {
    id: 13,
    desc: 'tujuan 13',
    img: goal13Image
  },
  {
    id: 14,
    desc: 'tujuan 14',
    img: goal14Image
  },
  {
    id: 15,
    desc: 'tujuan 15',
    img: goal15Image
  },
  {
    id: 16,
    desc: 'tujuan 16',
    img: goal16Image
  },
  {
    id: 17,
    desc: 'tujuan 17',
    img: goal17Image
  },
]

export default function Home() {

  return (
    <div className="min-h-screen">
      <HomeHeader />
      <main className="">
        <div className="relative flex justify-between items-center gap-8 row-start-2 items-center sm:items-start px-48 py-12 mt-32">
          <div className="max-w-[800px] my-auto">
            <h1 className="text-4xl font-bold text-green-900">Apa itu SDGs?</h1>
            <p className="mt-6 font-medium text-justify">
              TPB/SDGs adalah serangkaian tujuan yang ditetapkan oleh Perserikatan Bangsa Bangsa (PBB) untuk mencapai kehidupan yang lebih baik dan lebih berkelanjutan bagi semua orang di planet ini.</p>
            <p className="mt-2 font-medium text-justify">
              Ada 17 tujuan SDGs yang saling terkait dan saling mendukung untuk mengatasi berbagai tantangan global yang kita hadapi.
            </p>
          </div>
          <div className="min-w-[450px] my-auto">
            <Image src={aboutImage} width={450} height={600} alt="about logo" />
          </div>
        </div>
        <div className="grid grid-cols-6 grid-row mt-32">
          {
            goals.map((goal) => {
              return (
                <div>
                  <Link href="/">
                    <Image className="transition-all ease-out hover:scale-[1.2] hover:ease-in" src={goal.img} width={320} height={320} alt={"goal image" + goal.id} / >
                  </Link>
                </div>
              )
            })
          }
        </div>
      </main>
      <Footer />
    </div>
  );
}
