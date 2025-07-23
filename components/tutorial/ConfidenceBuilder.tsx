'use client'

import React, { useState } from 'react'
import { CheckCircle, Lightbulb, ArrowRight, Heart, Target, MessageCircle } from 'lucide-react'

interface ConfidenceBuilderProps {
  onContinue: () => void
  children: React.ReactNode
  encouragementMessage?: string
  showAlternativePaths?: boolean
}

export default function ConfidenceBuilder({ 
  onContinue, 
  children, 
  encouragementMessage,
  showAlternativePaths = true 
}: ConfidenceBuilderProps) {
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleInteraction = () => {
    setHasInteracted(true)
  }

  const handleContinue = () => {
    setShowEncouragement(true)
    setTimeout(() => {
      onContinue()
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div onClick={handleInteraction}>
        {children}
      </div>

      {/* Gentle encouragement after interaction */}
      {hasInteracted && !showEncouragement && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-blue-600 mr-3" />
            <p className="text-blue-800 text-sm">
              Great job exploring! Every click helps you learn something new.
            </p>
          </div>
        </div>
      )}

      {/* Multiple paths to success */}
      {showAlternativePaths && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-medium text-emerald-900 mb-1">Perfect!</h4>
            <p className="text-sm text-emerald-700">
              You got it right the first time
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <Lightbulb className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h4 className="font-medium text-amber-900 mb-1">Learning!</h4>
            <p className="text-sm text-amber-700">
              Each attempt teaches you something
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-blue-900 mb-1">Progress!</h4>
            <p className="text-sm text-blue-700">
              Every step forward counts
            </p>
          </div>
        </div>
      )}

      {/* Success celebration */}
      {showEncouragement && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 text-center animate-celebrate">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 mr-2" />
            <span className="text-2xl">🎉</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fantastic work!</h3>
          <p className="text-gray-700 mb-4">
            {encouragementMessage || "You're building real skills that will help you work better with development teams."}
          </p>
          <button
            onClick={handleContinue}
            className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Keep the momentum going!
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}

      {/* Gentle motivational footer */}
      <div className="text-center">
        <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
          <MessageCircle className="w-3 h-3 mr-2" />
          Remember: Every BA started as a beginner. You're doing great!
        </div>
      </div>
    </div>
  )
}