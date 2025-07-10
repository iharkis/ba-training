'use client'

import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { CheckCircle, AlertCircle, Lightbulb, Eye, Code, Maximize2, Minimize2, X } from 'lucide-react'
import { saveCodeProgress, getCodeProgress } from '@/lib/progress'
import CodeExplanationModal from './CodeExplanationModal'

interface CodeEditorProps {
  title: string
  description: string
  instructions?: string[]  // Step-by-step instructions
  language: 'html' | 'css' | 'typescript' | 'javascript' | 'json'
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
}

// Move CodeInterface outside to prevent recreation
const CodeInterface = ({
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
  setShowExplanation: setShowExplanationLocal,
  instructions
}: {
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
}) => (
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
            setShowExplanationLocal(false)
          }}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center px-3 py-2 rounded border border-gray-300"
        >
          Reset
        </button>
        
        <button
          onClick={() => {
            setCode(targetCode)
            setIsComplete(true)
            setShowExplanationLocal(true)
            onComplete?.()
          }}
          className="text-sm text-green-600 hover:text-green-900 flex items-center px-3 py-2 rounded border border-green-300"
        >
          Complete Step
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
      </div>
      
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

    {/* Hints - moved to top in fullscreen */}
    {showHints && (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-yellow-800">
            Hint {currentHint + 1} of {hints.length}
          </h4>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentHint(Math.max(0, currentHint - 1))}
              disabled={currentHint === 0}
              className="text-sm text-yellow-700 disabled:text-yellow-400"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentHint(Math.min(hints.length - 1, currentHint + 1))}
              disabled={currentHint === hints.length - 1}
              className="text-sm text-yellow-700 disabled:text-yellow-400"
            >
              Next
            </button>
          </div>
        </div>
        <p className="text-yellow-700">{hints[currentHint]}</p>
      </div>
    )}

    {/* Main coding area */}
    <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1 lg:grid-cols-2 h-[calc(100vh-12rem)]' : 'grid-cols-1 lg:grid-cols-2'}`}>
      {/* Code Editor */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-medium text-gray-700">
            {language.toUpperCase()} Code Editor
          </label>
        </div>
        
        <div className="code-editor border-2 border-gray-200 rounded-lg overflow-hidden flex-1">
          <div className="bg-gray-800 text-white px-4 py-3 text-sm flex items-center justify-between">
            <span>
              {language === 'html' && '📄 index.html'}
              {language === 'css' && '🎨 styles.css'}
              {language === 'typescript' && '⚡ app.ts'}
              {language === 'javascript' && '⚡ app.js'}
              {language === 'json' && '📦 package.json'}
            </span>
            {isComplete && (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Complete!
              </div>
            )}
          </div>
          <div className="relative bg-white h-full">
            <textarea
              key={textareaKey}
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              className={`w-full p-6 font-mono text-base border-0 focus:ring-0 focus:outline-none resize-none bg-gray-50 h-full ${
                isFullscreen ? 'min-h-[calc(100vh-16rem)]' : 'min-h-[600px]'
              }`}
              spellCheck={false}
              placeholder="Type your code here..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-3">
          {isComplete ? (
            <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Excellent work! Your code is correct.</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Code className="w-5 h-5 mr-2" />
              <span>Keep going! Add the code step by step.</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-medium text-gray-700">
            Live Preview
          </label>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-sm text-tutorial-primary hover:text-blue-700 flex items-center px-3 py-1 rounded border border-tutorial-primary"
          >
            <Eye className="w-4 h-4 mr-1" />
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
        </div>
        
        <div className={`border-2 border-gray-200 rounded-lg overflow-hidden bg-white flex-1 ${
          isFullscreen ? 'min-h-[calc(100vh-16rem)]' : 'min-h-[600px]'
        }`}>
          <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-b">
            🌐 Live Website Preview
          </div>
          <div className="p-4 h-full">
            {language === 'html' ? (
              <iframe
                key="preview-iframe"
                srcDoc={iframeSrcDoc}
                className="w-full h-full border-0 bg-white"
                title="HTML Preview"
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

    {/* Explanation */}
    {showExplanation && isComplete && (
      <div className="space-y-4">
        <div className="explanation-box">
          <div className="explanation-title">What's Happening?</div>
          <div className="explanation-text">
            {explanation.whatIsHappening}
          </div>
        </div>

        <div className="concept-callout">
          <div className="concept-title">
            <Lightbulb className="w-5 h-5 mr-2" />
            Why This Matters
          </div>
          <div className="concept-text">
            {explanation.whyItMatters}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Real-World Connection</h4>
          <p className="text-green-700 text-sm">
            {explanation.realWorldConnection}
          </p>
        </div>

        {Object.keys(explanation.keyTerms).length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Key Terms</h4>
            <dl className="space-y-2">
              {Object.entries(explanation.keyTerms).map(([term, definition]) => (
                <div key={term}>
                  <dt className="font-medium text-gray-900 text-sm">{term}</dt>
                  <dd className="text-gray-700 text-sm ml-4">{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    )}
  </div>
)

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
  codeBlock
}: CodeEditorProps) {
  const [code, setCode] = useState(startingCode)
  const [showHints, setShowHints] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCodeExplanation, setShowCodeExplanation] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
  }, [stepId, startingCode])

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
    
    // Save progress automatically as user types
    if (stepId) {
      saveCodeProgress(stepId, newCode)
    }
  }, [stepId])

  // Memoize the iframe srcDoc to prevent unnecessary re-renders
  const iframeSrcDoc = useMemo(() => {
    return code
  }, [code])

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
          />
        </div>
      ) : (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
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
          
          <div className="p-6">
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
    </>
  )
}