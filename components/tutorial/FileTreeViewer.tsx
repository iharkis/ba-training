'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Eye, Code } from 'lucide-react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: 'html' | 'css' | 'javascript' | 'typescript' | 'json'
  children?: FileNode[]
  isExpanded?: boolean
}

interface FileTreeViewerProps {
  projectStructure?: FileNode[]
  selectedFile?: string | null
  onFileSelect?: (filePath: string, content: string, language?: string) => void
  currentChapter?: number
  useStartingContent?: boolean
  currentExerciseLanguage?: string
  fileContents?: Map<string, string>
}

// Define the project structure that builds up throughout the tutorial
const getProjectStructureForChapter = (chapter: number): FileNode[] => {
  const baseStructure: FileNode[] = [
    {
      name: 'silly-walks-task-manager',
      type: 'folder',
      isExpanded: true,
      children: []
    }
  ]

  const projectRoot = baseStructure[0]

  // Chapter 1: Basic HTML structure
  if (chapter >= 1) {
    projectRoot.children = [
      {
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
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
    <input type="text" placeholder="Enter task description">
    
    <h2>Current Tasks</h2>
    <div>
        <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
        <p>Review submitted video and assess walk silliness level.</p>
        <p>Assigned to: John Cleese</p>
    </div>
</body>
</html>`
      }
    ]
  }

  // Chapter 2: Add CSS styling
  if (chapter >= 2) {
    projectRoot.children?.push({
      name: 'styles.css',
      type: 'file',
      language: 'css',
      content: `/* Ministry of Silly Walks - Task Manager Styles */

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background-color: #f8f9fa;
    color: #333;
}

h1 {
    color: #1d70b8;
    text-align: center;
    border-bottom: 3px solid #1d70b8;
    padding-bottom: 10px;
}

h2 {
    color: #0b0c0c;
    margin-top: 30px;
}

h3 {
    color: #1d70b8;
    margin-bottom: 10px;
}

p {
    margin-bottom: 15px;
}

input[type="text"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #b1b4b6;
    border-radius: 4px;
    margin-bottom: 20px;
}

input[type="text"]:focus {
    outline: none;
    border-color: #1d70b8;
    box-shadow: 0 0 0 3px rgba(29, 112, 184, 0.2);
}

.task-card {
    background: white;
    border: 1px solid #b1b4b6;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`
    })

    // Update HTML to include CSS
    const htmlFile = projectRoot.children?.find(f => f.name === 'index.html')
    if (htmlFile) {
      htmlFile.content = htmlFile.content?.replace(
        '</head>',
        '    <link rel="stylesheet" href="styles.css">\n</head>'
      ).replace(
        '<div>',
        '<div class="task-card">'
      )
    }
  }

  // Chapter 3: Add JavaScript
  if (chapter >= 3) {
    projectRoot.children?.push({
      name: 'script.js',
      type: 'file',
      language: 'javascript',
      content: `// Ministry of Silly Walks - Task Manager JavaScript

// Task management functionality
let tasks = [
    {
        id: 1,
        title: "Evaluate Mr. Smith's Silly Walk Application",
        description: "Review submitted video and assess walk silliness level.",
        assignedTo: "John Cleese",
        status: "pending"
    }
];

// Add task functionality
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        const newTask = {
            id: Date.now(),
            title: taskText,
            description: "New task added by user",
            assignedTo: "Unassigned",
            status: "pending"
        };
        
        tasks.push(newTask);
        input.value = '';
        displayTasks();
    }
}

// Display tasks in the UI
function displayTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-card';
        taskDiv.innerHTML = \`
            <h3>\${task.title}</h3>
            <p>\${task.description}</p>
            <p>Assigned to: \${task.assignedTo}</p>
            <button onclick="deleteTask(\${task.id})">Delete Task</button>
        \`;
        tasksContainer.appendChild(taskDiv);
    });
}

// Delete task functionality
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
    
    // Add event listener for the add task button
    const addButton = document.getElementById('addTaskBtn');
    if (addButton) {
        addButton.addEventListener('click', addTask);
    }
    
    // Add event listener for Enter key in input
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }
});`
    })

    // Update HTML to include JavaScript and interactive elements
    const htmlFile = projectRoot.children?.find(f => f.name === 'index.html')
    if (htmlFile) {
      htmlFile.content = htmlFile.content?.replace(
        '</head>',
        '    <script src="script.js" defer></script>\n</head>'
      ).replace(
        '<input type="text" placeholder="Enter task description">',
        `<input type="text" id="taskInput" placeholder="Enter task description">
    <button id="addTaskBtn">Add Task</button>`
      ).replace(
        '<h2>Current Tasks</h2>\n    <div class="task-card">',
        '<h2>Current Tasks</h2>\n    <div id="tasksContainer">\n        <!-- Tasks will be populated by JavaScript -->\n    </div>\n    <div class="task-card" style="display: none;">'
      )
    }
  }

  // Chapter 5: Add backend structure
  if (chapter >= 5) {
    projectRoot.children?.push({
      name: 'backend',
      type: 'folder',
      isExpanded: false,
      children: [
        {
          name: 'server.js',
          type: 'file',
          language: 'javascript',
          content: `// Ministry of Silly Walks - Backend Server
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// In-memory task storage (will be replaced with database)
let tasks = [
    {
        id: 1,
        title: "Evaluate Mr. Smith's Silly Walk Application",
        description: "Review submitted video and assess walk silliness level.",
        assignedTo: "John Cleese",
        status: "pending",
        createdAt: new Date().toISOString()
    }
];

// API Routes
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description, assignedTo } = req.body;
    
    const newTask = {
        id: Date.now(),
        title,
        description: description || 'New task',
        assignedTo: assignedTo || 'Unassigned',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
});`
        },
        {
          name: 'package.json',
          type: 'file',
          language: 'json',
          content: `{
  "name": "silly-walks-task-manager-backend",
  "version": "1.0.0",
  "description": "Backend API for the Ministry of Silly Walks Task Manager",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["api", "express", "task-management"],
  "author": "Ministry of Silly Walks IT Department",
  "license": "MIT"
}`
        }
      ]
    })
  }

  // Chapter 6: Add database
  if (chapter >= 6) {
    const backendFolder = projectRoot.children?.find(f => f.name === 'backend')
    if (backendFolder?.children) {
      backendFolder.children.push({
        name: 'database.js',
        type: 'file',
        language: 'javascript',
        content: `// Database configuration and setup
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, 'tasks.db'));
        this.init();
    }

    init() {
        const createTableSQL = \`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                assignedTo TEXT,
                status TEXT DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        \`;

        this.db.run(createTableSQL, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Database initialized successfully');
                this.insertSampleData();
            }
        });
    }

    insertSampleData() {
        const sampleTask = {
            title: "Evaluate Mr. Smith's Silly Walk Application",
            description: "Review submitted video and assess walk silliness level.",
            assignedTo: "John Cleese",
            status: "pending"
        };

        this.db.get("SELECT COUNT(*) as count FROM tasks", (err, row) => {
            if (err) {
                console.error('Error checking task count:', err);
                return;
            }

            if (row.count === 0) {
                this.db.run(
                    "INSERT INTO tasks (title, description, assignedTo, status) VALUES (?, ?, ?, ?)",
                    [sampleTask.title, sampleTask.description, sampleTask.assignedTo, sampleTask.status],
                    function(err) {
                        if (err) {
                            console.error('Error inserting sample data:', err);
                        } else {
                            console.log('Sample task inserted with ID:', this.lastID);
                        }
                    }
                );
            }
        });
    }

    // CRUD operations
    getAllTasks(callback) {
        this.db.all("SELECT * FROM tasks ORDER BY createdAt DESC", callback);
    }

    createTask(task, callback) {
        const { title, description, assignedTo, status = 'pending' } = task;
        this.db.run(
            "INSERT INTO tasks (title, description, assignedTo, status) VALUES (?, ?, ?, ?)",
            [title, description, assignedTo, status],
            function(err) {
                callback(err, { id: this.lastID, ...task });
            }
        );
    }

    updateTask(id, updates, callback) {
        const fields = Object.keys(updates).map(key => \`\${key} = ?\`).join(', ');
        const values = Object.values(updates);
        values.push(id);

        this.db.run(
            \`UPDATE tasks SET \${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?\`,
            values,
            callback
        );
    }

    deleteTask(id, callback) {
        this.db.run("DELETE FROM tasks WHERE id = ?", [id], callback);
    }

    close() {
        this.db.close();
    }
}

module.exports = Database;`
      })

      // Update package.json to include sqlite3
      const packageFile = backendFolder.children.find(f => f.name === 'package.json')
      if (packageFile) {
        const packageData = JSON.parse(packageFile.content || '{}')
        packageData.dependencies = {
          ...packageData.dependencies,
          'sqlite3': '^5.1.6'
        }
        packageFile.content = JSON.stringify(packageData, null, 2)
      }
    }
  }

  return baseStructure
}

