'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Bug, Lightbulb, Shield, TestTube, Target } from 'lucide-react'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter8() {
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
      id: 'testing-debugging-introduction',
      title: 'Understanding Testing & Debugging',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 8: Testing and Debugging</h2>
          <p className="text-lg text-gray-600">
            You've built a complete task management system! But how do you ensure it works reliably? How do you find and fix problems? This chapter covers testing strategies and debugging techniques essential for enterprise applications.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">Why Testing & Debugging Matter</div>
            <div className="explanation-text">
              <p className="mb-3">
                Testing and debugging are quality assurance processes that ensure your application works correctly and reliably. They're not just technical activities - they directly impact user trust and business success.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Testing:</strong> Proactive verification that features work as expected</li>
                <li><strong>Debugging:</strong> Reactive investigation and fixing of problems</li>
                <li><strong>Quality Assurance:</strong> Systematic approach to preventing issues</li>
                <li><strong>User Acceptance:</strong> Validation that business requirements are met</li>
              </ul>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Ministry Quality Requirements</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Government systems must meet strict quality and reliability standards:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Consequences of Bugs</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Lost silly walk applications</li>
                  <li>• Incorrect task assignments</li>
                  <li>• Data corruption or loss</li>
                  <li>• Public embarrassment for the Ministry</li>
                  <li>• Parliamentary questions about IT competence</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Quality Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Reliable task management</li>
                  <li>• User confidence in the system</li>
                  <li>• Reduced support requests</li>
                  <li>• Smooth operations</li>
                  <li>• Professional reputation maintained</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Quality Requirements
            </div>
            <p className="concept-text">
              When you write acceptance criteria like "the system should handle errors gracefully" or "users should receive clear feedback," you're defining testing requirements. Understanding testing strategies helps you write more comprehensive acceptance criteria and collaborate effectively with QA teams.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll learn different types of testing (unit, integration, user acceptance), debugging techniques, and how to write requirements that support quality assurance. You'll understand how testing fits into the development process.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'types-of-testing',
      title: 'Step 1: Types of Testing',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Understanding Different Testing Approaches</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                Unit Testing
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">What it tests:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Individual functions work correctly</li>
                    <li>• Input validation logic</li>
                    <li>• Data transformation functions</li>
                    <li>• Business rule calculations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Ministry examples:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Task title validation prevents empty titles</li>
                    <li>• Date formatting displays correctly</li>
                    <li>• Task assignment logic works properly</li>
                    <li>• Database queries return expected results</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Integration Testing
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">What it tests:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Frontend-backend communication</li>
                    <li>• Database connectivity</li>
                    <li>• API endpoint functionality</li>
                    <li>• Error handling across systems</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Ministry examples:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Adding task via API saves to database</li>
                    <li>• Frontend displays tasks from backend</li>
                    <li>• Network errors show user-friendly messages</li>
                    <li>• Multiple users can work simultaneously</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                User Acceptance Testing (UAT)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">What it tests:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Complete user workflows</li>
                    <li>• Business requirements are met</li>
                    <li>• User interface is intuitive</li>
                    <li>• Real-world usage scenarios</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Ministry examples:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• John Cleese can evaluate walk applications end-to-end</li>
                    <li>• Tasks can be assigned and completed by different staff</li>
                    <li>• System handles daily Ministry workflow</li>
                    <li>• Reports provide useful management information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Bug className="w-5 h-5 mr-2" />
              Testing Pyramid Concept
            </div>
            <div className="concept-text">
              <p className="mb-3">Most applications follow a "testing pyramid":</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Base:</strong> Many unit tests (fast, cheap, specific)</li>
                <li>• <strong>Middle:</strong> Some integration tests (moderate speed, broader scope)</li>
                <li>• <strong>Top:</strong> Few end-to-end tests (slow, expensive, comprehensive)</li>
              </ul>
              <p className="mt-3 text-sm">This balance provides good coverage while keeping testing efficient and maintainable.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'debugging-strategies',
      title: 'Step 2: Debugging Strategies',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Finding and Fixing Problems</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              When users report issues, systematic debugging helps identify and resolve problems quickly:
            </p>

            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-3 text-lg">🔍 Problem Investigation Process</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-yellow-800 mb-2">1. Reproduce the Issue</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Follow exact steps the user took</li>
                      <li>• Test in same browser/environment</li>
                      <li>• Document what happens vs. what should happen</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-800 mb-2">2. Check Error Logs</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Browser console for frontend errors</li>
                      <li>• Server logs for backend issues</li>
                      <li>• Database logs for data problems</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-800 mb-2">3. Isolate the Problem</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Test individual components</li>
                      <li>• Check data flow step by step</li>
                      <li>• Eliminate possible causes systematically</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-3 text-lg">🚨 Common Issues in Web Applications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Frontend Problems:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• JavaScript errors breaking functionality</li>
                      <li>• UI elements not responding to clicks</li>
                      <li>• Data not displaying after API calls</li>
                      <li>• Browser compatibility issues</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Backend Problems:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• API endpoints returning errors</li>
                      <li>• Database connection failures</li>
                      <li>• Validation logic rejecting valid data</li>
                      <li>• Performance issues under load</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 text-lg">🛠️ Debugging Tools & Techniques</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Browser Tools:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Developer Console for errors</li>
                      <li>• Network tab for API call inspection</li>
                      <li>• Elements tab for HTML/CSS debugging</li>
                      <li>• Debugger for step-through code execution</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Server Tools:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Application logs for error tracking</li>
                      <li>• Database query logs</li>
                      <li>• Performance monitoring tools</li>
                      <li>• Health check endpoints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Role in Debugging
            </div>
            <p className="concept-text">
              As a BA, you help with debugging by providing clear issue reports with steps to reproduce, expected vs. actual behavior, and business impact. You also help prioritize fixes based on user impact and business criticality. Understanding debugging helps you write better bug reports and work more effectively with development teams.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'quality-assurance',
      title: 'Step 3: Quality Assurance in Practice',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Building Quality into the Process</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              Quality isn't just about testing after development - it's built into every stage of the process:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 text-lg">📋 Writing Testable Requirements</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Good Example:</h5>
                    <div className="bg-white p-3 rounded border-l-4 border-green-500">
                      <p className="text-sm text-green-700">
                        <strong>Given</strong> a user is on the task creation page<br/>
                        <strong>When</strong> they submit a task with an empty title field<br/>
                        <strong>Then</strong> they should see the error message "Task title is required"<br/>
                        <strong>And</strong> the task should not be saved to the database
                      </p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Poor Example:</h5>
                    <div className="bg-white p-3 rounded border-l-4 border-red-500">
                      <p className="text-sm text-red-700">
                        "The system should handle errors nicely and be user-friendly"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3 text-lg">🔄 Development Process Integration</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Before Development:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Write clear acceptance criteria</li>
                      <li>• Define test scenarios</li>
                      <li>• Identify edge cases and error conditions</li>
                      <li>• Plan user acceptance testing approach</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">During Development:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Developers write unit tests</li>
                      <li>• Regular code reviews for quality</li>
                      <li>• Integration testing of new features</li>
                      <li>• Continuous testing with automated tools</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 text-lg">✅ Acceptance Testing Checklist</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Ministry Task Manager UAT:</h5>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        John Cleese can create new silly walk evaluation tasks
                      </label>
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        Tasks can be assigned to other Ministry staff
                      </label>
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        Task status updates are visible to all users
                      </label>
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        Completed tasks can be marked as finished
                      </label>
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        System handles network errors gracefully
                      </label>
                      <label className="flex items-center text-sm text-blue-700">
                        <input type="checkbox" className="mr-2" />
                        Data persists across browser sessions
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">🎯 Chapter Summary</h4>
            <p className="mb-3">
              Quality assurance is everyone's responsibility, not just the QA team's. As a BA, you contribute by:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Writing clear, testable acceptance criteria</li>
              <li>• Defining comprehensive test scenarios</li>
              <li>• Participating in user acceptance testing</li>
              <li>• Helping prioritize bugs based on business impact</li>
              <li>• Ensuring requirements support quality practices</li>
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
            <Link href="/tutorial/chapter-7" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 7
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 8: Testing and Debugging</h1>
              <p className="text-sm text-gray-600">Ensuring quality and reliability</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 8 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 8 Complete!</p>
                  <Link 
                    href="/tutorial/chapter-9" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 9
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