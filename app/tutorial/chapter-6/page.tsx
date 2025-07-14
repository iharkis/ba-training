'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Database, Lightbulb, Code, HardDrive, Shield } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter6() {
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
      id: 'database-introduction',
      title: 'Understanding Databases',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 6: Database Integration</h2>
          <p className="text-lg text-gray-600">
            Excellent! You've built a working API, but the data still disappears when the server restarts. Real applications need persistent, reliable data storage. Let's integrate a database.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is a Database?</div>
            <div className="explanation-text">
              <p className="mb-3">
                A database is like a digital filing cabinet that stores, organizes, and retrieves information efficiently. Unlike files or arrays in memory, databases are designed for reliability, speed, and concurrent access by multiple users.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Persistence:</strong> Data survives server restarts and system failures</li>
                <li><strong>Concurrency:</strong> Multiple users can access data simultaneously</li>
                <li><strong>ACID Properties:</strong> Atomicity, Consistency, Isolation, Durability</li>
                <li><strong>Query Language:</strong> Structured ways to find and manipulate data</li>
              </ul>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why the Ministry Needs a Database</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Government systems require enterprise-grade data management with audit trails, backup procedures, and regulatory compliance:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Current Issues</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Data lost on server restart</li>
                  <li>• No data backup or recovery</li>
                  <li>• No audit trail for changes</li>
                  <li>• Cannot handle multiple users safely</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Database Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Permanent data storage</li>
                  <li>• Automated backup and recovery</li>
                  <li>• Transaction logging and audit trails</li>
                  <li>• Safe concurrent access</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Data Architecture
            </div>
            <p className="concept-text">
              When you write requirements about "data retention," "audit trails," or "system reliability," you're defining database needs. Understanding concepts like transactions, schemas, and queries helps you write more precise data requirements and have informed discussions about system architecture and compliance needs.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll integrate SQLite database with your API, learn about database schemas, and understand how enterprise data management works. You'll see how business requirements translate into database design decisions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'setup-database',
      title: 'Step 1: Setting Up SQLite Database',
      type: 'coding',
      exercise: {
        title: 'Add Database Configuration',
        description: 'We\'ll add SQLite database integration to our API server, replacing the in-memory array with persistent storage.',
        instructions: [
          'Install and configure SQLite database package',
          'Create a database initialization function',
          'Set up the tasks table with appropriate columns',
          'Add database connection to the server startup'
        ],
        language: 'typescript' as const,
        codeBlock: {
          code: `const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database setup
const dbPath = path.join(__dirname, 'ministry_tasks.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create tasks table
      db.run(\`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          assignedTo TEXT,
          completed BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      \`, (err) => {
        if (err) {
          reject(err);
        } else {
          // Insert sample data if table is empty
          db.get("SELECT COUNT(*) as count FROM tasks", (err, row) => {
            if (err) {
              reject(err);
            } else if (row.count === 0) {
              db.run(\`
                INSERT INTO tasks (title, description, assignedTo) 
                VALUES (?, ?, ?)
              \`, [
                "Evaluate Mr. Smith's Silly Walk Application",
                "Review submitted video and assess walk silliness level.",
                "John Cleese"
              ], (err) => {
                if (err) reject(err);
                else resolve();
              });
            } else {
              resolve();
            }
          });
        }
      });
    });
  });
}`,
          explanations: [
            {
              line: "const sqlite3 = require('sqlite3').verbose();",
              explanation: "Import SQLite database library for Node.js with verbose error reporting enabled.",
              businessContext: "SQLite is perfect for learning and small applications - it's a file-based database that doesn't require a separate server."
            },
            {
              line: "const db = new sqlite3.Database(dbPath);",
              explanation: "Create a database connection to a file called 'ministry_tasks.db' in the current directory.",
              businessContext: "This creates a persistent database file that will survive server restarts, solving the data loss problem."
            },
            {
              line: "CREATE TABLE IF NOT EXISTS tasks (...)",
              explanation: "Define the structure of the tasks table with columns for all our task properties.",
              businessContext: "This creates the data schema - the blueprint for how task information is organized and stored."
            },
            {
              line: "id INTEGER PRIMARY KEY AUTOINCREMENT",
              explanation: "Create an auto-incrementing ID column that uniquely identifies each task.",
              businessContext: "Every task gets a unique identifier automatically, enabling precise tracking and updates."
            },
            {
              line: "createdAt DATETIME DEFAULT CURRENT_TIMESTAMP",
              explanation: "Automatically record when each task was created, providing an audit trail.",
              businessContext: "This implements the requirement for 'audit trails' - tracking when tasks were added to the system."
            }
          ]
        },
        startingCode: `const express = require('express');
const cors = require('cors');
// Step 1: Add database imports here
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Step 1: Add database setup here
// const dbPath = path.join(__dirname, 'ministry_tasks.db');
// const db = new sqlite3.Database(dbPath);

// In-memory task storage (to be replaced)
let tasks = [
  {
    id: 1,
    title: "Evaluate Mr. Smith's Silly Walk Application",
    description: "Review submitted video and assess walk silliness level.",
    assignedTo: "John Cleese",
    completed: false
  }
];

// Step 1: Add database initialization function here

// Routes (to be updated in next steps)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0 - Now with Database!',
    database: 'SQLite'
  });
});

// Start server
// Step 1: Add database initialization before starting server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        targetCode: `const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'ministry_tasks.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create tasks table
      db.run(\`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          assignedTo TEXT,
          completed BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      \`, (err) => {
        if (err) {
          reject(err);
        } else {
          // Insert sample data if table is empty
          db.get("SELECT COUNT(*) as count FROM tasks", (err, row) => {
            if (err) {
              reject(err);
            } else if (row.count === 0) {
              db.run(\`
                INSERT INTO tasks (title, description, assignedTo) 
                VALUES (?, ?, ?)
              \`, [
                "Evaluate Mr. Smith's Silly Walk Application",
                "Review submitted video and assess walk silliness level.",
                "John Cleese"
              ], (err) => {
                if (err) reject(err);
                else resolve();
              });
            } else {
              resolve();
            }
          });
        }
      });
    });
  });
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ministry of Silly Walks Task Management API',
    version: '1.0.0 - Now with Database!',
    database: 'SQLite'
  });
});

// Start server with database initialization
async function startServer() {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    app.listen(PORT, () => {
      console.log(\`Server running on http://localhost:\${PORT}\`);
      console.log('Database file: ministry_tasks.db');
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

startServer();`,
        hints: [
          "Add the SQLite imports at the top after the existing imports",
          "Create the database connection using the file path",
          "The initializeDatabase function should create the table and add sample data",
          "Use async/await pattern to ensure database is ready before starting server",
          "The table schema should include id, title, description, assignedTo, completed, and timestamp columns"
        ],
        explanation: {
          whatIsHappening: "You've replaced the temporary in-memory array with a persistent SQLite database! The server now creates a database file, defines a proper table schema with audit timestamps, and initializes sample data. The database connection is established before the server starts accepting requests.",
          whyItMatters: "This solves the fundamental problem of data persistence. Tasks now survive server restarts, and the audit trail timestamps meet compliance requirements. The database schema enforces data consistency and provides a foundation for more advanced features like user management and reporting.",
          realWorldConnection: "This mirrors how real enterprise applications handle data - with persistent storage, proper schemas, and initialization procedures. When you write requirements about 'data retention' or 'audit compliance,' this is the type of infrastructure that enables those capabilities. Understanding database integration helps you write more informed requirements about data management and system reliability.",
          keyTerms: {
            "Database schema": "The structure and organization of data tables and columns",
            "Primary key": "A unique identifier for each row in a database table",
            "AUTOINCREMENT": "Automatically generates unique sequential numbers for new records",
            "Audit trail": "Automatic recording of when data was created or modified"
          }
        }
      }
    },
    {
      id: 'convert-api-endpoints',
      title: 'Step 2: Converting API to Use Database',
      type: 'coding',
      exercise: {
        title: 'Update CRUD Endpoints for Database',
        description: 'Now let\'s update all our API endpoints to use the database instead of the in-memory array.',
        instructions: [
          'Replace the GET /tasks route with database query functionality',
          'Replace the POST /tasks route with database insert functionality', 
          'Replace the PUT /tasks/:id route with database update functionality',
          'Replace the DELETE /tasks/:id route with database delete functionality',
          'Copy each route from the code block and replace the corresponding route in your editor'
        ],
        language: 'typescript' as const,
        codeBlock: {
          code: `// GET all tasks
app.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY createdAt DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
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
  
  db.run(\`
    INSERT INTO tasks (title, description, assignedTo) 
    VALUES (?, ?, ?)
  \`, [title, description || 'Status: Pending', assignedTo || 'Current User'], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    // Get the inserted task
    db.get("SELECT * FROM tasks WHERE id = ?", [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.status(201).json({
        success: true,
        data: row
      });
    });
  });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updates = req.body;
  
  // Build dynamic update query
  const fields = Object.keys(updates).map(key => \`\${key} = ?\`).join(', ');
  const values = Object.values(updates);
  values.push(taskId);
  
  db.run(\`
    UPDATE tasks 
    SET \${fields}, updatedAt = CURRENT_TIMESTAMP 
    WHERE id = ?
  \`, values, function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    // Get the updated task
    db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.json({
        success: true,
        data: row
      });
    });
  });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  // Get task before deleting for confirmation
  db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    if (!row) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    db.run("DELETE FROM tasks WHERE id = ?", [taskId], function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.json({
        success: true,
        data: row
      });
    });
  });
});`,
          explanations: [
            {
              line: "db.all(\"SELECT * FROM tasks ORDER BY createdAt DESC\", (err, rows) => {",
              explanation: "Query all tasks from the database, ordered by creation date (newest first).",
              businessContext: "This provides a chronological view of tasks, helping users see recent activity first."
            },
            {
              line: "db.run(`INSERT INTO tasks (title, description, assignedTo) VALUES (?, ?, ?)`, [title, description || 'Status: Pending', assignedTo || 'Current User'], function(err) {",
              explanation: "Insert a new task into the database using parameterized queries to prevent SQL injection.",
              businessContext: "Parameterized queries are essential for security - they prevent malicious users from damaging the database."
            },
            {
              line: "db.get(\"SELECT * FROM tasks WHERE id = ?\", [this.lastID], (err, row) => {",
              explanation: "Retrieve the newly inserted task using the auto-generated ID to return it to the client.",
              businessContext: "This confirms the task was created successfully and provides the client with the complete task data including the database-generated ID."
            },
            {
              line: "const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');",
              explanation: "Build a dynamic UPDATE query that can handle partial updates to any task fields.",
              businessContext: "This flexibility allows the API to update only specific fields rather than requiring all data, making it more efficient for frontend applications."
            },
            {
              line: "if (this.changes === 0) {",
              explanation: "Check if the UPDATE operation actually modified any rows - if not, the task ID doesn't exist.",
              businessContext: "This provides proper error handling when users try to update non-existent tasks, improving the user experience."
            },
            {
              line: "db.get(\"SELECT * FROM tasks WHERE id = ?\", [taskId], (err, row) => {",
              explanation: "Retrieve the task before deleting it to return confirmation of what was removed.",
              businessContext: "This provides an audit trail and confirmation to users about what was deleted, which is important for data governance."
            }
          ]
        },
        startingCode: `// Previous database setup code...

// GET all tasks - UPDATE TO USE DATABASE
app.get('/tasks', (req, res) => {
  // Replace this with database query
  res.json({
    success: true,
    data: [], // This should come from database
    count: 0
  });
});

// POST new task - UPDATE TO USE DATABASE  
app.post('/tasks', (req, res) => {
  const { title, description, assignedTo } = req.body;
  
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  // Replace this with database insert
  res.status(201).json({
    success: true,
    data: { message: 'Should insert into database' }
  });
});

// PUT update task - UPDATE TO USE DATABASE
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  // Replace this with database update
  res.json({
    success: true,
    data: { message: 'Should update in database' }
  });
});

// DELETE task - UPDATE TO USE DATABASE
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  // Replace this with database delete
  res.json({
    success: true,
    data: { message: 'Should delete from database' }
  });
});`,
        targetCode: `// GET all tasks
app.get('/tasks', (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY createdAt DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
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
  
  db.run(\`
    INSERT INTO tasks (title, description, assignedTo) 
    VALUES (?, ?, ?)
  \`, [title, description || 'Status: Pending', assignedTo || 'Current User'], function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    // Get the inserted task
    db.get("SELECT * FROM tasks WHERE id = ?", [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.status(201).json({
        success: true,
        data: row
      });
    });
  });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updates = req.body;
  
  // Build dynamic update query
  const fields = Object.keys(updates).map(key => \`\${key} = ?\`).join(', ');
  const values = Object.values(updates);
  values.push(taskId);
  
  db.run(\`
    UPDATE tasks 
    SET \${fields}, updatedAt = CURRENT_TIMESTAMP 
    WHERE id = ?
  \`, values, function(err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    // Get the updated task
    db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.json({
        success: true,
        data: row
      });
    });
  });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  // Get task before deleting for confirmation
  db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Database error'
      });
    }
    
    if (!row) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    db.run("DELETE FROM tasks WHERE id = ?", [taskId], function(err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }
      
      res.json({
        success: true,
        data: row
      });
    });
  });
});`,
        hints: [
          "Use db.all() for SELECT queries that return multiple rows",
          "Use db.run() for INSERT, UPDATE, and DELETE operations",
          "Use db.get() for SELECT queries that return a single row",
          "Always handle database errors with proper HTTP status codes",
          "Use parameterized queries (?) to prevent SQL injection"
        ],
        explanation: {
          whatIsHappening: "You've converted your entire API to use persistent database storage! Each endpoint now uses proper SQL queries with parameterized statements for security. The database handles all data operations while maintaining the same API interface that frontends expect.",
          whyItMatters: "This completes the transition to enterprise-grade data management. The API now provides true persistence, concurrent access safety, and automatic audit trails. Error handling ensures reliable operation, and parameterized queries prevent security vulnerabilities.",
          realWorldConnection: "This demonstrates how business requirements translate into technical implementation - 'data must persist' becomes database integration, 'audit trails' become timestamp columns, and 'system reliability' becomes proper error handling. Understanding database operations helps you write more precise requirements about data management and system behavior.",
          keyTerms: {
            "SQL queries": "Structured Query Language commands for database operations",
            "Parameterized queries": "Using placeholders (?) to safely insert user data into SQL",
            "Database transactions": "Operations that either complete fully or not at all",
            "Error handling": "Graceful management of database and system failures"
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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/tutorial/chapter-5")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 5
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 6: Database Integration</h1>
              <p className="text-sm text-gray-600">Adding persistent storage with SQLite</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 6 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 6 Complete!</p>
                  <Link 
                    href={getUrlWithParams("/tutorial/chapter-7")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 7
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
                        : 'Add Database!'
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