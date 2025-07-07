// Simple progress tracking using localStorage
// No user accounts needed - just stores progress locally in browser

interface TutorialProgress {
  completedSections: { [sectionId: string]: boolean }
  completedSteps: { [stepId: string]: boolean }
  currentCode: { [stepId: string]: string }
  lastVisited?: string
}

const PROGRESS_KEY = 'ba-tutorial-progress'

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
}

export function markStepComplete(stepId: string) {
  const progress = getProgress()
  progress.completedSteps[stepId] = true
  progress.lastVisited = new Date().toISOString()
  saveProgress(progress)
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