'use client'

import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { PiggyBank, Users, TrendingUp } from 'lucide-react'

export default function SavingsOverview() {
  const { groups } = useAppContext()

  const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0)
  const totalSavings = groups.reduce((sum, group) => sum + group.totalSavings, 0)
  const averageSavings = totalMembers > 0 ? totalSavings / totalMembers : 0

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
        <PiggyBank className="mr-2" /> Savings Overview
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <PiggyBank className="mr-2 text-green-500" />
          <p className="text-lg">Total Savings: <span className="font-bold">${totalSavings.toLocaleString()}</span></p>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 text-blue-500" />
          <p className="text-lg">Number of Savers: <span className="font-bold">{totalMembers}</span></p>
        </div>
        <div className="flex items-center">
          <TrendingUp className="mr-2 text-purple-500" />
          <p className="text-lg">Average Savings per Member: <span className="font-bold">${averageSavings.toFixed(2)}</span></p>
        </div>
      </div>
      <Link href="/savings-report" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition duration-300 shadow-md hover:shadow-lg">
        View Detailed Report
      </Link>
    </div>
  )
}

