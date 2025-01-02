'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Link from 'next/link'

export default function NotificationPreferences() {
  const { user } = useAppContext()
  const [preferences, setPreferences] = useState({
    loanReminders: true,
    savingsGoals: true,
    groupMeetings: true,
  })

  const handlePreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setPreferences(prev => ({ ...prev, [name]: checked }))
  }

  const savePreferences = async () => {
    // In a real application, you would save these preferences to a database
    console.log('Saving preferences:', preferences)
    // You could also call an API endpoint here to save the preferences
  }

  if (!user) {
    return <div>Please log in to manage your notification preferences.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notification Preferences</h1>
      <Link href="/dashboard" className="mb-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">
        Back to Dashboard
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Your Notifications</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="loanReminders"
                checked={preferences.loanReminders}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              Loan Repayment Reminders
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="savingsGoals"
                checked={preferences.savingsGoals}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              Savings Goal Updates
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="groupMeetings"
                checked={preferences.groupMeetings}
                onChange={handlePreferenceChange}
                className="mr-2"
              />
              Group Meeting Reminders
            </label>
          </div>
        </div>
        <button
          onClick={savePreferences}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}

