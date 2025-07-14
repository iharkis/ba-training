// Copy the exact problematic part of the file
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function TestChapter3() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showCodeExplanation, setShowCodeExplanation] = useState(false)

  const steps = [
    {
      id: 'javascript-introduction',
      title: 'Understanding JavaScript',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Test</h2>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div>Test</div>
    </div>
  )
}