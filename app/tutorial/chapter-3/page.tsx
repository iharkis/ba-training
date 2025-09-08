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

  // Helper function to change step
  const changeStep = (newStep: number) => {
    setCurrentStep(newStep)
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
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current User Stories</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• "I want to add new silly walk evaluations"</li>
                  <li>• "I want to mark tasks as complete when done"</li>
                  <li>• "I want to see my task count update in real-time"</li>
                  <li>• "I want to delete tasks that are cancelled"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Technical Implementation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
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
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Business Logic vs UI Logic
            </div>
            <div className="concept-text space-y-4">
              <p>
                JavaScript handles both user interface interactions and business rule enforcement. Understanding this distinction is crucial for writing requirements that properly separate presentation concerns from business logic, leading to more maintainable and testable applications.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">UI Logic vs Business Logic Examples:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div><strong>UI Logic:</strong> "When user clicks 'Add Task', show loading spinner and disable button"</div>
                    <div><strong>Implementation:</strong> DOM manipulation, event handlers, visual feedback</div>
                    <div><strong>Testing:</strong> Visual regression tests, user interaction tests</div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3">
                    <div><strong>Business Logic:</strong> "Task title must be 3-100 characters, assigned to valid user"</div>
                    <div><strong>Implementation:</strong> Validation functions, data processing, rule enforcement</div>
                    <div><strong>Testing:</strong> Unit tests, business rule validation tests</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Requirements Writing Framework:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>User Interaction:</strong> What triggers the action? (clicks, form submission, page load)</div>
                  <div><strong>Visual Feedback:</strong> How does the UI respond immediately? (loading states, animations)</div>
                  <div><strong>Business Rules:</strong> What validation or processing must occur? (required fields, calculations)</div>
                  <div><strong>Data Operations:</strong> What information is created, updated, or retrieved?</div>
                  <div><strong>Error Handling:</strong> What happens when validation fails or operations error?</div>
                  <div><strong>Success State:</strong> How does the UI update after successful completion?</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Separation of Concerns in Requirements:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Presentation Layer:</strong> How information is displayed and styled</div>
                  <div><strong>Interaction Layer:</strong> How users interact with the interface</div>
                  <div><strong>Logic Layer:</strong> How business rules are applied and enforced</div>
                  <div><strong>Data Layer:</strong> How information is stored and retrieved</div>
                </div>
              </div>
            </div>
          </div>

          <JavaScriptDiagram />

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Learning Objective</h3>
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
          
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <p className="text-gray-900 font-medium mb-2">What's happening in this step:</p>
            <ul className="text-gray-700 space-y-1 text-sm">
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
            title="Complete HTML Structure with Priority and Due Date Features"
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

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">What's New in Our Enhanced HTML?</h4>
            <p className="text-gray-700 mb-4">
              Our HTML now includes advanced form elements that make this a proper task management system. Think of these as "connection points" that JavaScript uses to create rich, interactive experiences:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded p-5">
                <h5 className="font-medium text-gray-900 mb-4 flex items-center">
                  Interactive Form Elements - HTML Deep Dive
                </h5>
                <div className="space-y-6">
                  
                  <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-gray-900">Task Description Input</h6>
                      <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">id="taskInput"</code>
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono mb-3">
                      &lt;input type="text" id="taskInput" placeholder="Enter task description" required&gt;
                    </div>
                    <div className="text-sm space-y-2">
                      <p><strong>What it does:</strong> Creates a single-line text input field where users can type task descriptions</p>
                      <p><strong>HTML breakdown:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">type="text"</code> - Specifies this accepts any text input (letters, numbers, symbols)</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">placeholder="..."</code> - Shows gray hint text before user starts typing</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">required</code> - Browser won't submit form if this field is empty</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">id="taskInput"</code> - Unique identifier so JavaScript can find this specific element</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-gray-900">Priority Selector Dropdown</h6>
                      <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">id="prioritySelect"</code>
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono mb-3">
                      &lt;select id="prioritySelect" required&gt;<br/>
                      &nbsp;&nbsp;&lt;option value="Low"&gt;Low Priority&lt;/option&gt;<br/>
                      &nbsp;&nbsp;&lt;option value="Medium" selected&gt;Medium Priority&lt;/option&gt;<br/>
                      &nbsp;&nbsp;&lt;option value="High"&gt;High Priority&lt;/option&gt;<br/>
                      &nbsp;&nbsp;&lt;option value="Critical"&gt;Critical Priority&lt;/option&gt;<br/>
                      &lt;/select&gt;
                    </div>
                    <div className="text-sm space-y-2">
                      <p><strong>What it does:</strong> Creates a dropdown menu where users can choose from predefined priority levels</p>
                      <p><strong>HTML breakdown:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">&lt;select&gt;</code> - Container that creates the dropdown functionality</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">&lt;option&gt;</code> - Each choice available in the dropdown</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">value="Medium"</code> - The data sent to JavaScript when this option is selected</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">selected</code> - Makes "Medium Priority" the default choice when page loads</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">required</code> - Forces user to make a selection (though one is pre-selected)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-gray-900">Due Date Picker</h6>
                      <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">id="dueDateInput"</code>
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono mb-3">
                      &lt;input type="date" id="dueDateInput" required&gt;
                    </div>
                    <div className="text-sm space-y-2">
                      <p><strong>What it does:</strong> Creates a date picker that opens a calendar widget when clicked</p>
                      <p><strong>HTML breakdown:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">type="date"</code> - Special input type that creates calendar functionality</li>
                        <li>• Browser automatically shows a calendar popup when user clicks the field</li>
                        <li>• Validates that user enters a properly formatted date (YYYY-MM-DD)</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">required</code> - User must pick a date before form can be submitted</li>
                        <li>• Returns date in format "2025-07-25" that JavaScript can easily work with</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-gray-900">Form Submit Button</h6>
                      <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">id="addTaskBtn"</code>
                    </div>
                    <div className="bg-gray-800 text-white p-3 rounded text-sm font-mono mb-3">
                      &lt;button id="addTaskBtn"&gt;Add Task&lt;/button&gt;
                    </div>
                    <div className="text-sm space-y-2">
                      <p><strong>What it does:</strong> Creates a clickable button that triggers JavaScript to process all form data</p>
                      <p><strong>HTML breakdown:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">&lt;button&gt;</code> - Creates an interactive element users can click</li>
                        <li>• "Add Task" is the visible text displayed on the button</li>
                        <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">id="addTaskBtn"</code> - JavaScript uses this to "listen" for click events</li>
                        <li>• When clicked, triggers the JavaScript function that creates new tasks</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded p-4">
                <h5 className="font-medium text-gray-900 mb-3">Why This Solves Real Problems</h5>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-medium text-gray-900">Priority Management</p>
                    <p className="text-xs">John Cleese can now see which silly walk evaluations are urgent vs. routine</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Deadline Tracking</p>
                    <p className="text-xs">No more missed deadlines for walk approval submissions</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Structured Data</p>
                    <p className="text-xs">Every task has consistent information for easy filtering and reporting</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-xs"><strong>Real-world impact:</strong> Instead of sticky notes that get lost, the Ministry now has a proper digital system with priority levels and deadlines - just like John Cleese requested in his user story!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: HTML Foundation for Interactive Features
            </div>
            <div className="concept-text space-y-4">
              <p>
                Interactive requirements depend entirely on proper HTML structure. Every dynamic feature you specify must have HTML elements that JavaScript can target and manipulate. Understanding this dependency helps you write more complete functional requirements.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">User Story → HTML → JavaScript Chain:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-green-500 pl-3">
                    <div><strong>User Story:</strong> "I want to add new tasks quickly"</div>
                    <div><strong>HTML Requirement:</strong> Input field with unique ID, submit button</div>
                    <div><strong>JavaScript Requirement:</strong> Event listener, validation, DOM manipulation</div>
                    <div><strong>BA Question:</strong> What data validation is required? What happens on success/failure?</div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div><strong>User Story:</strong> "I need to see all my tasks in one place"</div>
                    <div><strong>HTML Requirement:</strong> Container element with proper semantic structure</div>
                    <div><strong>JavaScript Requirement:</strong> Dynamic content generation, data binding</div>
                    <div><strong>BA Question:</strong> How should tasks be sorted? What information is displayed?</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Interactive Requirements Checklist:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Triggering Elements:</strong> What buttons, links, or form fields initiate actions?</div>
                  <div><strong>Target Elements:</strong> What parts of the page will be updated or modified?</div>
                  <div><strong>Data Sources:</strong> Where does the information come from? (user input, APIs, storage)</div>
                  <div><strong>User Feedback:</strong> How does the user know the action succeeded or failed?</div>
                  <div><strong>State Management:</strong> What information needs to persist between interactions?</div>
                  <div><strong>Validation Rules:</strong> What business rules must be enforced before processing?</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Common Interactive Requirement Gaps:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Not specifying what happens during loading/processing states</li>
                  <li>• Missing error handling and recovery scenarios</li>
                  <li>• Unclear data validation rules and error messages</li>
                  <li>• Not defining keyboard accessibility and navigation</li>
                  <li>• Missing specifications for real-time updates and notifications</li>
                </ul>
              </div>
            </div>
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
              explanation: "Breaking down this event listener setup:<ul><li>'document' = The entire web page (HTML document)</li><li>'getElementById()' = Method to find a specific HTML element by its ID</li><li>'addTaskBtn' = The ID of our button from the HTML</li><li>'addEventListener()' = Method that waits for user interactions</li><li>'click' = The type of interaction we're waiting for</li><li>'function()' = The code that runs when the click happens</li><li>This connects user actions to code responses</li></ul>",
              businessContext: "Event listeners are how web applications respond to user actions - essential for interactive systems."
            },
            {
              line: "const input = document.getElementById('taskInput');",
              explanation: "Understanding variable creation and DOM access:<ul><li>'const' = Creates a new variable (a named container for data)</li><li>'input' = The name we're giving to our variable</li><li>'=' = Assignment operator (puts the value on the right into the variable on the left)</li><li>'document.getElementById()' = Finds the HTML element with ID 'taskInput'</li><li>This creates a reference to the input field so we can work with it</li><li>Variables let us store and reuse values throughout our code</li></ul>",
              businessContext: "Accessing form inputs is fundamental to collecting user data in web applications."
            },
            {
              line: "const prioritySelect = document.getElementById('prioritySelect');",
              explanation: "Creating another variable for form data access:<ul><li>'const prioritySelect' = Creates a variable named 'prioritySelect'</li><li>'getElementById('prioritySelect')' = Finds the dropdown menu in the HTML</li><li>This follows the same pattern as the input field variable</li><li>Each form element needs its own variable to access its data</li><li>Dropdown menus (select elements) contain the user's choice</li><li>We'll use this variable later to get the selected priority level</li></ul>",
              businessContext: "Priority selection enables users to communicate urgency and helps with workload management."
            },
            {
              line: "const dueDateInput = document.getElementById('dueDateInput');",
              explanation: "Creating a third variable for date input:<ul><li>'const dueDateInput' = Variable to store reference to the date picker</li><li>'getElementById('dueDateInput')' = Finds the date input field in HTML</li><li>This completes our collection of form element references</li><li>Date inputs are special HTML elements that show a calendar picker</li><li>We need all three variables (text, priority, date) to create complete tasks</li><li>This pattern of getting elements first is common in JavaScript</li></ul>",
              businessContext: "Due date tracking is essential for deadline management and project planning."
            },
            {
              line: "if (!dueDate) { alert('Please select a due date'); return; }",
              explanation: "Understanding conditional logic and validation:<ul><li>'if' = JavaScript keyword that creates a conditional check</li><li>'!dueDate' = Checks if dueDate is empty or null (! means 'not' or 'opposite of')</li><li>'alert()' = Shows a pop-up message to the user</li><li>'return' = Stops the function from continuing (exits early)</li><li>This prevents task creation if no due date was selected</li><li>If statements let programs make decisions based on data</li><li>Validation protects against incomplete or invalid data</li></ul>",
              businessContext: "Date validation ensures all tasks have deadlines, which is crucial for project management and accountability."
            },
            {
              line: "const priorityColor = getPriorityColor(priority);",
              explanation: "Understanding function calls and return values:<ul><li>'const priorityColor' = Creates a new variable to store the result</li><li>'getPriorityColor()' = Calls a function (a reusable piece of code)</li><li>'priority' = The parameter we're passing to the function (the priority level)</li><li>Functions take input (priority) and return output (CSS class name)</li><li>This function converts 'High' to 'priority-high' for CSS styling</li><li>Functions help organize code and avoid repetition</li><li>The returned value gets stored in the priorityColor variable</li></ul>",
              businessContext: "Visual priority indicators help users quickly identify urgent tasks, improving workflow efficiency."
            },
            {
              line: "const formattedDate = new Date(dueDate).toLocaleDateString('en-UK');",
              explanation: "Understanding date processing and formatting:<ul><li>'const formattedDate' = Variable to store the formatted date</li><li>'new Date()' = Creates a JavaScript Date object from the input date</li><li>'dueDate' = The raw date value from the date picker</li><li>'.toLocaleDateString()' = Method that formats dates for display</li><li>'en-UK' = Parameter specifying UK date format (DD/MM/YYYY)</li><li>This converts '2025-07-25' to '25/07/2025' for better readability</li><li>Date objects have many built-in methods for formatting and calculations</li></ul>",
              businessContext: "Proper date formatting ensures consistency and clarity in user interfaces, especially important for government systems."
            },
            {
              line: "taskList.appendChild(newTask);",
              explanation: "Understanding DOM manipulation and element insertion:<ul><li>'taskList' = The variable holding reference to the task container</li><li>'.appendChild()' = Method that adds a child element inside a parent</li><li>'newTask' = The complete task card element we created</li><li>This physically adds the new task to the visible page</li><li>The browser immediately shows the new task in the list</li><li>DOM manipulation changes the page structure in real-time</li><li>This is how JavaScript makes web pages dynamic and interactive</li></ul>",
              businessContext: "Dynamic content updates provide immediate feedback and keep the interface current with user actions."
            }
          ]
        },
        language: 'typescript' as const,
        startingCode: `// Ministry of Silly Walks - Task Manager JavaScript

// Add your JavaScript code here to handle priority and due dates`,
        targetCode: `// Ministry of Silly Walks - Task Manager JavaScript

// HTML structure includes:
// - Task description input (id="taskInput")
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
          "Start by adding an event listener to the 'addTaskBtn' button that responds to 'click' events",
          "Use document.getElementById() to get references to all form elements (taskInput, prioritySelect, dueDateInput)",
          "Extract values from each form element using .value property and .trim() for the text input",
          "Add validation to ensure the task description is not empty and a due date is selected",
          "Create a new task element using document.createElement() and set its innerHTML with template literals",
          "Use the getPriorityColor() function to get the appropriate CSS class for the priority badge",
          "Format the date using new Date().toLocaleDateString('en-UK') for proper UK date display",
          "Add the new task to the task list using appendChild() method",
          "Clear the form by resetting all input values to their defaults"
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
                    You've built a working task management system!
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