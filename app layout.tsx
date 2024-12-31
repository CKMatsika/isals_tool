import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from './context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ISALS Portfolio Tracking Tool',
  description: 'Manage and monitor Internal Savings and Lending Schemes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 to-green-100 min-h-screen`}>
        <div 
          className="min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundBlendMode: "overlay",
          }}
        >
          <AppProvider>
            <div className="min-h-screen backdrop-blur-sm bg-white/30">
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </AppProvider>
        </div>
      </body>
    </html>
  )
}

