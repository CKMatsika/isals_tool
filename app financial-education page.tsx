import Link from 'next/link'
import FinancialEducation from '../components/FinancialEducation'
import { Toaster } from 'react-hot-toast'

export default function FinancialEducationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Education</h1>
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back to Dashboard
        </Link>
      </div>
      <FinancialEducation />
      <Toaster position="bottom-right" />
    </div>
  )
}

