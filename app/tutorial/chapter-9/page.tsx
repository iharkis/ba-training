'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Zap, Lightbulb, Timer, TrendingUp, Users } from 'lucide-react'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter9() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

  const steps = [
    {
      id: 'performance-introduction',
      title: 'Understanding Performance',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 9: Performance Considerations</h2>
          <p className="text-lg text-gray-600">
            Your task management system works perfectly for John Cleese and Terry Jones. But what happens when the entire Ministry starts using it? What about when Parliament wants real-time reports? This chapter covers performance optimization and scalability.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is Application Performance?</div>
            <div className="explanation-text">
              <p className="mb-3">
                Performance refers to how fast and efficiently your application responds to user actions and handles increasing workloads. Poor performance directly impacts user satisfaction and business productivity.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Response Time:</strong> How quickly the system responds to user actions</li>
                <li><strong>Throughput:</strong> How many requests the system can handle simultaneously</li>
                <li><strong>Scalability:</strong> How well the system performs as usage grows</li>
                <li><strong>Resource Efficiency:</strong> Optimal use of memory, CPU, and network</li>
              </ul>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Ministry Performance Requirements</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Government systems must handle varying loads efficiently while maintaining reliability:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Current Usage Patterns</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• 50 Ministry staff during business hours</li>
                  <li>• Peak loads during silly walk application periods</li>
                  <li>• Monthly reporting requiring data aggregation</li>
                  <li>• Parliamentary questions needing instant responses</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Performance Goals</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Page loads under 2 seconds</li>
                  <li>• Support 100+ concurrent users</li>
                  <li>• 99.9% uptime during business hours</li>
                  <li>• Reports generated within 30 seconds</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Performance Requirements
            </div>
            <p className="concept-text">
              When you write requirements like "the system should be fast" or "handle lots of users," you need to be specific. Understanding performance concepts helps you write measurable requirements like "pages should load within 3 seconds" or "support 50 concurrent users with sub-second response times."
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll learn about performance bottlenecks, optimization strategies, and how to write performance requirements. You'll understand the trade-offs between performance, cost, and complexity in system design.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'performance-bottlenecks',
      title: 'Step 1: Identifying Performance Bottlenecks',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Common Performance Issues</h3>
          
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-3 text-lg flex items-center">
                <Timer className="w-5 h-5 mr-2" />
                Frontend Performance Issues
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Common Problems:</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Large JavaScript files slow page loading</li>
                    <li>• Images not optimized for web</li>
                    <li>• Too many HTTP requests</li>
                    <li>• Inefficient DOM manipulation</li>
                    <li>• No caching of static resources</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Ministry Impact:</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Staff waste time waiting for pages to load</li>
                    <li>• Mobile users on slower connections struggle</li>
                    <li>• Reduced productivity during peak times</li>
                    <li>• Poor user experience leads to resistance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-3 text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Backend Performance Issues
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-orange-800 mb-2">Common Problems:</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Inefficient database queries</li>
                    <li>• Missing database indexes</li>
                    <li>• No API response caching</li>
                    <li>• Blocking operations on main thread</li>
                    <li>• Memory leaks in long-running processes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-800 mb-2">Ministry Impact:</h5>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• API calls take too long to respond</li>
                    <li>• System becomes unresponsive under load</li>
                    <li>• Database locks prevent concurrent access</li>
                    <li>• Server crashes during high usage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Scalability Challenges
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Growth Scenarios:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Ministry expands to include other departments</li>
                    <li>• Integration with external systems</li>
                    <li>• Real-time collaboration features</li>
                    <li>• Advanced reporting and analytics</li>
                    <li>• Mobile app development</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Technical Challenges:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Single server becomes bottleneck</li>
                    <li>• Database cannot handle increased load</li>
                    <li>• File-based storage limitations</li>
                    <li>• Network bandwidth constraints</li>
                    <li>• Development team coordination complexity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Zap className="w-5 h-5 mr-2" />
              Performance Monitoring
            </div>
            <div className="concept-text">
              <p className="mb-3">Understanding performance requires measurement:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Frontend:</strong> Browser DevTools, Lighthouse scores, Real User Monitoring</li>
                <li>• <strong>Backend:</strong> Application logs, database query times, server resource usage</li>
                <li>• <strong>User Experience:</strong> Page load times, interaction responsiveness, error rates</li>
              </ul>
              <p className="mt-3 text-sm">What gets measured can be improved - establish baselines and track improvements.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'optimization-strategies',
      title: 'Step 2: Optimization Strategies',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Performance Improvement Techniques</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">🚀 Frontend Optimizations</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Code Optimization:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Bundle JavaScript files to reduce HTTP requests</li>
                    <li>• Minify and compress CSS and JavaScript</li>
                    <li>• Remove unused code and dependencies</li>
                    <li>• Use code splitting for large applications</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Resource Optimization:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Optimize images (WebP format, proper sizing)</li>
                    <li>• Enable browser caching for static assets</li>
                    <li>• Use Content Delivery Networks (CDNs)</li>
                    <li>• Implement lazy loading for images and content</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">⚡ Backend Optimizations</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Database Performance:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Add indexes to frequently queried columns</li>
                    <li>• Optimize complex queries and joins</li>
                    <li>• Implement database connection pooling</li>
                    <li>• Consider read replicas for reporting</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">API Performance:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Cache frequently requested data</li>
                    <li>• Implement pagination for large datasets</li>
                    <li>• Use asynchronous processing for slow operations</li>
                    <li>• Optimize JSON serialization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg">📈 Scalability Solutions</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Horizontal Scaling:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Load balancing across multiple servers</li>
                    <li>• Microservices architecture</li>
                    <li>• Auto-scaling based on demand</li>
                    <li>• Distributed caching systems</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Vertical Scaling:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Upgrade server hardware (CPU, RAM)</li>
                    <li>• Optimize application resource usage</li>
                    <li>• Database performance tuning</li>
                    <li>• Memory management improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-3 text-lg">⚖️ Performance vs. Cost Trade-offs</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">High-Impact, Low-Cost:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Enable compression and caching</li>
                  <li>• Optimize database queries</li>
                  <li>• Minify and compress assets</li>
                  <li>• Remove unused code</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">High-Impact, High-Cost:</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Redesign for microservices</li>
                  <li>• Implement distributed systems</li>
                  <li>• Major database restructuring</li>
                  <li>• Complete frontend rewrite</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'performance-requirements',
      title: 'Step 3: Writing Performance Requirements',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Defining Measurable Performance Criteria</h3>
          
          <div className="ministry-content">
            <p className="mb-6">
              Good performance requirements are specific, measurable, and tied to business objectives:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 text-lg">✅ Well-Written Performance Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4 border-green-500">
                    <h5 className="font-medium text-green-800 mb-2">Response Time:</h5>
                    <p className="text-sm text-green-700">
                      "The task list page shall load within 2 seconds for 95% of requests when accessed by up to 50 concurrent users over a standard broadband connection."
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500">
                    <h5 className="font-medium text-green-800 mb-2">Throughput:</h5>
                    <p className="text-sm text-green-700">
                      "The system shall support 100 concurrent users performing typical Ministry tasks (viewing, creating, updating tasks) with average response times under 1 second."
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-green-500">
                    <h5 className="font-medium text-green-800 mb-2">Availability:</h5>
                    <p className="text-sm text-green-700">
                      "The system shall maintain 99.5% uptime during business hours (9 AM - 5 PM, Monday-Friday), with planned maintenance only during agreed maintenance windows."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-3 text-lg">❌ Poorly Written Performance Requirements</h4>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border-l-4 border-red-500">
                    <p className="text-sm text-red-700 mb-1">"The system should be fast."</p>
                    <p className="text-xs text-red-600">Problem: No measurable criteria or context</p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-red-500">
                    <p className="text-sm text-red-700 mb-1">"The system should handle lots of users."</p>
                    <p className="text-xs text-red-600">Problem: "Lots" is not quantified</p>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-red-500">
                    <p className="text-sm text-red-700 mb-1">"The system should never go down."</p>
                    <p className="text-xs text-red-600">Problem: Unrealistic expectation</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3 text-lg">📊 Performance Testing Strategy</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Load Testing:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Test normal expected usage patterns</li>
                      <li>• Verify system meets performance targets</li>
                      <li>• Identify optimal concurrent user limits</li>
                      <li>• Validate response time requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Stress Testing:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Test beyond normal capacity limits</li>
                      <li>• Identify breaking points</li>
                      <li>• Verify graceful degradation</li>
                      <li>• Test recovery after overload</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">🎯 Chapter Summary</h4>
            <p className="mb-3">
              Performance is a critical non-functional requirement that directly impacts user satisfaction and business success. As a BA, you help ensure performance by:
            </p>
            <ul className="text-sm space-y-1">
              <li>• Writing specific, measurable performance requirements</li>
              <li>• Understanding the business impact of performance issues</li>
              <li>• Collaborating with technical teams on optimization priorities</li>
              <li>• Defining realistic performance targets based on user needs</li>
              <li>• Ensuring performance testing is included in the project plan</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const markStepCompleteLocal = (index: number) => {
    if (!completedSteps.includes(index)) {
      const newCompleted = [...completedSteps, index]
      setCompletedSteps(newCompleted)
      markStepComplete(steps[index].id)
    }
  }

  const allStepsComplete = completedSteps.length === steps.length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tutorial/chapter-8" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 8
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 9: Performance Considerations</h1>
              <p className="text-sm text-gray-600">Optimizing for speed and scalability</p>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="tutorial-card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 9 Progress</h3>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === index
                        ? 'bg-tutorial-primary text-white'
                        : completedSteps.includes(index)
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      ) : (
                        <div className={`w-5 h-5 mr-3 rounded-full border-2 ${
                          currentStep === index ? 'border-white' : 'border-gray-300'
                        }`} />
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {allStepsComplete && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 9 Complete!</p>
                  <Link 
                    href="/tutorial/chapter-10" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 10
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Chapter Progress</span>
                  <span className="text-sm text-gray-500">
                    {completedSteps.length} / {steps.length} completed
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="tutorial-card">
                {steps[currentStep].content}
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`flex items-center ${
                      currentStep === 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-tutorial-primary hover:text-blue-700'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>

                  <button
                    onClick={() => {
                      markStepCompleteLocal(currentStep)
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(currentStep + 1)
                      }
                    }}
                    className="tutorial-button-primary"
                  >
                    {completedSteps.includes(currentStep) 
                      ? currentStep === steps.length - 1 
                        ? 'Complete Chapter' 
                        : 'Next Step'
                      : 'Continue Learning'
                    }
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}