'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Award, Code, Palette, Zap } from 'lucide-react'

// This demo showcases the exact code structure users built throughout the tutorial
export default function DemoApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Evaluate Mr. Smith's Silly Walk Application",
      description: "Review submitted video and assess walk silliness level.",
      assignedTo: "John Cleese",
      status: "Pending"
    }
  ])
  const [newTaskText, setNewTaskText] = useState('')
  const [currentDemo, setCurrentDemo] = useState('final')

  const addTask = () => {
    if (newTaskText.trim() === '') {
      alert('Please enter a task description')
      return
    }

    const newTask = {
      id: Date.now(),
      title: newTaskText,
      description: '',
      assignedTo: 'Current User',
      status: 'Pending'
    }

    setTasks(prev => [...prev, newTask])
    setNewTaskText('')
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

  // Demo showing interactive version from Chapter 3 - memoized to prevent recreation
  const Chapter3Demo = useMemo(() => {
    // Styles as constants to prevent recreation
    const containerStyle = {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }

    const h1Style = {
      color: '#003d7a',
      marginBottom: '10px',
      fontSize: '32px',
      fontWeight: 'bold' as const
    }

    const h2Style = {
      color: '#4b5563',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '5px',
      marginBottom: '15px',
      fontSize: '24px',
      fontWeight: 'bold' as const
    }

    const inputStyle = {
      width: 'calc(100% - 120px)',
      padding: '10px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '16px',
      marginRight: '10px',
      boxSizing: 'border-box' as const
    }

    const buttonStyle = {
      width: '100px',
      padding: '10px',
      backgroundColor: '#003d7a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer'
    }

    const taskCardStyle = {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }

    return (
      <div className="space-y-6">
        <div style={containerStyle}>
          <h1 style={h1Style}>
            Ministry of Silly Walks - Task Manager
          </h1>
          
          <h2 style={h2Style}>
            Add New Task
          </h2>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Enter task description"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              style={inputStyle}
            />
            <button 
              onClick={addTask}
              style={buttonStyle}
            >
              Add Task
            </button>
          </div>
          
          <h2 style={h2Style}>
            Current Tasks
          </h2>
          <div>
            {tasks.map(task => (
              <div key={task.id} style={taskCardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  {task.title}
                </h3>
                {task.description && (
                  <p style={{ marginBottom: '5px', color: '#6b7280' }}>
                    {task.description}
                  </p>
                )}
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
                  Status: {task.status}
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  Assigned to: {task.assignedTo}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded">
          <strong>Chapter 3 Learning:</strong> Added JavaScript interactivity - click events, DOM manipulation, input validation, and dynamic task creation. Try adding a task above!
        </div>
      </div>
    )
  }, [newTaskText, tasks])

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
              href="/tutorial/chapter-10" 
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
            <h2 className="text-lg font-bold text-green-900">🎉 Congratulations!</h2>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">View Your Progress</h3>
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
              onClick={() => setCurrentDemo('final')}
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                currentDemo === 'final' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Chapter 3: Interactive (Final)
            </button>
          </div>
        </div>

        {/* Demo Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {currentDemo === 'chapter1' && <Chapter1Demo />}
          {currentDemo === 'chapter2' && <Chapter2Demo />}
          {currentDemo === 'final' && Chapter3Demo}
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

          {currentDemo === 'final' && (
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
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What You Learned</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Technical Skills</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• HTML semantic structure</li>
                <li>• CSS professional styling</li>
                <li>• JavaScript DOM manipulation</li>
                <li>• Event handling</li>
                <li>• Input validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">BA Understanding</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• How requirements become code</li>
                <li>• Frontend-backend concepts</li>
                <li>• User experience considerations</li>
                <li>• Technical constraints</li>
                <li>• Development process</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Real-World Skills</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Speaking developer language</li>
                <li>• Understanding feasibility</li>
                <li>• Writing better requirements</li>
                <li>• Technical problem-solving</li>
                <li>• Team collaboration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-4">
            This demo shows the <strong>exact code you wrote</strong> during the tutorial. 
            You've gone from knowing nothing about web development to building a working application!
          </p>
          <div className="space-x-4">
            <Link href="/tutorial" className="text-blue-600 hover:text-blue-800 underline">
              Return to Tutorial Overview
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