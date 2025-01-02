'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAppContext } from '../context/AppContext'

type DashboardContextType = {
  totalSavings: number
  totalLoans: number
  activeLoans: number
  repaidLoans: number
  defaultedLoans: number
  loanStatusData: Array<{ name: string; value: number }>
  groupSavingsData: Array<{ name: string; savings: number }>
  savingsVsLoansData: Array<{ name: string; value: number }>
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { groups, loans } = useAppContext()

  const totalSavings = groups.reduce((sum, group) => sum + group.totalSavings, 0)
  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const activeLoans = loans.filter(loan => loan.status === 'Active').length
  const repaidLoans = loans.filter(loan => loan.status === 'Repaid').length
  const defaultedLoans = loans.filter(loan => loan.status === 'Defaulted').length

  const loanStatusData = [
    { name: 'Active', value: activeLoans },
    { name: 'Repaid', value: repaidLoans },
    { name: 'Defaulted', value: defaultedLoans }
  ]

  const groupSavingsData = groups.map(group => ({
    name: group.name,
    savings: group.totalSavings
  }))

  const savingsVsLoansData = [
    { name: 'Total Savings', value: totalSavings },
    { name: 'Total Loans', value: totalLoans }
  ]

  const value = {
    totalSavings,
    totalLoans,
    activeLoans,
    repaidLoans,
    defaultedLoans,
    loanStatusData,
    groupSavingsData,
    savingsVsLoansData
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

