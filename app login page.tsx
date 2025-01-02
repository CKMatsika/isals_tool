import Login from '../components/Login'
import { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the ISALS Portfolio Tracking Tool
          </p>
        </div>
        <Login />
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

