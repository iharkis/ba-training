'use client'

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { CheckCircle, AlertCircle, Lightbulb, Eye, Code, Maximize2, Minimize2, X } from 'lucide-react'
import { saveCodeProgress, getCodeProgress } from '@/lib/progress'
import CodeExplanationModal from './CodeExplanationModal'
import FileTreeViewer from './FileTreeViewer'
import { useSearchParams } from 'next/navigation'

type FileContentsMap = Map<string, string>
type SetFileContentsFunction = React.Dispatch<React.SetStateAction<FileContentsMap>>

interface CodeEditorProps {
  title: string
  description: string
  instructions?: string[]  // Step-by-step instructions
  language: 'html' | 'css' | 'typescript' | 'json'
  startingCode: string
  targetCode: string
  hints: string[]
  explanation: {
    whatIsHappening: string
    whyItMatters: string
    realWorldConnection: string
    keyTerms: { [term: string]: string | undefined }
  }
  onComplete?: () => void
  stepId?: string  // Add stepId for progress tracking
  codeBlock?: {
    code: string
    explanations: {
      line: string
      explanation: string
      businessContext?: string
    }[]
  }
  currentChapter?: number  // Add chapter number for file tree
  showFileTree?: boolean  // Toggle file tree visibility
}

// CodeInterface component props type
interface CodeInterfaceProps {
  code: string
  handleCodeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
  textareaKey: string
  language: string
  isComplete: boolean
  showHints: boolean
  setShowHints: (show: boolean) => void
  hints: string[]
  currentHint: number
  setCurrentHint: (hint: number) => void
  checkCode: () => void
  isFullscreen: boolean
  setIsFullscreen: (fullscreen: boolean) => void
  iframeSrcDoc: string
  showExplanation: boolean
  setShowExplanation: (show: boolean) => void
  explanation: {
    whatIsHappening: string
    whyItMatters: string
    realWorldConnection: string
    keyTerms: { [term: string]: string | undefined }
  }
  onComplete?: () => void
  startingCode: string
  targetCode: string
  setCode: (code: string) => void
  setIsComplete: (complete: boolean) => void
  instructions?: string[]
  showFileTree?: boolean
  currentChapter?: number
  selectedFileName?: string
  setSelectedFileName?: (name: string) => void
  fileContents?: FileContentsMap
  setFileContents?: SetFileContentsFunction
  getFileStartingContent?: (fileName: string, language?: string) => string
  isEditMode?: boolean
}

