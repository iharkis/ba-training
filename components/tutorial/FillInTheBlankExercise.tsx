'use client'

import { useState, useEffect } from 'react'
import { Check, X, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react'

interface FillInTheBlankExerciseProps {
  template: string  // Template with blanks marked as {{answer}}
  answers: { [key: string]: string }  // Correct answers for each blank
  hints?: { [key: string]: string }  // Hints for each blank
  options?: { [key: string]: string[] }  // Dropdown options for each blank
  onComplete: (isComplete: boolean) => void
  description?: string
}

export default function FillInTheBlankExercise({ 
  template, 
  answers, 
  hints = {}, 
  options = {}, 
  onComplete, 
  description 
}: FillInTheBlankExerciseProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({})
  const [showHints, setShowHints] = useState<{ [key: string]: boolean }>({})
  const [validated, setValidated] = useState<{ [key: string]: boolean | null }>({})
  const [isExpanded, setIsExpanded] = useState(false)

  // Parse template to find all blanks
  const blanks = template.match(/\{\{(\w+)\}\}/g)?.map(match => match.slice(2, -2)) || []

  // Initialize user answers
  useEffect(() => {
    const initialAnswers: { [key: string]: string } = {}
    blanks.forEach(blank => {
      initialAnswers[blank] = ''
    })
    setUserAnswers(initialAnswers)
  }, [template])

  // Check if all answers are correct
  useEffect(() => {
    const allCorrect = blanks.every(blank => 
      userAnswers[blank] && 
      userAnswers[blank].toLowerCase().trim() === answers[blank].toLowerCase().trim()
    )
    onComplete(allCorrect)
  }, [userAnswers, answers, blanks, onComplete])

  const handleAnswerChange = (blank: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [blank]: value }))
    // Clear validation when user types
    setValidated(prev => ({ ...prev, [blank]: null }))
  }

  const validateAnswer = (blank: string) => {
    const isCorrect = userAnswers[blank]?.toLowerCase().trim() === answers[blank].toLowerCase().trim()
    setValidated(prev => ({ ...prev, [blank]: isCorrect }))
  }

  const toggleHint = (blank: string) => {
    setShowHints(prev => ({ ...prev, [blank]: !prev[blank] }))
  }

  // Create a simple sentence with numbered blanks in square brackets
  const createSentenceWithBlanks = () => {
    let sentence = template
    blanks.forEach((blank, index) => {
      sentence = sentence.replace(`{{${blank}}}`, `[${index + 1}]`)
    })
    return sentence
  }

  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-yellow-100 hover:bg-yellow-200 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-yellow-700" />
          ) : (
            <ChevronRight className="w-5 h-5 text-yellow-700" />
          )}
          <span className="text-lg font-semibold text-yellow-900">
            Interactive Exercise
          </span>
          {!isExpanded && (
            <span className="text-sm text-yellow-700">
              (Click to expand)
            </span>
          )}
        </div>
        
        {/* Show completion status in collapsed state */}
        {!isExpanded && (
          <div className="flex items-center space-x-2">
            {blanks.every(blank => 
              userAnswers[blank] && 
              userAnswers[blank].toLowerCase().trim() === answers[blank].toLowerCase().trim()
            ) && (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {description && (
            <p className="text-gray-700 font-medium">{description}</p>
          )}
          
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 font-medium">
              Fill in the blanks below by selecting the correct answers from the dropdown menus. The bold, italic text shows where each answer will go.
            </p>
          </div>

          {/* Show the sentence with numbered blanks */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              {createSentenceWithBlanks().split(/(\[[0-9]+\])/).map((part, index) => {
                if (part.match(/\[[0-9]+\]/)) {
                  return (
                    <span key={index} className="font-bold italic text-blue-700 bg-blue-100 px-2 py-1 rounded">
                      {part}
                    </span>
                  )
                } else {
                  return part
                }
              })}
            </p>
          </div>

          {/* Answer inputs - simple numbered list */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Fill in the blanks:</h4>
            
            {blanks.map((blank, index) => (
              <div key={blank} className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-lg font-bold text-gray-600 min-w-8">
                      {index + 1}.
                    </span>
                    
                    <select
                      value={userAnswers[blank] || ''}
                      onChange={(e) => {
                        handleAnswerChange(blank, e.target.value)
                        validateAnswer(blank)
                      }}
                      className={`flex-1 px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        validated[blank] === true ? 'border-green-500 bg-green-50' : 
                        validated[blank] === false ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select an answer...</option>
                      {options[blank]?.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    
                    {validated[blank] === true && (
                      <div className="flex items-center space-x-2">
                        <Check className="w-6 h-6 text-green-500" />
                        <span className="text-green-600 font-medium">Correct!</span>
                      </div>
                    )}
                    
                    {validated[blank] === false && (
                      <div className="flex items-center space-x-2">
                        <X className="w-6 h-6 text-red-500" />
                        <span className="text-red-600 font-medium">Try again</span>
                      </div>
                    )}
                  </div>
                  
                  {hints[blank] && (
                    <button
                      onClick={() => toggleHint(blank)}
                      className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span className="text-sm">
                        {showHints[blank] ? 'Hide Hint' : 'Need Help?'}
                      </span>
                    </button>
                  )}
                </div>
                
                {/* Show hint directly below this input field */}
                {showHints[blank] && hints[blank] && (
                  <div className="ml-11 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">Hint:</p>
                        <p className="text-sm text-blue-800">{hints[blank]}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

// Hook to handle the interaction with the template
export function useFillInTheBlankExercise() {
  const [isComplete, setIsComplete] = useState(false)
  
  const handleComplete = (complete: boolean) => {
    setIsComplete(complete)
  }
  
  return {
    isComplete,
    handleComplete
  }
}