import Link from 'next/link'
import { ArrowRight, Users, PiggyBank, BarChart2, Briefcase } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Women's Rights Organisation
          </h1>
          <p className="text-xl text-gray-600">
            Empowering communities through Internal Savings and Lending Schemes (ISALs)
          </p>
        </header>

        <main>
          <section className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About Our Organization</h2>
            <p className="text-gray-700 mb-4">
              We are a Women's Rights Organisation committed to enhancing the management and monitoring of our members' Internal Savings and Lending Schemes (ISALs). Our mission is to improve access to financial services, build financial literacy, and support small-scale savings and loan activities within target populations.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">ISALs Portfolio Tracking Tool</h2>
            <p className="text-gray-700 mb-4">
              Our innovative ISALs Portfolio Tracking Tool is designed to streamline the management and monitoring of Internal Savings and Lending Schemes. This user-friendly interface allows for easy tracking of financial transactions, loan repayments, savings balances, and other key metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <Users className="text-blue-500 mr-2" />
                <span>Efficient group tracking</span>
              </div>
              <div className="flex items-center">
                <PiggyBank className="text-green-500 mr-2" />
                <span>Monitor savings and loans</span>
              </div>
              <div className="flex items-center">
                <BarChart2 className="text-purple-500 mr-2" />
                <span>Generate KPI reports</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="text-yellow-500 mr-2" />
                <span>Informed decision-making</span>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

