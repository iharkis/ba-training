'use client'

import { useState, useEffect } from 'react'
import { Users, Calendar, TrendingUp, Clock, ChevronDown, ChevronRight } from 'lucide-react'

interface UserData {
  id: string
  name: string
  lastStep: string
  lastChapter: string
  lastActivity: string
  stepsCompleted: number
  chaptersStartedCount: number
  firstChapterStart: string
  stepDetails: { stepId: string; timestamp: string }[]
  chaptersStarted: { [chapterId: string]: string }
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
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())

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

  const toggleUserExpanded = (userId: string) => {
    const newExpanded = new Set(expandedUsers)
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId)
    } else {
      newExpanded.add(userId)
    }
    setExpandedUsers(newExpanded)
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

            {/* User Accordion */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Progress Details</h2>
              
              {data.users.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleUserExpanded(user.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {expandedUsers.has(user.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        <div className="text-left">
                          <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.stepsCompleted} steps completed</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Current Chapter</p>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.lastChapter}
                          </span>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Progress</p>
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
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Last Activity</p>
                          <p className="text-sm text-gray-900">{formatDate(user.lastActivity)}</p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {expandedUsers.has(user.id) && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Step Timeline */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Step Timeline</h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {user.stepDetails.map((step, index) => (
                              <div key={`${step.stepId}-${index}`} className="flex items-center justify-between p-2 bg-white rounded border">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{step.stepId}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">{formatDate(step.timestamp)}</p>
                                </div>
                              </div>
                            ))}
                            {user.stepDetails.length === 0 && (
                              <p className="text-sm text-gray-500 italic">No steps completed yet</p>
                            )}
                          </div>
                        </div>

                        {/* Chapter Progress */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Chapter Progress</h4>
                          <div className="space-y-2">
                            {Object.entries(user.chaptersStarted).map(([chapterId, timestamp]) => (
                              <div key={chapterId} className="flex items-center justify-between p-2 bg-white rounded border">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{chapterId}</p>
                                  <p className="text-xs text-gray-500">Started</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">{formatDate(timestamp)}</p>
                                </div>
                              </div>
                            ))}
                            {Object.keys(user.chaptersStarted).length === 0 && (
                              <p className="text-sm text-gray-500 italic">No chapters started yet</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
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