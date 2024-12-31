import AdminHeader from '../components/AdminHeader'
import GroupManagement from '../components/GroupManagement'
import LoanManagement from '../components/LoanManagement'

export default function AdminPanel() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-100 to-green-100 min-h-screen">
      <div className="bg-white/80 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <AdminHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <GroupManagement />
          <LoanManagement />
        </div>
      </div>
    </div>
  )
}

