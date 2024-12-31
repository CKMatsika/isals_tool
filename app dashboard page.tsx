import DashboardHeader from '../components/DashboardHeader'
import SavingsOverview from '../components/SavingsOverview'
import LoanOverview from '../components/LoanOverview'
import PerformanceMetrics from '../components/PerformanceMetrics'
import Feedback from '../components/Feedback'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SavingsOverview />
        <LoanOverview />
      </div>
      <div className="mt-6">
        <PerformanceMetrics />
      </div>
      <Feedback />
    </div>
  )
}

