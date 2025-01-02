'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type MetricsProps = {
  totalSavings: number
  totalLoans: number
  activeLoans: number
  repaidLoans: number
  defaultedLoans: number
}

export default function DashboardMetrics({
  totalSavings,
  totalLoans,
  activeLoans,
  repaidLoans,
  defaultedLoans
}: MetricsProps) {
  const repaymentRate = ((repaidLoans / (activeLoans + repaidLoans + defaultedLoans)) * 100) || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Total Savings</h3>
            <p className="text-2xl font-bold">${totalSavings.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Loans</h3>
            <p className="text-2xl font-bold">${totalLoans.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Active Loans</h3>
            <p className="text-2xl font-bold">{activeLoans}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Repayment Rate</h3>
            <p className="text-2xl font-bold">{repaymentRate.toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

