import { Suspense } from 'react'
import Link from 'next/link'
import DashboardHeader from '../components/DashboardHeader'
import SavingsOverview from '../components/SavingsOverview'
import LoanOverview from '../components/LoanOverview'
import Feedback from '../components/Feedback'

// Create loading components
function LoadingCard() {
  return (
    <div className="w-full h-48 bg-gray-100 rounded-lg animate-pulse" />
  )
}

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingCard />}>
        <DashboardHeader />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Suspense fallback={<LoadingCard />}>
          <SavingsOverview />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <LoanOverview />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/goals" 
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300"
        >
          Goal Setting and Tracking
        </Link>
        <Link 
          href="/financial-education" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300"
        >
          Financial Education
        </Link>
      </div>

      <Suspense fallback={<LoadingCard />}>
        <Feedback />
      </Suspense>
    </div>
  )
}

