'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Database, Lightbulb, Code, Save, Trash2 } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter4() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

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
      id: 'data-management-introduction',
      title: 'Understanding Data Management',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 4: Advanced JavaScript & Data Management</h2>
          <p className="text-lg text-gray-600">
            Excellent! Your task manager can now add tasks. But what happens when users refresh the page? All their tasks disappear! Let's fix this and add more advanced features like editing and deleting tasks.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is Data Management?</div>
            <div className="explanation-text">
              <p className="mb-3">
                Data management is about storing, organizing, and manipulating information in your application. Right now, tasks only exist in the browser's memory while the page is loaded.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Temporary Storage:</strong> Data in variables disappears when page refreshes</li>
                <li><strong>Persistent Storage:</strong> Data saved to localStorage, databases, or files</li>
                <li><strong>CRUD Operations:</strong> Create, Read, Update, Delete - the four basic data operations</li>
              </ul>
              <p className="mt-3">
                Think of it like filing cabinets vs. your desk: your desk (memory) gets cleared each day, but filing cabinets (storage) keep documents permanently.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs Persistent Data</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry staff can't lose their work every time they refresh their browser. John Cleese needs to track walk evaluations across multiple sessions, and the system needs to support real workflow requirements:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Current Problems</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Tasks disappear on page refresh</li>
                  <li>• Can't edit task details after creation</li>
                  <li>• No way to delete completed tasks</li>
                  <li>• No task status tracking</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Required Features</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Persistent task storage</li>
                  <li>• Edit task descriptions</li>
                  <li>• Delete unwanted tasks</li>
                  <li>• Track task completion status</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Data Requirements
            </div>
            <p className="concept-text">
              When you write requirements like "users should be able to edit their entries" or "data should persist between sessions," you're defining data management needs. Understanding concepts like CRUD operations and storage types helps you write more precise requirements and have informed discussions about data architecture decisions.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll implement localStorage to persist tasks, add edit/delete functionality, and understand how data flows through web applications. You'll see how business requirements translate into specific data management features.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'add-local-storage',
      title: 'Step 1: Adding Persistent Storage',
      type: 'coding',
      exercise: {
        title: 'Save Tasks to Browser Storage',
        description: 'Let\'s add localStorage to save tasks permanently. This means tasks won\'t disappear when users refresh the page.',
        instructions: [
          'Find the comment "// Step 1: Add localStorage functions here" at the top of the script',
          'Add functions to save and load tasks from localStorage',
          'Update the add task code to save to storage',
          'Add code to load existing tasks when the page loads'
        ],
        language: 'html' as const,
        codeBlock: {
          code: `// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('ministryTasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('ministryTasks');
    return saved ? JSON.parse(saved) : [];
}

// Display all tasks
function displayTasks() {
    const tasks = loadTasks();
    const taskList = document.getElementById('taskList');
    
    // Clear existing tasks
    taskList.innerHTML = '';
    
    // Add each task
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description || 'Status: Pending'}</p>
            <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
        \`;
        taskList.appendChild(taskDiv);
    });
}`,
          explanations: [
            {
              line: "function saveTasks(tasks) {\n    localStorage.setItem('ministryTasks', JSON.stringify(tasks));\n}",
              explanation: "Create a function that saves an array of tasks to the browser's localStorage with a unique key.",
              businessContext: "This implements the requirement 'tasks should persist between browser sessions' - essential for real workplace tools."
            },
            {
              line: "function loadTasks() {\n    const saved = localStorage.getItem('ministryTasks');\n    return saved ? JSON.parse(saved) : [];\n}",
              explanation: "Create a function that retrieves saved tasks from localStorage, or returns an empty array if none exist.",
              businessContext: "This handles the user story 'As a staff member, I want to see my previous tasks when I return to the system.'"
            },
            {
              line: "function displayTasks() {\n    const tasks = loadTasks();\n    const taskList = document.getElementById('taskList');\n    \n    // Clear existing tasks\n    taskList.innerHTML = '';",
              explanation: "Create a function that loads all saved tasks and clears the current display to avoid duplicates.",
              businessContext: "This ensures the interface always shows the current, accurate task list - preventing user confusion."
            },
            {
              line: "tasks.forEach((task, index) => {\n        const taskDiv = document.createElement('div');\n        taskDiv.innerHTML = \`<h3>\${task.title}</h3>...`;",
              explanation: "Loop through each saved task and create HTML elements to display them in the interface.",
              businessContext: "This renders the user's task list in a consistent format, making their work visible and manageable."
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
    
    <script>
        // Step 1: Add localStorage functions here
        
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
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem('ministryTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('ministryTasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Display all tasks
        function displayTasks() {
            const tasks = loadTasks();
            const taskList = document.getElementById('taskList');
            
            // Clear existing tasks
            taskList.innerHTML = '';
            
            // Add each task
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.innerHTML = \`
                    <h3>\${task.title}</h3>
                    <p>\${task.description || 'Status: Pending'}</p>
                    <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
                \`;
                taskList.appendChild(taskDiv);
            });
        }
        
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task description');
                return;
            }
            
            // Load existing tasks and add new one
            const tasks = loadTasks();
            tasks.push({
                title: taskText,
                description: 'Status: Pending',
                assignedTo: 'Current User',
                completed: false
            });
            
            // Save and display
            saveTasks(tasks);
            displayTasks();
            input.value = '';
        });
        
        // Load tasks when page loads
        displayTasks();
    </script>
</body>
</html>`,
        hints: [
          "Look for the comment '// Step 1: Add localStorage functions here' at the top of the script section",
          "Add the three functions: saveTasks(), loadTasks(), and displayTasks()",
          "Update the click handler to use the task array instead of direct DOM manipulation",
          "Add displayTasks() at the end to load saved tasks when the page loads",
          "localStorage.setItem() saves data, localStorage.getItem() retrieves it"
        ],
        explanation: {
          whatIsHappening: "You've implemented persistent data storage using the browser's localStorage feature. Tasks are now saved as JSON data and automatically loaded when the page refreshes. The code separates data management (saveTasks, loadTasks) from display logic (displayTasks), creating a cleaner architecture.",
          whyItMatters: "This solves a critical business requirement - data persistence. Users can now trust that their work won't disappear, which is essential for real workplace applications. You've also structured the code to handle data as objects rather than just HTML, making it easier to add features like editing and status tracking.",
          realWorldConnection: "This pattern mirrors how real applications work: separate data storage from display logic. When you write requirements about 'saving user work' or 'maintaining state between sessions,' this is the type of implementation developers create. Understanding localStorage helps you discuss data persistence requirements more effectively.",
          keyTerms: {
            "localStorage": "Browser storage that persists data between page loads and browser sessions",
            "JSON.stringify": "Converts JavaScript objects into text format for storage",
            "JSON.parse": "Converts stored text back into JavaScript objects",
            "Data persistence": "Ensuring information survives beyond the current session or page load"
          }
        }
      }
    },
    {
      id: 'add-delete-functionality',
      title: 'Step 2: Adding Delete Functionality',
      type: 'coding',
      exercise: {
        title: 'Add Delete Buttons to Tasks',
        description: 'Now let\'s add the ability to delete tasks. Each task will get a delete button that removes it from storage.',
        instructions: [
          'Update the displayTasks function to include delete buttons',
          'Add a deleteTask function that removes tasks by index',
          'Style the delete buttons to look like danger/warning buttons'
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
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #002a5c;
        }
        /* Step 2: Add delete button styles here */
        .delete-btn {
            background-color: #dc2626;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
        }
        .delete-btn:hover {
            background-color: #b91c1c;
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
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem('ministryTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('ministryTasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Step 2: Add deleteTask function here
        
        // Display all tasks
        function displayTasks() {
            const tasks = loadTasks();
            const taskList = document.getElementById('taskList');
            
            // Clear existing tasks
            taskList.innerHTML = '';
            
            // Add each task
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.innerHTML = \`
                    <h3>\${task.title}</h3>
                    <p>\${task.description || 'Status: Pending'}</p>
                    <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
                \`;
                taskList.appendChild(taskDiv);
            });
        }
        
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task description');
                return;
            }
            
            // Load existing tasks and add new one
            const tasks = loadTasks();
            tasks.push({
                title: taskText,
                description: 'Status: Pending',
                assignedTo: 'Current User',
                completed: false
            });
            
            // Save and display
            saveTasks(tasks);
            displayTasks();
            input.value = '';
        });
        
        // Load tasks when page loads
        displayTasks();
    </script>
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
            margin-right: 10px;
        }
        button:hover {
            background-color: #002a5c;
        }
        .delete-btn {
            background-color: #dc2626;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
        }
        .delete-btn:hover {
            background-color: #b91c1c;
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
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem('ministryTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('ministryTasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Delete a task by index
        function deleteTask(index) {
            const tasks = loadTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            displayTasks();
        }
        
        // Display all tasks
        function displayTasks() {
            const tasks = loadTasks();
            const taskList = document.getElementById('taskList');
            
            // Clear existing tasks
            taskList.innerHTML = '';
            
            // Add each task
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.innerHTML = \`
                    <h3>\${task.title}</h3>
                    <p>\${task.description || 'Status: Pending'}</p>
                    <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
                    <button class="delete-btn" onclick="deleteTask(\${index})">Delete Task</button>
                \`;
                taskList.appendChild(taskDiv);
            });
        }
        
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task description');
                return;
            }
            
            // Load existing tasks and add new one
            const tasks = loadTasks();
            tasks.push({
                title: taskText,
                description: 'Status: Pending',
                assignedTo: 'Current User',
                completed: false
            });
            
            // Save and display
            saveTasks(tasks);
            displayTasks();
            input.value = '';
        });
        
        // Load tasks when page loads
        displayTasks();
    </script>
</body>
</html>`,
        hints: [
          "Add a deleteTask function that takes an index parameter",
          "Use tasks.splice(index, 1) to remove one item at that index",
          "Update displayTasks to include a delete button in each task's HTML",
          "Use onclick=\"deleteTask(${index})\" to wire up the button",
          "The red delete button styling is already provided in the CSS"
        ],
        explanation: {
          whatIsHappening: "You've implemented full CRUD functionality - Create (add), Read (display), Update (coming next), and Delete. The deleteTask function removes items from the array by index, saves the updated array, and refreshes the display. Each task now has its own delete button that's dynamically connected to its position in the array.",
          whyItMatters: "This implements the user story 'As a staff member, I want to remove completed or cancelled tasks from my list.' The red styling follows UI conventions that help users understand this is a destructive action. The immediate visual feedback (task disappears) confirms the action succeeded.",
          realWorldConnection: "This demonstrates how user requirements like 'users should be able to remove items' translate into specific technical implementations. Understanding array manipulation and event handling helps you write more informed requirements about data modification features and discuss the technical implications of user actions.",
          keyTerms: {
            "Array.splice()": "JavaScript method that removes items from an array at a specific position",
            "Dynamic event handling": "Connecting buttons to functions with parameters based on data",
            "CRUD operations": "Create, Read, Update, Delete - the fundamental data operations",
            "Destructive action": "An operation that permanently removes or changes data"
          }
        }
      }
    },
    {
      id: 'add-edit-functionality',
      title: 'Step 3: Adding Edit Functionality',
      type: 'coding',
      exercise: {
        title: 'Add Edit Buttons and Functionality',
        description: 'Let\'s add the ability to edit existing tasks. Users can click an edit button to modify the task description.',
        instructions: [
          'Add an editTask function that prompts for new task text',
          'Update displayTasks to include edit buttons',
          'Style the edit buttons to look distinct from add/delete buttons'
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
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #002a5c;
        }
        .delete-btn {
            background-color: #dc2626;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
        }
        .delete-btn:hover {
            background-color: #b91c1c;
        }
        /* Step 3: Edit button styles already provided */
        .edit-btn {
            background-color: #059669;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
            margin-right: 5px;
        }
        .edit-btn:hover {
            background-color: #047857;
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
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem('ministryTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('ministryTasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Delete a task by index
        function deleteTask(index) {
            const tasks = loadTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            displayTasks();
        }
        
        // Step 3: Add editTask function here
        
        // Display all tasks
        function displayTasks() {
            const tasks = loadTasks();
            const taskList = document.getElementById('taskList');
            
            // Clear existing tasks
            taskList.innerHTML = '';
            
            // Add each task
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.innerHTML = \`
                    <h3>\${task.title}</h3>
                    <p>\${task.description || 'Status: Pending'}</p>
                    <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
                    <button class="delete-btn" onclick="deleteTask(\${index})">Delete Task</button>
                \`;
                taskList.appendChild(taskDiv);
            });
        }
        
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task description');
                return;
            }
            
            // Load existing tasks and add new one
            const tasks = loadTasks();
            tasks.push({
                title: taskText,
                description: 'Status: Pending',
                assignedTo: 'Current User',
                completed: false
            });
            
            // Save and display
            saveTasks(tasks);
            displayTasks();
            input.value = '';
        });
        
        // Load tasks when page loads
        displayTasks();
    </script>
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
            margin-right: 10px;
        }
        button:hover {
            background-color: #002a5c;
        }
        .delete-btn {
            background-color: #dc2626;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
        }
        .delete-btn:hover {
            background-color: #b91c1c;
        }
        .edit-btn {
            background-color: #059669;
            padding: 5px 10px;
            font-size: 14px;
            margin: 0;
            margin-right: 5px;
        }
        .edit-btn:hover {
            background-color: #047857;
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
        // Save tasks to localStorage
        function saveTasks(tasks) {
            localStorage.setItem('ministryTasks', JSON.stringify(tasks));
        }

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('ministryTasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Delete a task by index
        function deleteTask(index) {
            const tasks = loadTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            displayTasks();
        }
        
        // Edit a task by index
        function editTask(index) {
            const tasks = loadTasks();
            const newTitle = prompt('Edit task description:', tasks[index].title);
            
            if (newTitle && newTitle.trim() !== '') {
                tasks[index].title = newTitle.trim();
                saveTasks(tasks);
                displayTasks();
            }
        }
        
        // Display all tasks
        function displayTasks() {
            const tasks = loadTasks();
            const taskList = document.getElementById('taskList');
            
            // Clear existing tasks
            taskList.innerHTML = '';
            
            // Add each task
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.innerHTML = \`
                    <h3>\${task.title}</h3>
                    <p>\${task.description || 'Status: Pending'}</p>
                    <p>Assigned to: \${task.assignedTo || 'Current User'}</p>
                    <button class="edit-btn" onclick="editTask(\${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(\${index})">Delete Task</button>
                \`;
                taskList.appendChild(taskDiv);
            });
        }
        
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task description');
                return;
            }
            
            // Load existing tasks and add new one
            const tasks = loadTasks();
            tasks.push({
                title: taskText,
                description: 'Status: Pending',
                assignedTo: 'Current User',
                completed: false
            });
            
            // Save and display
            saveTasks(tasks);
            displayTasks();
            input.value = '';
        });
        
        // Load tasks when page loads
        displayTasks();
    </script>
</body>
</html>`,
        hints: [
          "Add an editTask function that takes an index parameter",
          "Use prompt('Edit task description:', tasks[index].title) to get new text",
          "Check if the user entered valid text before updating",
          "Update the task's title property and save/redisplay",
          "Add the edit button before the delete button in displayTasks"
        ],
        explanation: {
          whatIsHappening: "You've completed full CRUD functionality! The editTask function uses the browser's prompt dialog to get new text from users, validates the input, updates the task object, and refreshes the display. The green edit button follows UI conventions for modification actions, distinct from the blue primary and red destructive actions.",
          whyItMatters: "This implements the user story 'As a staff member, I want to correct or update task descriptions after creating them.' Real workplace tools need this flexibility - people make typos, requirements change, or additional details emerge. The immediate visual feedback confirms the edit was successful.",
          realWorldConnection: "This demonstrates how requirements like 'users should be able to modify their entries' translate into technical implementation. While prompt() is simple, real applications might use modal dialogs or inline editing. Understanding data modification patterns helps you specify requirements for more sophisticated edit interfaces and discuss user experience trade-offs.",
          keyTerms: {
            "Prompt dialog": "A simple browser dialog that asks users for text input",
            "Data validation": "Checking user input before processing to ensure it meets requirements",
            "UI conventions": "Standard design patterns that users expect (green for edit, red for delete)",
            "Complete CRUD": "Full Create, Read, Update, Delete functionality for data management"
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
            <Link href="/tutorial/chapter-3" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 3
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 4: Advanced JavaScript & Data Management</h1>
              <p className="text-sm text-gray-600">Making data persist and adding CRUD operations</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 4 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 4 Complete!</p>
                  <Link 
                    href="/tutorial/chapter-5" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 5
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
                          ? 'Complete Chapter' 
                          : 'Next Step'
                        : 'Start Data Management!'
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