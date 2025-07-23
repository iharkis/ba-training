'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Zap, Lightbulb, Code } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import CodeExplanationModal from '@/components/tutorial/CodeExplanationModal'
import JavaScriptDiagram from '@/components/tutorial/JavaScriptDiagram'
import SyntaxHighlighter from '@/components/tutorial/SyntaxHighlighter'
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

  // Helper function to change step and scroll to top
  const changeStep = (newStep: number) => {
    setCurrentStep(newStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

          <JavaScriptDiagram />

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
      title: 'Step 1: Understanding the Complete HTML Structure',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Step 1: Review the Complete HTML Structure</h2>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
            <p className="text-blue-900 font-medium mb-2">What's happening in this step:</p>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• <strong>Your previous work:</strong> You built the basic HTML structure and added CSS styling in Chapters 1 & 2</li>
              <li>• <strong>What we've added:</strong> The missing interactive elements needed for JavaScript functionality</li>
              <li>• <strong>New elements include:</strong> A clickable button, proper IDs for JavaScript targeting, and a script tag</li>
              <li>• <strong>Next step:</strong> You'll write JavaScript code that uses these elements to make the page interactive</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-600">
            Let's examine the complete HTML structure that your JavaScript will work with:
          </p>

          <SyntaxHighlighter
            language="html"
            title="Complete HTML Structure with Priority and Due Date"
            code={` 1  <!DOCTYPE html>
 2  <html lang="en-GB">
 3  <head>
 4      <meta charset="UTF-8">
 5      <meta name="viewport" content="width=device-width, initial-scale=1.0">
 6      <title>Ministry of Silly Walks - Task Manager</title>
 7      <link rel="stylesheet" href="styles.css">
 8  </head>
 9  <body>
10      <h1>Ministry of Silly Walks</h1>
11      <p>Task Management System</p>
12      
13      <h2>Add New Task</h2>
14      <div class="task-form">
15          <input type="text" id="taskInput" placeholder="Enter task description" required>
16          
17          <select id="prioritySelect" required>
18              <option value="Low">Low Priority</option>
19              <option value="Medium" selected>Medium Priority</option>
20              <option value="High">High Priority</option>
21              <option value="Critical">Critical Priority</option>
22          </select>
23          
24          <input type="date" id="dueDateInput" required>
25          <button id="addTaskBtn">Add Task</button>
26      </div>
27      
28      <h2>Current Tasks</h2>
29      <div id="taskList">
30          <div class="task-card">
31              <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
32              <div class="task-meta">
33                  <span class="priority-badge priority-high">High Priority</span>
34                  <span class="due-date">Due: 25/07/2025</span>
35              </div>
36              <p>Status: Pending</p>
37              <p>Assigned to: John Cleese</p>
38          </div>
39      </div>
40      
41      <script src="script.js"></script>
42  </body>
43  </html>`}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Enhanced Form Elements for Complete Task Management</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Line 14:</strong> <code>id="taskInput"</code> - Task description input with required validation</li>
                <li>• <strong>Lines 16-21:</strong> <code>id="prioritySelect"</code> - Dropdown for Low/Medium/High/Critical priority selection</li>
                <li>• <strong>Line 23:</strong> <code>id="dueDateInput"</code> - Date picker for due date selection</li>
                <li>• <strong>Line 24:</strong> <code>id="addTaskBtn"</code> - Button that triggers task creation with all fields</li>
                <li>• <strong>Line 28:</strong> <code>id="taskList"</code> - Container where new tasks with priority and dates appear</li>
                <li>• <strong>Line 40:</strong> JavaScript file loads after all HTML elements are ready</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">User Story Implementation</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• <strong>Priority Selection:</strong> Implements "I can prioritise my daily work effectively" user story</li>
                <li>• <strong>Due Date Tracking:</strong> Enables deadline management and workload planning</li>
                <li>• <strong>Form Validation:</strong> Ensures required fields are completed before task creation</li>
                <li>• <strong>Visual Priority Badges:</strong> Makes task importance immediately visible to evaluators</li>
                <li>• <strong>Structured Data:</strong> Creates consistent task format for easy filtering and sorting</li>
              </ul>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: HTML Foundation for Interactive Features
            </div>
            <p className="concept-text">
              Notice how the HTML structure directly supports the user stories we defined earlier. The input field and button enable "adding new tasks," while the task list container with proper IDs allows JavaScript to dynamically add new tasks. This is how requirements translate into technical implementation - the HTML provides the foundation that JavaScript can build upon.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'add-javascript',
      title: 'Step 2: Adding JavaScript Functionality',
      type: 'coding',
      exercise: {
        title: 'Make the Add Task Button Work',
        description: 'Now let\'s add JavaScript to make the "Add Task" button actually work! We\'ll write the code in a separate JavaScript file to maintain clean separation of concerns.',
        instructions: [
          'First, complete the fill-in-the-blank exercise to understand JavaScript interactions',
          'Continue working in the JavaScript file - the HTML and CSS remain read-only',
          'Start typing your JavaScript code in the script.js file below the comment',
          'Replace it with the JavaScript code shown below',
          'This will add event listeners and DOM manipulation to make the interface functional',
          'Test it by typing in the input field and clicking "Add Task" in the preview'
        ],
        fillInTheBlank: {
          template: 'We will add an {{listener}} to the button that responds when users {{action}} it. The code will get the {{text}} from the input field, {{check}} if it\'s not empty, and then {{create}} a new task.',
          answers: {
            listener: 'event listener',
            action: 'click',
            text: 'value',
            check: 'validate',
            create: 'add'
          } as { [key: string]: string },
          hints: {
            listener: 'What JavaScript feature "listens" for user interactions like clicks?',
            action: 'What do users do with their mouse to activate a button?',
            text: 'What property of an input field contains what the user typed?',
            check: 'What should we do to ensure the user actually entered something?',
            create: 'What do we want to do with the user\'s input - make a new task?'
          } as { [key: string]: string },
          options: {
            listener: ['event listener', 'function', 'method', 'callback', 'handler', 'variable'],
            action: ['click', 'hover', 'focus', 'submit', 'change', 'load'],
            text: ['value', 'innerHTML', 'textContent', 'data', 'content', 'attribute'],
            check: ['validate', 'execute', 'process', 'parse', 'compile', 'render'],
            create: ['add', 'remove', 'update', 'delete', 'modify', 'replace']
          } as { [key: string]: string[] },
          description: 'Before we write JavaScript, let\'s understand how user interactions work: **Event Listeners** are JavaScript functions that "listen" for user actions (like clicks), **Input Values** are the text users type into form fields, and **Validation** means checking if the user entered valid data before processing it. For example: when a user clicks "Add Task", the event listener gets the input value, validates it\'s not empty, and then adds it to the task list.'
        },
        codeBlock: {
          code: `document.getElementById('addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    
    const taskText = input.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    if (!dueDate) {
        alert('Please select a due date');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('div');
    const priorityColor = getPriorityColor(priority);
    const formattedDate = new Date(dueDate).toLocaleDateString('en-UK');
    
    newTask.innerHTML = \`
        <div class="task-card">
            <h3>\${taskText}</h3>
            <div class="task-meta">
                <span class="priority-badge \${priorityColor}">\${priority} Priority</span>
                <span class="due-date">Due: \${formattedDate}</span>
            </div>
            <p>Status: Pending</p>
            <p>Assigned to: Current User</p>
        </div>
    \`;
    
    taskList.appendChild(newTask);
    
    // Clear form
    input.value = '';
    prioritySelect.value = 'Medium';
    dueDateInput.value = '';
});

function getPriorityColor(priority) {
    switch(priority) {
        case 'Critical': return 'priority-critical';
        case 'High': return 'priority-high';
        case 'Medium': return 'priority-medium';
        case 'Low': return 'priority-low';
        default: return 'priority-medium';
    }
}`,
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
              line: "const prioritySelect = document.getElementById('prioritySelect');",
              explanation: "This gets the priority dropdown so we can read which priority the user selected.",
              businessContext: "Priority selection enables users to communicate urgency and helps with workload management."
            },
            {
              line: "const dueDateInput = document.getElementById('dueDateInput');",
              explanation: "This gets the due date input field to capture when the task needs to be completed.",
              businessContext: "Due date tracking is essential for deadline management and project planning."
            },
            {
              line: "if (!dueDate) { alert('Please select a due date'); return; }",
              explanation: "This validates that the user selected a due date before creating the task.",
              businessContext: "Date validation ensures all tasks have deadlines, which is crucial for project management and accountability."
            },
            {
              line: "const priorityColor = getPriorityColor(priority);",
              explanation: "This calls a helper function to determine which CSS class should be used for the priority badge color.",
              businessContext: "Visual priority indicators help users quickly identify urgent tasks, improving workflow efficiency."
            },
            {
              line: "const formattedDate = new Date(dueDate).toLocaleDateString('en-UK');",
              explanation: "This formats the due date into a readable UK date format (DD/MM/YYYY).",
              businessContext: "Proper date formatting ensures consistency and clarity in user interfaces, especially important for government systems."
            },
            {
              line: "taskList.appendChild(newTask);",
              explanation: "This adds the complete task card to the task list with all the priority and date information.",
              businessContext: "Dynamic content updates provide immediate feedback and keep the interface current with user actions."
            }
          ]
        },
        language: 'typescript' as const,
        startingCode: `// Ministry of Silly Walks - Task Manager JavaScript

// Add your JavaScript code here to handle priority and due dates`,
        targetCode: `// Ministry of Silly Walks - Task Manager JavaScript

// Enhanced HTML structure includes:
// - Task description input (id="taskInput")
// - Priority dropdown (id="prioritySelect") 
// - Due date picker (id="dueDateInput")
// - Add task button (id="addTaskBtn")
// - Task list container (id="taskList")

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    
    const taskText = input.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    if (!dueDate) {
        alert('Please select a due date');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('div');
    const priorityColor = getPriorityColor(priority);
    const formattedDate = new Date(dueDate).toLocaleDateString('en-UK');
    
    newTask.innerHTML = \`
        <div class="task-card">
            <h3>\${taskText}</h3>
            <div class="task-meta">
                <span class="priority-badge \${priorityColor}">\${priority} Priority</span>
                <span class="due-date">Due: \${formattedDate}</span>
            </div>
            <p>Status: Pending</p>
            <p>Assigned to: Current User</p>
        </div>
    \`;
    
    taskList.appendChild(newTask);
    
    // Clear form
    input.value = '';
    prioritySelect.value = 'Medium';
    dueDateInput.value = '';
});

function getPriorityColor(priority) {
    switch(priority) {
        case 'Critical': return 'priority-critical';
        case 'High': return 'priority-high';
        case 'Medium': return 'priority-medium';
        case 'Low': return 'priority-low';
        default: return 'priority-medium';
    }
}`,
        hints: [
          "Add your JavaScript code below the comment in the script.js file",
          "Replace it with the JavaScript code from the code block above",
          "The HTML and CSS files are read-only - you can view them but only edit JavaScript",
          "Make sure to include the complete event listener function",
          "After adding the code, test it by typing in the input field and clicking 'Add Task' in the preview"
        ],
        explanation: {
          whatIsHappening: "You've added JavaScript functionality while working with read-only HTML and CSS files! The existing interface structure from Chapters 1 & 2 now has interactive behavior. The JavaScript listens for button clicks, validates user input, creates new task elements, and updates the page dynamically. You're working purely in the JavaScript layer while the HTML and CSS remain untouched.",
          whyItMatters: "This demonstrates how development teams often work - you receive completed interface designs and add functionality through JavaScript. The Ministry's professional-looking interface now has working features that staff can actually use. This separation allows teams to work independently and makes code more maintainable and organized.",
          realWorldConnection: "In real projects, you often work with pre-built components and add JavaScript behavior. When you write requirements about 'interactive features' or 'user workflow,' this JavaScript layer is where those requirements get implemented. Understanding this separation helps you write better technical requirements and have informed discussions about feature implementation approaches.",
          keyTerms: {
            "Event Listener": "JavaScript code that waits for and responds to user actions like clicks",
            "DOM Manipulation": "Using JavaScript to change the content and structure of the web page in real-time",
            "Input Validation": "Checking that user-entered data meets business rules before processing",
            "Template Literals": "The backtick syntax (`) that lets you create HTML with dynamic content",
            "Discrete Sections": "Keeping different concerns (HTML structure, CSS styling, JavaScript behavior) separate and focused"
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

  const allStepsComplete = completedSteps.length === steps.length;

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
                    onClick={() => changeStep(index)}
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
                      onClick={() => changeStep(Math.max(0, currentStep - 1))}
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
                          changeStep(currentStep + 1)
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
                        changeStep(currentStep + 1)
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