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
    title: 'Chapter 5: Building the Backend', 
    description: 'Creating server endpoints for multi-user functionality',
    chapter: 5
  },
  '/tutorial/chapter-6': { 
    title: 'Chapter 6: Database Integration', 
    description: 'Adding persistent storage with SQLite',
    chapter: 6
  },
  '/tutorial/chapter-7': { 
    title: 'Chapter 7: Connecting Frontend to Backend', 
    description: 'Creating integrated client-server architecture',
    chapter: 7
  },
  '/tutorial/chapter-8': { 
    title: 'Chapter 8: Testing and Debugging', 
    description: 'Ensuring quality and reliability',
    chapter: 8
  },
  '/tutorial/chapter-9': { 
    title: 'Chapter 9: Performance Considerations', 
    description: 'Optimizing for speed and scalability',
    chapter: 9
  },
  '/tutorial/chapter-10': { 
    title: 'Chapter 10: Real Projects & Working with Dev Teams', 
    description: 'Applying your knowledge in the real world',
    chapter: 10
  }
}

const TOTAL_CHAPTERS = 10

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

        {/* Chapter Progress and Navigation */}
        {showChapterNavigation && currentPage && (
          <div className="py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* Previous Chapter - Enhanced Button */}
              <div className="flex-1">
                {previousChapter ? (
                  <Link 
                    href={previousChapter.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-colors border border-gray-300 text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                    <div>
                      <div className="text-xs text-gray-500">Previous</div>
                      <div className="font-medium">{previousChapter.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Current Chapter Info & Progress */}
              <div className="flex-1 text-center px-4">
                <div className="text-sm text-gray-500 mb-2">
                  {currentChapter !== null && currentChapter > 0 && (
                    <>Chapter {currentChapter} of {TOTAL_CHAPTERS}</>
                  )}
                  {currentChapter === 0 && <>Tutorial Introduction</>}
                </div>
                
                {/* Overall Progress Bar */}
                {currentChapter !== null && currentChapter >= 0 && (
                  <div className="w-full max-w-xs mx-auto">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(((currentChapter) / TOTAL_CHAPTERS) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-tutorial-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${((currentChapter) / TOTAL_CHAPTERS) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Chapter - Enhanced Button */}
              <div className="flex-1 text-right">
                {nextChapter ? (
                  <a 
                    href={nextChapter.path}
                    onClick={(e) => handleChapterNavigation(e, nextChapter.path)}
                    className="inline-flex items-center px-4 py-2 bg-tutorial-primary hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  >
                    <div className="text-right">
                      <div className="text-xs text-blue-100">Next</div>
                      <div className="font-medium">{nextChapter.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <div></div>
                )}
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