// Build project structure from user's actual file contents
const buildProjectStructureFromUserFiles = (fileContents: Map<string, string>, chapter: number): FileNode[] => {
  const baseStructure: FileNode[] = [
    {
      name: 'silly-walks-task-manager',
      type: 'folder',
      isExpanded: true,
      children: []
    }
  ]

  const projectRoot = baseStructure[0]

  // Add user's actual files if they exist, otherwise use templates
  const addFileToStructure = (fileName: string, language: 'html' | 'css' | 'javascript' | 'typescript' | 'json') => {
    const fullPath = `silly-walks-task-manager/${fileName}`
    const userContent = fileContents.get(fullPath)
    
    if (userContent && userContent.trim().length > 0) {
      // Use user's actual content
      projectRoot.children?.push({
        name: fileName,
        type: 'file',
        language,
        content: userContent
      })
    } else if (chapter >= getMinChapterForFile(fileName)) {
      // Use template content for files that should exist in this chapter
      const templateStructure = getProjectStructureForChapter(chapter)
      const templateRoot = templateStructure[0]
      const templateFile = templateRoot.children?.find(f => f.name === fileName)
      
      if (templateFile) {
        projectRoot.children?.push(templateFile)
      }
    }
  }

  // Determine which files should exist based on chapter
  const getMinChapterForFile = (fileName: string): number => {
    if (fileName === 'index.html') return 1
    if (fileName === 'styles.css') return 2
    if (fileName === 'script.js') return 3
    return 1
  }

  // Add files based on what should exist and what user has created
  addFileToStructure('index.html', 'html')
  if (chapter >= 2) addFileToStructure('styles.css', 'css')
  if (chapter >= 3) addFileToStructure('script.js', 'javascript')

  // Add backend structure for later chapters
  if (chapter >= 5) {
    const templateStructure = getProjectStructureForChapter(chapter)
    const templateRoot = templateStructure[0]
    const backendFolder = templateRoot.children?.find(f => f.name === 'backend')
    if (backendFolder) {
      projectRoot.children?.push(backendFolder)
    }
  }

  return baseStructure
}

