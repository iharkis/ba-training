'use client'

import { useState } from 'react'
import { X, Code, Lightbulb } from 'lucide-react'

interface CodeExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  code: string
  explanations: {
    line: string
    explanation: string
    businessContext?: string
  }[]
  title: string
  language?: 'javascript' | 'css' | 'html' | 'typescript' | 'json'
}

export default function CodeExplanationModal({
  isOpen,
  onClose,
  code,
  explanations,
  title,
  language = 'javascript'
}: CodeExplanationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Code className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">What This Code Does (In Plain English)</h3>
              <p className="text-gray-600 mb-4">
                Don't worry about memorizing this - just understand what each part accomplishes for your users.
              </p>
              
              {/* Code Structure Guide */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  Understanding Code Structure
                </h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <div className="flex items-start">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2 text-xs">&lt; &gt;</span>
                    <span>Angle brackets indicate HTML tags that tell the browser what type of content follows</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2 text-xs">{ }</span>
                    <span>Curly braces contain CSS properties that control appearance and layout</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2 text-xs">;</span>
                    <span>Semicolons end CSS statements - like periods at the end of sentences</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded mr-2 text-xs">""</span>
                    <span>Quotation marks surround text content or values that should be treated as literal strings</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {explanations.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Code line */}
                  <div className="bg-gray-800 text-white p-3">
                    <code className="text-sm font-mono whitespace-pre-wrap">{item.line}</code>
                  </div>
                  
                  {/* Explanation */}
                  <div className="p-4 bg-blue-50">
                    <div className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-900 font-medium mb-2">What this does:</p>
                        <div className="text-blue-800 text-sm mb-3" dangerouslySetInnerHTML={{__html: item.explanation}} />
                        
                        {item.businessContext && (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <p className="text-green-800 text-sm">
                              <strong>Why this matters for your users:</strong> {item.businessContext}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Key Takeaway</h4>
              <p className="text-gray-700 text-sm mb-3">
                {language === 'css' ? (
                  <>
                    This CSS code transforms the visual appearance of your webpage to meet professional standards. 
                    When you write requirements like "the system should look professional" or "use a clean, readable layout," 
                    this is the type of styling that developers implement to make those requirements work.
                  </>
                ) : language === 'html' ? (
                  <>
                    This HTML code creates the structure and content of your webpage. 
                    When you write requirements like "users should see a form" or "display a list of tasks," 
                    this is the type of markup that developers write to create those user interfaces.
                  </>
                ) : language === 'json' ? (
                  <>
                    This JSON code defines data structures and configuration for your application. 
                    When you write requirements like "store user preferences" or "define API responses," 
                    this is the type of structured data format that developers use to organize information.
                  </>
                ) : (
                  <>
                    This {language === 'typescript' ? 'TypeScript' : 'JavaScript'} code transforms your static webpage into an interactive application. 
                    When you write requirements like "users should be able to add tasks" or "validate input before saving," 
                    this is the type of code that developers write to make those requirements work.
                  </>
                )}
              </p>
              
              {/* Code Formatting Guide */}
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                <h5 className="font-medium text-yellow-900 mb-2">💡 Code Formatting Tips for BAs</h5>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• <strong>Indentation matters:</strong> Nested code is indented to show hierarchy and structure</li>
                  <li>• <strong>Whitespace helps:</strong> Empty lines separate logical sections for better readability</li>
                  <li>• <strong>Case sensitivity:</strong> HTML tags can be lowercase, but CSS properties are case-sensitive</li>
                  <li>• <strong>Consistent naming:</strong> Use descriptive names for IDs and classes (e.g., "main-heading" not "h1")</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="tutorial-button-primary"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  )
}