'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { getProgress, isStepComplete } from '@/lib/progress'

interface ChapterSkipWarningProps {
  currentChapter: number
  onProceed: () => void
  onCancel: () => void
}

const CHAPTER_DEPENDENCIES = {
  1: [],
  2: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task'],
  3: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task'],
  4: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button'],
  5: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing'],
  6: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing', 'create-server', 'add-endpoints'],
  7: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing', 'create-server', 'add-endpoints', 'add-database', 'create-tables'],
  8: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing', 'create-server', 'add-endpoints', 'add-database', 'create-tables', 'connect-frontend', 'add-api-calls'],
  9: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing', 'create-server', 'add-endpoints', 'add-database', 'create-tables', 'connect-frontend', 'add-api-calls', 'add-tests', 'debug-issues'],
  10: ['html-basics', 'add-subtitle', 'simple-form', 'display-sample-task', 'add-basic-styles', 'style-headings', 'style-form-task', 'add-javascript', 'add-button', 'add-task-display', 'add-task-editing', 'create-server', 'add-endpoints', 'add-database', 'create-tables', 'connect-frontend', 'add-api-calls', 'add-tests', 'debug-issues', 'optimize-performance', 'add-caching']
}

const CHAPTER_NAMES = {
  1: 'Building the Foundation',
  2: 'Professional Styling', 
  3: 'Adding Interactivity',
  4: 'Advanced JavaScript',
  5: 'Building the Backend',
  6: 'Database Integration',
  7: 'Frontend-Backend Connection',
  8: 'Testing and Debugging',
  9: 'Performance Considerations',
  10: 'Real Projects & Dev Teams'
}

export default function ChapterSkipWarning({ currentChapter, onProceed, onCancel }: ChapterSkipWarningProps) {
  const [missingSteps, setMissingSteps] = useState<string[]>([])
  const [skippedChapters, setSkippedChapters] = useState<number[]>([])

  useEffect(() => {
    const dependencies = CHAPTER_DEPENDENCIES[currentChapter as keyof typeof CHAPTER_DEPENDENCIES] || []
    const missing = dependencies.filter(stepId => !isStepComplete(stepId))
    setMissingSteps(missing)

    // Determine which chapters are being skipped
    const skipped = []
    for (let i = 1; i < currentChapter; i++) {
      const chapterDeps = CHAPTER_DEPENDENCIES[i as keyof typeof CHAPTER_DEPENDENCIES] || []
      const hasIncompleteSteps = chapterDeps.some(stepId => !isStepComplete(stepId))
      if (hasIncompleteSteps) {
        skipped.push(i)
      }
    }
    setSkippedChapters(skipped)
  }, [currentChapter])

  if (missingSteps.length === 0) {
    return null // No warning needed
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              You're About to Skip Chapter{skippedChapters.length > 1 ? 's' : ''}
            </h3>
          </div>

          {/* Warning Message */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              You're jumping to <strong>Chapter {currentChapter}: {CHAPTER_NAMES[currentChapter as keyof typeof CHAPTER_NAMES]}</strong>, 
              but you haven't completed some previous chapters. This means:
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium mb-2">What you'll miss:</p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Your personalized code from previous chapters won't carry forward</li>
                    <li>• The live preview will use generic template code instead of your work</li>
                    <li>• You won't have the learning progression that builds understanding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Skipped Chapters */}
          {skippedChapters.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Chapters you're skipping:</h4>
              <div className="space-y-2">
                {skippedChapters.map(chapterNum => (
                  <div key={chapterNum} className="flex items-center text-sm text-gray-600">
                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    <span>Chapter {chapterNum}: {CHAPTER_NAMES[chapterNum as keyof typeof CHAPTER_NAMES]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Steps */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Incomplete exercises ({missingSteps.length} remaining):
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {missingSteps.map(stepId => (
                  <div key={stepId} className="flex items-center text-sm text-gray-600">
                    <XCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span className="font-mono text-xs">{stepId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Our recommendation:</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">Complete the previous chapters first</p>
                  <p className="text-sm text-blue-700">
                    This ensures you build a solid foundation and your code carries forward properly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-tutorial-primary text-white px-4 py-2 rounded-md hover:bg-tutorial-primary-dark transition-colors"
            >
              Go Back & Complete Previous Chapters
            </button>
            <button
              onClick={onProceed}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Continue Anyway
            </button>
          </div>

          {/* Fine Print */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Don't worry - you can always go back and complete previous chapters later, but your code won't automatically carry forward.
          </div>
        </div>
      </div>
    </div>
  )
}