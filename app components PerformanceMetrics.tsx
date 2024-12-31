'use client'

import { useAppContext } from '../context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Briefcase, TrendingUp } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function PerformanceMetrics() {
  const { groups, loans } = useAppContext()
  
  const totalMembers = groups.reduce((sum, group) => sum + group.members.length, 0)
  const activeGroups = groups.length
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const totalSavings = groups.reduce((sum, group) => sum + group.totalSavings, 0)
  const fundUtilization = totalSavings > 0 ? (totalLoanAmount / totalSavings) * 100 : 0

  const loanStatusData = [
    { name: 'Active', value: loans.filter(loan => loan.status === 'Active').length },
    { name: 'Repaid', value: loans.filter(loan => loan.status === 'Repaid').length },
    { name: 'Defaulted', value: loans.filter(loan => loan.status === 'Defaulted').length },
  ]

  const groupSavingsData = groups.map(group => ({
    name: group.name,
    savings: group.totalSavings,
  }))

  const loanTrendData = [
    { month: 'Jan', loans: 4 },
    { month: 'Feb', loans: 3 },
    { month: 'Mar', loans: 5 },
    { month: 'Apr', loans: 7 },
    { month: 'May', loans: 2 },
    { month: 'Jun', loans: 6 },
  ]

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGroups}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fund Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fundUtilization.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 hover:shadow-lg transition-shadow duration-300">
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

        <Card className="bg-white/80 hover:shadow-lg transition-shadow duration-300">
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

        <Card className="md:col-span-2 bg-white/80 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Loan Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanTrendData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="loans" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

