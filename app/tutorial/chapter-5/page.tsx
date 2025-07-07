'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Server, Lightbulb, Code, Globe, Database } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter5() {
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
      id: 'backend-api-introduction',
      title: 'Understanding Backend APIs',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 5: Building the Backend API</h2>
          <p className="text-lg text-gray-600">
            Great work! Your task manager now has full CRUD functionality with persistent storage. But what happens when John Cleese wants to share tasks with Terry Jones? Or when the Ministry needs to generate reports? We need a backend API.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is a Backend API?</div>
            <div className="explanation-text">
              <p className="mb-3">
                An API (Application Programming Interface) is like a waiter in a restaurant. Your frontend (the customer) makes requests, the API takes those requests to the backend kitchen (server/database), and brings back the response.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Frontend:</strong> What users see and interact with (your HTML/CSS/JavaScript)</li>
                <li><strong>Backend:</strong> Server that processes requests, manages data, and enforces business rules</li>
                <li><strong>API:</strong> The interface that lets frontend and backend communicate</li>
                <li><strong>Database:</strong> Where data is permanently stored and organized</li>
              </ul>
              <p className="mt-3">
                Think of it like a government office: citizens (frontend) make requests at the front desk (API), clerks (backend) process the paperwork using filing systems (database), and return the results.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs a Backend API</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry's task management system needs to work across the entire department, not just individual browsers. A backend API enables enterprise-level functionality:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Current Limitations</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tasks only exist in one browser</li>
                  <li>• No sharing between staff members</li>
                  <li>• No central oversight or reporting</li>
                  <li>• No backup or data security</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">API Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Shared data across the department</li>
                  <li>• Task assignment and collaboration</li>
                  <li>• Centralized reporting and analytics</li>
                  <li>• Secure data backup and recovery</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: API Requirements
            </div>
            <p className="concept-text">
              When you write requirements like "users should be able to share data" or "the system should provide reports," you're defining API needs. Understanding REST endpoints, HTTP methods, and data flow helps you write more precise integration requirements and communicate effectively with technical teams about system architecture.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll build a simple Node.js API with endpoints for creating, reading, updating, and deleting tasks. You'll learn how frontend applications communicate with backends and understand the technical foundation that enables multi-user systems.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'create-server-file',
      title: 'Step 1: Creating the Server',
      type: 'coding',
      exercise: {
        title: 'Build a Basic Node.js Server',
        description: 'We\'ll create a simple server using Node.js and Express that can handle HTTP requests. This will be the foundation of our API.',
        instructions: [
          'Create a new file called server.js',
          'Set up Express framework for handling web requests',
          'Add a basic route that responds with a welcome message',
          'Start the server on port 3000'
        ],
        language: 'javascript' as const,
        codeBlock: {
          code: `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (temporary)
let tasks = [
  {
    id: 1,
    title: "Evaluate Mr. Smith's Silly Walk Application",
    description: "Review submitted video and assess walk silliness level.",
    assignedTo: "John Cleese",
    completed: false
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
          explanations: [
            {
              line: "const express = require('express');\nconst cors = require('cors');",
              explanation: "Import the Express framework for creating web servers and CORS for allowing cross-origin requests.",
              businessContext: "Express simplifies server creation, while CORS enables your frontend (running on a different port) to communicate with the API."
            },
            {
              line: "app.use(cors());\napp.use(express.json());",
              explanation: "Configure middleware that handles cross-origin requests and automatically parses JSON data from requests.",
              businessContext: "This enables secure communication between your frontend and backend, allowing data to flow between different parts of the system."
            },
            {
              line: "let tasks = [ { id: 1, title: \"Evaluate Mr. Smith's...\" } ];",
              explanation: "Create temporary in-memory storage for tasks with a sample task already included.",
              businessContext: "This simulates a database with existing Ministry work - in production, this would be replaced by a real database."
            },
            {
              line: "app.get('/', (req, res) => { res.json({ message: 'Ministry...' }); });",
              explanation: "Create an API endpoint that responds to GET requests with information about available API functions.",
              businessContext: "This serves as documentation for developers, listing what operations the API supports - essential for team collaboration."
            },
            {
              line: "app.listen(PORT, () => { console.log(\`Server running...\`); });",
              explanation: "Start the server and listen for incoming requests on port 3000, with a confirmation message.",
              businessContext: "This makes the API available for your frontend to connect to - the foundation for multi-user functionality."
            }
          ]
        },
        startingCode: `// Ministry of Silly Walks Task Management API
// server.js

// Step 1: Import required packages
// const express = require('express');
// const cors = require('cors');

// Step 2: Create Express app
// const app = express();
// const PORT = 3000;

// Step 3: Add middleware
// app.use(cors());
// app.use(express.json());

// Step 4: Create sample data
// let tasks = [];

// Step 5: Add welcome route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Ministry API' });
// });

// Step 6: Start server
// app.listen(PORT, () => {
//   console.log('Server running on port', PORT);
// });

console.log('Ready to build your API server!');`,
        targetCode: `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (temporary)
let tasks = [
  {
    id: 1,
    title: "Evaluate Mr. Smith's Silly Walk Application",
    description: "Review submitted video and assess walk silliness level.",
    assignedTo: "John Cleese",
    completed: false
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        hints: [
          "Uncomment each section step by step, starting with the imports",
          "Express is a popular Node.js framework that simplifies server creation",
          "CORS (Cross-Origin Resource Sharing) allows your frontend to talk to the backend",
          "The tasks array simulates a database - in production you'd use a real database",
          "The welcome route provides API documentation for developers"
        ],
        explanation: {
          whatIsHappening: "You've created your first backend server! Express handles incoming HTTP requests, CORS enables cross-domain communication, and the middleware automatically parses JSON data. The server listens on port 3000 and provides a welcome endpoint that documents the available API functions.",
          whyItMatters: "This establishes the technical foundation for multi-user functionality. Instead of tasks living only in individual browsers, they can now be centrally managed and shared across the Ministry. The API documentation endpoint helps developers understand how to integrate with the system.",
          realWorldConnection: "This is how enterprise applications work - separate frontend and backend systems communicating via APIs. When you write requirements about 'system integration' or 'data sharing between departments,' this is the type of infrastructure that enables those capabilities. Understanding server architecture helps you write more informed requirements about scalability and system design.",
          keyTerms: {
            "Express.js": "A Node.js framework that simplifies creating web servers and APIs",
            "Middleware": "Code that runs between receiving a request and sending a response",
            "CORS": "Cross-Origin Resource Sharing - enables different domains to communicate",
            "API endpoint": "A specific URL that accepts requests and returns responses"
          }
        }
      }
    },
    {
      id: 'add-crud-endpoints',
      title: 'Step 2: Adding CRUD Endpoints',
      type: 'coding',
      exercise: {
        title: 'Create API Endpoints for Task Operations',
        description: 'Now let\'s add the core API endpoints that allow creating, reading, updating, and deleting tasks through HTTP requests.',
        instructions: [
          'Add GET /tasks endpoint to retrieve all tasks',
          'Add POST /tasks endpoint to create new tasks',
          'Add PUT /tasks/:id endpoint to update existing tasks',
          'Add DELETE /tasks/:id endpoint to remove tasks'
        ],
        language: 'javascript' as const,
        codeBlock: {
          code: `// GET all tasks
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks,
    count: tasks.length
  });
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title, description, assignedTo } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || 'Status: Pending',
    assignedTo: assignedTo || 'Current User',
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json({
    success: true,
    data: tasks[taskIndex]
  });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({
    success: true,
    data: deletedTask
  });
});`,
          explanations: [
            {
              line: "app.get('/tasks', (req, res) => { res.json({ success: true, data: tasks }); });",
              explanation: "Create an endpoint that responds to GET requests at /tasks by returning all tasks in JSON format.",
              businessContext: "This implements 'users should be able to view all current tasks' - the foundation for shared task visibility across the Ministry."
            },
            {
              line: "app.post('/tasks', (req, res) => { const { title, description, assignedTo } = req.body;",
              explanation: "Create an endpoint for POST requests that extracts task data from the request body.",
              businessContext: "This handles 'staff should be able to create new tasks' and validates that required information is provided."
            },
            {
              line: "if (!title) { return res.status(400).json({ success: false, error: 'Title is required' }); }",
              explanation: "Validate that required fields are provided and return an error if not.",
              businessContext: "This enforces the business rule 'all tasks must have a title' and provides clear feedback when requirements aren't met."
            },
            {
              line: "app.put('/tasks/:id', (req, res) => { const taskId = parseInt(req.params.id);",
              explanation: "Create an endpoint for updating tasks, extracting the task ID from the URL parameter.",
              businessContext: "This enables 'users should be able to edit existing tasks' with proper identification of which task to modify."
            },
            {
              line: "app.delete('/tasks/:id', (req, res) => { const deletedTask = tasks.splice(taskIndex, 1)[0];",
              explanation: "Create an endpoint for deleting tasks and return the deleted task as confirmation.",
              businessContext: "This implements 'users should be able to remove completed tasks' with confirmation of what was deleted."
            }
          ]
        },
        startingCode: `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (temporary)
let tasks = [
  {
    id: 1,
    title: "Evaluate Mr. Smith's Silly Walk Application",
    description: "Review submitted video and assess walk silliness level.",
    assignedTo: "John Cleese",
    completed: false
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// Step 2: Add CRUD endpoints here

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        targetCode: `const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage (temporary)
let tasks = [
  {
    id: 1,
    title: "Evaluate Mr. Smith's Silly Walk Application",
    description: "Review submitted video and assess walk silliness level.",
    assignedTo: "John Cleese",
    completed: false
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create a new task',
      'PUT /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task'
    }
  });
});

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks,
    count: tasks.length
  });
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title, description, assignedTo } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || 'Status: Pending',
    assignedTo: assignedTo || 'Current User',
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json({
    success: true,
    data: tasks[taskIndex]
  });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({
    success: true,
    data: deletedTask
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        hints: [
          "Add the four CRUD endpoints after the welcome route",
          "GET /tasks returns all tasks, POST /tasks creates new ones",
          "PUT /tasks/:id updates a specific task, DELETE /tasks/:id removes it",
          "Use req.params.id to get the task ID from the URL",
          "Always validate required fields and handle errors gracefully"
        ],
        explanation: {
          whatIsHappening: "You've built a complete REST API with all four CRUD operations! Each endpoint handles a specific HTTP method (GET, POST, PUT, DELETE) and includes proper error handling, data validation, and structured JSON responses. The API can now handle all the task management operations your frontend needs.",
          whyItMatters: "This creates the technical foundation for enterprise-level task management. Multiple users can now interact with the same data source, enabling collaboration, reporting, and centralized management. The structured error handling ensures reliable operation and clear feedback when something goes wrong.",
          realWorldConnection: "This is how real business applications work - REST APIs with standardized endpoints that different systems can integrate with. When you write requirements about 'system integration' or 'data APIs for reporting,' this is the type of implementation that enables those capabilities. Understanding API design helps you write more precise integration requirements.",
          keyTerms: {
            "REST API": "REpresentational State Transfer - a standard way of designing web APIs",
            "HTTP methods": "GET (read), POST (create), PUT (update), DELETE (remove)",
            "Status codes": "Numeric codes like 200 (success), 400 (bad request), 404 (not found)",
            "Request parameters": "Data passed in URLs (:id) or request bodies (JSON)"
          }
        }
      }
    },
    {
      id: 'test-api-endpoints',
      title: 'Step 3: Testing the API',
      type: 'coding',
      exercise: {
        title: 'Test API Endpoints with Simple HTML',
        description: 'Let\'s create a simple test page that demonstrates how to call our API endpoints using JavaScript fetch requests.',
        instructions: [
          'Create an HTML page with buttons to test each API endpoint',
          'Use JavaScript fetch() to make HTTP requests to the API',
          'Display the API responses in a readable format',
          'Test GET, POST, PUT, and DELETE operations'
        ],
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry API Tester</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background-color: #002a5c;
        }
        #output {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-top: 20px;
            white-space: pre-wrap;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>Ministry of Silly Walks - API Tester</h1>
    <p>Test the backend API endpoints</p>
    
    <div>
        <h3>Test Operations:</h3>
        <button onclick="getAllTasks()">GET All Tasks</button>
        <button onclick="createTask()">POST New Task</button>
        <button onclick="updateTask()">PUT Update Task</button>
        <button onclick="deleteTask()">DELETE Task</button>
    </div>
    
    <div id="output">Click a button to test the API...</div>
    
    <script>
        const API_BASE = 'http://localhost:3000';
        
        function displayOutput(title, data) {
            const output = document.getElementById('output');
            output.textContent = \`\${title}:\\n\${JSON.stringify(data, null, 2)}\`;
        }
        
        // Step 3: Add API test functions here
        
    </script>
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry API Tester</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        button {
            background-color: #003d7a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background-color: #002a5c;
        }
        #output {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-top: 20px;
            white-space: pre-wrap;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <h1>Ministry of Silly Walks - API Tester</h1>
    <p>Test the backend API endpoints</p>
    
    <div>
        <h3>Test Operations:</h3>
        <button onclick="getAllTasks()">GET All Tasks</button>
        <button onclick="createTask()">POST New Task</button>
        <button onclick="updateTask()">PUT Update Task</button>
        <button onclick="deleteTask()">DELETE Task</button>
    </div>
    
    <div id="output">Click a button to test the API...</div>
    
    <script>
        const API_BASE = 'http://localhost:3000';
        
        function displayOutput(title, data) {
            const output = document.getElementById('output');
            output.textContent = \`\${title}:\\n\${JSON.stringify(data, null, 2)}\`;
        }
        
        async function getAllTasks() {
            try {
                const response = await fetch(\`\${API_BASE}/tasks\`);
                const data = await response.json();
                displayOutput('GET /tasks', data);
            } catch (error) {
                displayOutput('Error', { error: error.message });
            }
        }
        
        async function createTask() {
            try {
                const response = await fetch(\`\${API_BASE}/tasks\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'Test Terry Jones Walk Review',
                        description: 'Assess comedic timing and silly factor',
                        assignedTo: 'Ministry Reviewer'
                    })
                });
                const data = await response.json();
                displayOutput('POST /tasks', data);
            } catch (error) {
                displayOutput('Error', { error: error.message });
            }
        }
        
        async function updateTask() {
            try {
                const response = await fetch(\`\${API_BASE}/tasks/1\`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: true,
                        description: 'COMPLETED: Approved with high silliness rating'
                    })
                });
                const data = await response.json();
                displayOutput('PUT /tasks/1', data);
            } catch (error) {
                displayOutput('Error', { error: error.message });
            }
        }
        
        async function deleteTask() {
            try {
                const response = await fetch(\`\${API_BASE}/tasks/2\`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                displayOutput('DELETE /tasks/2', data);
            } catch (error) {
                displayOutput('Error', { error: error.message });
            }
        }
    </script>
</body>
</html>`,
        hints: [
          "Use async/await with fetch() to make HTTP requests",
          "Include Content-Type: application/json header for POST and PUT requests",
          "Use JSON.stringify() to convert JavaScript objects to JSON for sending",
          "Each function should call displayOutput() to show the results",
          "The try/catch blocks handle network errors gracefully"
        ],
        explanation: {
          whatIsHappening: "You've created a test interface that demonstrates how frontends communicate with backends! The JavaScript fetch() function makes HTTP requests to your API endpoints, and the responses are displayed in a readable format. Each button tests a different CRUD operation, showing how data flows between frontend and backend.",
          whyItMatters: "This demonstrates the complete request-response cycle that powers modern web applications. Testing APIs is crucial for ensuring reliability - in real projects, automated tests would replace this manual testing. Understanding this communication pattern helps you write better requirements about data exchange and system integration.",
          realWorldConnection: "This testing approach mirrors how Quality Assurance teams validate APIs and how different systems integrate with each other. When you write requirements about 'system testing' or 'API documentation,' this is the type of validation that ensures requirements are properly implemented. Understanding API testing helps you define acceptance criteria more effectively.",
          keyTerms: {
            "Fetch API": "Modern JavaScript method for making HTTP requests to servers",
            "Async/await": "JavaScript pattern for handling asynchronous operations like API calls",
            "Content-Type header": "Tells the server what type of data is being sent",
            "API testing": "Verifying that endpoints work correctly and handle errors properly"
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
            <Link href="/tutorial/chapter-4" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 4
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 5: Building the Backend API</h1>
              <p className="text-sm text-gray-600">Creating server endpoints for multi-user functionality</p>
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
                    href="/tutorial/chapter-6" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 6
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
                        : 'Build the API!'
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