'use client'

import { useState } from 'react'
import { Lightbulb, ChevronDown, ChevronUp, Code } from 'lucide-react'

interface InlineCodeHintProps {
  title: string
  explanations: {
    line: string
    explanation: string
    businessContext?: string
  }[]
  language?: 'javascript' | 'css' | 'html' | 'typescript' | 'json'
}

export default function InlineCodeHint({
  title,
  explanations,
  language = 'javascript'
}: InlineCodeHintProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg mb-4">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-blue-900">💡 BA Hint: {title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-blue-200">
          <div className="space-y-4 mt-4">
            {explanations.map((item, index) => (
              <div key={index} className="bg-white border border-blue-200 rounded-lg overflow-hidden">
                {/* Code line */}
                <div className="bg-gray-800 text-white p-2 text-sm font-mono">
                  <code className="whitespace-pre-wrap">{item.line}</code>
                </div>
                
                {/* Explanation */}
                <div className="p-3">
                  <p className="text-blue-900 font-medium text-sm mb-2">What this does:</p>
                  <div className="text-blue-800 text-sm mb-3" dangerouslySetInnerHTML={{__html: item.explanation}} />
                  
                  {item.businessContext && (
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-green-800 text-sm">
                        <strong>Why this matters for your users:</strong> {item.businessContext}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Key takeaway */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Key Takeaway
            </h4>
            <p className="text-yellow-800 text-sm">
              {language === 'css' ? (
                <>
                  This CSS code transforms the visual appearance to meet professional standards. 
                  When you write requirements like "minimum 4.5:1 contrast ratio" or "16px base font size," 
                  this is how developers implement those specific requirements.
                </>
              ) : language === 'html' ? (
                <>
                  This HTML code creates the structure and content of your webpage. 
                  When you write requirements like "users must see a form within 2 seconds" or "display task list with maximum 10 items per page," 
                  this is the type of markup that developers write to create those user interfaces.
                </>
              ) : language === 'json' ? (
                <>
                  This JSON code defines data structures and configuration for your application. 
                  When you write requirements like "store user preferences for 30 days" or "API responses under 200ms," 
                  this is the type of structured data format that developers use to organize information.
                </>
              ) : (
                <>
                  This JavaScript code transforms your static webpage into an interactive application. 
                  When you write requirements like "users complete tasks in ≤3 clicks" or "validate input with clear error messages," 
                  this is the type of code that developers write to make those requirements work.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}