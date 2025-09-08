'use client'

import { useState, useEffect } from 'react'
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react'

interface UserData {
  id: string
  name: string
  lastStep: string
  lastChapter: string
  lastActivity: string
  stepsCompleted: number
  chaptersStarted: number
  firstChapterStart: string
}

interface ProgressData {
  users: UserData[]
  analytics: {
    totalUsers: number
    lastUpdated: string
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Simple password check (in production, use proper authentication)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'ministry-admin-2025') {
      setIsAuthenticated(true)
      setError('')
      loadData()
    } else {
      setError('Invalid password')
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/progress/track')
      if (response.ok) {
        const progressData = await response.json()
        setData(progressData)
      } else {
        setError('Failed to load data')
      }
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getProgressPercentage = (stepsCompleted: number) => {
    // Assuming roughly 20 steps total across all chapters
    const totalSteps = 20
    return Math.min((stepsCompleted / totalSteps) * 100, 100)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ministry of Silly Walks
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Admin Dashboard
          </h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ministry of Silly Walks</h1>
              <p className="text-sm text-gray-600">Admin Dashboard - User Progress Tracking</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-lg text-gray-600">Loading user data...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={loadData}
              className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        ) : data ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{data.analytics.totalUsers}</h3>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {data.users.filter(u => u.stepsCompleted > 5).length}
                    </h3>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {data.users.filter(u => {
                        const lastActivity = new Date(u.lastActivity)
                        const today = new Date()
                        const diffTime = today.getTime() - lastActivity.getTime()
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                        return diffDays <= 7
                      }).length}
                    </h3>
                    <p className="text-sm text-gray-600">Active This Week</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <h3 className="text-sm font-bold text-gray-900">
                      {formatDate(data.analytics.lastUpdated)}
                    </h3>
                    <p className="text-sm text-gray-600">Last Updated</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">User Progress</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Step
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Chapter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Activity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.stepsCompleted} steps completed</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.lastStep}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.lastChapter}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${getProgressPercentage(user.stepsCompleted)}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {Math.round(getProgressPercentage(user.stepsCompleted))}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.lastActivity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {data.users.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">No user data available yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Users will appear here after they start the tutorial and provide their names.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center py-12">
            <button
              onClick={loadData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load User Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
}