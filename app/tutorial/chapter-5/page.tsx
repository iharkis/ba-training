'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter5() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  const steps = [
    {
      id: 'testing-introduction',
      title: 'Understanding Testing',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 5: Testing & Quality Assurance</h2>
          <p className="text-lg text-gray-600">
            Your task manager works perfectly... or does it? What happens when someone enters an empty task? What if the database is down? This is where testing comes in!
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is Software Testing?</div>
            <div className="explanation-text">
              <p className="mb-3">
                Software testing is the process of checking that your application works correctly in different situations, including when things go wrong.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">What We Test</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Features work as expected</li>
                    <li>• Error handling works</li>
                    <li>• Performance is acceptable</li>
                    <li>• Security is maintained</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Why We Test</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Catch bugs before users do</li>
                    <li>• Ensure quality standards</li>
                    <li>• Build confidence in changes</li>
                    <li>• Document expected behavior</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs Testing</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry of Silly Walks can't afford bugs! Imagine if a software glitch accidentally approved a perfectly normal walk, or if the system crashed during a critical evaluation period.
            </p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">Potential Problems Without Testing</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Empty task submissions crash the system</li>
                <li>• Database errors aren't handled gracefully</li>
                <li>• Users can submit invalid silly walk applications</li>
                <li>• System performance degrades under load</li>
                <li>• Security vulnerabilities go unnoticed</li>
              </ul>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Testing in Requirements
            </div>
            <p className="concept-text">
              When you write "the system should handle invalid input gracefully" or "performance should remain stable under high load," you're defining testing requirements. Good BAs think about edge cases, error conditions, and quality standards from the beginning, not as an afterthought.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objectives</h3>
            <ul className="space-y-2">
              <li>• Understand different types of testing</li>
              <li>• Learn about quality assurance practices</li>
              <li>• Explore automated vs manual testing</li>
              <li>• See how testing fits into the development process</li>
            </ul>
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
          <h2 className="text-2xl font-bold text-gray-900">Types of Testing</h2>
          <p className="text-lg text-gray-600">
            Different types of testing check different aspects of your application. Think of them as different inspections for a building.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">The Testing Pyramid</div>
            <div className="explanation-text">
              <div className="bg-white border border-gray-200 rounded p-4">
                <div className="text-center mb-4">
                  <div className="mx-auto w-0 h-0" style={{
                    borderLeft: '100px solid transparent',
                    borderRight: '100px solid transparent',
                    borderBottom: '60px solid #fee2e2'
                  }}></div>
                  <div className="mt-2 text-sm font-medium text-red-800">Manual Testing</div>
                  <div className="text-xs text-red-600">Slow, expensive, but catches UX issues</div>
                </div>
                <div className="text-center mb-4">
                  <div className="mx-auto w-0 h-0" style={{
                    borderLeft: '120px solid transparent',
                    borderRight: '120px solid transparent',
                    borderBottom: '60px solid #fef3c7'
                  }}></div>
                  <div className="mt-2 text-sm font-medium text-yellow-800">Integration Testing</div>
                  <div className="text-xs text-yellow-600">Tests how different parts work together</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto w-0 h-0" style={{
                    borderLeft: '140px solid transparent',
                    borderRight: '140px solid transparent',
                    borderBottom: '60px solid #dcfce7'
                  }}></div>
                  <div className="mt-2 text-sm font-medium text-green-800">Unit Testing</div>
                  <div className="text-xs text-green-600">Fast, automated tests of individual functions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3">Unit Testing</h4>
              <div className="text-sm text-green-800 space-y-2">
                <div><strong>What:</strong> Test individual functions</div>
                <div><strong>Example:</strong> "Does the add task function work?"</div>
                <div><strong>Speed:</strong> Very fast</div>
                <div><strong>Cost:</strong> Low</div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-3">Integration Testing</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div><strong>What:</strong> Test how parts work together</div>
                <div><strong>Example:</strong> "Does frontend talk to backend?"</div>
                <div><strong>Speed:</strong> Medium</div>
                <div><strong>Cost:</strong> Medium</div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-3">Manual Testing</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div><strong>What:</strong> Human testers use the app</div>
                <div><strong>Example:</strong> "Is the interface intuitive?"</div>
                <div><strong>Speed:</strong> Slow</div>
                <div><strong>Cost:</strong> High</div>
              </div>
            </div>
          </div>

          <div className="ministry-content">
            <h4 className="font-medium mb-3">Ministry Testing Examples</h4>
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded p-3">
                <h5 className="font-medium text-gray-900 mb-1">Unit Test Example</h5>
                <p className="text-sm text-gray-600 mb-2">Testing the "calculate silliness score" function:</p>
                <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                  Input: walk_data = {"hops": 3, "wiggles": 7, "duration": 45}<br/>
                  Expected: silliness_score = 8.5<br/>
                  Actual: silliness_score = 8.5 ✅
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded p-3">
                <h5 className="font-medium text-gray-900 mb-1">Integration Test Example</h5>
                <p className="text-sm text-gray-600 mb-2">Testing the complete task creation flow:</p>
                <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                  1. User clicks "Add Task" → ✅<br/>
                  2. Frontend sends POST request → ✅<br/>
                  3. Backend validates data → ✅<br/>
                  4. Database saves task → ✅<br/>
                  5. Frontend shows new task → ✅
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded p-3">
                <h5 className="font-medium text-gray-900 mb-1">Manual Test Example</h5>
                <p className="text-sm text-gray-600 mb-2">Testing user experience:</p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  "Can a new Ministry employee easily figure out how to submit a silly walk application without training?"
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Test Coverage
            </div>
            <p className="concept-text">
              Different testing types catch different problems. Unit tests catch logic errors quickly, integration tests catch communication issues, and manual tests catch usability problems. When writing requirements, consider what could go wrong and how each type of testing would catch it.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'test-cases',
      title: 'Step 2: Writing Test Cases',
      type: 'coding',
      exercise: {
        title: 'Create Test Cases for Task Creation',
        description: 'Test cases define what should happen in different scenarios. Let\'s write test cases for our task creation feature.',
        instructions: [
          'Review the test cases below - these define expected behavior',
          'Each test case has a scenario, input, and expected result',
          'Notice how we test both success and failure cases',
          'These test cases help developers know what to build'
        ],
        language: 'typescript' as const,
        startingCode: `// Test Cases for Task Creation Feature
// These define what should happen in different scenarios

describe('Task Creation', () => {
  
  test('should create task with valid input', () => {
    // Arrange
    const validTask = {
      title: 'Review silly walk application',
      description: 'Evaluate Mr. Smith\\'s application',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(validTask)
    
    // Assert
    expect(result.success).toBe(true)
    expect(result.task.id).toBeDefined()
    expect(result.task.title).toBe('Review silly walk application')
    expect(result.task.status).toBe('pending')
  })

  test('should reject empty title', () => {
    // Arrange
    const invalidTask = {
      title: '',
      description: 'Some description',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(invalidTask)
    
    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toContain('Title is required')
  })

  test('should reject task with title longer than 100 characters', () => {
    // Arrange
    const longTitle = 'a'.repeat(101)
    const invalidTask = {
      title: longTitle,
      description: 'Some description',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(invalidTask)
    
    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toContain('Title must be 100 characters or less')
  })

  test('should assign default status as pending', () => {
    // Arrange
    const validTask = {
      title: 'Test task',
      description: 'Test description',
      assignedTo: 'Test User'
    }
    
    // Act
    const result = createTask(validTask)
    
    // Assert
    expect(result.task.status).toBe('pending')
    expect(result.task.createdAt).toBeDefined()
  })

})`,
        targetCode: `// Test Cases for Task Creation Feature
// These define what should happen in different scenarios

describe('Task Creation', () => {
  
  test('should create task with valid input', () => {
    // Arrange
    const validTask = {
      title: 'Review silly walk application',
      description: 'Evaluate Mr. Smith\\'s application',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(validTask)
    
    // Assert
    expect(result.success).toBe(true)
    expect(result.task.id).toBeDefined()
    expect(result.task.title).toBe('Review silly walk application')
    expect(result.task.status).toBe('pending')
  })

  test('should reject empty title', () => {
    // Arrange
    const invalidTask = {
      title: '',
      description: 'Some description',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(invalidTask)
    
    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toContain('Title is required')
  })

  test('should reject task with title longer than 100 characters', () => {
    // Arrange
    const longTitle = 'a'.repeat(101)
    const invalidTask = {
      title: longTitle,
      description: 'Some description',
      assignedTo: 'John Cleese'
    }
    
    // Act
    const result = createTask(invalidTask)
    
    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toContain('Title must be 100 characters or less')
  })

  test('should assign default status as pending', () => {
    // Arrange
    const validTask = {
      title: 'Test task',
      description: 'Test description',
      assignedTo: 'Test User'
    }
    
    // Act
    const result = createTask(validTask)
    
    // Assert
    expect(result.task.status).toBe('pending')
    expect(result.task.createdAt).toBeDefined()
  })

})`,
        hints: [
          "Test cases follow a pattern: Arrange, Act, Assert",
          "We test both success cases (valid input) and failure cases (invalid input)",
          "Each test case has a clear, descriptive name",
          "Assertions check that the actual result matches expected behavior",
          "Edge cases like empty strings and length limits are important to test"
        ],
        explanation: {
          whatIsHappening: "You're looking at automated test cases written in a testing framework. These tests define exactly what should happen when users create tasks in different scenarios. The tests use the 'Arrange, Act, Assert' pattern: set up the test data, perform the action, and check the results. Each test covers a specific scenario, from happy path (valid input) to edge cases (empty title, too long title).",
          whyItMatters: "Test cases serve as both executable documentation and quality gates. They tell developers exactly what the feature should do, and they automatically check that the implementation works correctly. When you change code later, these tests will catch any breaking changes immediately. They also help ensure that edge cases and error conditions are properly handled.",
          realWorldConnection: "When you write requirements like 'task titles must be between 1 and 100 characters' or 'system should display helpful error messages for invalid input,' you're defining what these test cases should verify. Good test cases translate requirements into specific, measurable outcomes. They bridge the gap between business requirements and technical implementation.",
          keyTerms: {
            "Test Case": "A specific scenario that tests one aspect of functionality",
            "Arrange-Act-Assert": "A pattern for organizing test code: set up data, perform action, verify results",
            "Assertion": "A statement that checks if the actual result matches the expected result",
            "Edge Case": "Unusual or extreme input that might cause problems",
            "Test Suite": "A collection of related test cases that test a feature or component"
          }
        }
      }
    },
    {
      id: 'quality-assurance',
      title: 'Step 3: Quality Assurance Process',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Quality Assurance Process</h2>
          <p className="text-lg text-gray-600">
            Quality Assurance (QA) isn't just about finding bugs - it's about building quality into the entire development process.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">QA Throughout Development</div>
            <div className="explanation-text">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Requirements Review</h4>
                    <p className="text-sm text-gray-600">QA reviews requirements for clarity and testability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Test Planning</h4>
                    <p className="text-sm text-gray-600">Create test cases and define testing strategy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Development Testing</h4>
                    <p className="text-sm text-gray-600">Developers write and run unit tests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium">Integration Testing</h4>
                    <p className="text-sm text-gray-600">Test how different parts work together</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h4 className="font-medium">User Acceptance Testing</h4>
                    <p className="text-sm text-gray-600">Business users verify the system meets their needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3">Automated Testing Benefits</h4>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• Runs fast and frequently</li>
                <li>• Catches regressions immediately</li>
                <li>• Provides consistent results</li>
                <li>• Enables confident code changes</li>
                <li>• Reduces manual testing burden</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">Manual Testing Benefits</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Catches usability issues</li>
                <li>• Tests real user scenarios</li>
                <li>• Evaluates subjective qualities</li>
                <li>• Explores edge cases creatively</li>
                <li>• Validates business logic</li>
              </ul>
            </div>
          </div>

          <div className="ministry-content">
            <h4 className="font-medium mb-3">Ministry QA Checklist</h4>
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">🔍 Functionality</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• All features work as specified</li>
                    <li>• Error messages are helpful</li>
                    <li>• Data validation works correctly</li>
                    <li>• Edge cases are handled</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">🎨 User Experience</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Interface is intuitive</li>
                    <li>• Loading times are acceptable</li>
                    <li>• Mobile experience works</li>
                    <li>• Accessibility requirements met</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">🔒 Security</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• User authentication works</li>
                    <li>• Data is properly protected</li>
                    <li>• Input validation prevents attacks</li>
                    <li>• Permissions are enforced</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">⚡ Performance</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Pages load quickly</li>
                    <li>• System handles expected load</li>
                    <li>• Database queries are efficient</li>
                    <li>• Memory usage is reasonable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Quality Requirements
            </div>
            <p className="concept-text">
              Quality isn't just about bugs - it includes performance, usability, security, and maintainability. When writing requirements, consider: "How fast should this be?" "What happens if this fails?" "How intuitive should this be for new users?" "What are the security implications?" Including quality requirements helps teams build better software from the start.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Key Takeaways</h3>
            <ul className="space-y-2">
              <li>• Testing should happen throughout development, not just at the end</li>
              <li>• Different types of testing catch different types of problems</li>
              <li>• Automated tests provide fast feedback, manual tests catch UX issues</li>
              <li>• Quality requirements are as important as functional requirements</li>
              <li>• Good testing practices lead to more reliable, maintainable software</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

  const markStepCompleteLocal = (index: number) => {
    if (!completedSteps.includes(index)) {
      const newCompleted = [...completedSteps, index]
      setCompletedSteps(newCompleted)
      markStepComplete(steps[index].id)
    }
  };

  const allStepsComplete = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorialBreadcrumb />
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/tutorial/chapter-4")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 4
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 5: Testing & QA</h1>
              <p className="text-sm text-gray-600">Quality assurance practices</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 5 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 5 Complete!</p>
                  <Link 
                    href={getUrlWithParams("/tutorial/chapter-6")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 6
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
                      : 'Mark Complete & Continue'
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