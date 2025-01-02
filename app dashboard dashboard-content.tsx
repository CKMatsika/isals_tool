'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import SavingsOverview from '../components/SavingsOverview'
import LoanOverview from '../components/LoanOverview'
import Feedback from '../components/Feedback'
import { useAppContext } from '../context/AppContext'

function LoadingCard() {
  return <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
}

export default function DashboardContent() {
  const { user } = useAppContext()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view the dashboard</h2>
          <Link 
            href="/login" 
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

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

