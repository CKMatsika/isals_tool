import { Suspense } from 'react'
import DashboardContent from './dashboard-content'

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <DashboardContent />
    </Suspense>
  )
}

