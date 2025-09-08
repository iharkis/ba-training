'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface UserNameModalProps {
  isOpen: boolean
  onSubmit: (name: string) => void
}

export default function UserNameModal({ isOpen, onSubmit }: UserNameModalProps) {
  const [name, setName] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Welcome to the Ministry of Silly Walks</h2>
          <p className="text-sm text-gray-600 mt-1">Business Analysis Training Platform</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              To personalize your learning experience, we'd like to know your name. 
              This will help us tailor the content as you progress through the tutorials.
            </p>
            
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
              Your first name:
            </label>
            <input
              id="userName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Learning
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500">
            Your name is stored locally in your browser and used only to personalize your experience.
          </p>
        </div>
      </div>
    </div>
  )
}