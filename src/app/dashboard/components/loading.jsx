import DashboardLayout from "./layout";


export default function Loading () {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin-slow"></div>
                <p className="mt-4 text-lg text-gray-700">Mohon tunggu...</p>
            </div>
        </div>
    )
}