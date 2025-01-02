'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Member = {
  name: string
  savings: number
}

type Group = {
  id: number
  name: string
  members: Member[]
  totalSavings: number
  location: string
}

type Loan = {
  id: number
  borrower: string
  amount: number
  status: 'Active' | 'Repaid' | 'Defaulted'
  groupId: number
  issuedDate?: Date
  dueDate?: Date
}

type User = {
  id: number
  username: string
  role: 'admin' | 'user'
}

type AppContextType = {
  groups: Group[]
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
  addGroup: (name: string, location: string) => void
  editGroup: (id: number, name: string, location: string) => void
  deleteGroup: (id: number) => void
  loans: Loan[]
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>
  addLoan: (loan: Omit<Loan, 'id'>) => void
  editLoan: (id: number, updates: Partial<Loan>) => void
  deleteLoan: (id: number) => void
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Group A',
      members: [
        { name: 'Alice', savings: 500 },
        { name: 'Bob', savings: 750 },
      ],
      totalSavings: 1250,
      location: 'New York'
    },
    {
      id: 2,
      name: 'Group B',
      members: [
        { name: 'Charlie', savings: 600 },
        { name: 'David', savings: 800 },
      ],
      totalSavings: 1400,
      location: 'Los Angeles'
    },
  ])

  const [loans, setLoans] = useState<Loan[]>([
    { id: 1, borrower: 'Alice', amount: 1000, status: 'Active', groupId: 1 },
    { id: 2, borrower: 'Charlie', amount: 1500, status: 'Repaid', groupId: 2 },
  ])

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for auth token in cookies
    const hasAuthToken = document.cookie.includes('auth_token=true')
    const storedUser = localStorage.getItem('user')
    
    if (hasAuthToken && storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Clear any existing user data if no auth token
      setUser(null)
      localStorage.removeItem('user')
    }
  }, [])

  const addGroup = (name: string, location: string) => {
    setGroups([...groups, { id: Date.now(), name, members: [], totalSavings: 0, location }])
  }

  const editGroup = (id: number, name: string, location: string) => {
    setGroups(groups.map(group => group.id === id ? { ...group, name, location } : group))
  }

  const deleteGroup = (id: number) => {
    setGroups(groups.filter(group => group.id !== id))
  }

  const addLoan = (loan: Omit<Loan, 'id'>) => {
    setLoans([...loans, { ...loan, id: Date.now() }])
  }

  const editLoan = (id: number, updates: Partial<Loan>) => {
    setLoans(loans.map(loan => loan.id === id ? { ...loan, ...updates } : loan))
  }

  const deleteLoan = (id: number) => {
    setLoans(loans.filter(loan => loan.id !== id))
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real application, you would validate credentials against a backend
    if (username === 'admin' && password === 'password') {
      const user: User = { id: 1, username: 'admin', role: 'admin' }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <AppContext.Provider value={{ 
      groups, setGroups, addGroup, editGroup, deleteGroup,
      loans, setLoans, addLoan, editLoan, deleteLoan,
      user, login, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

