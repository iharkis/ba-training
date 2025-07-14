'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Users, FileText, Lightbulb, Target } from 'lucide-react'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markSectionComplete, isSectionComplete } from '@/lib/progress'

export default function TutorialIntroduction() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  // Load progress on mount
  useEffect(() => {
    const progress = getProgress()
    const completed = sections
      .map((section, index) => isSectionComplete(section.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSections(completed)
  }, [])

  const sections = [
    {
      id: 'scenario',
      title: 'Setting the Scene',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="ministry-header">
            <h2 className="text-2xl font-bold text-center">Ministry of Silly Walks</h2>
            <p className="text-center text-gov-blue-light mt-2">Department Brief</p>
          </div>
          <div className="ministry-content">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Welcome to your role as Business Analyst for the UK Government's Ministry of Silly Walks. 
                This department, established in 1969, is responsible for the evaluation, standardisation, 
                and approval of silly walk applications across the United Kingdom.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Your Mission</h3>
                <p className="text-blue-800">
                  The Ministry needs a digital task management system to help civil servants track 
                  their workload of silly walk evaluations. You'll learn web development by building 
                  this system from scratch, understanding each component and how it serves the business needs.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Evaluating silly walk applications from citizens</li>
                <li>Managing the National Silly Walk Registry</li>
                <li>Coordinating with other departments on silly walk policies</li>
                <li>Processing complaints about inadequate silly walking</li>
                <li>Ensuring public safety through proper walk certification</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Challenges</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <ul className="space-y-2 text-yellow-800">
                  <li>• Paper-based tracking system causing delays</li>
                  <li>• Difficulty prioritising urgent VIP applications</li>
                  <li>• No visibility into workload distribution</li>
                  <li>• Manual reporting to Parliament quarterly</li>
                  <li>• Staff working from multiple locations post-COVID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'stakeholders',
      title: 'Meet the Team',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Key Stakeholders</h2>
          <p className="text-gray-600 mb-6">
            Understanding who will use the system is crucial for any BA. Here are the key people you'll be working with:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="tutorial-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gov-blue rounded-full flex items-center justify-center text-white font-bold">
                  JC
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">John Cleese</h3>
                  <p className="text-sm text-gray-600 mb-2">Senior Walk Evaluator</p>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><strong>Role:</strong> Evaluates complex and unusual walk applications</p>
                    <p className="mb-2"><strong>Tech Level:</strong> Basic - Uses email and simple systems</p>
                    <p><strong>Needs:</strong> Quick access to high-priority cases, ability to add detailed notes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tutorial-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gov-green rounded-full flex items-center justify-center text-white font-bold">
                  TJ
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Terry Jones</h3>
                  <p className="text-sm text-gray-600 mb-2">Walk Quality Assessor</p>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><strong>Role:</strong> Reviews completed evaluations for quality</p>
                    <p className="mb-2"><strong>Tech Level:</strong> Intermediate - Comfortable with digital tools</p>
                    <p><strong>Needs:</strong> Clear task status tracking, approval workflows</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tutorial-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gov-yellow rounded-full flex items-center justify-center text-gray-800 font-bold">
                  MP
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Michael Palin</h3>
                  <p className="text-sm text-gray-600 mb-2">Junior Walk Analyst</p>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><strong>Role:</strong> Handles routine walk applications</p>
                    <p className="mb-2"><strong>Tech Level:</strong> Advanced - Digital native</p>
                    <p><strong>Needs:</strong> Efficient task management, learning resources</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tutorial-card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gov-red rounded-full flex items-center justify-center text-white font-bold">
                  GC
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Graham Chapman</h3>
                  <p className="text-sm text-gray-600 mb-2">Walk Standards Officer</p>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><strong>Role:</strong> Ensures compliance with walk standards</p>
                    <p className="mb-2"><strong>Tech Level:</strong> Basic - Prefers simple interfaces</p>
                    <p><strong>Needs:</strong> Reporting capabilities, standards documentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: User Personas
            </div>
            <p className="concept-text">
              Notice how each user has different technical comfort levels and needs? As a BA, 
              understanding your users is crucial before building any system. This affects every 
              technical decision we'll make in the tutorial.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'requirements',
      title: 'Gathering Requirements',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">User Stories & Requirements</h2>
          <p className="text-gray-600 mb-6">
            Through interviews and workshops, you've gathered these key requirements. 
            Notice how they'll directly influence our technical implementation:
          </p>

          <div className="space-y-6">
            <div className="tutorial-card border-l-4 border-l-blue-500">
              <h3 className="font-semibold text-gray-900 mb-3">Epic: Task Management</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">
                    <strong>As a</strong> Walk Evaluator, <strong>I want to</strong> see all my assigned tasks in one place 
                    <strong>so that</strong> I can prioritise my daily work effectively.
                  </p>
                  <div className="text-sm text-blue-700">
                    <strong>Acceptance Criteria:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Tasks are displayed in a clear list format</li>
                      <li>I can see task priority, status, and due dates</li>
                      <li>I can filter tasks by status (pending, in-progress, completed)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-900 mb-2">
                    <strong>As a</strong> Junior Analyst, <strong>I want to</strong> add new walk evaluation tasks 
                    <strong>so that</strong> I can track incoming applications.
                  </p>
                  <div className="text-sm text-green-700">
                    <strong>Acceptance Criteria:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>I can create tasks with title, description, and priority</li>
                      <li>I can assign tasks to appropriate team members</li>
                      <li>The system validates required fields</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-medium text-yellow-900 mb-2">
                    <strong>As a</strong> Quality Assessor, <strong>I want to</strong> update task status 
                    <strong>so that</strong> everyone knows the current progress.
                  </p>
                  <div className="text-sm text-yellow-700">
                    <strong>Acceptance Criteria:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>I can change task status between pending, in-progress, completed</li>
                      <li>Status changes are immediately visible to all users</li>
                      <li>I can add notes when updating status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="tutorial-card border-l-4 border-l-green-500">
              <h3 className="font-semibold text-gray-900 mb-3">Non-Functional Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Page loads within 2 seconds</li>
                    <li>• Task updates appear within 1 second</li>
                    <li>• Support 50 concurrent users</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Usability</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Follow GOV.UK design standards</li>
                    <li>• Accessible to screen readers</li>
                    <li>• Work on mobile devices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Security</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Protect against common web attacks</li>
                    <li>• Validate all user inputs</li>
                    <li>• Secure data transmission</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Reliability</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 99.5% uptime during business hours</li>
                    <li>• Graceful error handling</li>
                    <li>• Data backup and recovery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="explanation-box">
            <div className="explanation-title">What's Happening Here?</div>
            <div className="explanation-text">
              <p className="mb-3">
                These requirements will directly drive our technical decisions. For example:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Real-time updates</strong> → We'll need WebSocket connections or polling</li>
                <li><strong>GOV.UK design</strong> → We'll use TailwindCSS with government styling</li>
                <li><strong>Task filtering</strong> → We'll need database queries and frontend filtering</li>
                <li><strong>User assignment</strong> → We'll need a user management system</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'objectives',
      title: 'Learning Objectives',
      icon: <Target className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">What You'll Learn</h2>
          <p className="text-gray-600 mb-6">
            By the end of this tutorial, you'll understand how business requirements become working software 
            and how to better collaborate with development teams.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="tutorial-card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-tutorial-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Technical Understanding
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• How frontend, backend, and database work together</li>
                <li>• What APIs are and how they connect systems</li>
                <li>• How data flows through a web application</li>
                <li>• Why certain technical architecture decisions are made</li>
              </ul>
            </div>

            <div className="tutorial-card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-tutorial-secondary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Development Process
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• How requirements translate to code</li>
                <li>• The iterative nature of development</li>
                <li>• How testing and debugging work</li>
                <li>• Why developers ask certain questions</li>
              </ul>
            </div>

            <div className="tutorial-card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-tutorial-accent text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Communication Skills
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Speaking the same language as developers</li>
                <li>• Understanding technical constraints and trade-offs</li>
                <li>• Writing better technical requirements</li>
                <li>• Asking the right questions during planning</li>
              </ul>
            </div>

            <div className="tutorial-card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-tutorial-warning text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                Practical Application
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Hands-on coding experience</li>
                <li>• Building something real and functional</li>
                <li>• Understanding the 'why' behind code</li>
                <li>• Connecting technical concepts to business value</li>
              </ul>
            </div>
          </div>

          <div className="success-box">
            <div className="success-title">By the End of This Tutorial</div>
            <div className="success-text">
              <p className="mb-3">You'll be able to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Understand when developers mention 'API endpoints' or 'database queries'</li>
                <li>Write more technical user stories that developers can implement efficiently</li>
                <li>Ask informed questions about technical feasibility and complexity</li>
                <li>Bridge the communication gap between business stakeholders and engineering teams</li>
                <li>Evaluate technical proposals and understand their business implications</li>
              </ul>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              Why This Matters
            </div>
            <p className="concept-text">
              Many project delays and budget overruns happen because of miscommunication between 
              business and technical teams. By understanding how software is built, you become 
              a more effective bridge between these worlds.
            </p>
          </div>
        </div>
      )
    }
  ]

  const markSectionCompleteLocal = (index: number) => {
    if (!completedSections.includes(index)) {
      const newCompleted = [...completedSections, index]
      setCompletedSections(newCompleted)
      markSectionComplete(sections[index].id)
    }
  }

  const allSectionsComplete = completedSections.length === sections.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <TutorialBreadcrumb />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Tutorial Introduction</h1>
              <p className="text-sm text-gray-600">Setting the foundation for your learning journey</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="tutorial-card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-3">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index
                        ? 'bg-tutorial-primary text-white'
                        : completedSections.includes(index)
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedSections.includes(index) ? (
                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 mr-3">
                          {React.cloneElement(section.icon, {
                            className: currentSection === index ? 'w-5 h-5' : 'w-5 h-5 text-gray-400'
                          })}
                        </div>
                      )}
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {allSectionsComplete && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-2">Ready for Chapter 1!</p>
                  <Link 
                    href={getUrlWithParams("/tutorial/chapter-1")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="tutorial-card">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{sections[currentSection].title}</h2>
                  {completedSections.includes(currentSection) && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                {sections[currentSection].content}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className={`flex items-center ${
                    currentSection === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-tutorial-primary hover:text-blue-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                <button
                  onClick={() => {
                    markSectionCompleteLocal(currentSection)
                    if (currentSection < sections.length - 1) {
                      setCurrentSection(currentSection + 1)
                    } else {
                      // If this is the last section and it's being completed, navigate to Chapter 1
                      router.push(getUrlWithParams('/tutorial/chapter-1'))
                    }
                  }}
                  className="tutorial-button-primary"
                >
                  {completedSections.includes(currentSection) 
                    ? currentSection === sections.length - 1 
                      ? 'Complete Introduction' 
                      : 'Next Section'
                    : 'Mark Complete & Continue'
                  }
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}