'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Zap, Lightbulb, Code } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import CodeExplanationModal from '@/components/tutorial/CodeExplanationModal'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter3() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCodeExplanation, setShowCodeExplanation] = useState(false)

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  const steps = [
    {
      id: 'javascript-introduction',
      title: 'Understanding JavaScript',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 3: Adding Interactivity with JavaScript</h2>
          <p className="text-lg text-gray-600">
            Excellent! Your task manager now looks professional with CSS. But it's still static - you can't actually add tasks or interact with it. Let's fix that with JavaScript.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is JavaScript?</div>
            <div className="explanation-text">
              <p className="mb-3">
                JavaScript is the programming language that makes websites interactive. While HTML provides structure and CSS provides styling, JavaScript provides behavior and logic.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>HTML:</strong> "Here's a button"</li>
                <li><strong>CSS:</strong> "Make it blue and rounded"</li>
                <li><strong>JavaScript:</strong> "When clicked, add a new task to the list"</li>
              </ul>
              <p className="mt-3">
                Think of a car: HTML is the chassis, CSS is the paint job, and JavaScript is the engine that makes it actually move.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs Interactive Features</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry staff need to actually use this system for their daily work. Static displays aren't enough - they need to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Current User Stories</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• "I want to add new silly walk evaluations"</li>
                  <li>• "I want to mark tasks as complete when done"</li>
                  <li>• "I want to see my task count update in real-time"</li>
                  <li>• "I want to delete tasks that are cancelled"</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Technical Implementation</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Click handlers for buttons</li>
                  <li>• DOM manipulation to add/remove tasks</li>
                  <li>• Form validation and submission</li>
                  <li>• Dynamic content updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Business Logic vs UI Logic
            </div>
            <p className="concept-text">
              JavaScript handles both user interface logic ("what happens when I click this button") and business logic ("validate that the walk application is complete before saving"). Understanding this distinction helps you write better requirements that separate what the user sees from what the system needs to enforce.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll add JavaScript to make your task manager functional. You'll learn how user interactions become working software features, and how business rules get implemented in code.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'add-button',
      title: 'Step 1: Adding an Add Task Button',
      type: 'coding',
      exercise: {
        title: 'Add a Button to Submit New Tasks',
        description: 'First, let\'s add a proper button next to our input field so users can submit new tasks. We\'ll also style it to match our government design.',
        instructions: [
          'Find the comment "<!-- Step 1: Add a button here -->" after the input field',
          'Replace it with: <button id="addTaskBtn">Add Task</button>',
          'The button will sit next to the input field',
          'The CSS styling for the button is already provided in the style section',
          'This gives users a clear way to submit their task'
        ],
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" id="taskInput" placeholder="Enter task description">
    <!-- Step 1: Add a button here -->
    
    <h2>Current Tasks</h2>
    <div id="taskList">
        <div>
            <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
            <p>Review submitted video and assess walk silliness level.</p>
            <p>Assigned to: John Cleese</p>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" id="taskInput" placeholder="Enter task description">
    <button id="addTaskBtn">Add Task</button>
    
    <h2>Current Tasks</h2>
    <div id="taskList">
        <div>
            <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
            <p>Review submitted video and assess walk silliness level.</p>
            <p>Assigned to: John Cleese</p>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        hints: [
          "Find the comment '<!-- Step 1: Add a button here -->' after the input field",
          "Replace it with <button id=\"addTaskBtn\">Add Task</button>",
          "The id=\"addTaskBtn\" is important - we'll use it in JavaScript later",
          "The button styling is already included in the CSS",
          "Notice the button gets a government blue color and hover effect"
        ],
        explanation: {
          whatIsHappening: "You've added a professional-looking button with an ID attribute. The CSS styling gives it the government blue color that matches the heading, proper padding for easy clicking, and a hover effect that darkens when users mouse over it. The ID attribute will be crucial for JavaScript to find and control this button.",
          whyItMatters: "This button represents the completion of a user story: 'As a Junior Analyst, I want a clear way to submit new tasks.' The visual design (blue, professional styling) reinforces that this is a primary action in the system. The hover effect provides immediate feedback, improving user confidence in their interactions.",
          realWorldConnection: "When you write requirements like 'provide a submit button' or 'primary actions should be prominently displayed,' this is the implementation. The ID attribute represents how developers connect interface elements to functionality - understanding this helps you write more technically informed requirements about user interactions.",
          keyTerms: {
            "ID attribute": "A unique identifier that JavaScript can use to find and control specific HTML elements",
            "Hover effect": "CSS that changes appearance when users mouse over elements, providing visual feedback",
            "Primary action": "The most important button on a page, styled prominently to guide user behavior",
            "Cursor pointer": "CSS that changes the mouse cursor to a hand, indicating the element is clickable"
          }
        }
      }
    },
    {
      id: 'add-javascript',
      title: 'Step 2: Adding JavaScript Functionality',
      type: 'coding',
      exercise: {
        title: 'Make the Add Task Button Work',
        description: 'Now let\'s add JavaScript to make the "Add Task" button actually work! We\'ll write the code in a separate JavaScript file to maintain clean separation of concerns.',
        instructions: [
          'Add JavaScript code to the script.js file (you can see it in the file tree)',
          'This code will listen for clicks on the Add Task button and create new tasks',
          'Copy the JavaScript code from the code block below into the editor',
          'Test it by typing in the input field and clicking "Add Task"'
        ],
        codeBlock: {
          code: `document.getElementById('addTaskBtn').addEventListener('click', function() {
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
});`,
          explanations: [
            {
              line: "document.getElementById('addTaskBtn').addEventListener('click', function() {",
              explanation: "This finds the Add Task button and listens for when someone clicks it.",
              businessContext: "Event listeners are how web applications respond to user actions - essential for interactive systems."
            },
            {
              line: "const input = document.getElementById('taskInput');",
              explanation: "This gets the input field where users type their task description.",
              businessContext: "Accessing form inputs is fundamental to collecting user data in web applications."
            },
            {
              line: "const taskText = input.value.trim();",
              explanation: "This gets the text the user typed and removes extra spaces.",
              businessContext: "Data cleaning (like trimming spaces) prevents common user input errors and improves data quality."
            },
            {
              line: "if (taskText === '') { alert('Please enter a task description'); return; }",
              explanation: "This validates that the user actually entered some text before creating a task.",
              businessContext: "Input validation is crucial for data integrity and prevents users from creating empty or invalid records."
            },
            {
              line: "const newTask = document.createElement('div');",
              explanation: "This creates a new HTML element to hold the new task information.",
              businessContext: "Dynamic content creation allows applications to respond to user actions and update in real-time."
            },
            {
              line: "newTask.innerHTML = `<h3>${taskText}</h3>...`;",
              explanation: "This fills the new task element with the user's text and standard task information.",
              businessContext: "Template literals allow dynamic content generation - essential for data-driven applications."
            },
            {
              line: "taskList.appendChild(newTask); input.value = '';",
              explanation: "This adds the new task to the list and clears the input for the next task.",
              businessContext: "Providing immediate feedback and clearing forms improves user experience and workflow efficiency."
            }
          ]
        },
        language: 'typescript' as const,
        startingCode: `// Ministry of Silly Walks - Task Manager JavaScript

// Step 2: Add JavaScript code here`,
        targetCode: `document.getElementById('addTaskBtn').addEventListener('click', function() {
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
});`,
        hints: [
          "You're now editing the script.js file - notice this is separate from the HTML",
          "Replace the comment with the JavaScript code from the code block",
          "The JavaScript listens for clicks on the 'Add Task' button",
          "When clicked, it gets the text from the input field and creates a new task",
          "Test it by typing something and clicking the button in the preview!"
        ],
        explanation: {
          whatIsHappening: "You've added your first JavaScript functionality in a separate file! The code listens for clicks on the 'Add Task' button, gets the text from the input field, validates it's not empty, creates a new task element with the same styling as existing tasks, and adds it to the task list. It also clears the input field for the next task. Notice how the HTML, CSS, and JavaScript are now properly separated into different files.",
          whyItMatters: "This implements the core user story: 'As a staff member, I want to add new tasks to my workload.' The validation prevents empty tasks (a business rule), and the automatic clearing of the input field improves user experience. Users can now actually use this system for their daily work - it's transformed from a static display to a working tool. Most importantly, you're following separation of concerns - HTML in index.html, CSS in styles.css, and JavaScript in script.js.",
          realWorldConnection: "This is how professional web applications are structured. Requirements like 'maintain clean code architecture' and 'ensure maintainability' get implemented through proper separation of concerns. The JavaScript handles both user interface concerns (clearing the input, adding visual elements) and business logic (validation rules). Understanding this separation helps you write better technical requirements and communicate more effectively with development teams.",
          keyTerms: {
            "Event Listener": "Code that waits for user actions like clicks, key presses, or form submissions",
            "DOM Manipulation": "Using JavaScript to change the content and structure of the web page",
            "Input Validation": "Checking that user-entered data meets business rules before processing",
            "Template Literals": "The backtick syntax (`) that lets you create HTML with dynamic content",
            "Separation of Concerns": "Keeping HTML (structure), CSS (styling), and JavaScript (behavior) in separate files for better maintainability"
          }
        }
      }
    }
  ]

  // Load progress on mount
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
  }

  const allStepsComplete = completedSteps.length === steps.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <TutorialBreadcrumb />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/tutorial/chapter-2")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 2
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 3: Adding Interactivity with JavaScript</h1>
              <p className="text-sm text-gray-600">Making the system actually work</p>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="tutorial-card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 3 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 3 Complete!</p>
                  <p className="text-xs text-green-700 mb-3">
                    You've built a working task management system! 🎉
                  </p>
                  <div className="text-xs text-green-700 mb-3">
                    <p className="font-medium mb-1">What you've learned:</p>
                    <ul className="space-y-1">
                      <li>• HTML structure and semantics</li>
                      <li>• CSS styling and layout</li>
                      <li>• JavaScript interactivity</li>
                      <li>• How requirements become code</li>
                    </ul>
                  </div>
                  <Link 
                    href={getUrlWithParams("/tutorial/chapter-4")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 4
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Progress Bar */}
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

              {/* Step Content */}
              {steps[currentStep].type === 'explanation' ? (
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
                          ? 'Complete Tutorial' 
                          : 'Next Step'
                        : 'Add Interactivity!'
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <CodeEditor
                  {...steps[currentStep].exercise!}
                  stepId={steps[currentStep].id}
                  currentChapter={3}
                  showFileTree={true}
                  onComplete={() => {
                    markStepCompleteLocal(currentStep)
                    setTimeout(() => {
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(currentStep + 1)
                      }
                    }, 2000)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}