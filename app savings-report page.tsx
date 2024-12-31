'use client'

import { useAppContext } from '../context/AppContext'
import Link from 'next/link'

export default function SavingsReportPage() {
  const { groups } = useAppContext()

  const totalMembers = groups.reduce((sum, group) => sum + group.members, 0)
  const totalSavings = groups.reduce((sum, group) => sum + group.totalSavings, 0)
  const averageSavings = totalMembers > 0 ? totalSavings / totalMembers : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detailed Savings Report</h1>
      <Link href="/dashboard" className="mb-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">
        Back to Dashboard
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Savings</h2>
          <p className="text-3xl font-bold">${totalSavings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Number of Savers</h2>
          <p className="text-3xl font-bold">{totalMembers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Average Savings per Member</h2>
          <p className="text-3xl font-bold">${averageSavings.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Savings by Group</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Group Name</th>
                <th className="px-4 py-2 text-left">Members</th>
                <th className="px-4 py-2 text-left">Total Savings</th>
                <th className="px-4 py-2 text-left">Average Savings</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id} className="border-b">
                  <td className="px-4 py-2">{group.name}</td>
                  <td className="px-4 py-2">{group.members}</td>
                  <td className="px-4 py-2">${group.totalSavings.toLocaleString()}</td>
                  <td className="px-4 py-2">${(group.totalSavings / group.members).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

