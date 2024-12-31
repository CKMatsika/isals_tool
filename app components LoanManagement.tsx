'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { DollarSign, Edit, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react'

export default function LoanManagement() {
  const { loans, groups, addLoan, editLoan, deleteLoan } = useAppContext()
  const [newLoan, setNewLoan] = useState({ groupId: '', borrower: '', amount: '' })
  const [editingLoan, setEditingLoan] = useState<number | null>(null)
  const [editLoanData, setEditLoanData] = useState({ borrower: '', amount: '', status: '' })
  const [expandedLoan, setExpandedLoan] = useState<number | null>(null)

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault()
    if (newLoan.groupId && newLoan.borrower && newLoan.amount) {
      addLoan({
        id: Date.now(),
        groupId: parseInt(newLoan.groupId),
        borrower: newLoan.borrower,
        amount: parseFloat(newLoan.amount),
        status: 'Active',
        issuedDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      })
      setNewLoan({ groupId: '', borrower: '', amount: '' })
    }
  }

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    editLoan(id, {
      borrower: editLoanData.borrower,
      amount: parseFloat(editLoanData.amount),
      status: editLoanData.status as 'Active' | 'Repaid' | 'Defaulted',
    })
    setEditingLoan(null)
  }

  const startEditing = (loan: typeof loans[0]) => {
    setEditingLoan(loan.id)
    setEditLoanData({
      borrower: loan.borrower,
      amount: loan.amount.toString(),
      status: loan.status,
    })
  }

  const toggleExpand = (id: number) => {
    setExpandedLoan(expandedLoan === id ? null : id)
  }

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
        <DollarSign className="mr-2" /> Loan Management
      </h2>
      <form onSubmit={handleAddLoan} className="mb-4 space-y-2">
        <select
          value={newLoan.groupId}
          onChange={(e) => setNewLoan({ ...newLoan, groupId: e.target.value })}
          className="border p-2 rounded-full w-full"
        >
          <option value="">Select Group</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newLoan.borrower}
          onChange={(e) => setNewLoan({ ...newLoan, borrower: e.target.value })}
          placeholder="Borrower Name"
          className="border p-2 rounded-full w-full"
        />
        <input
          type="number"
          value={newLoan.amount}
          onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
          placeholder="Loan Amount"
          className="border p-2 rounded-full w-full"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full w-full transition duration-300 flex items-center justify-center">
          <Plus className="mr-2" /> Add Loan
        </button>
      </form>
      <ul className="space-y-4">
        {loans.map((loan) => (
          <li key={loan.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{loan.borrower}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => startEditing(loan)} className="text-blue-500 hover:text-blue-600 transition duration-300">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteLoan(loan.id)} className="text-red-500 hover:text-red-600 transition duration-300">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => toggleExpand(loan.id)} className="text-gray-500 hover:text-gray-600 transition duration-300">
                  {expandedLoan === loan.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
            {expandedLoan === loan.id && (
              <div className="mt-4 space-y-2">
                <p>Amount: ${loan.amount.toLocaleString()}</p>
                <p>Status: {loan.status}</p>
                <p>Group: {groups.find(g => g.id === loan.groupId)?.name || 'Unknown'}</p>
              </div>
            )}
            {editingLoan === loan.id && (
              <form onSubmit={(e) => handleEditSubmit(e, loan.id)} className="mt-4 space-y-2">
                <input
                  type="text"
                  value={editLoanData.borrower}
                  onChange={(e) => setEditLoanData({ ...editLoanData, borrower: e.target.value })}
                  className="border p-2 rounded-full w-full"
                />
                <input
                  type="number"
                  value={editLoanData.amount}
                  onChange={(e) => setEditLoanData({ ...editLoanData, amount: e.target.value })}
                  className="border p-2 rounded-full w-full"
                />
                <select
                  value={editLoanData.status}
                  onChange={(e) => setEditLoanData({ ...editLoanData, status: e.target.value })}
                  className="border p-2 rounded-full w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Repaid">Repaid</option>
                  <option value="Defaulted">Defaulted</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
                    Save
                  </button>
                  <button onClick={() => setEditingLoan(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition duration-300">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

