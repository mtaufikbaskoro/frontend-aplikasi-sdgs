//essential needs
import Footer from "@/components/footer";
import HomeHeader from "@/components/homeHeader";
import Image from "next/image";
import Link from "next/link";

//static data
import goals from "@/app/data/goals.json";

//image
import aboutImage from '@assets/img/about_image.png';


export default function Home() {

  return (
    <div className="relative min-h-screen">
      <HomeHeader />
      <main className="">
        <div className="flex justify-between items-center gap-8 row-start-2 items-center sm:items-start px-48 py-12 mt-32">
          <div className="max-w-[800px] my-auto">
            <h1 className="text-4xl font-bold text-green-900">Apa itu SDGs?</h1>
            <p className="mt-6 font-medium text-justify">
              TPB/SDGs adalah serangkaian tujuan yang ditetapkan oleh Perserikatan Bangsa Bangsa (PBB) untuk mencapai kehidupan yang lebih baik dan lebih berkelanjutan bagi semua orang di planet ini.</p>
            <p className="mt-2 font-medium text-justify">
              Ada 17 tujuan SDGs yang saling terkait dan saling mendukung untuk mengatasi berbagai tantangan global yang kita hadapi.
            </p>
          </div>
          <div className="my-auto">
            <Image src={aboutImage} width={450} height={600} alt="about logo" priority />
          </div>
        </div>
        <div id="metadata" className="grid grid-cols-6 grid-row mt-32">
          {
            goals.map((goal) => {
              return (
                <div className="transition-all ease-in ease-out hover:opacity-25" key={goal.id}>
                  <Link href={`/metadata/${goal.name.replace(/\s+/g, '-').toLowerCase()}`}>
                    <Image src={`/assets/img/sdgs_icons${goal.img}`} width={320} height={320} alt={goal.name} loading="eager" />
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
