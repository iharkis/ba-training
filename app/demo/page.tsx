'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, Clock, Users, BookOpen, Code, CheckCircle, Target, Lightbulb, ArrowRight, Star, Monitor, Database, Server, FileText, Palette, Zap, Shield } from 'lucide-react'

export default function DemoPage() {
  const [currentDemo, setCurrentDemo] = useState('overview')

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Demo Walkthrough
              </h1>
              <p className="text-gray-600 mt-1">2-Minute Platform Overview</p>
            </div>
            <Link 
              href="/tutorial/introduction"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Tutorial
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex space-x-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 shadow-sm mb-6 border border-gray-200">
          {[
            { key: 'overview', label: 'Platform Overview', icon: Target },
            { key: 'learningPath', label: 'Learning Journey', icon: BookOpen },
            { key: 'codeEditor', label: 'Code Editor', icon: Code },
            { key: 'businessContext', label: 'Business Context', icon: Users }
          ].map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.key}
                onClick={() => setCurrentDemo(section.key)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                  currentDemo === section.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {section.label}
              </button>
            )
          })}
        </nav>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {currentDemo === 'overview' && (
            <div className="h-[70vh] flex flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BA Technical Training Platform
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Bridge the gap between business requirements and technical implementation through hands-on coding experience
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">For Business Analysts</h3>
                    <p className="text-gray-600 leading-relaxed">Learn the technical language developers speak to write better requirements and facilitate smoother project delivery</p>
                  </div>
                </div>

                <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-On Learning</h3>
                    <p className="text-gray-600 leading-relaxed">Build a complete government application from scratch using HTML, CSS, JavaScript, and backend concepts</p>
                  </div>
                </div>

                <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Real-World Context</h3>
                    <p className="text-gray-600 leading-relaxed">Work with complete requirements documentation, user stories, and government compliance standards</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 max-w-3xl mx-auto border border-gray-200 shadow-lg">
                <div className="grid grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">10</div>
                    <div className="text-sm text-gray-600 font-medium">Interactive Chapters</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">4</div>
                    <div className="text-sm text-gray-600 font-medium">Core Technologies</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">200+</div>
                    <div className="text-sm text-gray-600 font-medium">Minutes Total</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">1</div>
                    <div className="text-sm text-gray-600 font-medium">Complete App</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDemo === 'learningPath' && (
            <div className="h-[70vh] overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50">
              <div className="w-full max-w-6xl mx-auto p-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Progressive Learning Journey</h2>
                  <p className="text-lg text-gray-600">Master web development fundamentals through practical business scenarios</p>
                  <p className="text-sm text-gray-500 mt-2">4 core chapters shown below • 6 additional chapters for advanced topics</p>
                </div>
                
                <div className="grid grid-cols-4 gap-6 mb-12">
                  {[
                    { 
                      num: 1, 
                      title: "HTML Structure", 
                      icon: FileText, 
                      time: "20m", 
                      color: "from-blue-500 to-blue-600",
                      bgColor: "from-blue-50 to-blue-100",
                      completed: true,
                      description: "Build semantic page structure"
                    },
                    { 
                      num: 2, 
                      title: "CSS Styling", 
                      icon: Palette, 
                      time: "25m", 
                      color: "from-green-500 to-green-600",
                      bgColor: "from-green-50 to-green-100", 
                      completed: true,
                      description: "Professional visual design"
                    },
                    { 
                      num: 3, 
                      title: "JavaScript Logic", 
                      icon: Zap, 
                      time: "30m", 
                      color: "from-purple-500 to-purple-600",
                      bgColor: "from-purple-50 to-purple-100",
                      completed: false,
                      description: "Interactive functionality"
                    },
                    { 
                      num: 4, 
                      title: "Backend Concepts", 
                      icon: Database, 
                      time: "25m", 
                      color: "from-orange-500 to-orange-600",
                      bgColor: "from-orange-50 to-orange-100",
                      completed: false,
                      description: "Data and system architecture"
                    }
                  ].map((chapter) => {
                    const IconComponent = chapter.icon
                    return (
                      <div key={chapter.num} className="relative group">
                        <div className={`bg-gradient-to-br ${chapter.completed ? 'from-green-50 to-green-100 border-green-200' : chapter.bgColor + ' border-gray-200'} 
                                       border-2 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                          <div className="text-center">
                            <div className={`w-16 h-16 bg-gradient-to-br ${chapter.completed ? 'from-green-500 to-green-600' : chapter.color} 
                                           rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                              {chapter.completed ? <CheckCircle className="w-8 h-8 text-white" /> : <IconComponent className="w-8 h-8 text-white" />}
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 ${
                              chapter.completed ? 'bg-green-600' : `bg-gradient-to-br ${chapter.color}`
                            } text-white font-bold text-sm shadow-md`}>
                              {chapter.num}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{chapter.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>
                            <div className="flex items-center justify-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {chapter.time}
                            </div>
                          </div>
                        </div>
                        {chapter.num < 4 && (
                          <ArrowRight className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-white rounded-full p-1 w-6 h-6 shadow-md border border-gray-200" />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="text-center mt-8 space-y-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-xl border border-blue-200 shadow-sm">
                    <Lightbulb className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-800 font-medium">Requirements → Implementation → Understanding</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 max-w-4xl mx-auto">
                    <p className="text-sm text-gray-700 mb-2"><strong>Additional Chapters (Chapters 5-10):</strong></p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>• Advanced JavaScript concepts</div>
                      <div>• Testing and debugging</div>
                      <div>• API integration</div>
                      <div>• Performance optimization</div>
                      <div>• Security best practices</div>
                      <div>• Deployment strategies</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">Currently being refined for enhanced learning experience</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDemo === 'codeEditor' && (
            <div className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-slate-50">
              <div className="w-full max-w-6xl px-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Development Environment</h2>
                  <p className="text-lg text-gray-600">Write real code and see immediate results in our browser-based IDE</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-sm font-medium text-gray-300">Chapter 3: JavaScript Functionality</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400">Live Editor</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-400 font-medium tracking-wide">JAVASCRIPT</span>
                      </div>
                      <div className="font-mono text-sm leading-relaxed">
                        <div className="text-green-400 mb-3">// Add task functionality</div>
                        <div className="text-blue-400">document</div>
                        <div className="text-gray-300">.getElementById('addTaskBtn')</div>
                        <div className="text-gray-300">.addEventListener('click', function() {'{'}</div>
                        <div className="ml-4 text-purple-400">const <span className="text-gray-300">taskText = input.value;</span></div>
                        <div className="ml-4 text-purple-400">if <span className="text-gray-300">(taskText) {'{'}</span></div>
                        <div className="ml-8 text-blue-400">addTaskToList<span className="text-gray-300">(taskText);</span></div>
                        <div className="ml-4 text-gray-300">{'}'}</div>
                        <div className="text-gray-300">{'});'}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-600 font-medium tracking-wide">LIVE PREVIEW</span>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-inner h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            <Server className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-blue-700">Ministry of Silly Walks</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Add New Task</h4>
                            <input 
                              type="text" 
                              className="w-full p-3 border-2 border-gray-300 rounded-lg text-sm"
                              defaultValue="Review silly walk application"
                            />
                            <button className="mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Add Task
                            </button>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Current Tasks</h4>
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                              <div className="font-medium text-sm text-blue-900">Evaluate John's Application</div>
                              <div className="text-xs text-blue-700 mt-1">Assigned: Terry Jones</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-blue-900 mb-2">Real Code</div>
                    <div className="text-sm text-blue-700">Actual working JavaScript</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-green-900 mb-2">Live Preview</div>
                    <div className="text-sm text-green-700">See changes instantly</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-purple-900 mb-2">Guided Learning</div>
                    <div className="text-sm text-purple-700">Every line explained</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDemo === 'businessContext' && (
            <div className="h-[70vh] overflow-auto bg-gradient-to-br from-green-50 via-white to-blue-50">
              <div className="w-full max-w-6xl mx-auto p-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Business Scenario</h2>
                  <p className="text-lg text-gray-600">Work with real requirements documentation and enterprise-grade challenges</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Server className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">Ministry of Silly Walks</h3>
                      </div>
                      <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4" />
                          <span>15,000+ applications processed annually</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Multi-user collaboration workflows</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Government compliance requirements</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-sm">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-900">Complete Documentation</h3>
                      </div>
                      <div className="space-y-3 text-sm text-green-800">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>User stories with acceptance criteria</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>Gherkin testing scenarios</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Code className="w-4 h-4" />
                          <span>Technical constraints and NFRs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white border-2 border-blue-300 p-6 rounded-2xl shadow-sm">
                      <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        User Story Example
                      </h3>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500">
                        <p className="text-blue-800 italic text-sm">
                          "As a Junior Analyst, I want to add new walk evaluation tasks so that I can track incoming applications effectively."
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span>Transforms into working JavaScript implementation</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200 shadow-sm">
                      <h3 className="text-xl font-bold text-yellow-900 mb-4">Key Stakeholders</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm text-yellow-800">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JC</span>
                          </div>
                          <span>John Cleese</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TJ</span>
                          </div>
                          <span>Terry Jones</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 px-8 py-4 rounded-xl border border-purple-200 shadow-sm">
                    <span className="text-purple-800 font-medium text-lg">
                      Complete Business Context + Hands-On Implementation = Expert BAs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}