'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Code, Users, Clock } from 'lucide-react'
import { getCompletedStepsCount } from '@/lib/progress'

export default function HomePage() {
  const [completedSteps, setCompletedSteps] = useState(0)

  useEffect(() => {
    setCompletedSteps(getCompletedStepsCount())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gov-blue rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BA Development Tutorial</h1>
                <p className="text-sm text-gray-600">Learn by Building</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Interactive Learning Platform
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Web Development Tutorial for Business Analysts
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Learn web development fundamentals by building a task management system. 
              Understand how frontend, backend, and databases work together.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/tutorial/introduction" className="tutorial-button-primary px-6 py-3">
              {completedSteps > 0 ? 'Continue Tutorial' : 'Start Tutorial'}
            </Link>
          </div>
          
          {completedSteps > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Progress: {completedSteps} step{completedSteps !== 1 ? 's' : ''} completed
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ministry of Silly Walks Context */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Tutorial Scenario</h2>
            <p className="text-gray-600">Ministry of Silly Walks Task Management System</p>
          </div>
          <div className="ministry-content">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Build</h3>
                <p className="text-gray-700 mb-4">
                  A task management system for a fictional government department. 
                  The scenario provides context for learning web development concepts.
                </p>
                <p className="text-gray-700 mb-4">
                  You'll build this system step-by-step, learning how each technical component works 
                  and how it relates to business requirements.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• How user requirements become working software</li>
                    <li>• What developers mean when they talk about APIs and databases</li>
                    <li>• Why certain technical decisions are made</li>
                    <li>• How to bridge communication between business and technical teams</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Department Staff</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gov-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                      JC
                    </div>
                    <div>
                      <p className="font-medium text-sm">John Cleese</p>
                      <p className="text-xs text-gray-600">Senior Walk Evaluator</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gov-green rounded-full flex items-center justify-center text-white text-xs font-bold">
                      TJ
                    </div>
                    <div>
                      <p className="font-medium text-sm">Terry Jones</p>
                      <p className="text-xs text-gray-600">Walk Quality Assessor</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gov-yellow rounded-full flex items-center justify-center text-gray-800 text-xs font-bold">
                      MP
                    </div>
                    <div>
                      <p className="font-medium text-sm">Michael Palin</p>
                      <p className="text-xs text-gray-600">Junior Walk Analyst</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gov-red rounded-full flex items-center justify-center text-white text-xs font-bold">
                      GC
                    </div>
                    <div>
                      <p className="font-medium text-sm">Graham Chapman</p>
                      <p className="text-xs text-gray-600">Walk Standards Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Overview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Tutorial Structure</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Foundation */}
              <div className="tutorial-card">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-tutorial-primary rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Foundation</h3>
                    <p className="text-sm text-gray-600">Chapters 1-3</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Understanding the scenario</li>
                  <li>• Project structure basics</li>
                  <li>• Creating the user interface</li>
                  <li>• GOV.UK design principles</li>
                </ul>
                <div className="mt-4 flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  ~45 minutes
                </div>
              </div>

              {/* Development */}
              <div className="tutorial-card">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-tutorial-secondary rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Development</h3>
                    <p className="text-sm text-gray-600">Chapters 4-7</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Adding interactivity</li>
                  <li>• Building the backend API</li>
                  <li>• Database integration</li>
                  <li>• Connecting frontend to backend</li>
                </ul>
                <div className="mt-4 flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  ~90 minutes
                </div>
              </div>

              {/* Application */}
              <div className="tutorial-card">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-tutorial-accent rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Application</h3>
                    <p className="text-sm text-gray-600">Chapters 8-10</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Testing and debugging</li>
                  <li>• Performance considerations</li>
                  <li>• Applying to real projects</li>
                  <li>• Working with dev teams</li>
                </ul>
                <div className="mt-4 flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  ~30 minutes
                </div>
              </div>
            </div>
          </div>
        </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Web Development Tutorial for Business Analysts • Built with TypeScript, React, and TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  )
}