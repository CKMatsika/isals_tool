'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

type Member = {
  id: number
  name: string
  savings: number
}

export default function IndividualMember({ groupId }: { groupId: number }) {
  const { groups, setGroups } = useAppContext()
  const [newMember, setNewMember] = useState({ name: '', savings: '' })

  const group = groups.find(g => g.id === groupId)
  const members = group?.members || []

  const addMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMember.name && newMember.savings) {
      const updatedMembers = [...members, { id: Date.now(), name: newMember.name, savings: parseFloat(newMember.savings) }]
      setGroups(groups.map(g => g.id === groupId ? { ...g, members: updatedMembers, totalSavings: g.totalSavings + parseFloat(newMember.savings) } : g))
      setNewMember({ name: '', savings: '' })
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Group Members</h3>
      <form onSubmit={addMember} className="mb-4 space-y-2">
        <input
          type="text"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          placeholder="Member Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={newMember.savings}
          onChange={(e) => setNewMember({ ...newMember, savings: e.target.value })}
          placeholder="Initial Savings"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition duration-300">
          Add Member
        </button>
      </form>
      <ul>
        {members.map((member: Member) => (
          <li key={member.id} className="mb-2">
            {member.name} - Savings: ${typeof member.savings === 'number' ? member.savings.toLocaleString() : '0'}
          </li>
        ))}
      </ul>
    </div>
  )
}