export default function FileTreeViewer({ 
  projectStructure, 
  selectedFile, 
  onFileSelect,
  currentChapter = 1,
  useStartingContent = false,
  currentExerciseLanguage,
  fileContents = new Map()
}: FileTreeViewerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['silly-walks-task-manager']))
  const [showContent, setShowContent] = useState(false)
  const [selectedFileContent, setSelectedFileContent] = useState<{
    name: string
    content: string
    language?: string
  } | null>(null)

  // Use user's actual files if available, otherwise fall back to template
  const structure = projectStructure || buildProjectStructureFromUserFiles(fileContents, currentChapter)

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath)
    } else {
      newExpanded.add(folderPath)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileStartingContent = (fileName: string, language?: string): string => {
    if (fileName.endsWith('index.html') || language === 'html') {
      return `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <!-- Your HTML content goes here -->
</body>
</html>`
    }
    if (fileName.endsWith('styles.css') || language === 'css') {
      return `/* Ministry of Silly Walks - Task Manager Styles */

/* Add your CSS styles here */`
    }
    if (fileName.endsWith('script.js') || language === 'javascript') {
      return `// Ministry of Silly Walks - Task Manager JavaScript

// Add your JavaScript code here`
    }
    if (fileName.endsWith('package.json') || language === 'json') {
      return `{
  "name": "silly-walks-task-manager",
  "version": "1.0.0",
  "description": "Task manager for the Ministry of Silly Walks"
}`
    }
    return '// Add your code here'
  }

  const handleFileClick = (filePath: string, content: string, language?: string) => {
    // Always check for user's actual content first
    const userContent = fileContents.get(filePath)
    
    if (useStartingContent) {
      // Use starting content for file editing mode (only if no user content exists)
      const contentToUse = userContent && userContent.trim().length > 0 
        ? userContent 
        : getFileStartingContent(filePath, language)
      onFileSelect?.(filePath, contentToUse, language)
    } else {
      // Use user content if available, otherwise use provided content
      const contentToUse = userContent && userContent.trim().length > 0 ? userContent : content
      setSelectedFileContent({ name: filePath, content: contentToUse, language })
      setShowContent(true)
      onFileSelect?.(filePath, contentToUse, language)
    }
  }

  const renderFileTree = (nodes: FileNode[], basePath = ''): JSX.Element => {
    return (
      <div className="space-y-1">
        {nodes.map((node) => {
          const fullPath = basePath ? `${basePath}/${node.name}` : node.name
          const isExpanded = expandedFolders.has(fullPath)
          const isSelected = selectedFile === fullPath
          
          // Check if this file corresponds to the current exercise
          const isCurrentExerciseFile = currentExerciseLanguage && node.type === 'file' && (
            (node.name.includes('index.html') && currentExerciseLanguage === 'html') ||
            (node.name.includes('styles.css') && currentExerciseLanguage === 'css') ||
            (node.name.includes('script.js') && (currentExerciseLanguage === 'javascript' || currentExerciseLanguage === 'typescript'))
          )

          return (
            <div key={fullPath}>
              <div
                className={`flex items-center space-x-2 px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-100 ${
                  isSelected ? 'bg-blue-50 text-blue-700' : 
                  isCurrentExerciseFile ? 'bg-green-50 text-green-700 border border-green-200' : 
                  'text-gray-700'
                }`}
                onClick={() => {
                  if (node.type === 'folder') {
                    toggleFolder(fullPath)
                  } else if (node.content) {
                    handleFileClick(fullPath, node.content, node.language)
                  }
                }}
              >
                <div className="flex items-center space-x-1">
                  {node.type === 'folder' ? (
                    <>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      {isExpanded ? (
                        <FolderOpen className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Folder className="w-4 h-4 text-blue-500" />
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-4"></div>
                      <File className={`w-4 h-4 ${
                        node.language === 'html' ? 'text-orange-500' :
                        node.language === 'css' ? 'text-blue-500' :
                        node.language === 'javascript' ? 'text-yellow-500' :
                        node.language === 'typescript' ? 'text-blue-600' :
                        node.language === 'json' ? 'text-green-500' :
                        'text-gray-500'
                      }`} />
                    </>
                  )}
                </div>
                <span className="flex-1">{node.name}</span>
                {node.type === 'file' && node.content && (
                  <Eye className="w-3 h-3 text-gray-400" />
                )}
              </div>
              
              {node.type === 'folder' && node.children && isExpanded && (
                <div className="ml-4 border-l border-gray-200 pl-2">
                  {renderFileTree(node.children, fullPath)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Project Structure
          </h3>
          <div className="text-xs text-gray-500">
            Chapter {currentChapter}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {renderFileTree(structure)}
      </div>

      {/* File Content Modal */}
      {showContent && selectedFileContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl max-h-[90vh] w-full flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <File className="w-5 h-5 mr-2" />
                {selectedFileContent.name}
              </h3>
              <button
                onClick={() => setShowContent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              <pre className="p-6 text-sm font-mono whitespace-pre-wrap text-gray-800 bg-gray-50">
                {selectedFileContent.content}
              </pre>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowContent(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedFileContent.content)
                }}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Copy Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}