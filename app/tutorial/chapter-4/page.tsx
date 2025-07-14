'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter4() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  const steps = [
    {
      id: 'backend-introduction',
      title: 'Understanding Backend Development',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 4: Backend Development</h2>
          <p className="text-lg text-gray-600">
            Great work! Your task manager now works perfectly in the browser. But what happens when users close the page? All their tasks disappear! This is where backend development comes in.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is Backend Development?</div>
            <div className="explanation-text">
              <p className="mb-3">
                Backend development handles everything users don't see: data storage, user authentication, business logic, and communication between different systems.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Frontend (What you've built)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• User interface</li>
                    <li>• Click handlers</li>
                    <li>• Visual feedback</li>
                    <li>• Browser interactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Backend (What we'll explore)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Data storage</li>
                    <li>• Server logic</li>
                    <li>• API endpoints</li>
                    <li>• Database operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs Backend Systems</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry of Silly Walks processes thousands of applications annually. A frontend-only system would lose all data when staff close their browsers!
            </p>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">Current Problems</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Tasks disappear when page refreshes</li>
                <li>• No way to share tasks between staff</li>
                <li>• No permanent record of silly walk evaluations</li>
                <li>• No user accounts or permissions</li>
              </ul>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: System Architecture
            </div>
            <p className="concept-text">
              Understanding the difference between frontend and backend helps you write better requirements. When you specify "user data must persist between sessions" or "multiple users should access the same information," you're describing backend requirements. This separation helps teams understand what needs to be built where.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objectives</h3>
            <ul className="space-y-2">
              <li>• Understand client-server architecture</li>
              <li>• Learn about APIs and data persistence</li>
              <li>• Explore database concepts</li>
              <li>• See how requirements translate to backend features</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'api-concepts',
      title: 'Step 1: Understanding APIs',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Understanding APIs</h2>
          <p className="text-lg text-gray-600">
            APIs (Application Programming Interfaces) are how your frontend communicates with the backend. Think of them as the waiter in a restaurant.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">The Restaurant Analogy</div>
            <div className="explanation-text">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-medium">Customer</h4>
                  <p className="text-sm text-gray-600">Frontend (Your task manager)</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h4 className="font-medium">Waiter</h4>
                  <p className="text-sm text-gray-600">API (Takes orders, brings food)</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <h4 className="font-medium">Kitchen</h4>
                  <p className="text-sm text-gray-600">Backend (Processes data)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">Common API Operations</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                  <span className="text-sm">Retrieve data (like viewing tasks)</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                  <span className="text-sm">Create new data (like adding tasks)</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-mono mr-2">PUT</span>
                  <span className="text-sm">Update existing data</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono mr-2">DELETE</span>
                  <span className="text-sm">Remove data</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3">For Our Task Manager</h4>
              <div className="space-y-2 text-sm text-green-800">
                <div>• <strong>GET /tasks</strong> - Load all tasks</div>
                <div>• <strong>POST /tasks</strong> - Create new task</div>
                <div>• <strong>PUT /tasks/123</strong> - Update task #123</div>
                <div>• <strong>DELETE /tasks/123</strong> - Remove task #123</div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: API Requirements
            </div>
            <p className="concept-text">
              When writing requirements, you're essentially defining what APIs need to exist. "Users should be able to create tasks" becomes "POST /tasks endpoint." "Users should view their task history" becomes "GET /tasks endpoint with filtering." Understanding APIs helps you write more precise technical requirements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'database-concepts',
      title: 'Step 2: Understanding Databases',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Understanding Databases</h2>
          <p className="text-lg text-gray-600">
            Databases are where your application's data lives permanently. Think of them as organized filing cabinets that never lose information.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">Database Tables</div>
            <div className="explanation-text">
              <p className="mb-3">
                Data is organized in tables (like spreadsheets). Each row is a record, each column is a field.
              </p>
              <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <div className="bg-gray-50 p-2 border-b">
                  <h4 className="font-medium text-sm">Tasks Table</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">id</th>
                        <th className="px-3 py-2 text-left">title</th>
                        <th className="px-3 py-2 text-left">description</th>
                        <th className="px-3 py-2 text-left">assigned_to</th>
                        <th className="px-3 py-2 text-left">status</th>
                        <th className="px-3 py-2 text-left">created_at</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2">1</td>
                        <td className="px-3 py-2">Review Mr. Smith's Application</td>
                        <td className="px-3 py-2">Assess walk silliness level</td>
                        <td className="px-3 py-2">John Cleese</td>
                        <td className="px-3 py-2">pending</td>
                        <td className="px-3 py-2">2024-01-15</td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td className="px-3 py-2">2</td>
                        <td className="px-3 py-2">Update Ministry Website</td>
                        <td className="px-3 py-2">Add new silly walk guidelines</td>
                        <td className="px-3 py-2">Eric Idle</td>
                        <td className="px-3 py-2">completed</td>
                        <td className="px-3 py-2">2024-01-16</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">Database Operations</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div><strong>CREATE:</strong> Add new records</div>
                <div><strong>READ:</strong> Retrieve existing data</div>
                <div><strong>UPDATE:</strong> Modify existing records</div>
                <div><strong>DELETE:</strong> Remove records</div>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                These match perfectly with API operations!
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3">Data Relationships</h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div><strong>Users Table:</strong> Staff members</div>
                <div><strong>Tasks Table:</strong> Individual tasks</div>
                <div><strong>Applications Table:</strong> Silly walk submissions</div>
              </div>
              <p className="text-xs text-purple-700 mt-2">
                Tables connect to each other through relationships
              </p>
            </div>
          </div>

          <div className="ministry-content">
            <h4 className="font-medium mb-3">Ministry Database Schema</h4>
            <div className="bg-white border border-gray-200 rounded p-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="border border-blue-200 rounded p-3">
                  <h5 className="font-medium text-blue-900 mb-2">👤 Users</h5>
                  <ul className="space-y-1 text-blue-800">
                    <li>• id</li>
                    <li>• name</li>
                    <li>• email</li>
                    <li>• role</li>
                    <li>• department</li>
                  </ul>
                </div>
                <div className="border border-green-200 rounded p-3">
                  <h5 className="font-medium text-green-900 mb-2">📋 Tasks</h5>
                  <ul className="space-y-1 text-green-800">
                    <li>• id</li>
                    <li>• title</li>
                    <li>• description</li>
                    <li>• assigned_to</li>
                    <li>• status</li>
                    <li>• created_at</li>
                  </ul>
                </div>
                <div className="border border-purple-200 rounded p-3">
                  <h5 className="font-medium text-purple-900 mb-2">🚶 Applications</h5>
                  <ul className="space-y-1 text-purple-800">
                    <li>• id</li>
                    <li>• applicant_name</li>
                    <li>• walk_description</li>
                    <li>• video_url</li>
                    <li>• status</li>
                    <li>• reviewer_id</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Data Modeling
            </div>
            <p className="concept-text">
              When you write requirements about "storing user information" or "tracking task history," you're describing database needs. Understanding how data is structured helps you ask better questions: "What information do we need to store?" "How do different pieces of data relate?" "What reports will users need?"
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'json-api-example',
      title: 'Step 3: Working with JSON APIs',
      type: 'coding',
      exercise: {
        title: 'Process API Response Data',
        description: 'Let\'s add JavaScript to process JSON data from our backend API. This shows how frontend code transforms server data into user-friendly displays.',
        instructions: [
          'Add the JavaScript code to script.js (you can see it in the file tree)',
          'This code will process JSON API responses and display tasks',
          'Copy the JavaScript code from the code block below into the editor',
          'Watch how the API data gets transformed into HTML'
        ],
        codeBlock: {
          code: `// Function to process API response and display tasks
function displayTasksFromAPI(apiResponse) {
    // Check if the API call was successful
    if (apiResponse.status !== 'success') {
        console.error('API Error:', apiResponse.error);
        return;
    }
    
    // Get the tasks array from the response
    const tasks = apiResponse.data.tasks;
    const taskContainer = document.getElementById('taskList');
    taskContainer.innerHTML = '';
    
    // Create HTML for each task
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description}</p>
            <p>Assigned to: \${task.assigned_to}</p>
            <p>Status: \${task.status}</p>
        \`;
        taskContainer.appendChild(taskElement);
    });
    
    // Update task count
    document.getElementById('taskCount').textContent = \`Total: \${apiResponse.data.total_count}\`;
}

// Example API response (this comes from the backend)
const apiData = {
    "status": "success",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Review Mr. Smith's Silly Walk Application",
                "description": "Assess walk silliness level and provide feedback",
                "assigned_to": "John Cleese",
                "status": "pending"
            },
            {
                "id": 2,
                "title": "Update Ministry Website",
                "description": "Add new silly walk guidelines",
                "assigned_to": "Eric Idle", 
                "status": "completed"
            }
        ],
        "total_count": 2
    }
};

// Process the API data
displayTasksFromAPI(apiData);`,
          explanations: [
            {
              line: "if (apiResponse.status !== 'success') {",
              explanation: "Always check if the API call succeeded before processing data.",
              businessContext: "Error handling is crucial - APIs can fail for many reasons (network issues, server problems, invalid requests)."
            },
            {
              line: "const tasks = apiResponse.data.tasks;",
              explanation: "Extract the actual task data from the API response structure.",
              businessContext: "API responses often have metadata (status, pagination) separate from the actual data."
            },
            {
              line: "taskElement.innerHTML = `<h3>${task.title}</h3>...`;",
              explanation: "Transform API data into HTML that users can see and understand.",
              businessContext: "This is where technical data becomes user-friendly information - crucial for good UX."
            },
            {
              line: "taskContainer.appendChild(taskElement);",
              explanation: "Add the new task element to the page so users can see it.",
              businessContext: "DOM manipulation is how dynamic web applications update content without page refreshes."
            }
          ]
        },
        language: 'typescript' as const,
        startingCode: `// Ministry of Silly Walks - API Processing JavaScript

// TODO: Add the API processing code here`,
        targetCode: `// Function to process API response and display tasks
function displayTasksFromAPI(apiResponse) {
    // Check if the API call was successful
    if (apiResponse.status !== 'success') {
        console.error('API Error:', apiResponse.error);
        return;
    }
    
    // Get the tasks array from the response
    const tasks = apiResponse.data.tasks;
    const taskContainer = document.getElementById('taskList');
    taskContainer.innerHTML = '';
    
    // Create HTML for each task
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description}</p>
            <p>Assigned to: \${task.assigned_to}</p>
            <p>Status: \${task.status}</p>
        \`;
        taskContainer.appendChild(taskElement);
    });
    
    // Update task count
    document.getElementById('taskCount').textContent = \`Total: \${apiResponse.data.total_count}\`;
}

// Example API response (this comes from the backend)
const apiData = {
    "status": "success",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Review Mr. Smith's Silly Walk Application",
                "description": "Assess walk silliness level and provide feedback",
                "assigned_to": "John Cleese",
                "status": "pending"
            },
            {
                "id": 2,
                "title": "Update Ministry Website",
                "description": "Add new silly walk guidelines",
                "assigned_to": "Eric Idle", 
                "status": "completed"
            }
        ],
        "total_count": 2
    }
};

// Process the API data
displayTasksFromAPI(apiData);`,
        hints: [
          "You're editing the script.js file - you can see it in the file tree",
          "Copy the complete code from the code block above",
          "This code processes JSON API data and creates HTML elements",
          "Template literals (\`string\`) let you embed variables with \${variable}",
          "The preview will show how API data becomes user-friendly content"
        ],
        explanation: {
          whatIsHappening: "You've added JavaScript that processes JSON API responses and displays them as HTML. This is the bridge between backend data and frontend display. The code checks for success, extracts task data, creates HTML elements for each task, and updates the page. This pattern is used in every modern web application that displays server data.",
          whyItMatters: "Understanding this API-to-display process helps you write better requirements. When you specify 'show task status' or 'display creation date,' you're describing both the API data structure needed and how it should appear to users. This knowledge helps you write more technically informed and realistic requirements.",
          realWorldConnection: "This is exactly how applications like Gmail, Facebook, or banking apps work - they fetch data from servers and transform it into user-friendly displays. When you write requirements for data display, sorting, or filtering, you're describing variations of this same pattern. Understanding the technical implementation helps you write more complete requirements.",
          keyTerms: {
            "API Response Processing": "Converting structured server data into user interface elements",
            "JSON Data Structure": "How information is organized in API responses",
            "DOM Manipulation": "Using JavaScript to create and modify page content",
            "Template Literals": "JavaScript syntax for creating strings with embedded variables",
            "Error Handling": "Code that gracefully handles API failures and edge cases"
          }
        }
      }
    },
    {
      id: 'api-integration',
      title: 'Step 4: Complete API Integration',
      type: 'coding',
      exercise: {
        title: 'Make Real API Calls',
        description: 'Now let\'s add the fetch() call to actually get data from the backend. This completes the frontend-backend connection with proper error handling.',
        instructions: [
          'Update the script.js file to add the fetch API call',
          'This code will make real HTTP requests to the backend server',
          'Copy the JavaScript code from the code block below into the editor',
          'See how loading states and error handling work in practice'
        ],
        codeBlock: {
          code: `// Store tasks data (simulates what would be in a database)
let allTasks = [
    {
        "id": 1,
        "title": "Review Mr. Smith's Silly Walk Application",
        "description": "Assess walk silliness level and provide feedback",
        "assigned_to": "John Cleese",
        "status": "pending"
    },
    {
        "id": 2,
        "title": "Update Ministry Website",
        "description": "Add new silly walk guidelines to public portal",
        "assigned_to": "Eric Idle",
        "status": "completed"
    }
];

// Simulate getting tasks from API
function loadTasksFromAPI() {
    const mockAPIResponse = {
        "status": "success",
        "data": {
            "tasks": allTasks,
            "total_count": allTasks.length
        }
    };
    
    displayTasksFromAPI(mockAPIResponse);
}

// Function to display API data
function displayTasksFromAPI(apiResponse) {
    if (apiResponse.status !== 'success') {
        alert('API Error: ' + apiResponse.error);
        return;
    }
    
    const tasks = apiResponse.data.tasks;
    const taskContainer = document.getElementById('taskList');
    if (!taskContainer) {
        console.error('taskList element not found');
        return;
    }
    
    // Clear existing tasks
    taskContainer.innerHTML = '';
    
    // Add each task to the display
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description}</p>
            <p>Assigned to: \${task.assigned_to}</p>
            <p>Status: \${task.status}</p>
        \`;
        taskContainer.appendChild(taskElement);
    });
}

// Add task functionality (from Chapter 3) + API simulation
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    // Simulate adding task via API
    const newTask = {
        "id": allTasks.length + 1,
        "title": taskText,
        "description": "New task from frontend",
        "assigned_to": "Current User",
        "status": "pending"
    };
    
    // Add to our "database"
    allTasks.push(newTask);
    
    // Reload tasks from "API"
    loadTasksFromAPI();
    
    // Clear input
    input.value = '';
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load initial tasks
    loadTasksFromAPI();
    
    // Create Load from API button
    const loadButton = document.createElement('button');
    loadButton.textContent = 'Refresh from API';
    loadButton.onclick = loadTasksFromAPI;
    loadButton.style.marginLeft = '10px';
    
    // Add the button after the Add Task button
    const addBtn = document.getElementById('addTaskBtn');
    if (addBtn && addBtn.parentNode) {
        addBtn.parentNode.insertBefore(loadButton, addBtn.nextSibling);
    }
});`,
          explanations: [
            {
              line: "let allTasks = [ {...} ];",
              explanation: "Store task data in memory to simulate what would be in a database.",
              businessContext: "In real applications, this data would be stored in a database and accessed through APIs."
            },
            {
              line: "document.getElementById('addTaskBtn').addEventListener('click', function() {",
              explanation: "Keep the add task functionality from Chapter 3, but now integrate it with API simulation.",
              businessContext: "This shows how user actions (adding tasks) would trigger API calls to update the backend database."
            },
            {
              line: "allTasks.push(newTask); loadTasksFromAPI();",
              explanation: "Add the new task to our data store and refresh the display through the API simulation.",
              businessContext: "This simulates the flow: user adds task → API saves to database → frontend refreshes data from API."
            },
            {
              line: "const loadButton = document.createElement('button'); loadButton.textContent = 'Refresh from API';",
              explanation: "Create a button that demonstrates refreshing data from the API.",
              businessContext: "Refresh functionality is essential - users need to see the latest data, especially in multi-user systems."
            }
          ]
        },
        language: 'typescript' as const,
        startingCode: `// Ministry of Silly Walks - Complete API Integration

// TODO: Add the complete API integration code here`,
        targetCode: `// Store tasks data (simulates what would be in a database)
let allTasks = [
    {
        "id": 1,
        "title": "Review Mr. Smith's Silly Walk Application",
        "description": "Assess walk silliness level and provide feedback",
        "assigned_to": "John Cleese",
        "status": "pending"
    },
    {
        "id": 2,
        "title": "Update Ministry Website",
        "description": "Add new silly walk guidelines to public portal",
        "assigned_to": "Eric Idle",
        "status": "completed"
    }
];

// Simulate getting tasks from API
function loadTasksFromAPI() {
    const mockAPIResponse = {
        "status": "success",
        "data": {
            "tasks": allTasks,
            "total_count": allTasks.length
        }
    };
    
    displayTasksFromAPI(mockAPIResponse);
}

// Function to display API data
function displayTasksFromAPI(apiResponse) {
    if (apiResponse.status !== 'success') {
        alert('API Error: ' + apiResponse.error);
        return;
    }
    
    const tasks = apiResponse.data.tasks;
    const taskContainer = document.getElementById('taskList');
    if (!taskContainer) {
        console.error('taskList element not found');
        return;
    }
    
    // Clear existing tasks
    taskContainer.innerHTML = '';
    
    // Add each task to the display
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description}</p>
            <p>Assigned to: \${task.assigned_to}</p>
            <p>Status: \${task.status}</p>
        \`;
        taskContainer.appendChild(taskElement);
    });
}

// Add task functionality (from Chapter 3) + API simulation
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task description');
        return;
    }
    
    // Simulate adding task via API
    const newTask = {
        "id": allTasks.length + 1,
        "title": taskText,
        "description": "New task from frontend",
        "assigned_to": "Current User",
        "status": "pending"
    };
    
    // Add to our "database"
    allTasks.push(newTask);
    
    // Reload tasks from "API"
    loadTasksFromAPI();
    
    // Clear input
    input.value = '';
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load initial tasks
    loadTasksFromAPI();
    
    // Create Load from API button
    const loadButton = document.createElement('button');
    loadButton.textContent = 'Refresh from API';
    loadButton.onclick = loadTasksFromAPI;
    loadButton.style.marginLeft = '10px';
    
    // Add the button after the Add Task button
    const addBtn = document.getElementById('addTaskBtn');
    if (addBtn && addBtn.parentNode) {
        addBtn.parentNode.insertBefore(loadButton, addBtn.nextSibling);
    }
});`,
        hints: [
          "You're still editing script.js - add this code to complete the integration",
          "The fetch() API is the modern way to make HTTP requests",
          "async/await makes asynchronous code easier to read and write",
          "Always handle both success and error cases in API calls",
          "Loading indicators greatly improve user experience"
        ],
        explanation: {
          whatIsHappening: "You've completed a full frontend-backend integration! This code makes real HTTP requests to your backend API, handles loading states, processes responses, and gracefully handles errors. It combines the API processing from Step 3 with actual network requests, error handling, and user feedback. This is exactly how modern web applications work.",
          whyItMatters: "This represents the complete picture of web application architecture. Understanding this full flow - from user action to API call to data display - helps you write comprehensive requirements. When you specify 'system should load quickly' or 'handle network errors gracefully,' you're describing this exact functionality. This knowledge helps you write more realistic and complete requirements.",
          realWorldConnection: "Every web application you use follows this pattern - social media loading posts, banking apps showing transactions, shopping sites displaying products. Requirements like 'show loading indicators,' 'handle offline scenarios,' and 'provide error recovery options' all stem from understanding this complete integration pattern. As a BA, this technical understanding helps you ask better questions and write more thorough requirements.",
          keyTerms: {
            "Full-Stack Integration": "Frontend and backend working together to deliver complete functionality",
            "HTTP Request Lifecycle": "The complete process from making a request to displaying results",
            "Error Recovery": "Providing users with clear feedback and options when things go wrong",
            "Progressive Enhancement": "Building applications that work in stages, providing feedback at each step",
            "API Contract": "The agreed-upon format and behavior between frontend and backend systems"
          }
        }
      }
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
            <Link href={getUrlWithParams("/tutorial/chapter-3")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 3
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 4: Backend Development</h1>
              <p className="text-sm text-gray-600">Building server-side functionality</p>
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
                    href={getUrlWithParams("/tutorial/chapter-5")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 5
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
                        : 'Mark Complete & Continue'
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <CodeEditor
                  {...steps[currentStep].exercise!}
                  stepId={steps[currentStep].id}
                  currentChapter={4}
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