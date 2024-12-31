'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function Feedback() {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this feedback to a server
    // For now, we'll simulate an API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Feedback submitted:', feedback)
    setSubmitted(true)
    setFeedback('')
  }

  return (
    <div className="mt-8 bg-white/80 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Provide Feedback</h2>
      {submitted ? (
        <div className="text-green-600 bg-green-100 p-4 rounded-lg">
          <p className="font-semibold">Thank you for your feedback!</p>
          <p className="mt-2">Your feedback has been received and will be reviewed by our team.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Your feedback helps us improve the tool"
            required
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Your feedback will be sent to our development team for review.
            </p>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Send size={18} />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

