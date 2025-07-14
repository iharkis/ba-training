'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, RefreshCw, Lightbulb, Code, Zap, Globe } from 'lucide-react'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter7() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

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
            Perfect! You now have a complete backend API with database storage. But your original frontend is still using localStorage. Let's replace localStorage with actual API calls to create a true client-server application.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What We'll Build</div>
            <div className="explanation-text">
              <p className="mb-3">
                In this chapter, you'll make actual code changes to connect your frontend to the backend API. You'll see the complete data flow from button click to database storage.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Replace localStorage calls</strong> with HTTP API requests</li>
                <li><strong>Add loading states</strong> to show users when requests are processing</li>
                <li><strong>Handle errors gracefully</strong> when the network fails</li>
                <li><strong>Show real-time updates</strong> from the shared database</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-medium text-yellow-900 mb-3 text-lg flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" />
              Real Development: Changing Requirements
            </h4>
            <p className="text-sm text-yellow-800 mb-3">
              In real projects, requirements often change during development. The Ministry has just requested additional features:
            </p>
            <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-700 mb-2">
                <strong>New Requirement:</strong> "Users should see a loading indicator when tasks are being saved, and if the server is down, they should get a clear error message with a retry option."
              </p>
              <p className="text-xs text-yellow-600">
                This is typical - stakeholders see the working system and realize they need better user feedback. As a BA, you'll need to understand how this impacts the technical implementation.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">From Single-User to Multi-User</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Here's what changes when you connect frontend to backend:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Before: localStorage</h4>
                <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono">
                  <div className="text-green-400">// Data stays on your computer</div>
                  <div>localStorage.setItem('tasks', data)</div>
                  <div>// Only you can see your tasks</div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">After: API calls</h4>
                <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono">
                  <div className="text-green-400">// Data saved to shared database</div>
                  <div>fetch('/api/tasks', {'{method: "POST"}'}</div>
                  <div className="text-green-400">// Everyone sees the same data</div>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Requirements Impact
            </div>
            <p className="concept-text">
              When you write "the system should allow multiple users to collaborate on tasks," you're defining the need for API integration. Understanding the technical implementation helps you write better acceptance criteria about loading states, error handling, and real-time updates.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll make actual code changes to replace localStorage with API calls. You'll see the complete journey from button click to database storage, including error handling and loading states.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-yellow-800 mb-2">🔧 Hands-On Integration</h4>
            <p className="text-yellow-700 text-sm">
              This chapter includes actual coding exercises. You'll modify real code to see how frontend-backend integration works in practice. Each exercise shows the before and after code with explanations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'replace-load-tasks',
      title: 'Exercise 1: Replace loadTasks() with GET /api/tasks',
      type: 'coding',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Exercise 1: Loading Tasks from the Database</h3>
          
          <div className="ministry-content">
            <p className="mb-4">
              Currently, your frontend loads tasks from localStorage when the page loads. Let's replace this with an API call to fetch tasks from the shared database.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">❌ Before: localStorage (Single User)</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code loads tasks from browser storage</div>
              <div className="text-green-400">// Only YOU can see these tasks</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">loadTasks</span> = () {'=>'} {'{'}</div>
              <div>  <span className="text-blue-400">const</span> <span className="text-yellow-400">saved</span> = <span className="text-purple-400">localStorage</span>.<span className="text-yellow-400">getItem</span>(<span className="text-green-300">'tasks'</span>)</div>
              <div>  <span className="text-blue-400">if</span> (<span className="text-yellow-400">saved</span>) {'{'}</div>
              <div>    <span className="text-blue-400">return</span> <span className="text-purple-400">JSON</span>.<span className="text-yellow-400">parse</span>(<span className="text-yellow-400">saved</span>)</div>
              <div>  {'}'}</div>
              <div>  <span className="text-blue-400">return</span> []</div>
              <div>{'}'}</div>
              <br />
              <div className="text-green-400">// Called when page loads</div>
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">tasks</span> = <span className="text-yellow-400">loadTasks</span>()</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3">✅ After: API Call (Multi-User)</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code loads tasks from shared database</div>
              <div className="text-green-400">// EVERYONE sees the same tasks</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">loadTasks</span> = <span className="text-blue-400">async</span> () {'=>'} {'{'}</div>
              <div>  <span className="text-blue-400">try</span> {'{'}</div>
              <div>    <span className="text-blue-400">const</span> <span className="text-yellow-400">response</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">fetch</span>(<span className="text-green-300">'/api/tasks'</span>)</div>
              <div>    <span className="text-blue-400">if</span> (!<span className="text-yellow-400">response</span>.<span className="text-yellow-400">ok</span>) {'{'}</div>
              <div>      <span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-yellow-400">Error</span>(<span className="text-green-300">'Failed to load tasks'</span>)</div>
              <div>    {'}'}</div>
              <div>    <span className="text-blue-400">const</span> <span className="text-yellow-400">tasks</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">response</span>.<span className="text-yellow-400">json</span>()</div>
              <div>    <span className="text-blue-400">return</span> <span className="text-yellow-400">tasks</span></div>
              <div>  {'}'} <span className="text-blue-400">catch</span> (<span className="text-yellow-400">error</span>) {'{'}</div>
              <div>    <span className="text-purple-400">console</span>.<span className="text-yellow-400">error</span>(<span className="text-green-300">'Error loading tasks:'</span>, <span className="text-yellow-400">error</span>)</div>
              <div>    <span className="text-blue-400">return</span> [] <span className="text-green-400">// Return empty array if failed</span></div>
              <div>  {'}'}</div>
              <div>{'}'}</div>
              <br />
              <div className="text-green-400">// Called when page loads (now async)</div>
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">tasks</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">loadTasks</span>()</div>
            </div>
          </div>

          <div className="explanation-box">
            <div className="explanation-title">What Changed?</div>
            <div className="explanation-text">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Key Changes:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Function is now <code>async</code> (asynchronous)</li>
                    <li>• Uses <code>fetch()</code> instead of <code>localStorage</code></li>
                    <li>• Calls <code>GET /api/tasks</code> endpoint</li>
                    <li>• Includes error handling with <code>try/catch</code></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Business Impact:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• All users see the same tasks</li>
                    <li>• Tasks persist across devices</li>
                    <li>• Real-time collaboration possible</li>
                    <li>• Graceful handling of network issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Code className="w-5 h-5 mr-2" />
              Data Flow: Button Click to Database
            </div>
            <div className="concept-text">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Complete Data Journey:</h5>
                <div className="text-sm space-y-2">
                  <div>1. <strong>Page loads</strong> → <code>loadTasks()</code> called</div>
                  <div>2. <strong>Browser</strong> → <code>GET /api/tasks</code> → <strong>Your Server</strong></div>
                  <div>3. <strong>Server</strong> → <code>SELECT * FROM tasks</code> → <strong>Database</strong></div>
                  <div>4. <strong>Database</strong> → Returns task data → <strong>Server</strong></div>
                  <div>5. <strong>Server</strong> → Returns JSON → <strong>Browser</strong></div>
                  <div>6. <strong>Browser</strong> → Displays tasks to user</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'replace-add-task',
      title: 'Exercise 2: Replace addTask() with POST /api/tasks',
      type: 'coding',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Exercise 2: Adding Tasks to the Database</h3>
          
          <div className="ministry-content">
            <p className="mb-4">
              When a user clicks "Add Task," your frontend currently saves to localStorage. Let's replace this with an API call that saves to the shared database and shows loading states.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">❌ Before: localStorage (Single User)</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code saves tasks to browser storage</div>
              <div className="text-green-400">// Only YOU can see these tasks</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">addTask</span> = (<span className="text-yellow-400">taskText</span>) {'=>'} {'{'}</div>
              <div>  <span className="text-blue-400">const</span> <span className="text-yellow-400">newTask</span> = {'{'}</div>
              <div>    <span className="text-yellow-400">id</span>: <span className="text-purple-400">Date</span>.<span className="text-yellow-400">now</span>(),</div>
              <div>    <span className="text-yellow-400">text</span>: <span className="text-yellow-400">taskText</span>,</div>
              <div>    <span className="text-yellow-400">completed</span>: <span className="text-blue-400">false</span></div>
              <div>  {'}'}</div>
              <div>  </div>
              <div>  <span className="text-blue-400">const</span> <span className="text-yellow-400">tasks</span> = <span className="text-yellow-400">loadTasks</span>()</div>
              <div>  <span className="text-yellow-400">tasks</span>.<span className="text-yellow-400">push</span>(<span className="text-yellow-400">newTask</span>)</div>
              <div>  <span className="text-purple-400">localStorage</span>.<span className="text-yellow-400">setItem</span>(<span className="text-green-300">'tasks'</span>, <span className="text-purple-400">JSON</span>.<span className="text-yellow-400">stringify</span>(<span className="text-yellow-400">tasks</span>))</div>
              <div>{'}'}</div>
              <br />
              <div className="text-green-400">// Called when button clicked</div>
              <div><span className="text-yellow-400">addTask</span>(<span className="text-green-300">'Review planning application'</span>)</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3">✅ After: API Call with Loading States</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code saves tasks to shared database</div>
              <div className="text-green-400">// EVERYONE sees the same tasks</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">addTask</span> = <span className="text-blue-400">async</span> (<span className="text-yellow-400">taskText</span>) {'=>'} {'{'}</div>
              <div>  <span className="text-green-400">// 1. Show loading state</span></div>
              <div>  <span className="text-yellow-400">setIsLoading</span>(<span className="text-blue-400">true</span>)</div>
              <div>  <span className="text-yellow-400">setError</span>(<span className="text-blue-400">null</span>)</div>
              <div>  </div>
              <div>  <span className="text-blue-400">try</span> {'{'}</div>
              <div>    <span className="text-green-400">// 2. Prepare task data</span></div>
              <div>    <span className="text-blue-400">const</span> <span className="text-yellow-400">newTask</span> = {'{'}</div>
              <div>      <span className="text-yellow-400">text</span>: <span className="text-yellow-400">taskText</span>,</div>
              <div>      <span className="text-yellow-400">completed</span>: <span className="text-blue-400">false</span></div>
              <div>    {'}'}</div>
              <div>    </div>
              <div>    <span className="text-green-400">// 3. Send to database</span></div>
              <div>    <span className="text-blue-400">const</span> <span className="text-yellow-400">response</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">fetch</span>(<span className="text-green-300">'/api/tasks'</span>, {'{'}</div>
              <div>      <span className="text-yellow-400">method</span>: <span className="text-green-300">'POST'</span>,</div>
              <div>      <span className="text-yellow-400">headers</span>: {'{'}</div>
              <div>        <span className="text-green-300">'Content-Type'</span>: <span className="text-green-300">'application/json'</span></div>
              <div>      {'}'},</div>
              <div>      <span className="text-yellow-400">body</span>: <span className="text-purple-400">JSON</span>.<span className="text-yellow-400">stringify</span>(<span className="text-yellow-400">newTask</span>)</div>
              <div>    {'}'})</div>
              <div>    </div>
              <div>    <span className="text-blue-400">if</span> (!<span className="text-yellow-400">response</span>.<span className="text-yellow-400">ok</span>) {'{'}</div>
              <div>      <span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-yellow-400">Error</span>(<span className="text-green-300">'Failed to add task'</span>)</div>
              <div>    {'}'}</div>
              <div>    </div>
              <div>    <span className="text-green-400">// 4. Reload tasks to show updated list</span></div>
              <div>    <span className="text-blue-400">await</span> <span className="text-yellow-400">loadTasks</span>()</div>
              <div>    </div>
              <div>  {'}'} <span className="text-blue-400">catch</span> (<span className="text-yellow-400">error</span>) {'{'}</div>
              <div>    <span className="text-green-400">// 5. Show error to user</span></div>
              <div>    <span className="text-yellow-400">setError</span>(<span className="text-green-300">'Failed to add task. Please try again.'</span>)</div>
              <div>    <span className="text-purple-400">console</span>.<span className="text-yellow-400">error</span>(<span className="text-green-300">'Error adding task:'</span>, <span className="text-yellow-400">error</span>)</div>
              <div>  {'}'} <span className="text-blue-400">finally</span> {'{'}</div>
              <div>    <span className="text-green-400">// 6. Hide loading state</span></div>
              <div>    <span className="text-yellow-400">setIsLoading</span>(<span className="text-blue-400">false</span>)</div>
              <div>  {'}'}</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="explanation-box">
            <div className="explanation-title">What Changed?</div>
            <div className="explanation-text">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Technical Changes:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Function is now <code>async</code></li>
                    <li>• Uses <code>POST /api/tasks</code> instead of localStorage</li>
                    <li>• Includes loading states (<code>setIsLoading</code>)</li>
                    <li>• Proper error handling with user feedback</li>
                    <li>• Refreshes task list after adding</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">User Experience:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Button shows "Adding..." while processing</li>
                    <li>• Clear error messages if something fails</li>
                    <li>• Task appears immediately for all users</li>
                    <li>• Prevents duplicate submissions</li>
                    <li>• Graceful recovery from network issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Zap className="w-5 h-5 mr-2" />
              Complete User Flow: Add Task
            </div>
            <div className="concept-text">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">What happens when John Cleese adds a task:</h5>
                <div className="text-sm space-y-2">
                  <div>1. <strong>John clicks "Add Task"</strong> → Button shows "Adding..."</div>
                  <div>2. <strong>Browser</strong> → <code>POST /api/tasks</code> → <strong>Server</strong></div>
                  <div>3. <strong>Server</strong> → <code>INSERT INTO tasks</code> → <strong>Database</strong></div>
                  <div>4. <strong>Database</strong> → Task saved with ID → <strong>Server</strong></div>
                  <div>5. <strong>Server</strong> → Success response → <strong>Browser</strong></div>
                  <div>6. <strong>Browser</strong> → Reloads task list → <strong>All users see new task</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 BA Requirements Connection</h4>
            <p className="text-yellow-700 text-sm">
              When you write "the system should provide immediate feedback when users add tasks," you're defining these loading states and error handling requirements. Understanding this technical implementation helps you write more specific acceptance criteria about user experience during API operations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'replace-delete-task',
      title: 'Exercise 3: Complete Integration with DELETE /api/tasks/:id',
      type: 'coding',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Exercise 3: Deleting Tasks and Error Handling</h3>
          
          <div className="ministry-content">
            <p className="mb-4">
              Let's complete the integration by replacing task deletion with an API call and adding comprehensive error handling that shows users exactly what's happening.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-3">❌ Before: localStorage (Single User)</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code removes tasks from browser storage</div>
              <div className="text-green-400">// Only affects YOUR local copy</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">deleteTask</span> = (<span className="text-yellow-400">taskId</span>) {'=>'} {'{'}</div>
              <div>  <span className="text-blue-400">const</span> <span className="text-yellow-400">tasks</span> = <span className="text-yellow-400">loadTasks</span>()</div>
              <div>  <span className="text-blue-400">const</span> <span className="text-yellow-400">filtered</span> = <span className="text-yellow-400">tasks</span>.<span className="text-yellow-400">filter</span>(<span className="text-yellow-400">task</span> {'=>'} <span className="text-yellow-400">task</span>.<span className="text-yellow-400">id</span> !== <span className="text-yellow-400">taskId</span>)</div>
              <div>  <span className="text-purple-400">localStorage</span>.<span className="text-yellow-400">setItem</span>(<span className="text-green-300">'tasks'</span>, <span className="text-purple-400">JSON</span>.<span className="text-yellow-400">stringify</span>(<span className="text-yellow-400">filtered</span>))</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3">✅ After: API Call with Complete Error Handling</h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="text-green-400">// This code deletes tasks from shared database</div>
              <div className="text-green-400">// Affects ALL users - they won't see the task anymore</div>
              <br />
              <div><span className="text-blue-400">const</span> <span className="text-yellow-400">deleteTask</span> = <span className="text-blue-400">async</span> (<span className="text-yellow-400">taskId</span>) {'=>'} {'{'}</div>
              <div>  <span className="text-green-400">// 1. Show loading state</span></div>
              <div>  <span className="text-yellow-400">setIsDeleting</span>(<span className="text-yellow-400">taskId</span>) <span className="text-green-400">// Show spinner on this specific task</span></div>
              <div>  <span className="text-yellow-400">setError</span>(<span className="text-blue-400">null</span>)</div>
              <div>  </div>
              <div>  <span className="text-blue-400">try</span> {'{'}</div>
              <div>    <span className="text-green-400">// 2. Send delete request</span></div>
              <div>    <span className="text-blue-400">const</span> <span className="text-yellow-400">response</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">fetch</span>(<span className="text-green-300">`/api/tasks/${'{'}<span className="text-yellow-400">taskId</span>{'}'}`</span>, {'{'}</div>
              <div>      <span className="text-yellow-400">method</span>: <span className="text-green-300">'DELETE'</span></div>
              <div>    {'}'})</div>
              <div>    </div>
              <div>    <span className="text-green-400">// 3. Handle different types of errors</span></div>
              <div>    <span className="text-blue-400">if</span> (<span className="text-yellow-400">response</span>.<span className="text-yellow-400">status</span> === <span className="text-purple-400">404</span>) {'{'}</div>
              <div>      <span className="text-yellow-400">setError</span>(<span className="text-green-300">'Task not found - it may have been deleted by another user'</span>)</div>
              <div>      <span className="text-blue-400">return</span></div>
              <div>    {'}'}</div>
              <div>    </div>
              <div>    <span className="text-blue-400">if</span> (<span className="text-yellow-400">response</span>.<span className="text-yellow-400">status</span> === <span className="text-purple-400">403</span>) {'{'}</div>
              <div>      <span className="text-yellow-400">setError</span>(<span className="text-green-300">'Permission denied - you cannot delete this task'</span>)</div>
              <div>      <span className="text-blue-400">return</span></div>
              <div>    {'}'}</div>
              <div>    </div>
              <div>    <span className="text-blue-400">if</span> (!<span className="text-yellow-400">response</span>.<span className="text-yellow-400">ok</span>) {'{'}</div>
              <div>      <span className="text-blue-400">throw</span> <span className="text-blue-400">new</span> <span className="text-yellow-400">Error</span>(<span className="text-green-300">'Server error - please try again'</span>)</div>
              <div>    {'}'}</div>
              <div>    </div>
              <div>    <span className="text-green-400">// 4. Success - reload tasks to show updated list</span></div>
              <div>    <span className="text-blue-400">await</span> <span className="text-yellow-400">loadTasks</span>()</div>
              <div>    <span className="text-yellow-400">setSuccessMessage</span>(<span className="text-green-300">'Task deleted successfully'</span>)</div>
              <div>    </div>
              <div>  {'}'} <span className="text-blue-400">catch</span> (<span className="text-yellow-400">error</span>) {'{'}</div>
              <div>    <span className="text-green-400">// 5. Handle network errors</span></div>
              <div>    <span className="text-blue-400">if</span> (<span className="text-yellow-400">error</span>.<span className="text-yellow-400">name</span> === <span className="text-green-300">'NetworkError'</span>) {'{'}</div>
              <div>      <span className="text-yellow-400">setError</span>(<span className="text-green-300">'Network error - please check your connection'</span>)</div>
              <div>    {'}'} <span className="text-blue-400">else</span> {'{'}</div>
              <div>      <span className="text-yellow-400">setError</span>(<span className="text-green-300">'Failed to delete task. Please try again.'</span>)</div>
              <div>    {'}'}</div>
              <div>    <span className="text-purple-400">console</span>.<span className="text-yellow-400">error</span>(<span className="text-green-300">'Delete error:'</span>, <span className="text-yellow-400">error</span>)</div>
              <div>    </div>
              <div>  {'}'} <span className="text-blue-400">finally</span> {'{'}</div>
              <div>    <span className="text-green-400">// 6. Hide loading state</span></div>
              <div>    <span className="text-yellow-400">setIsDeleting</span>(<span className="text-blue-400">null</span>)</div>
              <div>  {'}'}</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="explanation-box">
            <div className="explanation-title">Advanced Error Handling</div>
            <div className="explanation-text">
              <p className="mb-3">
                Notice how the API version handles different types of errors with specific user messages:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Error Types:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>404:</strong> Task not found (deleted by another user)</li>
                    <li>• <strong>403:</strong> Permission denied (insufficient access)</li>
                    <li>• <strong>500:</strong> Server error (try again)</li>
                    <li>• <strong>Network:</strong> Connection issues</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">User Experience:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Specific error messages for each scenario</li>
                    <li>• Loading spinner on the specific task</li>
                    <li>• Success confirmation when completed</li>
                    <li>• Automatic retry suggestions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">🔄 Complete Integration Summary</h4>
            <p className="text-blue-800 mb-3">
              You've now replaced all localStorage operations with API calls:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-blue-900">Load Tasks</div>
                <div className="text-blue-700">GET /api/tasks</div>
                <div className="text-gray-600">Fetch all tasks from database</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-blue-900">Add Task</div>
                <div className="text-blue-700">POST /api/tasks</div>
                <div className="text-gray-600">Create new task in database</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-blue-900">Delete Task</div>
                <div className="text-blue-700">DELETE /api/tasks/:id</div>
                <div className="text-gray-600">Remove task from database</div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Globe className="w-5 h-5 mr-2" />
              Real-World Scenario: Multi-User Collaboration
            </div>
            <div className="concept-text">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">What happens in the real world:</h5>
                <div className="text-sm space-y-2">
                  <div>1. <strong>John Cleese</strong> creates task "Review planning application"</div>
                  <div>2. <strong>Terry Jones</strong> sees the task immediately (shared database)</div>
                  <div>3. <strong>Terry</strong> starts working on it (could add a "in progress" status)</div>
                  <div>4. <strong>John</strong> refreshes and sees Terry's progress</div>
                  <div>5. <strong>Both users</strong> have consistent, up-to-date information</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">🎯 Chapter Complete!</h4>
            <p className="mb-3">
              You've successfully transformed your application from single-user localStorage to a multi-user system with:
            </p>
            <ul className="text-sm space-y-1">
              <li>• <strong>Real API integration</strong> - GET, POST, DELETE operations</li>
              <li>• <strong>Comprehensive error handling</strong> - Network, business logic, and user errors</li>
              <li>• <strong>Loading states</strong> - Visual feedback during API operations</li>
              <li>• <strong>Multi-user collaboration</strong> - Shared data across all users</li>
              <li>• <strong>Enterprise architecture</strong> - Scalable client-server design</li>
            </ul>
            <p className="mt-4 text-sm opacity-90">
              As a BA, you now understand exactly what happens when users interact with integrated systems. This knowledge helps you write precise requirements about API behavior, error handling, and user experience.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'iterative-development',
      title: 'Step 1: Handling Changing Requirements',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Real Development: Requirements Evolution</h3>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 text-lg">📋 Initial Requirements vs. Reality</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-800 mb-2">What We Started With:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• "Users should be able to create tasks"</li>
                  <li>• "Tasks should be saved permanently"</li>
                  <li>• "Multiple users should see the same data"</li>
                  <li>• "Basic error handling"</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <h5 className="font-medium text-green-800 mb-2">What Stakeholders Want Now:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• "Show loading indicators during saves"</li>
                  <li>• "Clear error messages with retry options"</li>
                  <li>• "Prevent duplicate submissions"</li>
                  <li>• "Offline mode with sync when back online"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-3 text-lg flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" />
              Why Requirements Change
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Common Reasons:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>User Testing:</strong> Users discover pain points when actually using the system</li>
                  <li>• <strong>Technical Constraints:</strong> Implementation reveals limitations not considered initially</li>
                  <li>• <strong>Business Environment:</strong> External factors change business priorities</li>
                  <li>• <strong>Stakeholder Learning:</strong> Seeing the working system helps stakeholders understand what's possible</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-700">
                  <strong>Ministry Example:</strong> After seeing the working task system, John Cleese realizes that when the network is slow, users might click "Add Task" multiple times, creating duplicate tasks. This wasn't in the original requirements because it only becomes apparent when the system is actually used.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-3 text-lg">🔄 Iterative Development Process</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded">
                <h5 className="font-medium text-purple-800 mb-2">Phase 1: Build Core Functionality</h5>
                <p className="text-sm text-purple-700 mb-2">Focus on essential features that prove the concept works:</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>✓ Basic task creation and display</li>
                  <li>✓ API connectivity</li>
                  <li>✓ Database persistence</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded">
                <h5 className="font-medium text-purple-800 mb-2">Phase 2: User Feedback & Refinement</h5>
                <p className="text-sm text-purple-700 mb-2">Stakeholders use the system and identify improvements:</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>📋 "I clicked add task but nothing happened - turns out it was just slow"</li>
                  <li>📋 "When the server is down, I get a confusing error message"</li>
                  <li>📋 "I accidentally created the same task twice"</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded">
                <h5 className="font-medium text-purple-800 mb-2">Phase 3: Enhanced Implementation</h5>
                <p className="text-sm text-purple-700 mb-2">Address the feedback with better user experience:</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>🔄 Add loading indicators and disable buttons during operations</li>
                  <li>🔄 Implement user-friendly error messages with retry options</li>
                  <li>🔄 Prevent duplicate submissions with request debouncing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Managing Change
            </div>
            <div className="concept-text">
              <p className="mb-3">
                As a BA, you play a crucial role in managing requirement changes:
              </p>
              <ul className="text-sm space-y-2">
                <li>• <strong>Anticipate Common Needs:</strong> Based on your technical understanding, you can write initial requirements that include loading states and error handling</li>
                <li>• <strong>Facilitate User Testing:</strong> Set up early demos to gather feedback before development is complete</li>
                <li>• <strong>Prioritize Changes:</strong> Help stakeholders understand the cost and benefit of each enhancement</li>
                <li>• <strong>Document Evolution:</strong> Keep track of why requirements changed to inform future projects</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3 text-lg">📝 Writing Requirements for Change</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-green-800 mb-2">Instead of:</h5>
                <div className="bg-white p-3 rounded border-l-4 border-red-500">
                  <p className="text-sm text-red-700">"Users should be able to create tasks"</p>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-green-800 mb-2">Write:</h5>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="text-sm text-green-700 mb-2">
                    "When a user submits a new task, the system should:
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Show a loading indicator while the request is processing</li>
                    <li>• Disable the submit button to prevent duplicate submissions</li>
                    <li>• Display a success message when the task is created</li>
                    <li>• Show a user-friendly error message with retry option if the request fails</li>
                    <li>• Validate input before sending to prevent unnecessary server calls"</li>
                  </ul>
                </div>
              </div>
            </div>
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
            <Link href={getUrlWithParams("/tutorial/chapter-6")} className="flex items-center text-gray-600 hover:text-gray-900">
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
                    href={getUrlWithParams("/tutorial/chapter-8")} 
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