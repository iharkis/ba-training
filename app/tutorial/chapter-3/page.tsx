'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Zap, Lightbulb, Code } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import CodeExplanationModal from '@/components/tutorial/CodeExplanationModal'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter3() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCodeExplanation, setShowCodeExplanation] = useState(false)

  // Load progress on mount
  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

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
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
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
        }
        /* Step 1: Add button styles here */
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        button:hover {
            background-color: #002a5c;
        }
    </style>
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
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
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
        }
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        button:hover {
            background-color: #002a5c;
        }
    </style>
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
        title: 'Make the Button Actually Work',
        description: 'Now let\'s add JavaScript to make the button functional. When clicked, it will take the text from the input field and add a new task to the list.',
        instructions: [
          'Find the comment "<!-- Step 2: Add JavaScript here -->" before the closing </body> tag',
          'Delete that comment line',
          'Type: <script>',
          'Copy and paste the JavaScript code shown below',
          'Finally, type: </script>',
          'Now your Add Task button will work!'
        ],
        language: 'html' as const,
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
              explanation: "This tells the computer to 'listen' for when someone clicks the Add Task button.",
              businessContext: "This is how your requirement 'When users click Add Task, something should happen' gets implemented in code."
            },
            {
              line: "const input = document.getElementById('taskInput');\nconst taskText = input.value.trim();",
              explanation: "Get the text that the user typed in the input box and remove any extra spaces.",
              businessContext: "This captures what the user actually wants to add to their task list."
            },
            {
              line: "if (taskText === '') {\n    alert('Please enter a task description');\n    return;\n}",
              explanation: "Check if the user left the input box empty. If so, show an error message and stop.",
              businessContext: "This enforces your business rule: 'Users cannot create empty tasks' - preventing data quality issues."
            },
            {
              line: "const taskList = document.getElementById('taskList');\nconst newTask = document.createElement('div');",
              explanation: "Find the area where tasks are displayed and create a new task container.",
              businessContext: "This prepares to add the new task to the user's visible task list."
            },
            {
              line: "newTask.innerHTML = \\`\n    <h3>\\${taskText}</h3>\n    <p>Status: Pending</p>\n    <p>Assigned to: Current User</p>\n\\`;",
              explanation: "Create the HTML structure for the new task, including the user's text and default values.",
              businessContext: "This formats the task exactly like existing tasks, maintaining consistency in your interface."
            },
            {
              line: "taskList.appendChild(newTask);\ninput.value = '';",
              explanation: "Add the new task to the list and clear the input box for the next task.",
              businessContext: "This completes the user action - they see their new task appear and can immediately add another one."
            }
          ]
        },
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
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
        }
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        button:hover {
            background-color: #002a5c;
        }
    </style>
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
    
    <!-- Step 2: Add JavaScript here -->
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
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
        }
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        button:hover {
            background-color: #002a5c;
        }
    </style>
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
    
    <script>
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
        });
    </script>
</body>
</html>`,
        hints: [
          "Look for the comment '<!-- Step 2: Add JavaScript here -->' near the bottom of the code, just before </body>",
          "Delete that entire comment line and replace it with <script>",
          "The JavaScript code is quite long - you can copy and paste it exactly as shown in the instructions",
          "Make sure to include the opening <script> and closing </script> tags",
          "The code listens for clicks on the Add Task button and creates new tasks",
          "Don't worry about understanding every line - focus on seeing how it makes the button work!"
        ],
        explanation: {
          whatIsHappening: "You've added your first JavaScript functionality! The code listens for clicks on the 'Add Task' button, gets the text from the input field, validates it's not empty, creates a new task element with the same styling as existing tasks, and adds it to the task list. It also clears the input field for the next task.",
          whyItMatters: "This implements the core user story: 'As a staff member, I want to add new tasks to my workload.' The validation prevents empty tasks (a business rule), and the automatic clearing of the input field improves user experience. Users can now actually use this system for their daily work - it's transformed from a static display to a working tool.",
          realWorldConnection: "This is how requirements like 'validate user input' and 'provide immediate feedback' get implemented. The JavaScript handles both user interface concerns (clearing the input, adding visual elements) and business logic (validation rules). Understanding this helps you specify requirements that consider both user experience and data integrity.",
          keyTerms: {
            "Event listener": "JavaScript code that waits for specific user actions (like clicks) and responds",
            "DOM manipulation": "Changing the webpage content dynamically using JavaScript",
            "Input validation": "Checking user input meets business rules before processing",
            "Template literals": "The backtick syntax (`) that lets you create HTML with dynamic content"
          }
        }
      }
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tutorial/chapter-2" className="flex items-center text-gray-600 hover:text-gray-900">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    href="/tutorial/chapter-4" 
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