
import DashboardLayout from "../../components/layout"
import Breadcrumb from "@/components/ui/breadcrumb"


export default function PemerintahDaerah () {
    const PageCardContent = () => (
        <Breadcrumb>
            <p className='w-[360px] font-bold text-xl text-white'>Selamat Data di Data Center SDGs Kota Medan</p>
            <p className='mt-4 w-[560px] text-justify text-white text-sm'>Mohon untuk periksa kembali hasil status data yang telah diinput, data selesai jika status sudah diubah ke “approve”</p>
        </Breadcrumb>
    )

    return (
        <DashboardLayout Content={<PageCardContent />}>
            <div>Hello</div>
        </DashboardLayout>
    )
}
