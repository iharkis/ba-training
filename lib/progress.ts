// Simple progress tracking using localStorage
// No user accounts needed - just stores progress locally in browser

interface TutorialProgress {
  completedSections: { [sectionId: string]: boolean }
  completedSteps: { [stepId: string]: boolean }
  currentCode: { [stepId: string]: string }
  lastVisited?: string
}

const PROGRESS_KEY = 'ba-tutorial-progress'
const USER_NAME_KEY = 'ba-tutorial-user-name'

export function getProgress(): TutorialProgress {
  if (typeof window === 'undefined') return { completedSections: {}, completedSteps: {}, currentCode: {} }
  
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.warn('Failed to load progress from localStorage:', error)
  }
  
  return { completedSections: {}, completedSteps: {}, currentCode: {} }
}

export function saveProgress(progress: TutorialProgress) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error)
  }
}

export function markSectionComplete(sectionId: string) {
  const progress = getProgress()
  progress.completedSections[sectionId] = true
  progress.lastVisited = new Date().toISOString()
  saveProgress(progress)
  
  // Also track on server
  trackProgressOnServer(sectionId)
}

export function markStepComplete(stepId: string) {
  const progress = getProgress()
  progress.completedSteps[stepId] = true
  progress.lastVisited = new Date().toISOString()
  saveProgress(progress)
  
  // Also track on server - try to extract chapter from stepId
  const chapterId = extractChapterFromStepId(stepId)
  trackProgressOnServer(stepId, chapterId)
}

// Helper function to extract chapter from stepId
function extractChapterFromStepId(stepId: string): string | undefined {
  // Look for patterns like "chapter-1-step-name" or just return the chapter if we can determine it
  if (stepId.includes('chapter-')) {
    const match = stepId.match(/chapter-(\d+)/)
    return match ? `chapter-${match[1]}` : undefined
  }
  return undefined
}

export function saveCodeProgress(stepId: string, code: string) {
  const progress = getProgress()
  progress.currentCode[stepId] = code
  saveProgress(progress)
}

export function getCodeProgress(stepId: string): string | null {
  const progress = getProgress()
  return progress.currentCode[stepId] || null
}

export function isSectionComplete(sectionId: string): boolean {
  const progress = getProgress()
  return progress.completedSections[sectionId] || false
}

export function isStepComplete(stepId: string): boolean {
  const progress = getProgress()
  return progress.completedSteps[stepId] || false
}

export function getCompletedStepsCount(): number {
  const progress = getProgress()
  return Object.keys(progress.completedSteps).length
}

export function resetProgress() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PROGRESS_KEY)
}

// Export current progress as JSON for backup
export function exportProgress(): string {
  const progress = getProgress()
  return JSON.stringify(progress, null, 2)
}

// Import progress from JSON backup
export function importProgress(jsonString: string): boolean {
  try {
    const progress = JSON.parse(jsonString)
    saveProgress(progress)
    return true
  } catch (error) {
    console.error('Failed to import progress:', error)
    return false
  }
}

// User name management
export function saveUserName(name: string) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(USER_NAME_KEY, name)
  } catch (error) {
    console.warn('Failed to save user name to localStorage:', error)
  }
}

export function getUserName(): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem(USER_NAME_KEY)
  } catch (error) {
    console.warn('Failed to load user name from localStorage:', error)
    return null
  }
}

export function hasUserName(): boolean {
  return getUserName() !== null
}

// Personalization utility
export function personalizeText(text: string): string {
  const name = getUserName()
  if (!name) return text
  
  return text.replace(/\{name\}/gi, name)
}

// Server tracking (graceful fallback if it fails)
async function trackProgressOnServer(stepId: string, chapterId?: string) {
  const name = getUserName()
  if (!name) return // No tracking if no name provided

  try {
    await fetch('/api/progress/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        stepId,
        chapterId,
        timestamp: new Date().toISOString()
      })
    })
  } catch (error) {
    // Silently fail - localStorage tracking still works
    console.warn('Failed to track progress on server:', error)
  }
}