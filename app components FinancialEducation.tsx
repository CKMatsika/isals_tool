'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'react-hot-toast'

type EducationTopic = {
  id: number
  title: string
  content: string
  quiz: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

const educationTopics: EducationTopic[] = [
  {
    id: 1,
    title: 'Budgeting Basics',
    content: 'Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating this spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do. If you don\'t have enough money to do everything you would like to do, then you can use this planning process to prioritize your spending and focus your money on the things that are most important to you.',
    quiz: {
      question: 'What is the main purpose of creating a budget?',
      options: [
        'To restrict spending',
        'To plan and prioritize spending',
        'To increase income',
        'To reduce taxes'
      ],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    title: 'Saving Strategies',
    content: 'Saving money is incredibly important. It provides financial security, helps you reach your goals, and gives you peace of mind. Some effective saving strategies include: setting clear goals, automating your savings, cutting unnecessary expenses, and finding additional sources of income. Remember, even small amounts saved regularly can add up over time.',
    quiz: {
      question: 'Which of the following is NOT mentioned as an effective saving strategy?',
      options: [
        'Setting clear goals',
        'Automating your savings',
        'Investing in high-risk stocks',
        'Cutting unnecessary expenses'
      ],
      correctAnswer: 2
    }
  },
  {
    id: 3,
    title: 'Understanding Credit',
    content: 'Credit is borrowing money with the agreement to pay it back later, usually with interest. Understanding credit is crucial because it affects your ability to borrow money, the interest rates you\'ll pay, and even your job prospects. Key factors that affect your credit include your payment history, amounts owed, length of credit history, new credit, and types of credit used.',
    quiz: {
      question: 'Which of the following is NOT a key factor affecting your credit?',
      options: [
        'Payment history',
        'Amounts owed',
        'Your current salary',
        'Length of credit history'
      ],
      correctAnswer: 2
    }
  },
  {
    id: 4,
    title: 'Investment Basics',
    content: 'Investing is putting money into financial schemes, shares, property, or commercial ventures with the expectation of achieving a profit. While investing can be complex, some basic principles include: start early, diversify your investments, understand your risk tolerance, and invest regularly. Remember, all investments carry some degree of risk, so it\'s important to do your research and possibly consult with a financial advisor.',
    quiz: {
      question: 'Which of the following is a basic principle of investing?',
      options: [
        'Put all your money in one investment',
        'Only invest when the market is high',
        'Diversify your investments',
        'Avoid all risk'
      ],
      correctAnswer: 2
    }
  }
]

export default function FinancialEducation() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number | null}>({})
  const [quizSubmitted, setQuizSubmitted] = useState<{[key: number]: boolean}>({})

  const toggleTopic = (id: number) => {
    setExpandedTopic(expandedTopic === id ? null : id)
  }

  const handleQuizAnswer = (topicId: number, answerIndex: number) => {
    setQuizAnswers({...quizAnswers, [topicId]: answerIndex})
  }

  const submitQuiz = (topicId: number) => {
    const topic = educationTopics.find(t => t.id === topicId)
    if (topic && quizAnswers[topicId] !== undefined) {
      setQuizSubmitted({...quizSubmitted, [topicId]: true})
      if (quizAnswers[topicId] === topic.quiz.correctAnswer) {
        toast.success('Correct answer! Well done!')
      } else {
        toast.error('Incorrect. Try again!')
      }
    }
  }

  return (
    <div className="space-y-4">
      {educationTopics.map(topic => (
        <Card key={topic.id}>
          <CardHeader>
            <CardTitle 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTopic(topic.id)}
            >
              {topic.title}
              {expandedTopic === topic.id ? <ChevronUp /> : <ChevronDown />}
            </CardTitle>
          </CardHeader>
          {expandedTopic === topic.id && (
            <CardContent>
              <p className="mb-4">{topic.content}</p>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Quiz:</h3>
                <p className="mb-2">{topic.quiz.question}</p>
                {topic.quiz.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`${topic.id}-${index}`}
                      name={`quiz-${topic.id}`}
                      value={index}
                      checked={quizAnswers[topic.id] === index}
                      onChange={() => handleQuizAnswer(topic.id, index)}
                      disabled={quizSubmitted[topic.id]}
                      className="mr-2"
                    />
                    <label htmlFor={`${topic.id}-${index}`}>{option}</label>
                  </div>
                ))}
                <button
                  onClick={() => submitQuiz(topic.id)}
                  disabled={quizSubmitted[topic.id]}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                >
                  {quizSubmitted[topic.id] ? 'Submitted' : 'Submit Answer'}
                </button>
                {quizSubmitted[topic.id] && (
                  <p className="mt-2 font-bold">
                    {quizAnswers[topic.id] === topic.quiz.correctAnswer
                      ? 'Correct! Great job!'
                      : `Incorrect. The correct answer was: ${topic.quiz.options[topic.quiz.correctAnswer]}`}
                  </p>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

