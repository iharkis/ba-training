'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, RefreshCw, Lightbulb, Code, Zap, Globe } from 'lucide-react'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter7() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

  const steps = [
    {
      id: 'frontend-backend-integration',
      title: 'Connecting Frontend to Backend',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 7: Connecting Frontend to Backend</h2>
          <p className="text-lg text-gray-600">
            Perfect! You now have a complete backend API with database storage. But your original frontend is still using localStorage. Let's connect your frontend to the backend API to create a true client-server application.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">Frontend-Backend Communication</div>
            <div className="explanation-text">
              <p className="mb-3">
                Modern web applications separate the user interface (frontend) from business logic and data (backend). This architecture enables better scalability, security, and team collaboration.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Client-Server Model:</strong> Browser requests data from server</li>
                <li><strong>API Integration:</strong> Frontend calls backend endpoints</li>
                <li><strong>Asynchronous Operations:</strong> Non-blocking data requests</li>
                <li><strong>Error Handling:</strong> Graceful handling of network issues</li>
              </ul>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Enterprise Architecture Benefits</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Connecting your frontend to the backend transforms your application from a single-user tool to an enterprise system:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Current State</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Frontend uses localStorage only</li>
                  <li>• Backend exists but frontend doesn't use it</li>
                  <li>• Each user has isolated data</li>
                  <li>• No centralized data management</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Integrated System</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Shared data across all users</li>
                  <li>• Real-time collaboration possible</li>
                  <li>• Centralized business logic</li>
                  <li>• Enterprise reporting and analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: System Integration
            </div>
            <p className="concept-text">
              When you write requirements about "real-time data sharing" or "centralized reporting," you're defining frontend-backend integration needs. Understanding API calls, error handling, and data synchronization helps you write more precise requirements about system behavior and user experience.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll modify your frontend to use the backend API instead of localStorage. You'll learn about API integration patterns, error handling, and how to create seamless user experiences with client-server communication.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-yellow-800 mb-2">🎓 Concept Overview</h4>
            <p className="text-yellow-700 text-sm">
              This chapter focuses on understanding the integration concepts rather than detailed coding. You'll learn how frontend and backend systems work together, which is essential knowledge for writing requirements and working with development teams.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'api-integration-concepts',
      title: 'Step 1: API Integration Patterns',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Understanding API Integration</h3>
          
          <div className="explanation-box">
            <div className="explanation-title">Key Integration Concepts</div>
            <div className="explanation-text">
              <p className="mb-4">
                Here's how your frontend would connect to your backend API:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium mb-2">1. Replace localStorage with API calls:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <code>saveTasks()</code> → <code>POST /tasks</code></li>
                  <li>• <code>loadTasks()</code> → <code>GET /tasks</code></li>
                  <li>• <code>updateTask()</code> → <code>PUT /tasks/:id</code></li>
                  <li>• <code>deleteTask()</code> → <code>DELETE /tasks/:id</code></li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium mb-2">2. Handle asynchronous operations:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Show loading states while API calls complete</li>
                  <li>• Handle network errors gracefully</li>
                  <li>• Provide user feedback for success/failure</li>
                  <li>• Implement retry mechanisms for failed requests</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">3. Improve user experience:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Optimistic updates (show changes immediately)</li>
                  <li>• Real-time synchronization between users</li>
                  <li>• Offline capability with sync when reconnected</li>
                  <li>• Consistent error messaging</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Code className="w-5 h-5 mr-2" />
              Technical Implementation Example
            </div>
            <div className="concept-text">
              <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono">
                <div className="text-green-400">// Before: localStorage</div>
                <div>function saveTasks(tasks) {'{'}</div>
                <div>  localStorage.setItem('tasks', JSON.stringify(tasks))</div>
                <div>{'}'}</div>
                <br />
                <div className="text-green-400">// After: API call</div>
                <div>async function createTask(task) {'{'}</div>
                <div>  const response = await fetch('/api/tasks', {'{'}</div>
                <div>    method: 'POST',</div>
                <div>    headers: {'{'} 'Content-Type': 'application/json' {'}'},</div>
                <div>    body: JSON.stringify(task)</div>
                <div>  {'}'})</div>
                <div>  return response.json()</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'error-handling-patterns',
      title: 'Step 2: Error Handling & User Experience',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Handling Real-World Scenarios</h3>
          
          <div className="ministry-content">
            <p className="mb-4">
              Real applications must handle various scenarios that don't exist with localStorage:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-3 flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Network Issues
                </h4>
                <ul className="text-sm text-red-800 space-y-2">
                  <li>• Server temporarily unavailable</li>
                  <li>• Slow or timeout responses</li>
                  <li>• User loses internet connection</li>
                  <li>• API rate limiting</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Business Logic Errors
                </h4>
                <ul className="text-sm text-yellow-800 space-y-2">
                  <li>• Validation failures (missing data)</li>
                  <li>• Permission denied (user authorization)</li>
                  <li>• Resource not found (deleted by another user)</li>
                  <li>• Concurrent modification conflicts</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
              <h4 className="font-medium text-green-900 mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                User Experience Solutions
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Loading States:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Show spinner during API calls</li>
                    <li>• Disable buttons to prevent duplicate requests</li>
                    <li>• Display progress for long operations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Error Recovery:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Clear error messages with retry options</li>
                    <li>• Automatic retry for network failures</li>
                    <li>• Offline mode with sync when reconnected</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Requirements Impact
            </div>
            <p className="concept-text">
              These technical considerations directly impact user requirements. When you write "the system should be reliable" or "users should receive clear feedback," you're defining these error handling and UX requirements. Understanding these patterns helps you write more comprehensive acceptance criteria.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'integration-benefits',
      title: 'Step 3: Enterprise Integration Benefits',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Why Integration Matters for Business</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              Connecting your frontend to the backend unlocks enterprise capabilities that localStorage cannot provide:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 text-lg">🤝 Multi-User Collaboration</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Real-time Features:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• John Cleese assigns tasks to Terry Jones</li>
                      <li>• Status updates visible to all staff</li>
                      <li>• Concurrent editing with conflict resolution</li>
                      <li>• Notification system for task changes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Business Impact:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Improved team coordination</li>
                      <li>• Reduced duplicate work</li>
                      <li>• Better workload visibility</li>
                      <li>• Faster decision making</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3 text-lg">📊 Centralized Reporting</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Analytics Capabilities:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Task completion rates by staff member</li>
                      <li>• Average time to complete walk evaluations</li>
                      <li>• Department workload trends</li>
                      <li>• Performance dashboards for management</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Business Value:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Data-driven resource allocation</li>
                      <li>• Process improvement identification</li>
                      <li>• Performance measurement</li>
                      <li>• Compliance reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 text-lg">🔒 Enterprise Security & Compliance</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Security Features:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• User authentication and authorization</li>
                      <li>• Role-based access control</li>
                      <li>• Audit trails for all changes</li>
                      <li>• Data encryption and backup</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Compliance Benefits:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Government data retention requirements</li>
                      <li>• GDPR privacy compliance</li>
                      <li>• Audit trail for accountability</li>
                      <li>• Secure data handling procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">🎯 Chapter Summary</h4>
            <p className="mb-3">
              You've learned how frontend-backend integration transforms a simple tool into an enterprise system. This architecture enables:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Multi-user collaboration and real-time updates</li>
              <li>• Centralized data management and reporting</li>
              <li>• Enterprise security and compliance features</li>
              <li>• Scalable architecture for growing organizations</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const markStepCompleteLocal = (index: number) => {
    if (!completedSteps.includes(index)) {
      const newCompleted = [...completedSteps, index]
      setCompletedSteps(newCompleted)
      markStepComplete(steps[index].id)
    }
  }

  const allStepsComplete = completedSteps.length === steps.length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tutorial/chapter-6" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 6
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 7: Connecting Frontend to Backend</h1>
              <p className="text-sm text-gray-600">Creating integrated client-server architecture</p>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="tutorial-card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 7 Progress</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === index
                        ? 'bg-tutorial-primary text-white'
                        : completedSteps.includes(index)
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      ) : (
                        <div className={`w-5 h-5 mr-3 rounded-full border-2 ${
                          currentStep === index ? 'border-white' : 'border-gray-300'
                        }`} />
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {allStepsComplete && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 7 Complete!</p>
                  <Link 
                    href="/tutorial/chapter-8" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 8
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Chapter Progress</span>
                  <span className="text-sm text-gray-500">
                    {completedSteps.length} / {steps.length} completed
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="tutorial-card">
                {steps[currentStep].content}
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`flex items-center ${
                      currentStep === 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-tutorial-primary hover:text-blue-700'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>

                  <button
                    onClick={() => {
                      markStepCompleteLocal(currentStep)
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(currentStep + 1)
                      }
                    }}
                    className="tutorial-button-primary"
                  >
                    {completedSteps.includes(currentStep) 
                      ? currentStep === steps.length - 1 
                        ? 'Complete Chapter' 
                        : 'Next Step'
                      : 'Continue Learning'
                    }
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}