// Move CodeInterface outside to prevent recreation  
const CodeInterface: React.FC<CodeInterfaceProps> = (props) => {
  const {
    code,
    handleCodeChange,
    textareaRef,
    textareaKey,
    language,
    isComplete,
    showHints,
    setShowHints,
    hints,
    currentHint,
    setCurrentHint,
    checkCode,
    isFullscreen,
    setIsFullscreen,
    iframeSrcDoc,
    showExplanation,
    setShowExplanation,
    explanation,
    onComplete,
    startingCode,
    targetCode,
    setCode,
    setIsComplete,
    instructions,
    showFileTree = false,
    currentChapter = 1,
    selectedFileName = '',
    setSelectedFileName = () => {},
    fileContents = new Map(),
    setFileContents = () => {},
    getFileStartingContent = () => '',
    isEditMode = false
  } = props

  return (
    <div className="space-y-6">
      {/* Top toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-sm text-tutorial-primary hover:text-blue-700 flex items-center px-3 py-2 rounded border border-tutorial-primary"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Need Help? ({hints.length} hints)
          </button>
          
          <button
            onClick={() => {
              setCode(startingCode)
              setIsComplete(false)
              setShowExplanation(false)
            }}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded border border-gray-300"
          >
            Reset
          </button>
          
          {!isComplete ? (
            <button
              onClick={checkCode}
              className="tutorial-button-primary"
            >
              Check My Work
            </button>
          ) : (
            <button
              onClick={() => onComplete?.()}
              className="tutorial-button-primary"
            >
              Next Step
            </button>
          )}
          
          {/* Edit mode: Force complete button */}
          {isEditMode && (
            <button
              onClick={() => {
                setIsComplete(true)
                setShowExplanation(true)
                onComplete?.()
              }}
              className="text-sm text-red-600 hover:text-red-800 flex items-center px-3 py-2 rounded border border-red-300 bg-red-50"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Force Complete
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {explanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="text-sm text-tutorial-primary hover:text-blue-700 flex items-center px-3 py-2 rounded border border-tutorial-primary"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              How does this relate to BA work?
            </button>
          )}
          
          {!isFullscreen && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded border border-gray-300"
            >
              <Maximize2 className="w-4 h-4 mr-1" />
              Full Screen
            </button>
          )}
        </div>
      </div>

      {/* Main coding area */}
      <div className={`grid gap-4 md:gap-6 ${isFullscreen ? 'grid-cols-1 lg:grid-cols-5 h-[calc(100vh-12rem)]' : showFileTree ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* File Tree (only show if enabled) */}
        {showFileTree && (
          <div className="flex flex-col">
            <div className="mb-3">
              <label className="text-base font-medium text-gray-700">
                Project Files
              </label>
            </div>
            <div className="flex-1">
              <FileTreeViewer 
                currentChapter={currentChapter}
                selectedFile={selectedFileName}
                currentExerciseLanguage={language}
                fileContents={fileContents}
                onFileSelect={(filePath, content, fileLanguage) => {
                  // Check if this file corresponds to the current exercise
                  const isCurrentExerciseFile = (
                    (filePath.includes('index.html') && language === 'html') ||
                    (filePath.includes('styles.css') && language === 'css') ||
                    (filePath.includes('script.js') && language === 'typescript')
                  )
                  
                  // Always save current content before switching
                  const updatedFileContents = new Map(fileContents)
                  
                  // Save current exercise content if we're in exercise mode
                  if (!selectedFileName && language === 'html') {
                    updatedFileContents.set('silly-walks-task-manager/index.html', code)
                  } else if (!selectedFileName && language === 'css') {
                    updatedFileContents.set('silly-walks-task-manager/styles.css', code)
                  } else if (!selectedFileName && language === 'typescript') {
                    updatedFileContents.set('silly-walks-task-manager/script.js', code)
                  } else if (selectedFileName) {
                    // Save currently selected file
                    updatedFileContents.set(selectedFileName, code)
                  }
                  
                  // If user clicks on the file they're currently working on in an exercise, don't switch to file mode
                  if (isCurrentExerciseFile && !selectedFileName) {
                    return
                  }
                  
                  // Load the file content (either saved content or starting content)
                  const savedContent = updatedFileContents.get(filePath)
                  const fileContent = savedContent || getFileStartingContent(filePath, fileLanguage)
                  
                  // Update state
                  setFileContents(updatedFileContents)
                  setCode(fileContent)
                  setSelectedFileName(filePath)
                  setIsComplete(false)
                  setShowExplanation(false)
                }}
                useStartingContent={true}
              />
            </div>
          </div>
        )}
        
        {/* Code Editor */}
        <div className="flex flex-col md:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-medium text-gray-700">
              {selectedFileName ? `Editing: ${selectedFileName}` : `${language.toUpperCase()} Code Editor`}
            </label>
            {selectedFileName && (
              <button
                onClick={() => {
                  // Save current file content before returning to exercise
                  if (selectedFileName) {
                    setFileContents(prev => new Map(prev).set(selectedFileName, code))
                  }
                  
                  // Return to exercise mode - restore the current exercise progress
                  const exerciseFile = language === 'html' ? 'silly-walks-task-manager/index.html' :
                                     language === 'css' ? 'silly-walks-task-manager/styles.css' :
                                     'silly-walks-task-manager/script.js'
                  const exerciseContent = fileContents.get(exerciseFile) || startingCode
                  
                  setCode(exerciseContent)
                  setSelectedFileName('')
                  setIsComplete(false)
                  setShowExplanation(false)
                }}
                className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-300"
              >
                Return to Exercise
              </button>
            )}
          </div>
          
          <div className="code-editor border-2 border-gray-200 rounded-lg overflow-hidden flex-1">
            <div className="bg-gray-800 text-white px-4 py-3 text-sm flex items-center justify-between">
              <span>
                {selectedFileName ? (
                  selectedFileName.includes('index.html') ? '📄 index.html' :
                  selectedFileName.includes('styles.css') ? '🎨 styles.css' :
                  selectedFileName.includes('script.js') ? '⚡ script.js' :
                  selectedFileName.includes('.json') ? '📦 package.json' :
                  `📄 ${selectedFileName.split('/').pop()}`
                ) : (
                  language === 'html' ? '📄 index.html' :
                  language === 'css' ? '🎨 styles.css' :
                  language === 'typescript' ? '⚡ script.js' :
                  language === 'javascript' ? '⚡ script.js' :
                  language === 'json' ? '📦 package.json' :
                  `📄 ${language} file`
                )}
              </span>
            </div>
            <div className="relative bg-white h-full">
              <textarea
                key={textareaKey}
                ref={textareaRef}
                value={code}
                onChange={handleCodeChange}
                className="w-full p-6 font-mono text-base border-0 focus:ring-0 focus:outline-none resize-none bg-gray-50 h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                spellCheck={false}
                placeholder="Type your code here..."
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col md:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-medium text-gray-700">
              Live Preview
            </label>
          </div>
          
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white flex-1 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-b">
              🌐 Live Website Preview
            </div>
            <div className="p-4 h-full">
              {(language === 'html' || language === 'css'  || language === 'typescript') ? (
                <iframe
                  key="preview-iframe"
                  srcDoc={iframeSrcDoc}
                  className="w-full h-full border-0 bg-white"
                  title="Preview"
                  sandbox="allow-same-origin allow-scripts"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Code className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Preview will appear when you add HTML code</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function CodeEditor({
  title,
  description,
  instructions,
  language,
  startingCode,
  targetCode,
  hints,
  explanation,
  onComplete,
  stepId,
  codeBlock,
  currentChapter = 1,
  showFileTree = true
}: CodeEditorProps) {
  const [code, setCode] = useState(startingCode)
  const [showHints, setShowHints] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCodeExplanation, setShowCodeExplanation] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string>('')
  const [fileContents, setFileContents] = useState<Map<string, string>>(new Map())
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') !== null

  // Load saved code progress on mount
  useEffect(() => {
    if (stepId) {
      const savedCode = getCodeProgress(stepId)
      if (savedCode && savedCode.length > startingCode.length) {
        // Only use saved code if it's longer than starting code (has progress)
        setCode(savedCode)
      } else {
        // Use starting code to ensure comments are present
        setCode(startingCode)
      }
    }
    
    // Auto-populate HTML content from Chapter 1 when starting CSS exercises in Chapter 2
    if (currentChapter === 2 && language === 'css') {
      // Check if user has completed HTML exercises and load that content into the HTML file
      const htmlStepIds = ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task'] // Chapter 1 step IDs
      let latestHtmlContent = null
      
      // Find the most recent HTML content from Chapter 1
      for (const htmlStepId of htmlStepIds) {
        const htmlContent = getCodeProgress(htmlStepId)
        if (htmlContent && htmlContent.includes('<body>')) {
          latestHtmlContent = htmlContent
        }
      }
      
      // If we found completed HTML content, save it to the HTML file
      if (latestHtmlContent) {
        setFileContents(prev => {
          const newMap = new Map(prev)
          newMap.set('silly-walks-task-manager/index.html', latestHtmlContent)
          return newMap
        })
      } else {
        // If no HTML content found, provide a complete fallback based on Chapter 1 completion
        const fallbackHtmlContent = `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
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
        
        setFileContents(prev => {
          const newMap = new Map(prev)
          newMap.set('silly-walks-task-manager/index.html', fallbackHtmlContent)
          return newMap
        })
      }
    }
    
    // Auto-populate HTML and CSS content from previous chapters when starting Chapter 3+
    if (currentChapter >= 3) {
      // Load HTML content from Chapter 1
      const htmlStepIds = ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task']
      let latestHtmlContent = null
      
      for (const htmlStepId of htmlStepIds) {
        const htmlContent = getCodeProgress(htmlStepId)
        if (htmlContent && htmlContent.includes('<body>') && htmlContent.includes('Ministry of Silly Walks')) {
          latestHtmlContent = htmlContent
        }
      }
      
      // Load CSS content from Chapter 2
      const cssStepIds = ['add-basic-styles', 'style-headings', 'style-form-task']
      let latestCssContent = null
      
      // Check in reverse order to get the latest progress
      for (let i = cssStepIds.length - 1; i >= 0; i--) {
        const cssStepId = cssStepIds[i]
        const cssContent = getCodeProgress(cssStepId)
        if (cssContent && cssContent.trim().length > 50 && 
            (cssContent.includes('body {') || cssContent.includes('/* Ministry of Silly Walks'))) {
          latestCssContent = cssContent
          break // Use the latest one found
        }
      }
      
      // Save both HTML and CSS content
      setFileContents(prev => {
        const newMap = new Map(prev)
        if (latestHtmlContent) {
          newMap.set('silly-walks-task-manager/index.html', latestHtmlContent)
        }
        if (latestCssContent) {
          newMap.set('silly-walks-task-manager/styles.css', latestCssContent)
        } else {
          // If no CSS found from Chapter 2, provide a basic working stylesheet
          const fallbackCssContent = `/* Ministry of Silly Walks - Task Manager Styles */

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

#taskList > div {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`
          newMap.set('silly-walks-task-manager/styles.css', fallbackCssContent)
        }
        return newMap
      })
    }
  }, [stepId, startingCode, currentChapter, language])

  const checkCode = () => {
    // More forgiving comparison for beginners
    const normalizedCode = code
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/"/g, '"')
      .replace(/'/g, '"')
      .trim()
    
    const normalizedTarget = targetCode
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/"/g, '"')
      .replace(/'/g, '"')
      .trim()
    
    // Check if the essential content is there (more forgiving)
    const hasRequiredElements = () => {
      if (language === 'html') {
        // Check for key elements based on the target
        if (targetCode.includes('<h1>Ministry of Silly Walks</h1>')) {
          return normalizedCode.includes('<h1>ministry of silly walks</h1>')
        }
        if (targetCode.includes('<p>Task Management System</p>')) {
          return normalizedCode.includes('<h1>ministry of silly walks</h1>') && 
                 normalizedCode.includes('<p>task management system</p>')
        }
        if (targetCode.includes('placeholder="Enter task description"')) {
          return normalizedCode.includes('<h1>ministry of silly walks</h1>') && 
                 normalizedCode.includes('<p>task management system</p>') &&
                 normalizedCode.includes('<h2>add new task</h2>') &&
                 normalizedCode.includes('<input') &&
                 normalizedCode.includes('placeholder')
        }
        if (targetCode.includes('<h3>Evaluate Mr. Smith')) {
          return normalizedCode.includes('<h1>ministry of silly walks</h1>') && 
                 normalizedCode.includes('<h2>current tasks</h2>') &&
                 normalizedCode.includes('<h3>evaluate mr. smith') &&
                 normalizedCode.includes('<p>review submitted video') &&
                 normalizedCode.includes('assigned to: john cleese')
        }
      }
      
      // Fallback to exact match for other languages
      return normalizedCode === normalizedTarget
    }
    
    if (hasRequiredElements()) {
      setIsComplete(true)
      setShowExplanation(true)
      onComplete?.()
    } else {
      // Give helpful feedback
      setShowHints(true)
    }
  }

  const getLineCount = (text: string) => text.split('\n').length

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setCode(newCode)
    
    // Save to file contents if we're editing a specific file
    if (selectedFileName) {
      setFileContents(prev => {
        const newMap = new Map(prev)
        newMap.set(selectedFileName, newCode)
        return newMap
      })
    } else {
      // Also save exercise content to the corresponding file for later retrieval
      const exerciseFile = language === 'html' ? 'silly-walks-task-manager/index.html' :
                         language === 'css' ? 'silly-walks-task-manager/styles.css' :
                         language === 'typescript' ? 'silly-walks-task-manager/script.js' :
                         'silly-walks-task-manager/script.js'
      setFileContents(prev => {
        const newMap = new Map(prev)
        newMap.set(exerciseFile, newCode)
        return newMap
      })
    }
    
    // Save progress automatically as user types (for exercise mode)
    if (stepId && !selectedFileName) {
      saveCodeProgress(stepId, newCode)
    }
  }, [stepId, selectedFileName, language])

  // Get starting content for a file - ALWAYS prioritize existing user content
  const getFileStartingContent = useCallback((fileName: string, language?: string) => {
    // CRITICAL: ALWAYS check if user has existing content first!
    const existingContent = fileContents.get(fileName)
    if (existingContent && existingContent.trim().length > 0) {
      return existingContent
    }

    // Check for completed content from previous chapters/steps
    if (fileName.endsWith('index.html') || language === 'html') {
      // For Chapter 2+, try to load completed HTML content from Chapter 1
      if (currentChapter >= 2) {
        const htmlStepIds = ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task']
        for (const htmlStepId of htmlStepIds) {
          const htmlContent = getCodeProgress(htmlStepId)
          if (htmlContent && htmlContent.includes('<body>') && htmlContent.includes('Ministry of Silly Walks')) {
            // Ensure CSS and JS links are present for separation of concerns
            let updatedContent = htmlContent
            if (currentChapter >= 2 && !htmlContent.includes('styles.css')) {
              updatedContent = updatedContent.replace(
                '</head>',
                '    <link rel="stylesheet" href="styles.css">\n</head>'
              )
            }
            if (currentChapter >= 3 && !htmlContent.includes('script.js')) {
              updatedContent = updatedContent.replace(
                '</body>',
                '    <script src="script.js"></script>\n</body>'
              )
            }
            return updatedContent
          }
        }
      }
      
      // Provide base template with appropriate links for separation of concerns
      let baseTemplate = `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>`
      
      if (currentChapter >= 2) {
        baseTemplate += `
    <link rel="stylesheet" href="styles.css">`
      }
      
      baseTemplate += `
</head>
<body>
    <!-- Your HTML content goes here -->`
      
      if (currentChapter >= 3) {
        baseTemplate += `
    <script src="script.js"></script>`
      }
      
      baseTemplate += `
</body>
</html>`
      
      return baseTemplate
    }
    
    if (fileName.endsWith('styles.css') || language === 'css') {
      // For Chapter 2+, try to load completed CSS from previous steps
      if (currentChapter >= 2) {
        const cssStepIds = ['add-basic-styles', 'style-headings', 'style-form-task']
        // Check in reverse order to get the latest progress
        for (let i = cssStepIds.length - 1; i >= 0; i--) {
          const cssStepId = cssStepIds[i]
          const savedContent = getCodeProgress(cssStepId)
          if (savedContent && savedContent.trim().length > 50 && 
              (savedContent.includes('body {') || savedContent.includes('/* Ministry of Silly Walks'))) {
            return savedContent
          }
        }
      }
      return `/* Ministry of Silly Walks - Task Manager Styles */

/* Add your CSS styles here */`
    }
    
    if (fileName.endsWith('script.js') || fileName.endsWith('scripts.js')) {
      // For Chapter 3+, try to load completed JavaScript from previous steps
      if (currentChapter >= 3) {
        const jsStepIds = ['add-javascript', 'add-button']
        for (const jsStepId of jsStepIds) {
          const jsContent = getCodeProgress(jsStepId)
          if (jsContent && jsContent.includes('addEventListener')) {
            // Extract just the JavaScript part, not the full HTML
            const scriptMatch = jsContent.match(/<script>([\s\S]*?)<\/script>/)
            if (scriptMatch) {
              return scriptMatch[1].trim()
            }
          }
        }
      }
      
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
  }, [currentChapter, fileContents])

  // Memoize the iframe srcDoc to prevent unnecessary re-renders
  const iframeSrcDoc = useMemo(() => {
    // Always try to construct a complete HTML document with all files combined
    
    // Get HTML content - prioritize current editor content if editing HTML, otherwise use saved content
    let htmlContent
    if (language === 'html' || (selectedFileName && selectedFileName.includes('index.html'))) {
      // User is editing HTML file directly - use current editor content
      htmlContent = code
    } else {
      // Use saved HTML content from file
      htmlContent = fileContents.get('silly-walks-task-manager/index.html')
    }
    
    // If no saved HTML content, create a complete fallback with typical Chapter 1 completion content
    if (!htmlContent || htmlContent.length < 50) {
      htmlContent = `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
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
</html>`
    }

    // Get CSS content - prioritize current editor content if editing CSS, otherwise use saved content
    let cssContent
    if (language === 'css' || (selectedFileName && selectedFileName.includes('styles.css'))) {
      // User is editing CSS file directly - use current editor content
      cssContent = code
    } else {
      // Use saved CSS content from file
      cssContent = fileContents.get('silly-walks-task-manager/styles.css')
    }
    
    // Get JavaScript content - prioritize current editor content if editing JS, otherwise use saved content
    let jsContent
    if (language === 'typescript' || (selectedFileName && selectedFileName.includes('script.js'))) {
      // User is editing JS file directly - use current editor content
      jsContent = code
    } else {
      // Use saved JS content from file
      jsContent = fileContents.get('silly-walks-task-manager/script.js')
    }
    
    // Start with the HTML content
    let combinedHtml = htmlContent
    
    // Add CSS inline for preview if we have CSS content
    if (cssContent && cssContent.trim().length > 0) {
      if (!combinedHtml.includes('<style>')) {
        combinedHtml = combinedHtml.replace(
          '</head>',
          `    <style>\n${cssContent}\n    </style>\n</head>`
        )
      }
    }
    
    // Add JavaScript inline for preview if we have JS content
    if (jsContent && jsContent.trim().length > 0) {
      if (!combinedHtml.includes('<script>')) {
        combinedHtml = combinedHtml.replace(
          '</body>',
          `    <script>\n${jsContent}\n    </script>\n</body>`
        )
      }
    }
    
    return combinedHtml
  }, [code, language, fileContents, selectedFileName])

  // Create a stable key for the textarea to prevent recreation
  const textareaKey = useMemo(() => `textarea-${language}`, [language])

  return (
    <>
      {!isFullscreen ? (
        <div className="tutorial-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-lg mb-4">{description}</p>
            
            {/* Clear Instructions */}
            {instructions && instructions.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  📝 What to do:
                </h4>
                <ol className="space-y-2">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-blue-800">{instruction}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Look for the comment in the code that shows exactly where to type!
                  </p>
                </div>
              </div>
            )}

            {/* Code Block with Explanation */}
            {codeBlock && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Code to Copy & Paste:
                  </h4>
                  <button
                    onClick={() => setShowCodeExplanation(true)}
                    className="text-sm text-tutorial-primary hover:text-blue-700 flex items-center px-3 py-1 rounded border border-tutorial-primary"
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    What does this code do?
                  </button>
                </div>
                <div className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{codeBlock.code}</pre>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  💡 Don't worry about understanding every line - just copy and paste it exactly as shown!
                </p>
              </div>
            )}
          </div>

          <CodeInterface
            code={code}
            handleCodeChange={handleCodeChange}
            textareaRef={textareaRef}
            textareaKey={textareaKey}
            language={language}
            isComplete={isComplete}
            showHints={showHints}
            setShowHints={setShowHints}
            hints={hints}
            currentHint={currentHint}
            setCurrentHint={setCurrentHint}
            checkCode={checkCode}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            iframeSrcDoc={iframeSrcDoc}
            showExplanation={showExplanation}
            setShowExplanation={setShowExplanation}
            explanation={explanation}
            onComplete={onComplete}
            startingCode={startingCode}
            targetCode={targetCode}
            setCode={setCode}
            setIsComplete={setIsComplete}
            instructions={instructions}
            showFileTree={showFileTree}
            currentChapter={currentChapter}
            selectedFileName={selectedFileName}
            setSelectedFileName={setSelectedFileName}
            fileContents={fileContents}
            setFileContents={setFileContents}
            getFileStartingContent={getFileStartingContent}
            isEditMode={isEditMode}
          />
        </div>
      ) : (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Fullscreen Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                
                {/* Show instructions in fullscreen */}
                {instructions && instructions.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <h4 className="font-medium text-blue-900 mb-2 text-sm">📝 Steps to complete:</h4>
                    <ol className="space-y-1">
                      {instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start text-xs">
                          <span className="flex-shrink-0 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-blue-800">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {/* Code Block in Fullscreen */}
                {codeBlock && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm flex items-center">
                        <Code className="w-3 h-3 mr-1" />
                        Code to Copy:
                      </h4>
                      <button
                        onClick={() => setShowCodeExplanation(true)}
                        className="text-xs text-tutorial-primary hover:text-blue-700 flex items-center px-2 py-1 rounded border border-tutorial-primary"
                      >
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Explain code
                      </button>
                    </div>
                    <div className="bg-gray-800 text-white p-2 rounded overflow-x-auto max-h-24 overflow-y-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap">{codeBlock.code}</pre>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Fullscreen Content */}
          <div className="flex-1 p-6 overflow-auto">
            <CodeInterface
              code={code}
              handleCodeChange={handleCodeChange}
              textareaRef={textareaRef}
              textareaKey={textareaKey}
              language={language}
              isComplete={isComplete}
              showHints={showHints}
              setShowHints={setShowHints}
              hints={hints}
              currentHint={currentHint}
              setCurrentHint={setCurrentHint}
              checkCode={checkCode}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
              iframeSrcDoc={iframeSrcDoc}
              showExplanation={showExplanation}
              setShowExplanation={setShowExplanation}
              explanation={explanation}
              onComplete={onComplete}
              startingCode={startingCode}
              targetCode={targetCode}
              setCode={setCode}
              setIsComplete={setIsComplete}
              instructions={instructions}
              showFileTree={showFileTree}
              currentChapter={currentChapter}
              selectedFileName={selectedFileName}
              setSelectedFileName={setSelectedFileName}
              fileContents={fileContents}
              setFileContents={setFileContents}
              getFileStartingContent={getFileStartingContent}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      )}
      
      {/* Code Explanation Modal */}
      {codeBlock && (() => {
        // Detect if the codeBlock contains CSS (starts with CSS selectors like "body {", "h1 {", etc.)
        const isCSSContent = codeBlock.code.trim().match(/^[a-zA-Z][a-zA-Z0-9\-_]*\s*{/) || 
                            codeBlock.code.includes('{') && codeBlock.code.includes(':') && 
                            codeBlock.code.includes(';') && !codeBlock.code.includes('<')
        
        const detectedLanguage = isCSSContent ? 'css' : language
        
        return (
          <CodeExplanationModal
            isOpen={showCodeExplanation}
            onClose={() => setShowCodeExplanation(false)}
            title={`Understanding the ${detectedLanguage === 'html' ? 'HTML' : detectedLanguage === 'css' ? 'CSS' : detectedLanguage === 'typescript' ? 'TypeScript' : detectedLanguage === 'json' ? 'JSON' : 'JavaScript'} Code`}
            code={codeBlock.code}
            explanations={codeBlock.explanations}
            language={detectedLanguage}
          />
        )
      })()}

      {/* Story Context Modal */}
      {explanation && showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">How This Relates to BA Work</h2>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">
              {/* What's Happening */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  What's Happening in This Code
                </h3>
                <p className="text-blue-800">{explanation.whatIsHappening}</p>
              </div>

              {/* Why It Matters */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Why This Matters for Your Users
                </h3>
                <p className="text-green-800">{explanation.whyItMatters}</p>
              </div>

              {/* Real World Connection */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Real-World Connection to BA Work
                </h3>
                <p className="text-purple-800">{explanation.realWorldConnection}</p>
              </div>

              {/* Key Terms */}
              {explanation.keyTerms && Object.keys(explanation.keyTerms).length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Terms to Remember</h3>
                  <div className="space-y-2">
                    {Object.entries(explanation.keyTerms).map(([term, definition]) => (
                      definition && (
                        <div key={term} className="flex flex-col space-y-1">
                          <span className="font-medium text-gray-900">{term}</span>
                          <span className="text-gray-700 text-sm">{definition}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}