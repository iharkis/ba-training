'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, Lightbulb, Users, Briefcase, Target, Award, BookOpen } from 'lucide-react'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter9() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

  const steps = [
    {
      id: 'real-world-application',
      title: 'Applying Your Knowledge',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 9: Real Projects & Working with Dev Teams</h2>
          <p className="text-lg text-gray-600">
            Congratulations! You've built a complete web application from HTML basics to enterprise architecture. Now let's explore how to apply this knowledge in real projects and collaborate effectively with development teams.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">From Tutorial to Real Projects</div>
            <div className="explanation-text">
              <p className="mb-3">
                The Ministry of Silly Walks scenario taught you fundamental concepts, but real projects have additional complexities: stakeholder management, regulatory requirements, legacy system integration, and evolving business needs.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Business Complexity:</strong> Multiple stakeholders with competing priorities</li>
                <li><strong>Technical Constraints:</strong> Legacy systems, security requirements, compliance</li>
                <li><strong>Team Dynamics:</strong> Collaboration across business and technical teams</li>
                <li><strong>Change Management:</strong> Evolving requirements and scope adjustments</li>
              </ul>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">What You've Learned</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Through building the task management system, you now understand:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Technical Concepts</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• How HTML, CSS, and JavaScript work together</li>
                  <li>• Frontend-backend communication via APIs</li>
                  <li>• Database design and data persistence</li>
                  <li>• Testing, debugging, and performance optimization</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">BA Skills Enhanced</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Writing more precise technical requirements</li>
                  <li>• Understanding implementation trade-offs</li>
                  <li>• Collaborating effectively with developers</li>
                  <li>• Defining testable acceptance criteria</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Award className="w-5 h-5 mr-2" />
              Your Achievement
            </div>
            <p className="concept-text">
              You've gained practical understanding of web development that will make you a more effective Business Analyst. You can now have informed technical discussions, write better requirements, and bridge the gap between business needs and technical solutions more effectively.
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Chapter Objective</h3>
            <p>
              In this final chapter, you'll learn how to apply your new knowledge in real projects, improve collaboration with development teams, and continue your learning journey as a technically-informed Business Analyst.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'working-with-dev-teams',
      title: 'Step 1: Collaborating with Developers',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Building Effective Partnerships</h3>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Communication Best Practices
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Speaking the Same Language:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Use technical terms correctly (API, database, frontend, backend)</li>
                    <li>• Reference specific examples from your learning ("like our task API endpoints")</li>
                    <li>• Ask clarifying questions about implementation approaches</li>
                    <li>• Understand the "why" behind technical decisions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Effective Requirements Writing:</h5>
                  <div className="bg-white p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm text-green-700 mb-2"><strong>Before:</strong> "The system should be user-friendly and fast."</p>
                    <p className="text-sm text-green-700"><strong>After:</strong> "The task list should load within 2 seconds and display clear error messages when network requests fail, similar to how our prototype handles API timeouts."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Technical Discussions You Can Now Participate In
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Architecture Decisions:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• "Should we use localStorage or a database for this data?"</li>
                    <li>• "What API endpoints do we need for this feature?"</li>
                    <li>• "How will frontend validation relate to backend validation?"</li>
                    <li>• "What happens if the API call fails?"</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Quality Discussions:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• "What unit tests should cover this business logic?"</li>
                    <li>• "How do we test the integration between systems?"</li>
                    <li>• "What performance requirements apply here?"</li>
                    <li>• "How will users know when something goes wrong?"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg">Collaborative Practices</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">During Planning:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Participate in technical design discussions</li>
                    <li>• Ask about implementation complexity and alternatives</li>
                    <li>• Understand dependencies between features</li>
                    <li>• Help prioritize based on business value and technical effort</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">During Development:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Review work-in-progress and provide early feedback</li>
                    <li>• Help clarify requirements when questions arise</li>
                    <li>• Participate in debugging user-reported issues</li>
                    <li>• Validate that implementation meets business intent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Applying Technical Knowledge in Practice
            </div>
            <div className="concept-text space-y-4">
              <p>
                Your technical understanding transforms you from a requirements documenter into a strategic partner who can guide better business decisions, improve project outcomes, and facilitate more effective collaboration between business and technical teams.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">How Technical Knowledge Changes Your BA Practice:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div><strong>Before:</strong> "Users want faster page loads"</div>
                    <div><strong>After:</strong> "Users expect &lt;2 second load times; this requires caching, CDN, or database optimization. What's the business impact vs cost tradeoff?"</div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3">
                    <div><strong>Before:</strong> "The system should integrate with other systems"</div>
                    <div><strong>After:</strong> "Integration requires API design, error handling, data mapping, and ongoing maintenance. Let's define specific integration scenarios and success criteria."</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Strategic Conversations You Can Now Facilitate:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Architecture Decisions:</strong> "Given our scalability requirements, should we prioritize database optimization or frontend caching?"</div>
                  <div><strong>Risk Assessment:</strong> "This API integration introduces network dependency risks. What's our contingency plan?"</div>
                  <div><strong>Technical Debt:</strong> "The current system design limits future features. When should we refactor vs work around?"</div>
                  <div><strong>Resource Planning:</strong> "Database changes require migration planning. How does this impact our timeline?"</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Improving Developer Collaboration:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Intelligent Questions:</strong> Ask about performance implications, error scenarios, and technical constraints</div>
                  <div><strong>Better Bug Reports:</strong> Include steps to reproduce, expected vs actual behavior, browser/environment details</div>
                  <div><strong>Realistic Expectations:</strong> Understand why "simple" changes might be complex technically</div>
                  <div><strong>Solution-Oriented:</strong> Suggest alternative approaches when original requirements are technically challenging</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Your Continued Learning Path:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Stay Current:</strong> Follow web development trends that impact business applications</div>
                  <div><strong>Practice Skills:</strong> Build small projects to deepen your technical understanding</div>
                  <div><strong>Bridge Communities:</strong> Attend both business and technical conferences/meetups</div>
                  <div><strong>Mentor Others:</strong> Share your knowledge with other BAs and business stakeholders</div>
                  <div><strong>Specialization:</strong> Consider focusing on areas like API design, data analysis, or user experience</div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Remember: Your Core Value Remains Business Focus:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Technical knowledge enhances your BA skills, it doesn't replace them</li>
                  <li>• Always connect technical decisions back to business value</li>
                  <li>• Your unique value is translating between business and technical perspectives</li>
                  <li>• Use technical understanding to ask better questions, not to make technical decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'applying-knowledge',
      title: 'Step 2: Applying Your Knowledge to Real Projects',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">From Ministry to Your Organization</h3>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-3 text-lg flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Identifying Technical Patterns in Your Projects
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-yellow-800 mb-2">Common Project Types:</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-yellow-700 mb-1">Data Management Systems:</h6>
                      <ul className="text-xs text-yellow-600 space-y-1">
                        <li>• Customer databases → Similar to task storage</li>
                        <li>• Reporting dashboards → Like Ministry analytics</li>
                        <li>• File management → Enhanced version of our system</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-yellow-700 mb-1">User-Facing Applications:</h6>
                      <ul className="text-xs text-yellow-600 space-y-1">
                        <li>• Customer portals → Like our task interface</li>
                        <li>• Internal tools → Similar to Ministry system</li>
                        <li>• Mobile apps → Frontend connecting to same APIs</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-800 mb-2">Questions You Can Now Ask:</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• "Will this data need to be shared across different systems?"</li>
                    <li>• "How many users will access this simultaneously?"</li>
                    <li>• "What happens if the connection to the backend fails?"</li>
                    <li>• "How will we handle data validation and error messages?"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">Enhanced Requirements Templates</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">User Story with Technical Context:</h5>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>As a</strong> sales manager<br/>
                      <strong>I want to</strong> export customer data to Excel<br/>
                      <strong>So that</strong> I can analyze trends offline
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      <strong>Technical Notes:</strong> Export should be generated server-side to handle large datasets, with progress indicator for long-running operations. Consider pagination for datasets over 10,000 records.
                    </p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Acceptance Criteria with Technical Details:</h5>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Given</strong> a user uploads a file larger than 5MB<br/>
                      <strong>When</strong> they submit the upload form<br/>
                      <strong>Then</strong> they should see a progress bar and be able to continue using other features<br/>
                      <strong>And</strong> receive a notification when upload completes or fails
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">Technical Review Checklist</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Before Development Starts:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>☐ Are API endpoints clearly defined?</li>
                    <li>☐ Is data flow between frontend and backend understood?</li>
                    <li>☐ Are performance requirements specified?</li>
                    <li>☐ Are error scenarios and handling defined?</li>
                    <li>☐ Is testing approach agreed upon?</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">During Development:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>☐ Does the implementation match business requirements?</li>
                    <li>☐ Are error messages user-friendly and actionable?</li>
                    <li>☐ Does the user interface handle loading states appropriately?</li>
                    <li>☐ Are performance requirements being met?</li>
                    <li>☐ Is the solution testable and maintainable?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'continuing-learning',
      title: 'Step 3: Your Continuing Learning Journey',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Building on Your Foundation</h3>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3 text-lg flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Next Steps for Technical Learning
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Immediate Applications:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Review existing project requirements with your new perspective</li>
                    <li>• Attend technical design meetings as an active participant</li>
                    <li>• Practice writing more specific acceptance criteria</li>
                    <li>• Ask developers to walk through implementations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">Continued Learning:</h5>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Learn about your organization's specific tech stack</li>
                    <li>• Understand integration patterns used in your systems</li>
                    <li>• Explore DevOps and deployment processes</li>
                    <li>• Study security and compliance requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 text-lg">Advanced Topics to Explore</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">System Architecture:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Microservices vs. monolithic applications</li>
                    <li>• Cloud computing and serverless architectures</li>
                    <li>• Event-driven systems and messaging</li>
                    <li>• Data architecture and warehousing</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Modern Development Practices:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Agile development and DevOps practices</li>
                    <li>• Continuous integration and deployment</li>
                    <li>• Infrastructure as code</li>
                    <li>• Monitoring and observability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3 text-lg">Career Impact</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Enhanced BA Capabilities:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• More accurate effort estimation discussions</li>
                    <li>• Better understanding of technical constraints</li>
                    <li>• Improved stakeholder communication about technical trade-offs</li>
                    <li>• Stronger partnership with development teams</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Career Opportunities:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Technical Product Manager roles</li>
                    <li>• Solution Architect positions</li>
                    <li>• Digital transformation projects</li>
                    <li>• Integration and API strategy work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">Congratulations!</h4>
            <p className="mb-4">
              You've completed the Web Development Tutorial for Business Analysts. You now have practical understanding of:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-1">
                <li>✓ HTML structure and semantics</li>
                <li>✓ CSS styling and responsive design</li>
                <li>✓ JavaScript interactivity and logic</li>
                <li>✓ API design and implementation</li>
                <li>✓ Database integration and data management</li>
              </ul>
              <ul className="space-y-1">
                <li>✓ Frontend-backend communication</li>
                <li>✓ Testing and quality assurance</li>
                <li>✓ Performance optimization</li>
                <li>✓ Technical requirements writing</li>
                <li>✓ Developer collaboration</li>
              </ul>
            </div>
            <p className="mt-4 text-sm opacity-90">
              Use this knowledge to bridge business and technical teams more effectively, write better requirements, and contribute to successful project delivery.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3 text-lg">Your Complete System Architecture</h4>
            <p className="text-sm text-green-800 mb-4">
              You've built a full-stack web application that demonstrates enterprise-grade architecture:
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <h5 className="font-medium text-green-800 mb-2">Frontend Layer (Chapters 1-3):</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• HTML structure defining semantic content</li>
                  <li>• CSS styling creating professional user interface</li>
                  <li>• JavaScript adding interactivity and business logic</li>
                  <li>• Responsive design working across all devices</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-800 mb-2">API Layer (Chapters 4-5):</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• RESTful API endpoints for all CRUD operations</li>
                  <li>• Proper HTTP methods and status codes</li>
                  <li>• Input validation and error handling</li>
                  <li>• JSON data exchange between frontend and backend</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h5 className="font-medium text-purple-800 mb-2">Database Layer (Chapter 6):</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• SQLite database with proper schema design</li>
                  <li>• ACID compliance for data integrity</li>
                  <li>• Automatic audit trails with timestamps</li>
                  <li>• Safe concurrent access for multiple users</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <h5 className="font-medium text-orange-800 mb-2">Integration & Quality (Chapters 7-9):</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Frontend-backend integration with real API calls</li>
                  <li>• Comprehensive testing and debugging strategies</li>
                  <li>• Performance optimization and monitoring</li>
                  <li>• User experience enhancements and error handling</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 text-lg">Your New BA Superpowers</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Technical Discussions:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• "Should we use localStorage or a database?"</li>
                  <li>• "How will the frontend validate user input?"</li>
                  <li>• "What happens when the API call fails?"</li>
                  <li>• "How do we prevent duplicate submissions?"</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Requirements Writing:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Specific, testable acceptance criteria</li>
                  <li>• Performance requirements with measurable targets</li>
                  <li>• Error handling and edge case specifications</li>
                  <li>• Integration requirements across system layers</li>
                </ul>
              </div>
            </div>
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
            <Link href={getUrlWithParams("/tutorial/chapter-8")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 8
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 9: Real Projects & Working with Dev Teams</h1>
              <p className="text-sm text-gray-600">Applying your knowledge in the real world</p>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Tutorial Complete!</p>
                  <p className="text-xs text-green-700 mb-3">
                    You've built a complete task management system! See your creation in action.
                  </p>
                  <Link 
                    href="/demo-app" 
                    className="inline-flex items-center text-sm bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 mb-2 w-full justify-center"
                  >
                    View Your Demo
                    <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                  </Link>
                  <Link 
                    href="/" 
                    className="inline-flex items-center text-xs text-green-700 hover:text-green-900 justify-center"
                  >
                    Back to Home
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
                      } else {
                        // Navigate to demo when tutorial is complete
                        window.location.href = '/demo-app'
                      }
                    }}
                    className="tutorial-button-primary"
                  >
                    {completedSteps.includes(currentStep) 
                      ? currentStep === steps.length - 1 
                        ? 'View Demo' 
                        : 'Next Step'
                      : 'Continue Learning'
                    }
                    {currentStep < steps.length - 1 && (
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    )}
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