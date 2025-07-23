'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isStepComplete } from '@/lib/progress'

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

interface UseChapterSkipWarningProps {
  currentChapter: number
  onNavigate?: (path: string) => void
}

export function useChapterSkipWarning({ currentChapter, onNavigate }: UseChapterSkipWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const router = useRouter()

  // Check if user has missing prerequisites for the current chapter
  const hasMissingPrerequisites = (chapter: number): boolean => {
    const dependencies = CHAPTER_DEPENDENCIES[chapter as keyof typeof CHAPTER_DEPENDENCIES] || []
    return dependencies.some(stepId => !isStepComplete(stepId))
  }

  // Check if navigation should show warning
  const shouldShowWarning = (targetChapter: number): boolean => {
    // Only show warning if jumping to a future chapter with missing prerequisites
    return targetChapter > currentChapter && hasMissingPrerequisites(targetChapter)
  }

  // Intercept navigation and show warning if needed
  const handleNavigation = (path: string) => {
    const chapterMatch = path.match(/\/tutorial\/chapter-(\d+)/)
    if (chapterMatch) {
      const targetChapter = parseInt(chapterMatch[1])
      
      if (shouldShowWarning(targetChapter)) {
        setShowWarning(true)
        setPendingNavigation(path)
        return false // Prevent navigation
      }
    }
    
    // Allow navigation
    if (onNavigate) {
      onNavigate(path)
    } else {
      // Reset scroll position to top of page before navigation
      window.scrollTo(0, 0)
      router.push(path)
    }
    return true
  }

  // Handle proceeding with navigation despite warning
  const handleProceed = () => {
    setShowWarning(false)
    if (pendingNavigation) {
      if (onNavigate) {
        onNavigate(pendingNavigation)
      } else {
        // Reset scroll position to top of page before navigation
        window.scrollTo(0, 0)
        router.push(pendingNavigation)
      }
      setPendingNavigation(null)
    }
  }

  // Handle canceling navigation
  const handleCancel = () => {
    setShowWarning(false)
    setPendingNavigation(null)
  }

  return {
    showWarning,
    pendingNavigation,
    handleNavigation,
    handleProceed,
    handleCancel,
    hasMissingPrerequisites: () => hasMissingPrerequisites(currentChapter)
  }
}