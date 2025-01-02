'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dynamically import charts with SSR disabled
const Charts = dynamic(() => import('./Charts'), { 
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-gray-100 rounded-lg animate-pulse" />
})

type DashboardChartsProps = {
  loanStatusData: Array<{ name: string; value: number }>
  groupSavingsData: Array<{ name: string; savings: number }>
  savingsVsLoansData: Array<{ name: string; value: number }>
}

export default function DashboardCharts({
  loanStatusData,
  groupSavingsData,
  savingsVsLoansData
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Charts 
        loanStatusData={loanStatusData}
        groupSavingsData={groupSavingsData}
        savingsVsLoansData={savingsVsLoansData}
      />
    </div>
  )
}

