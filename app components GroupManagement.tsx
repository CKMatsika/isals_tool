'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Users, ChevronDown, ChevronUp, Edit, Trash2, Plus } from 'lucide-react'

export default function GroupManagement() {
  const { groups, addGroup, editGroup, deleteGroup } = useAppContext()
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupLocation, setNewGroupLocation] = useState('')
  const [editingGroup, setEditingGroup] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null)

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGroupName.trim() && newGroupLocation.trim()) {
      addGroup(newGroupName.trim(), newGroupLocation.trim())
      setNewGroupName('')
      setNewGroupLocation('')
    }
  }

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    editGroup(id, editName, editLocation)
    setEditingGroup(null)
  }

  const startEditing = (group: typeof groups[0]) => {
    setEditingGroup(group.id)
    setEditName(group.name)
    setEditLocation(group.location)
  }

  const toggleExpand = (id: number) => {
    setExpandedGroup(expandedGroup === id ? null : id)
  }

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
        <Users className="mr-2" /> Group Management
      </h2>
      <form onSubmit={handleAddGroup} className="mb-4 space-y-2">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
          className="border p-2 rounded-full w-full"
        />
        <input
          type="text"
          value={newGroupLocation}
          onChange={(e) => setNewGroupLocation(e.target.value)}
          placeholder="Group Location"
          className="border p-2 rounded-full w-full"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 w-full flex items-center justify-center">
          <Plus className="mr-2" /> Add Group
        </button>
      </form>
      <ul className="space-y-4">
        {groups.map((group) => (
          <li key={group.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{group.name}</span>
              <div className="flex items-center space-x-2">
                <button onClick={() => startEditing(group)} className="text-blue-500 hover:text-blue-600 transition duration-300">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteGroup(group.id)} className="text-red-500 hover:text-red-600 transition duration-300">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => toggleExpand(group.id)} className="text-gray-500 hover:text-gray-600 transition duration-300">
                  {expandedGroup === group.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
            {expandedGroup === group.id && (
              <div className="mt-4 space-y-2">
                <p>Location: {group.location}</p>
                <p>Members: {group.members.length}</p>
                <p>Total Savings: ${group.totalSavings.toLocaleString()}</p>
              </div>
            )}
            {editingGroup === group.id && (
              <form onSubmit={(e) => handleEditSubmit(e, group.id)} className="mt-4 space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-2 rounded-full w-full"
                />
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="border p-2 rounded-full w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
                    Save
                  </button>
                  <button onClick={() => setEditingGroup(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition duration-300">
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

