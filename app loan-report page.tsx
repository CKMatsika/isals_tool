'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Link from 'next/link'
import { ArrowLeft, Download, Share2 } from 'lucide-react'

export default function LoanReportPage() {
  const { loans, groups } = useAppContext()
  const [showShareOptions, setShowShareOptions] = useState(false)

  const totalOutstanding = loans.reduce((sum, loan) => sum + (loan.status === 'Active' ? loan.amount : 0), 0)
  const activeLoans = loans.filter(loan => loan.status === 'Active').length
  const repaidLoans = loans.filter(loan => loan.status === 'Repaid').length
  const defaultedLoans = loans.filter(loan => loan.status === 'Defaulted').length
  const repaymentRate = loans.length > 0 ? (repaidLoans / loans.length) * 100 : 0

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString() : 'N/A'
  }

  const downloadReport = () => {
    const reportContent = `
      Detailed Loan Report
      
      Total Outstanding Loans: $${totalOutstanding.toLocaleString()}
      Active Loans: ${activeLoans}
      Repayment Rate: ${repaymentRate.toFixed(2)}%
      
      Loan Status Summary:
      Active Loans: ${activeLoans}
      Repaid Loans: ${repaidLoans}
      Defaulted Loans: ${defaultedLoans}
      
      Loan Details:
      ${loans.map(loan => `
        Borrower: ${loan.borrower}
        Group: ${groups.find(g => g.id === loan.groupId)?.name || 'Unknown'}
        Amount: $${loan.amount.toLocaleString()}
        Status: ${loan.status}
        Issue Date: ${formatDate(loan.issuedDate)}
        Due Date: ${formatDate(loan.dueDate)}
      `).join('\n')}
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'loan_report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareReport = (platform: string) => {
    const reportUrl = window.location.href
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20this%20loan%20report&url=${encodeURIComponent(reportUrl)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reportUrl)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(reportUrl)}&title=Loan%20Report`
        break
    }

    window.open(shareUrl, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Detailed Loan Report</h1>
          <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Outstanding Loans</h2>
            <p className="text-3xl font-bold text-blue-600">${totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Active Loans</h2>
            <p className="text-3xl font-bold text-green-600">{activeLoans}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Repayment Rate</h2>
            <p className="text-3xl font-bold text-purple-600">{repaymentRate.toFixed(2)}%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Loan Status Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div key="active" className="text-center">
              <h3 className="font-medium text-gray-600">Active Loans</h3>
              <p className="text-2xl font-bold text-blue-600">{activeLoans}</p>
            </div>
            <div key="repaid" className="text-center">
              <h3 className="font-medium text-gray-600">Repaid Loans</h3>
              <p className="text-2xl font-bold text-green-600">{repaidLoans}</p>
            </div>
            <div key="defaulted" className="text-center">
              <h3 className="font-medium text-gray-600">Defaulted Loans</h3>
              <p className="text-2xl font-bold text-red-600">{defaultedLoans}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Loan Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={downloadReport}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                <Download size={20} className="mr-2" />
                Download
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
                {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button onClick={() => shareReport('twitter')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Twitter</button>
                      <button onClick={() => shareReport('facebook')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Facebook</button>
                      <button onClick={() => shareReport('linkedin')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on LinkedIn</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">Borrower</th>
                  <th className="px-4 py-2 text-left text-gray-600">Group</th>
                  <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                  <th className="px-4 py-2 text-left text-gray-600">Status</th>
                  <th className="px-4 py-2 text-left text-gray-600">Issue Date</th>
                  <th className="px-4 py-2 text-left text-gray-600">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{loan.borrower}</td>
                    <td className="px-4 py-2">{groups.find(g => g.id === loan.groupId)?.name || 'Unknown'}</td>
                    <td className="px-4 py-2">${loan.amount.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        loan.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                        loan.status === 'Repaid' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{formatDate(loan.issuedDate)}</td>
                    <td className="px-4 py-2">{formatDate(loan.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

