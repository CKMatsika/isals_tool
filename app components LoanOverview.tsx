'use client'

import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { DollarSign, Activity, BarChart2 } from 'lucide-react'

export default function LoanOverview() {
  const { loans } = useAppContext()

  const totalOutstanding = loans.reduce((sum, loan) => sum + (loan.status === 'Active' ? loan.amount : 0), 0)
  const activeLoans = loans.filter(loan => loan.status === 'Active').length
  const repaidLoans = loans.filter(loan => loan.status === 'Repaid').length
  const repaymentRate = loans.length > 0 ? (repaidLoans / loans.length) * 100 : 0

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
        <DollarSign className="mr-2" /> Loan Overview
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <DollarSign className="mr-2 text-yellow-500" />
          <p className="text-lg">Total Loans Outstanding: <span className="font-bold">${totalOutstanding.toLocaleString()}</span></p>
        </div>
        <div className="flex items-center">
          <Activity className="mr-2 text-red-500" />
          <p className="text-lg">Number of Active Loans: <span className="font-bold">{activeLoans}</span></p>
        </div>
        <div className="flex items-center">
          <BarChart2 className="mr-2 text-indigo-500" />
          <p className="text-lg">Repayment Rate: <span className="font-bold">{repaymentRate.toFixed(2)}%</span></p>
        </div>
      </div>
      <Link href="/loan-report" className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300 shadow-md hover:shadow-lg">
        View Detailed Report
      </Link>
    </div>
  )
}

