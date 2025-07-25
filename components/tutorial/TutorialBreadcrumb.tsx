'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useChapterSkipWarning } from '@/hooks/useChapterSkipWarning'
import ChapterSkipWarning from './ChapterSkipWarning'

const TUTORIAL_STRUCTURE = {
  '/': { title: 'Home', description: 'BA Development Tutorial' },
  '/tutorial/introduction': { 
    title: 'Introduction', 
    description: 'Setting the foundation',
    chapter: 0
  },
  '/tutorial/chapter-1': { 
    title: 'Chapter 1: Building the Foundation', 
    description: 'Creating the HTML structure',
    chapter: 1
  },
  '/tutorial/chapter-2': { 
    title: 'Chapter 2: Professional Styling', 
    description: 'Making it look like a real government system',
    chapter: 2
  },
  '/tutorial/chapter-3': { 
    title: 'Chapter 3: Adding Interactivity', 
    description: 'Making the system actually work',
    chapter: 3
  },
  '/tutorial/chapter-4': { 
    title: 'Chapter 4: Advanced JavaScript', 
    description: 'Making data persist and adding CRUD operations',
    chapter: 4
  },
  '/tutorial/chapter-5': { 
    title: 'Chapter 5: Database Integration', 
    description: 'Adding persistent storage with SQLite',
    chapter: 5
  },
  '/tutorial/chapter-6': { 
    title: 'Chapter 6: Connecting Frontend to Backend', 
    description: 'Creating integrated client-server architecture',
    chapter: 6
  },
  '/tutorial/chapter-7': { 
    title: 'Chapter 7: Testing and Debugging', 
    description: 'Ensuring quality and reliability',
    chapter: 7
  },
  '/tutorial/chapter-8': { 
    title: 'Chapter 8: Performance Considerations', 
    description: 'Optimizing for speed and scalability',
    chapter: 8
  },
  '/tutorial/chapter-9': { 
    title: 'Chapter 9: Real Projects & Working with Dev Teams', 
    description: 'Applying your knowledge in the real world',
    chapter: 9
  }
}

const TOTAL_CHAPTERS = 9

interface TutorialBreadcrumbProps {
  showChapterNavigation?: boolean
}

export default function TutorialBreadcrumb({ showChapterNavigation = true }: TutorialBreadcrumbProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = TUTORIAL_STRUCTURE[pathname as keyof typeof TUTORIAL_STRUCTURE]
  
  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }
  
  const getCurrentChapterNumber = () => {
    if (currentPage && 'chapter' in currentPage) {
      return currentPage.chapter
    }
    return null
  }

  // Chapter skip warning system
  const currentChapterNumber = getCurrentChapterNumber()
  const { showWarning, handleNavigation, handleProceed, handleCancel } = useChapterSkipWarning({
    currentChapter: currentChapterNumber || 0
  })

  // Custom link handler that checks for chapter skipping
  const handleChapterNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    handleNavigation(path)
  }

  const getPreviousChapter = () => {
    const currentChapter = getCurrentChapterNumber()
    if (currentChapter === null || currentChapter <= 0) return null
    
    if (currentChapter === 1) {
      return { path: getUrlWithParams('/tutorial/introduction'), title: 'Introduction' }
    }
    
    const prevChapter = currentChapter - 1
    const path = `/tutorial/chapter-${prevChapter}`
    const pageData = TUTORIAL_STRUCTURE[path as keyof typeof TUTORIAL_STRUCTURE]
    return pageData ? { path: getUrlWithParams(path), title: pageData.title } : null
  }

  const getNextChapter = () => {
    const currentChapter = getCurrentChapterNumber()
    if (currentChapter === null || currentChapter >= TOTAL_CHAPTERS) return null
    
    if (currentChapter === 0) {
      return { path: getUrlWithParams('/tutorial/chapter-1'), title: 'Chapter 1: Building the Foundation' }
    }
    
    const nextChapter = currentChapter + 1
    if (nextChapter > TOTAL_CHAPTERS) return null
    
    const path = `/tutorial/chapter-${nextChapter}`
    const pageData = TUTORIAL_STRUCTURE[path as keyof typeof TUTORIAL_STRUCTURE]
    return pageData ? { path: getUrlWithParams(path), title: pageData.title } : null
  }

  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      { path: getUrlWithParams('/'), title: 'Home', icon: Home }
    ]

    if (pathname.startsWith('/tutorial')) {
      if (pathname !== '/tutorial/introduction') {
        breadcrumbs.push({ path: getUrlWithParams('/tutorial/introduction'), title: 'Tutorial', icon: Home })
      }
      
      if (currentPage) {
        breadcrumbs.push({ path: getUrlWithParams(pathname), title: currentPage.title, icon: Home })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()
  const previousChapter = getPreviousChapter()
  const nextChapter = getNextChapter()
  const currentChapter = getCurrentChapterNumber()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium flex items-center">
                    {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
                    {crumb.title}
                  </span>
                ) : (
                  <Link 
                    href={crumb.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    {crumb.icon && <crumb.icon className="w-4 h-4 mr-1" />}
                    {crumb.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Simplified Chapter Navigation */}
        {showChapterNavigation && currentPage && (
          <div className="py-3">
            <div className="flex items-center justify-between">
              {/* Simple Previous Link */}
              <div>
                {previousChapter ? (
                  <Link 
                    href={previousChapter.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-tutorial-primary transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                    Previous
                  </Link>
                ) : <div />}
              </div>

              {/* Simplified Progress - Just a Dot Indicator */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(TOTAL_CHAPTERS + 1, 5) }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= (currentChapter || 0) 
                        ? 'bg-tutorial-primary' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
                {TOTAL_CHAPTERS > 4 && <span className="text-xs text-gray-500">...</span>}
              </div>

              {/* Simple Next Link */}
              <div>
                {nextChapter ? (
                  <a 
                    href={nextChapter.path}
                    onClick={(e) => handleChapterNavigation(e, nextChapter.path)}
                    className="inline-flex items-center px-3 py-2 text-sm bg-tutorial-primary text-white hover:bg-blue-600 transition-colors rounded-lg cursor-pointer"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                ) : <div />}
              </div>
            </div>
          </div>
        )}

        {/* Chapter Description */}
        {currentPage?.description && (
          <div className="pb-4">
            <p className="text-sm text-gray-600 text-center">{currentPage.description}</p>
          </div>
        )}
      </div>

      {/* Chapter Skip Warning Modal */}
      {showWarning && (
        <ChapterSkipWarning
          currentChapter={currentChapterNumber || 0}
          onProceed={handleProceed}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}