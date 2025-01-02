'use client'

import { useAppContext } from '../context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function EnhancedDashboard() {
  const { groups, loans } = useAppContext()

  const totalSavings = groups.reduce((sum, group) => sum + group.totalSavings, 0)
  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const activeLoans = loans.filter(loan => loan.status === 'Active').length
  const repaidLoans = loans.filter(loan => loan.status === 'Repaid').length
  const defaultedLoans = loans.filter(loan => loan.status === 'Defaulted').length

  const loanStatusData = [
    { name: 'Active', value: activeLoans },
    { name: 'Repaid', value: repaidLoans },
    { name: 'Defaulted', value: defaultedLoans },
  ]

  const groupSavingsData = groups.map(group => ({
    name: group.name,
    savings: group.totalSavings,
  }))

  const savingsVsLoansData = [
    { name: 'Total Savings', value: totalSavings },
    { name: 'Total Loans', value: totalLoans },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Loan Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Group Savings Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupSavingsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="savings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Savings vs Total Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsVsLoansData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

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
              <p className="text-2xl font-bold">
                {((repaidLoans / (activeLoans + repaidLoans + defaultedLoans)) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

