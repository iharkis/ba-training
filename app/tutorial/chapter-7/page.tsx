'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Bug, Lightbulb, Shield, TestTube, Target } from 'lucide-react'
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
      id: 'testing-debugging-introduction',
      title: 'Understanding Testing & Debugging',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 7: Testing and Debugging</h2>
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
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Quality Requirements
            </div>
            <div className="concept-text space-y-4">
              <p>
                Quality requirements are often the most neglected in initial specifications, leading to expensive rework later. Understanding testing and quality assurance helps you write comprehensive requirements that prevent quality issues rather than discovering them late in development.
              </p>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Vague vs Testable Quality Requirements:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-red-500 pl-3">
                    <div><strong>Vague:</strong> "The system should handle errors gracefully"</div>
                    <div><strong>Problem:</strong> Unmeasurable, leaves error handling to developer interpretation</div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3">
                    <div><strong>Testable:</strong> "When API request fails, display specific error message within 2 seconds and provide retry button"</div>
                    <div><strong>Benefit:</strong> Clear success criteria, automated testing possible, consistent user experience</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Quality Requirements Framework:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Performance:</strong> Response times, throughput, scalability under load</div>
                  <div><strong>Reliability:</strong> Uptime requirements, error rates, recovery procedures</div>
                  <div><strong>Usability:</strong> Task completion rates, learning curves, accessibility standards</div>
                  <div><strong>Security:</strong> Authentication, authorization, data protection, audit trails</div>
                  <div><strong>Maintainability:</strong> Code quality, documentation, deployment procedures</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Testable Acceptance Criteria Examples:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Error Handling:</strong> "Given invalid data submission, when validation fails, then display field-specific error messages in red text"</div>
                  <div><strong>Performance:</strong> "Given normal load conditions, when user submits form, then success confirmation appears within 3 seconds"</div>
                  <div><strong>Accessibility:</strong> "Given keyboard-only navigation, when user tabs through form, then all interactive elements receive visible focus indicators"</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Collaboration with QA Teams:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Test Strategy:</strong> Which requirements need automated vs manual testing?</div>
                  <div><strong>Test Data:</strong> What scenarios and edge cases should be covered?</div>
                  <div><strong>Acceptance Criteria:</strong> How do you verify requirements are met?</div>
                  <div><strong>Risk Assessment:</strong> What are the highest-risk areas for the business?</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Learning Objective</h3>
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
                <h4 className="font-medium text-yellow-900 mb-3 text-lg">Problem Investigation Process</h4>
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
                <h4 className="font-medium text-blue-900 mb-3 text-lg">Debugging Tools & Techniques</h4>
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
      id: 'hands-on-testing',
      title: 'Step 3: Hands-On Testing Exercise',
      type: 'interactive',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Writing Your First Test</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              Let's write actual tests for our Ministry task manager. Don't worry - we'll use simple JavaScript that's easy to understand!
            </p>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">Test Exercise: Add Task Functionality</h4>
              <p className="text-sm text-green-700 mb-4">
                We'll test the "Add Task" feature. Here's what a simple test looks like:
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Test Code Example:</h5>
                <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`// Test for adding a new task
function testAddTask() {
  // Arrange: Set up test data
  const taskTitle = "Evaluate new silly walk proposal";
  const taskDescription = "Review application from Ministry applicant";
  
  // Act: Perform the action we're testing
  const result = addNewTask(taskTitle, taskDescription);
  
  // Assert: Check that it worked correctly
  if (result.success === true) {
    console.log("✅ PASS: Task was created successfully");
  } else {
    console.log("❌ FAIL: Task creation failed");
  }
  
  if (result.task.title === taskTitle) {
    console.log("✅ PASS: Task title matches input");
  } else {
    console.log("❌ FAIL: Task title doesn't match");
  }
}

// Test for validation (should fail)
function testAddEmptyTask() {
  // Arrange: Test with invalid data
  const emptyTitle = "";
  
  // Act: Try to create task with empty title
  const result = addNewTask(emptyTitle, "Description");
  
  // Assert: Should fail validation
  if (result.success === false) {
    console.log("✅ PASS: Empty title correctly rejected");
  } else {
    console.log("❌ FAIL: Empty title was accepted (bug!)");
  }
  
  if (result.error === "Task title is required") {
    console.log("✅ PASS: Correct error message shown");
  } else {
    console.log("❌ FAIL: Wrong error message");
  }
}`}
                </pre>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">What Each Part Does (Business Perspective):</h5>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li><strong>Arrange:</strong> Sets up the scenario - like preparing test data for John Cleese to create a task</li>
                  <li><strong>Act:</strong> Performs the business action - actually calling the "add task" function</li>
                  <li><strong>Assert:</strong> Checks the business outcome - did the task get created with correct details?</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-3 text-lg">Your Turn: Design Test Scenarios</h4>
              <p className="text-sm text-yellow-700 mb-4">
                Think like a BA: What scenarios should we test for task creation? Check the boxes for scenarios you'd want to test:
              </p>
              
              <div className="space-y-3">
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Normal case: User creates task with valid title and description</span>
                </label>
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Error case: User tries to create task with empty title</span>
                </label>
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Edge case: User creates task with very long title (500+ characters)</span>
                </label>
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Security case: User tries to input malicious scripts in task description</span>
                </label>
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Integration case: Task appears in task list after creation</span>
                </label>
                <label className="flex items-start text-sm text-yellow-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Performance case: System handles creating 100 tasks in a row</span>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-800">
                  <strong>Pro Tip:</strong> All of these scenarios are important! As a BA, thinking through these cases helps you write comprehensive acceptance criteria that developers can turn into automated tests.
                </p>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <TestTube className="w-5 h-5 mr-2" />
              BA Testing Insight
            </div>
            <p className="concept-text">
              When you write acceptance criteria like "Given a user submits an empty task title, then they should see an error message", you're actually writing a test specification! Developers use these criteria to create automated tests that run every time code changes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'debugging-exercise',
      title: 'Step 4: Hands-On Debugging Exercise',
      type: 'interactive',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Real-World Debugging Scenario</h3>
          
          <div className="ministry-content">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-3 text-lg">🚨 Bug Report from Ministry Staff</h4>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h5 className="font-medium text-red-800 mb-2">Issue Description:</h5>
                <p className="text-sm text-red-700 mb-3">
                  "Hi, I'm trying to create a new task for evaluating a silly walk application, but when I click 'Add Task', nothing happens. The task doesn't appear in my list. This is urgent - we have a backlog of walk applications to process!"
                </p>
                <p className="text-sm text-red-700">
                  <strong>Reporter:</strong> Ministry Staff Member<br/>
                  <strong>Browser:</strong> Chrome<br/>
                  <strong>When:</strong> Started happening this morning
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">Step-by-Step Debugging Process</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-2">Step 1: Reproduce the Problem</h5>
                  <p className="text-sm text-blue-700 mb-3">First, we try to reproduce the exact issue:</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-700">
                      1. Open browser and navigate to task creation page<br/>
                      2. Fill in task title: "Evaluate silly walk application"<br/>
                      3. Fill in description: "Review application from new applicant"<br/>
                      4. Click "Add Task" button<br/>
                      5. Observe: Task does not appear in the list
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">✅ <strong>Result:</strong> Problem reproduced! Task creation appears to fail.</p>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-2">Step 2: Check Browser Console for Errors</h5>
                  <p className="text-sm text-blue-700 mb-3">Press F12 to open Developer Tools, look at Console tab:</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-red-600 font-mono">
                      ❌ Error: POST /api/tasks 500 (Internal Server Error)<br/>
                      ❌ Failed to fetch task data<br/>
                      ❌ Uncaught TypeError: Cannot read property 'title' of undefined
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mt-2"><strong>Discovery:</strong> The API call is failing with a 500 error!</p>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-2">Step 3: Check Network Tab</h5>
                  <p className="text-sm text-blue-700 mb-3">In Developer Tools, switch to Network tab and try again:</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-700">
                      Request: POST /api/tasks<br/>
                      Status: 500 Internal Server Error<br/>
                      Response: "Database connection failed"
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mt-2"><strong>Root Cause Found:</strong> Database connection is broken!</p>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-2">Step 4: Check Server Logs</h5>
                  <p className="text-sm text-blue-700 mb-3">Developer checks server logs:</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-red-600 font-mono">
                      [ERROR] Database connection timeout<br/>
                      [ERROR] Unable to connect to database server at localhost:5432<br/>
                      [INFO] Retrying connection... (attempt 3/3)<br/>
                      [ERROR] Max connection attempts exceeded
                    </p>
                  </div>
                  <p className="text-sm text-blue-700 mt-2"><strong>Solution Identified:</strong> Database server is down or unreachable!</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">Resolution Process</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-medium text-green-800 mb-1">Immediate Action:</h5>
                  <p className="text-sm text-green-700">Developer restarts database service - tasks can now be created again</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-medium text-green-800 mb-1">User Communication:</h5>
                  <p className="text-sm text-green-700">"Issue resolved! You can now create tasks normally. Sorry for the inconvenience."</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-medium text-green-800 mb-1">Prevention:</h5>
                  <p className="text-sm text-green-700">Add monitoring to alert when database connections fail + improve error messages for users</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg">What BAs Should Document</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">For the Bug Report:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>Steps to reproduce:</strong> Exact user actions that trigger the bug</li>
                    <li>• <strong>Expected behavior:</strong> Task should be created and appear in list</li>
                    <li>• <strong>Actual behavior:</strong> Task disappears, no error message shown to user</li>
                    <li>• <strong>Business impact:</strong> Staff cannot process silly walk applications</li>
                    <li>• <strong>Urgency:</strong> High - affects daily operations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">For Future Requirements:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• System should show clear error messages when backend is unavailable</li>
                    <li>• Users should be able to retry failed actions</li>
                    <li>• System should gracefully handle database connectivity issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Bug className="w-5 h-5 mr-2" />
              BA Debugging Role
            </div>
            <p className="concept-text">
              BAs don't need to read server logs, but understanding the debugging process helps you ask better questions, provide more useful bug reports, and write requirements that consider error scenarios. You bridge the gap between user problems and technical solutions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'error-handling-tests',
      title: 'Step 5: Testing Error Scenarios',
      type: 'interactive',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Testing When Things Go Wrong</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              Testing isn't just about happy paths - we need to test what happens when things go wrong. Let's explore error handling tests.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-3 text-lg">🌐 Testing API Error Responses</h4>
              <p className="text-sm text-orange-700 mb-4">
                Here's how we test what happens when the backend server is down:
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Test Code for Server Errors:</h5>
                <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`// Test what happens when API is down
function testTaskCreationWhenServerDown() {
  // Arrange: Simulate server being unavailable
  mockApiToFail(); // This makes our test API return errors
  
  const taskTitle = "Evaluate walk application";
  
  // Act: Try to create task when server is down
  const result = addNewTask(taskTitle, "Description");
  
  // Assert: Check that error is handled gracefully
  if (result.success === false) {
    console.log("✅ PASS: Failed request handled correctly");
  } else {
    console.log("❌ FAIL: Should have failed but didn't");
  }
  
  if (result.userMessage === "Unable to save task. Please try again.") {
    console.log("✅ PASS: User-friendly error message shown");
  } else {
    console.log("❌ FAIL: Technical error shown to user");
  }
  
  if (result.shouldRetry === true) {
    console.log("✅ PASS: User can retry the action");
  } else {
    console.log("❌ FAIL: No retry option provided");
  }
}

// Test network timeout scenarios
function testTaskCreationTimeout() {
  // Arrange: Simulate slow network
  mockApiToTimeout(); // Makes API take too long to respond
  
  // Act: Try to create task with slow connection
  const result = addNewTaskWithTimeout(taskTitle, "Description", 5000);
  
  // Assert: Check timeout handling
  if (result.timedOut === true) {
    console.log("✅ PASS: Timeout detected correctly");
  }
  
  if (result.userMessage.includes("taking longer than expected")) {
    console.log("✅ PASS: Helpful timeout message shown");
  }
}`}
                </pre>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">What This Tests (Business Perspective):</h5>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li><strong>User Experience:</strong> Do users see helpful error messages instead of technical jargon?</li>
                  <li><strong>Recovery:</strong> Can users retry their action when the error is temporary?</li>
                  <li><strong>Data Safety:</strong> Is user work preserved when errors occur?</li>
                  <li><strong>System Resilience:</strong> Does the app still work when one component fails?</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-3 text-lg">Error Message Testing Workshop</h4>
              <p className="text-sm text-red-700 mb-4">
                Let's evaluate different error messages. Which ones are better for Ministry users?
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-gray-800 mb-2">Scenario: Database connection failed</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-100 rounded border-l-4 border-red-500">
                      <h6 className="font-medium text-red-800 text-sm mb-1">❌ Bad Message:</h6>
                      <p className="text-sm text-red-700">"Error 500: Database connection timeout in PostgreSQL server at port 5432"</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                      <h6 className="font-medium text-green-800 text-sm mb-1">✅ Good Message:</h6>
                      <p className="text-sm text-green-700">"Unable to save your task right now. Please try again in a moment."</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-gray-800 mb-2">Scenario: Invalid task data</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-100 rounded border-l-4 border-red-500">
                      <h6 className="font-medium text-red-800 text-sm mb-1">❌ Bad Message:</h6>
                      <p className="text-sm text-red-700">"Validation failed: title.length {'<'} 1"</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                      <h6 className="font-medium text-green-800 text-sm mb-1">✅ Good Message:</h6>
                      <p className="text-sm text-green-700">"Please enter a task title before saving."</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-gray-800 mb-2">Scenario: Network connection lost</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-100 rounded border-l-4 border-red-500">
                      <h6 className="font-medium text-red-800 text-sm mb-1">❌ Bad Message:</h6>
                      <p className="text-sm text-red-700">"fetch() failed: NetworkError"</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                      <h6 className="font-medium text-green-800 text-sm mb-1">✅ Good Message:</h6>
                      <p className="text-sm text-green-700">"Connection lost. Your task has been saved locally and will sync when connection returns."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg">Error Handling Test Checklist</h4>
              <p className="text-sm text-purple-700 mb-4">
                As a BA, ensure these error scenarios are tested:
              </p>
              
              <div className="space-y-2">
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Network errors:</strong> What happens when internet connection is lost?</span>
                </label>
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Server errors:</strong> How does app behave when backend systems are down?</span>
                </label>
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Validation errors:</strong> Are form validation messages clear and actionable?</span>
                </label>
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Permission errors:</strong> What happens when users try unauthorized actions?</span>
                </label>
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Data corruption:</strong> How are invalid data states handled?</span>
                </label>
                <label className="flex items-start text-sm text-purple-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span><strong>Timeout scenarios:</strong> What happens when operations take too long?</span>
                </label>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Shield className="w-5 h-5 mr-2" />
              Quality Requirement Writing
            </div>
            <p className="concept-text">
              When you write acceptance criteria like "When the system cannot save data, users should receive a clear error message and be able to retry", you're defining error handling requirements that can be turned into automated tests. This ensures error scenarios are properly tested.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'uat-guide',
      title: 'Step 6: User Acceptance Testing Guide',
      type: 'practical',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Practical UAT for Business Analysts</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              User Acceptance Testing (UAT) is where BAs really shine. You're validating that the system meets business needs, not just technical requirements.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">Ministry Task Manager UAT Scenarios</h4>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-3">Scenario 1: Daily Walk Application Processing</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <h6 className="font-medium text-gray-800 text-sm mb-2">Business Context:</h6>
                      <p className="text-sm text-gray-700">John Cleese arrives at work and needs to process 5 new silly walk applications that arrived overnight.</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <h6 className="font-medium text-blue-800 text-sm mb-2">Test Steps:</h6>
                      <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                        <li>Log into the Ministry task system</li>
                        <li>Create task: "Review silly walk application #2024-001"</li>
                        <li>Set priority to "High" (walk applications are urgent)</li>
                        <li>Assign to "Ministry Assessment Team"</li>
                        <li>Add notes: "Requires physical demonstration assessment"</li>
                        <li>Save and verify task appears in team's queue</li>
                        <li>Repeat for remaining 4 applications</li>
                      </ol>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h6 className="font-medium text-green-800 text-sm mb-2">Success Criteria:</h6>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>✓ All 5 tasks created within 10 minutes</li>
                        <li>✓ Tasks visible to Assessment Team immediately</li>
                        <li>✓ Task details captured accurately</li>
                        <li>✓ No data loss during process</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-3">Scenario 2: Cross-Team Collaboration</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <h6 className="font-medium text-gray-800 text-sm mb-2">Business Context:</h6>
                      <p className="text-sm text-gray-700">Assessment team completes initial review and needs to handoff to Senior Walk Evaluator for final decision.</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <h6 className="font-medium text-blue-800 text-sm mb-2">Test Steps:</h6>
                      <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                        <li>Assessment team member opens task "Review application #2024-001"</li>
                        <li>Update status to "Initial Review Complete"</li>
                        <li>Add assessment notes: "Candidate shows promise, recommend full evaluation"</li>
                        <li>Reassign task to "Senior Walk Evaluator"</li>
                        <li>Senior Evaluator receives notification</li>
                        <li>Senior Evaluator can see full task history and notes</li>
                        <li>Senior Evaluator makes final decision and closes task</li>
                      </ol>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h6 className="font-medium text-green-800 text-sm mb-2">Success Criteria:</h6>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>✓ Task handoff completed smoothly</li>
                        <li>✓ All historical information preserved</li>
                        <li>✓ Notifications work correctly</li>
                        <li>✓ No information lost in transition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-blue-800 mb-3">Scenario 3: High-Volume Stress Test</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <h6 className="font-medium text-gray-800 text-sm mb-2">Business Context:</h6>
                      <p className="text-sm text-gray-700">National Silly Walk Day is approaching - the Ministry receives 50+ applications in one morning.</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <h6 className="font-medium text-blue-800 text-sm mb-2">Test Steps:</h6>
                      <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                        <li>Multiple users log in simultaneously</li>
                        <li>Create 50+ tasks rapidly (simulate real application load)</li>
                        <li>Users work on different tasks at the same time</li>
                        <li>Update task statuses frequently</li>
                        <li>Search and filter large task lists</li>
                        <li>Generate reports with high data volume</li>
                      </ol>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h6 className="font-medium text-green-800 text-sm mb-2">Success Criteria:</h6>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>✓ System remains responsive under load</li>
                        <li>✓ No data corruption or loss</li>
                        <li>✓ All users can work simultaneously</li>
                        <li>✓ Search and filtering still work quickly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-3 text-lg">UAT Documentation Template</h4>
              <p className="text-sm text-yellow-700 mb-4">
                Use this template to document your UAT sessions:
              </p>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`UAT Session Report - Ministry Task Manager
Date: [Date]
Tester: [Name & Role]
Build Version: [Version Number]

SCENARIO: [Scenario Name]
Business Objective: [What business need this tests]

STEPS EXECUTED:
1. [Step 1]
2. [Step 2]
...

RESULTS:
✓ PASS: [What worked correctly]
✓ PASS: [Another success]
✗ FAIL: [What didn't work]
! NOTE: [Observations/concerns]

BUSINESS IMPACT:
- [How failures affect daily operations]
- [User experience implications]
- [Risk to business processes]

RECOMMENDATION:
□ Ready for Production
□ Needs Minor Fixes
□ Needs Major Fixes
□ Not Ready for Production

NOTES:
[Additional observations, suggestions, etc.]`}
                </pre>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">🏆 UAT Best Practices for BAs</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Do:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Test real business scenarios, not just features</li>
                    <li>• Include error and edge case scenarios</li>
                    <li>• Test with realistic data volumes</li>
                    <li>• Document business impact of any issues</li>
                    <li>• Involve actual end users in testing</li>
                    <li>• Test complete workflows, not isolated features</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Don't:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Only test the "happy path"</li>
                    <li>• Assume technical tests cover business needs</li>
                    <li>• Test in isolation from other systems</li>
                    <li>• Skip documenting minor issues</li>
                    <li>• Rush through complex scenarios</li>
                    <li>• Ignore performance under realistic load</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Target className="w-5 h-5 mr-2" />
              UAT Success Metrics
            </div>
            <p className="concept-text">
              Successful UAT isn't just about finding bugs - it's about validating that the system enables the business to operate effectively. Focus on whether users can complete their actual work efficiently and whether the system supports real business processes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'ba-debugging-participation',
      title: 'Step 7: How BAs Help with Debugging',
      type: 'practical',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">BA's Role in Debugging Process</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              BAs don't need to fix technical bugs, but you play a crucial role in the debugging process by providing context, prioritization, and clear communication.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">Gathering Useful Bug Information</h4>
              <p className="text-sm text-blue-700 mb-4">
                When users report issues, BAs can gather information that makes debugging much faster:
              </p>
              
              <div className="bg-white p-4 rounded border border-gray-200 mb-4">
                <h5 className="font-medium text-gray-800 mb-2">BA Bug Report Template:</h5>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <h6 className="font-medium text-gray-700 text-sm mb-2">1. Business Context</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• What business task was the user trying to complete?</li>
                      <li>• How critical is this to daily operations?</li>
                      <li>• How many users are affected?</li>
                      <li>• When did this start happening?</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <h6 className="font-medium text-gray-700 text-sm mb-2">2. Reproduction Steps</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Exact sequence of actions user took</li>
                      <li>• What data they were working with</li>
                      <li>• What browser/device they were using</li>
                      <li>• What they expected to happen</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <h6 className="font-medium text-gray-700 text-sm mb-2">3. Impact Assessment</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Can users work around the issue?</li>
                      <li>• Is data at risk?</li>
                      <li>• What business processes are affected?</li>
                      <li>• How urgent is the fix?</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">Example: Quality BA Bug Report</h5>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p><strong>Issue:</strong> Tasks not saving properly</p>
                  <p><strong>Business Context:</strong> Ministry staff cannot process silly walk applications - 15 applications are backlogged</p>
                  <p><strong>Reproduction:</strong></p>
                  <ol className="list-decimal list-inside ml-4 space-y-1">
                    <li>User logs in as John Cleese</li>
                    <li>Clicks "Create New Task"</li>
                    <li>Fills in title: "Review silly walk application #2024-005"</li>
                    <li>Adds description and sets priority to High</li>
                    <li>Clicks "Save Task"</li>
                    <li>Task appears to save, but disappears after page refresh</li>
                  </ol>
                  <p><strong>Expected:</strong> Task should persist and be visible to assessment team</p>
                  <p><strong>Impact:</strong> CRITICAL - Cannot process applications, public applications may be delayed</p>
                  <p><strong>Workaround:</strong> None found - users cannot complete work</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg">Working with Developers During Debug Sessions</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-purple-800 mb-2">Questions BAs Should Ask:</h5>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li><strong>"Can you explain what the system is trying to do in business terms?"</strong><br/>
                        <span className="text-xs text-purple-600">Helps you understand if it's a business logic issue vs. technical issue</span></li>
                    <li><strong>"What would the user experience if this happens in production?"</strong><br/>
                        <span className="text-xs text-purple-600">Focuses on user impact, not just technical symptoms</span></li>
                    <li><strong>"How can we prevent users from getting into this situation?"</strong><br/>
                        <span className="text-xs text-purple-600">Thinks about process improvements, not just bug fixes</span></li>
                    <li><strong>"Should we update our user training/documentation based on this?"</strong><br/>
                        <span className="text-xs text-purple-600">Considers whether business processes need updating</span></li>
                    <li><strong>"What data validation could catch this earlier?"</strong><br/>
                        <span className="text-xs text-purple-600">Helps identify missing business rules</span></li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border border-gray-200">
                  <h5 className="font-medium text-purple-800 mb-2">Information BAs Can Provide:</h5>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li><strong>Business Rules Context:</strong> "This field should never be empty because Ministry regulations require all applications to have a reference number"</li>
                    <li><strong>User Workflow Context:</strong> "Users typically create 5-10 tasks in a batch during morning application processing"</li>
                    <li><strong>Priority Context:</strong> "This affects our ability to meet public service commitments - walk applications must be processed within 48 hours"</li>
                    <li><strong>User Behavior Context:</strong> "Users often copy-paste application data from emails - they might be including invisible characters"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">Bug Prioritization Framework</h4>
              <p className="text-sm text-green-700 mb-4">
                BAs help prioritize bug fixes based on business impact:
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-red-100 rounded border-l-4 border-red-500">
                  <h5 className="font-medium text-red-800 text-sm mb-1">🚨 Critical/P1: Fix Immediately</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• System down - no one can work</li>
                    <li>• Data corruption/loss</li>
                    <li>• Security vulnerabilities</li>
                    <li>• Legal/regulatory compliance issues</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-orange-100 rounded border-l-4 border-orange-500">
                  <h5 className="font-medium text-orange-800 text-sm mb-1">High/P2: Fix This Sprint</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Major business processes blocked</li>
                    <li>• Multiple users affected daily</li>
                    <li>• No reasonable workaround</li>
                    <li>• Customer-facing functionality broken</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <h5 className="font-medium text-yellow-800 text-sm mb-1">Medium/P3: Fix Next Sprint</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Minor workflow disruptions</li>
                    <li>• Workarounds available but inconvenient</li>
                    <li>• Affects some users occasionally</li>
                    <li>• UI/UX improvements</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-blue-100 rounded border-l-4 border-blue-500">
                  <h5 className="font-medium text-blue-800 text-sm mb-1">Low/P4: Fix When Possible</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Cosmetic issues</li>
                    <li>• Edge cases affecting few users</li>
                    <li>• Feature enhancements disguised as bugs</li>
                    <li>• Documentation corrections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-3 text-lg">Debug Session Preparation Checklist</h4>
              <p className="text-sm text-orange-700 mb-4">
                Before joining a debug session with developers:
              </p>
              
              <div className="space-y-2">
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Gather detailed reproduction steps from affected users</span>
                </label>
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Document business impact and urgency</span>
                </label>
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Identify any recent process changes that might be related</span>
                </label>
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Check if issue affects all users or specific groups</span>
                </label>
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Research any temporary workarounds users have found</span>
                </label>
                <label className="flex items-start text-sm text-orange-700">
                  <input type="checkbox" className="mr-3 mt-1" />
                  <span>Review original requirements for the affected functionality</span>
                </label>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Bug className="w-5 h-5 mr-2" />
              BA Value in Debugging
            </div>
            <p className="concept-text">
              Your business context and user advocacy are invaluable during debugging. You help developers understand not just what's broken, but why it matters and how to prioritize fixes. You also ensure that solutions consider the user experience, not just technical correctness.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'testing-summary',
      title: 'Step 8: Testing & Debugging Summary',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Quality Assurance: The BA's Complete Guide</h3>
          
          <div className="ministry-content">
            <div className="bg-tutorial-primary text-white p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-3">Chapter 8 Summary</h4>
              <p className="mb-3">
                You've learned how testing and debugging work in practice, and how BAs contribute to quality assurance throughout the development process.
              </p>
              <p className="text-sm">
                Quality isn't just the QA team's job - it's built into every requirement you write, every acceptance criterion you define, and every bug report you create.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 text-lg">✅ Key Skills You've Developed</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Testing Skills:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Understanding different types of tests</li>
                      <li>• Writing testable acceptance criteria</li>
                      <li>• Designing UAT scenarios</li>
                      <li>• Testing error conditions and edge cases</li>
                      <li>• Evaluating user error messages</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Debugging Skills:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Writing effective bug reports</li>
                      <li>• Gathering useful reproduction steps</li>
                      <li>• Prioritizing bugs by business impact</li>
                      <li>• Working with developers during debugging</li>
                      <li>• Understanding the debugging process</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 text-lg">Quality Checklist for BAs</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Use this checklist for every feature you work on:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Requirements Phase:</h5>
                    <div className="space-y-1">
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Acceptance criteria are specific and testable</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Error scenarios and edge cases are defined</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>User error messages are specified</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Performance expectations are documented</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Development Phase:</h5>
                    <div className="space-y-1">
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Regular UAT sessions with real users</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Test with realistic data volumes</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Validate complete business workflows</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Test integration with existing systems</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Bug Management:</h5>
                    <div className="space-y-1">
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Bug reports include business context</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Clear reproduction steps provided</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Business impact assessment completed</span>
                      </label>
                      <label className="flex items-start text-sm text-blue-700">
                        <input type="checkbox" className="mr-3 mt-1" />
                        <span>Priority reflects actual business urgency</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-3 text-lg">🔮 Advanced Quality Practices</h4>
                <p className="text-sm text-purple-700 mb-4">
                  As you become more experienced, consider these advanced practices:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Proactive Quality:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Risk assessment for new features</li>
                      <li>• Quality metrics and KPIs</li>
                      <li>• User experience testing</li>
                      <li>• Accessibility testing</li>
                      <li>• Performance testing strategy</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Process Improvement:</h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Root cause analysis of recurring issues</li>
                      <li>• Testing process optimization</li>
                      <li>• Automated testing strategy</li>
                      <li>• Quality training for stakeholders</li>
                      <li>• Continuous feedback loops</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-3 text-lg">Next Steps: Applying Your Knowledge</h4>
                <p className="text-sm text-yellow-700 mb-4">
                  Take these skills back to your daily BA work:
                </p>
                
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li><strong>In Requirements Gathering:</strong> Think about how each requirement can be tested and what could go wrong</li>
                  <li><strong>In Sprint Planning:</strong> Advocate for including testing time and error scenario coverage</li>
                  <li><strong>In User Stories:</strong> Write acceptance criteria that developers can turn into automated tests</li>
                  <li><strong>In Stakeholder Management:</strong> Help business users understand the value of thorough testing</li>
                  <li><strong>In Team Collaboration:</strong> Bridge the gap between business needs and technical quality assurance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">Congratulations!</h4>
            <p className="mb-3">
              You now understand how quality assurance works in software development and how your role as a BA contributes to building reliable, user-friendly systems.
            </p>
            <p className="text-sm">
              In the next chapters, we'll explore how to scale and optimize your applications for production use. You'll learn about performance considerations and deployment strategies that ensure your Ministry task manager can handle real-world usage.
            </p>
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
              <h1 className="text-xl font-bold text-gray-900">Chapter 7: Testing and Debugging</h1>
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