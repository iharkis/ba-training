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
}

export default function CodeExplanationModal({
  isOpen,
  onClose,
  code,
  explanations,
  title
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
                        <p className="text-blue-800 text-sm mb-3">{item.explanation}</p>
                        
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
              <p className="text-gray-700 text-sm">
                This JavaScript code transforms your static webpage into an interactive application. 
                When you write requirements like "users should be able to add tasks" or "validate input before saving," 
                this is the type of code that developers write to make those requirements work.
              </p>
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