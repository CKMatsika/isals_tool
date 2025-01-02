'use client'

import Link from 'next/link'
import GoalTracker from '../components/GoalTracker'
import Login from '../components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { Button } from "@/components/ui/button"

export default function GoalsPage() {
  const { user } = useAppContext()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Goal Setting and Tracking</h1>
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back to Dashboard
        </Link>
      </div>
      {user ? (
        <GoalTracker />
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view and manage your goals</h2>
          <p className="mb-6">You need to be logged in to access the Goal Setting and Tracking feature.</p>
          <Login />
        </div>
      )}
      <Toaster position="bottom-right" />
    </div>
  )
}

