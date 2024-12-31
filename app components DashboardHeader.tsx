import Link from 'next/link'
import { Wallet, Settings } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Wallet className="mr-2 text-blue-600" /> ISALS Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center flex items-center justify-center">
          <Wallet className="mr-2" /> Home
        </Link>
        <Link href="/admin" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 text-center flex items-center justify-center">
          <Settings className="mr-2" /> Admin Panel
        </Link>
      </div>
    </div>
  )
}

