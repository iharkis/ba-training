'use client'

import React, { useState } from 'react'
import { ChevronDown, Eye, BookOpen } from 'lucide-react'

interface ContentChunk {
  id: string
  title: string
  content: React.ReactNode
  teaser?: string
}

interface ProgressiveRevealProps {
  chunks: ContentChunk[]
  initiallyVisible?: number
  showAllText?: string
  hideText?: string
}

export default function ProgressiveReveal({ 
  chunks, 
  initiallyVisible = 1,
  showAllText = "Show more details",
  hideText = "Show less"
}: ProgressiveRevealProps) {
  const [visibleCount, setVisibleCount] = useState(initiallyVisible)
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    if (showAll) {
      setVisibleCount(initiallyVisible)
      setShowAll(false)
    } else {
      setVisibleCount(chunks.length)
      setShowAll(true)
    }
  }

  const showNext = () => {
    if (visibleCount < chunks.length) {
      setVisibleCount(prev => Math.min(prev + 1, chunks.length))
    }
  }

  return (
    <div className="space-y-6">
      {chunks.slice(0, visibleCount).map((chunk, index) => (
        <div 
          key={chunk.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {chunk.title && (
            <h4 className="font-medium text-gray-800 mb-3 text-lg">
              {chunk.title}
            </h4>
          )}
          <div className="prose prose-sm max-w-none">
            {chunk.content}
          </div>
        </div>
      ))}

      {visibleCount < chunks.length && (
        <div className="flex items-center justify-center space-x-4 py-4">
          <button
            onClick={showNext}
            className="inline-flex items-center px-4 py-2 text-sm text-tutorial-primary hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Show next section
          </button>
          
          <div className="text-gray-300">or</div>
          
          <button
            onClick={toggleShowAll}
            className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showAllText}
          </button>
        </div>
      )}

      {showAll && visibleCount === chunks.length && (
        <div className="flex justify-center py-4">
          <button
            onClick={toggleShowAll}
            className="inline-flex items-center px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
          >
            <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
            {hideText}
          </button>
        </div>
      )}
    </div>
  )
}