'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Award, Code, Palette, Zap, Database, Globe, CheckCircle, Clock, AlertCircle, RefreshCw, Trash2, Edit3, Save, X } from 'lucide-react'

// This demo showcases the exact code structure users built throughout the tutorial
export default function DemoApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Evaluate Mr. Smith's Silly Walk Application",
      description: "Review submitted video and assess walk silliness level.",
      assignedTo: "John Cleese",
      status: "pending",
      priority: "high",
      dueDate: "2024-08-15",
      category: "Applications",
      createdAt: "2024-07-24T10:30:00Z",
      updatedAt: "2024-07-24T10:30:00Z"
    },
    {
      id: 2,
      title: "Approve new silly walk training program",
      description: "Review curriculum for the advanced silly walk training initiative.",
      assignedTo: "Michael Palin",
      status: "in-progress", 
      priority: "medium",
      dueDate: "2024-08-20",
      category: "Training",
      createdAt: "2024-07-24T09:15:00Z",
      updatedAt: "2024-07-24T14:22:00Z"
    }
  ])
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('General')
  const [newTaskAssignee, setNewTaskAssignee] = useState('Current User')
  const [currentDemo, setCurrentDemo] = useState('final')
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<{status: string, message: string, taskId?: number} | null>(null)
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [showApiDemo, setShowApiDemo] = useState(false)

  // Simulate API call with loading states
  const addTask = async () => {
    if (newTaskText.trim() === '') {
      alert('Please enter a task description')
      return
    }

    setIsLoading(true)
    setApiResponse(null)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newTask = {
      id: Date.now(),
      title: newTaskText,
      description: '',
      assignedTo: newTaskAssignee,
      status: 'pending',
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      category: newTaskCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setTasks(prev => [...prev, newTask])
    setNewTaskText('')
    setNewTaskDueDate('')
    setApiResponse({ status: 'success', message: 'Task created successfully', taskId: newTask.id })
    setIsLoading(false)
  }

  // Delete task with confirmation
  const deleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setTasks(prev => prev.filter(task => task.id !== taskId))
    setApiResponse({ status: 'success', message: 'Task deleted successfully' })
    setIsLoading(false)
  }

  // Update task status
  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ))
    setApiResponse({ status: 'success', message: 'Task status updated' })
    setIsLoading(false)
  }

  // Edit task
  const saveTaskEdit = async (taskId: number, updatedTask: any) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
        : task
    ))
    setEditingTask(null)
    setApiResponse({ status: 'success', message: 'Task updated successfully' })
    setIsLoading(false)
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  // Demo showing HTML structure from Chapter 1
  const Chapter1Demo = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-300 rounded p-6">
        <h1 style={{ color: '#003d7a', marginBottom: '10px', fontSize: '32px', fontWeight: 'bold' }}>
          Ministry of Silly Walks
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Task Management System
        </p>
        
        <h2 style={{ 
          color: '#4b5563', 
          borderBottom: '2px solid #e5e7eb', 
          paddingBottom: '5px', 
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Add New Task
        </h2>
        <input 
          type="text" 
          placeholder="Enter task description"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '16px',
            marginBottom: '20px'
          }}
          disabled
        />
        
        <h2 style={{ 
          color: '#4b5563', 
          borderBottom: '2px solid #e5e7eb', 
          paddingBottom: '5px', 
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Current Tasks
        </h2>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Evaluate Mr. Smith's Silly Walk Application
          </h3>
          <p style={{ marginBottom: '5px', color: '#6b7280' }}>
            Review submitted video and assess walk silliness level.
          </p>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Assigned to: John Cleese
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded">
        <strong>Chapter 1 Learning:</strong> This shows the basic HTML structure you built - headings, paragraphs, input field, and task display with semantic markup.
      </div>
    </div>
  )

  // Demo showing styled version from Chapter 2
  const Chapter2Demo = () => (
    <div className="space-y-6">
      <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <h1 style={{ color: '#003d7a', marginBottom: '10px', fontSize: '32px', fontWeight: 'bold' }}>
          Ministry of Silly Walks
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          Task Management System
        </p>
        
        <h2 style={{ 
          color: '#4b5563', 
          borderBottom: '2px solid #e5e7eb', 
          paddingBottom: '5px', 
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Add New Task
        </h2>
        <input 
          type="text" 
          placeholder="Enter task description"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '16px',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
          disabled
        />
        
        <h2 style={{ 
          color: '#4b5563', 
          borderBottom: '2px solid #e5e7eb', 
          paddingBottom: '5px', 
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Current Tasks
        </h2>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Evaluate Mr. Smith's Silly Walk Application
          </h3>
          <p style={{ marginBottom: '5px', color: '#6b7280' }}>
            Review submitted video and assess walk silliness level.
          </p>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Assigned to: John Cleese
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded">
        <strong>Chapter 2 Learning:</strong> Added professional CSS styling with government colors, proper spacing, card layouts, and responsive design principles.
      </div>
    </div>
  )

  // Complete Advanced Demo - Full Enterprise System (Chapters 4-9)
  const AdvancedDemo = () => (
    <div className="space-y-6">
      {/* API Response Display */}
      {apiResponse && (
        <div className={`p-3 rounded-lg flex items-center ${
          apiResponse.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {apiResponse.status === 'success' ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
          {apiResponse.message}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bg-blue-50 p-3 rounded-lg flex items-center text-blue-800">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          Processing API request...
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gov-blue mb-2">
          Ministry of Silly Walks - Enterprise Task Manager
        </h1>
        <p className="text-gray-600 mb-6">Complete System with Database, API, and Advanced Features</p>
        
        {/* Advanced Task Creation Form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Add New Task (with API Integration)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input 
                type="text" 
                placeholder="Enter task description"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <select 
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="John Cleese">John Cleese</option>
                <option value="Michael Palin">Michael Palin</option>
                <option value="Terry Gilliam">Terry Gilliam</option>
                <option value="Current User">Current User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="date" 
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="Applications">Applications</option>
                <option value="Training">Training</option>
                <option value="Administrative">Administrative</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={addTask}
            disabled={isLoading}
            className="bg-gov-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Creating Task...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Create Task (API Call)
              </>
            )}
          </button>
        </div>
        
        {/* Advanced Task List with Full CRUD */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Current Tasks ({tasks.length}) - Database Synchronized
          </h2>
          
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {editingTask === task.id ? (
                  // Edit Mode
                  <TaskEditForm 
                    task={task} 
                    onSave={(updatedTask) => saveTaskEdit(task.id, updatedTask)}
                    onCancel={() => setEditingTask(null)}
                    isLoading={isLoading}
                  />
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingTask(task.id)}
                          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Edit Task"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Status:</span>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(task.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Due: {task.dueDate || 'No due date'}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Assigned to:</span> {task.assignedTo}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {task.category}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                          {task.updatedAt !== task.createdAt && (
                            <> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 bg-green-50 p-4 rounded">
        <strong>Complete System Features (Chapters 4-9):</strong> This demonstrates the full enterprise system with API integration (Chapter 6), database persistence (Chapter 5), CRUD operations, advanced form fields, status management, priority levels, audit trails, loading states, error handling, real-time updates, testing strategies (Chapter 7), and performance optimization (Chapter 8). All features from the complete tutorial!
      </div>
    </div>
  )

  // Task Edit Form Component
  const TaskEditForm = ({ task, onSave, onCancel, isLoading }: {
    task: any,
    onSave: (data: any) => void,
    onCancel: () => void,
    isLoading: boolean
  }) => {
    const [editData, setEditData] = useState({
      title: task.title,
      assignedTo: task.assignedTo,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category
    })

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input 
              type="text" 
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <select 
              value={editData.assignedTo}
              onChange={(e) => setEditData({...editData, assignedTo: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="John Cleese">John Cleese</option>
              <option value="Michael Palin">Michael Palin</option>
              <option value="Terry Gilliam">Terry Gilliam</option>
              <option value="Current User">Current User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input 
              type="date" 
              value={editData.dueDate}
              onChange={(e) => setEditData({...editData, dueDate: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onSave(editData)}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // Basic Chapter 3 Demo (simplified)
  const Chapter3Demo = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gov-blue mb-6">
          Ministry of Silly Walks - Basic Task Manager
        </h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Add New Task</h2>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Enter task description"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button 
              onClick={addTask}
              className="bg-gov-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
          <div className="space-y-3">
            {tasks.slice(0, 3).map(task => (
              <div key={task.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <p className="text-gray-600 text-sm mt-1">Status: {task.status}</p>
                <p className="text-gray-600 text-sm">Assigned to: {task.assignedTo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded">
        <strong>Chapter 3 Learning:</strong> Basic JavaScript interactivity - click events, DOM manipulation, input validation, and dynamic task creation.
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gov-blue text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Ministry of Silly Walks - Tutorial Demo</h1>
              <p className="text-blue-100 mt-1">Your Learning Journey - Code You Actually Built</p>
            </div>
            <Link 
              href="/tutorial/chapter-9" 
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tutorial
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Congratulations Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-3">
            <Award className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-lg font-bold text-green-900">Congratulations!</h2>
          </div>
          <p className="text-green-800 mb-4">
            You've completed the BA Development Tutorial! Below is the <strong>exact task management system you built</strong> during your learning journey. 
            This shows the progression from basic HTML to a fully interactive web application.
          </p>
          <div className="text-sm text-green-700">
            <strong>What you accomplished:</strong> HTML structure → CSS styling → JavaScript interactivity → Understanding web development fundamentals
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">View Your Complete Learning Journey</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentDemo('chapter1')}
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                currentDemo === 'chapter1' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Chapter 1: HTML Structure
            </button>
            <button
              onClick={() => setCurrentDemo('chapter2')}
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                currentDemo === 'chapter2' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Palette className="w-4 h-4 mr-2" />
              Chapter 2: CSS Styling
            </button>
            <button
              onClick={() => setCurrentDemo('chapter3')}
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                currentDemo === 'chapter3' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Chapter 3: Basic Interactivity
            </button>
            <button
              onClick={() => setCurrentDemo('final')}
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                currentDemo === 'final' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Database className="w-4 h-4 mr-2" />
              Complete System (Chapters 4-9)
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            👆 Click each button to see how your system evolved from basic HTML to a complete enterprise application!
          </p>
        </div>

        {/* Demo Display */}
        <div>
          {currentDemo === 'chapter1' && <Chapter1Demo />}
          {currentDemo === 'chapter2' && <Chapter2Demo />}
          {currentDemo === 'chapter3' && <Chapter3Demo />}
          {currentDemo === 'final' && <AdvancedDemo />}
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">The Code You Wrote</h3>
          
          {currentDemo === 'chapter1' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">HTML Structure (Chapter 1)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" placeholder="Enter task description">
    
    <h2>Current Tasks</h2>
    <div>
        <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
        <p>Review submitted video and assess walk silliness level.</p>
        <p>Assigned to: John Cleese</p>
    </div>
</body>
</html>`}
              </pre>
            </div>
          )}

          {currentDemo === 'chapter2' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">CSS Styling (Chapter 2)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`/* Ministry of Silly Walks - Task Manager Styles */

body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
}

h1 {
    color: #003d7a;  /* Government blue */
    margin-bottom: 10px;
}

h2 {
    color: #4b5563;  /* Professional gray */
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
}

div {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`}
              </pre>
            </div>
          )}

          {currentDemo === 'chapter3' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">JavaScript Interactivity (Chapter 3)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Ministry of Silly Walks - Task Manager JavaScript

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('div');
    newTask.innerHTML = \`
        <h3>\${taskText}</h3>
        <p>Status: Pending</p>
        <p>Assigned to: Current User</p>
    \`;
    
    taskList.appendChild(newTask);
    input.value = '';
});`}
              </pre>
            </div>
          )}

          {currentDemo === 'final' && (
            <div className="space-y-6">
              <h4 className="font-medium text-gray-800">Complete System Architecture (Chapters 4-9)</h4>
              
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-700">Frontend with Advanced Features</h5>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Advanced Task Management with API Integration
const createTask = async (taskData) => {
    try {
        setIsLoading(true);
        
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: taskData.title,
                assignedTo: taskData.assignedTo,
                priority: taskData.priority,
                dueDate: taskData.dueDate,
                category: taskData.category,
                status: 'pending'
            })
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        
        const newTask = await response.json();
        setTasks(prev => [...prev, newTask]);
        setApiResponse({ status: 'success', message: 'Task created successfully' });
        
    } catch (error) {
        setApiResponse({ status: 'error', message: error.message });
    } finally {
        setIsLoading(false);
    }
};`}
                </pre>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-700">Backend API (Express.js) - Chapters 4 & 6</h5>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// RESTful API with Database Integration
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, assignedTo, priority, dueDate, category } = req.body;
        
        // Input validation
        if (!title || !assignedTo) {
            return res.status(400).json({ 
                error: 'Title and assignedTo are required' 
            });
        }
        
        // Database insertion
        const query = \`
            INSERT INTO tasks (title, assigned_to, priority, due_date, category, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
        \`;
        
        const result = await db.run(query, [title, assignedTo, priority, dueDate, category]);
        
        // Return created task
        const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', result.lastID);
        
        res.status(201).json({
            status: 'success',
            data: newTask,
            message: 'Task created successfully'
        });
        
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to create task'
        });
    }
});`}
                </pre>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-700">Database Schema (SQLite) - Chapter 5</h5>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Complete task management database schema
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date DATE,
    category VARCHAR(100) DEFAULT 'General',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance (Chapter 8)
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Audit trail trigger (Government compliance requirement)
CREATE TRIGGER update_tasks_timestamp 
    AFTER UPDATE ON tasks
BEGIN
    UPDATE tasks SET updated_at = datetime('now') WHERE id = NEW.id;
END;`}
                </pre>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-700">Testing Strategy (Chapter 7)</h5>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Unit Testing Example
describe('Task Management', () => {
  test('should create new task with valid data', async () => {
    const taskData = {
      title: 'Evaluate silly walk application',
      assignedTo: 'John Cleese',
      priority: 'high',
      dueDate: '2024-08-15'
    };
    
    const result = await createTask(taskData);
    expect(result.status).toBe('success');
    expect(result.data.title).toBe(taskData.title);
  });
  
  test('should reject task creation with missing title', async () => {
    const invalidData = { assignedTo: 'John Cleese' };
    
    await expect(createTask(invalidData))
      .rejects.toThrow('Title is required');
  });
});

// API Integration Testing
describe('API Endpoints', () => {
  test('POST /api/tasks returns 201 with valid data', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', assignedTo: 'Test User' })
      .expect(201);
      
    expect(response.body.status).toBe('success');
  });
});`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Your Complete Learning Achievement</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm mb-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Code className="w-4 h-4 mr-1" />
                Frontend Skills
              </h4>
              <ul className="text-blue-700 space-y-1">
                <li>• HTML semantic structure</li>
                <li>• CSS professional styling</li>
                <li>• JavaScript DOM manipulation</li>
                <li>• React components & state</li>
                <li>• Form handling & validation</li>
                <li>• User interface design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Database className="w-4 h-4 mr-1" />
                Backend & Database
              </h4>
              <ul className="text-blue-700 space-y-1">
                <li>• RESTful API design</li>
                <li>• HTTP methods & status codes</li>
                <li>• Database schema design</li>
                <li>• SQL queries & relationships</li>
                <li>• Error handling & validation</li>
                <li>• Data persistence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                System Integration
              </h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Frontend-backend communication</li>
                <li>• API integration patterns</li>
                <li>• Loading states & UX</li>
                <li>• Error handling strategies</li>
                <li>• Performance optimization</li>
                <li>• Testing & debugging</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Award className="w-4 h-4 mr-1" />
                BA Superpowers
              </h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Technical requirements writing</li>
                <li>• Developer collaboration</li>
                <li>• Understanding feasibility</li>
                <li>• Architecture discussions</li>
                <li>• Quality assurance planning</li>
                <li>• Stakeholder communication</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Enterprise System Features You Built:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <strong>Data Management:</strong>
                <ul className="ml-4 mt-1 space-y-1 text-blue-700">
                  <li>• Task creation, editing, deletion</li>
                  <li>• Priority levels & due dates</li>
                  <li>• Status tracking & categories</li>
                  <li>• Audit trails & timestamps</li>
                </ul>
              </div>
              <div>
                <strong>User Experience:</strong>
                <ul className="ml-4 mt-1 space-y-1 text-blue-700">
                  <li>• Real-time updates & feedback</li>
                  <li>• Loading states & error handling</li>
                  <li>• Intuitive forms & validation</li>
                  <li>• Professional government styling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-4">
            This demo shows the <strong>complete enterprise system you built</strong> throughout the entire tutorial. 
            You've progressed from basic HTML to a full-stack application with database integration, API design, and professional-grade features!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-green-800">
            <strong>🎉 Congratulations!</strong> You now understand how web applications work from the ground up and can collaborate effectively with development teams. You can write technical requirements, understand implementation challenges, estimate complexity, and facilitate better project delivery using your newfound technical knowledge.
          </div>
          <div className="space-x-4">
            <Link href="/tutorial/chapter-9" className="text-blue-600 hover:text-blue-800 underline">
              Return to Tutorial Final Chapter
            </Link>
            <Link href="/tutorial" className="text-blue-600 hover:text-blue-800 underline">
              Tutorial Overview
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}