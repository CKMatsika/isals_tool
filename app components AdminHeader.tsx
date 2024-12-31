import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg flex items-center space-x-2">
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  )
}

