'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Lightbulb, Target, Code } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import BeginnerGuide from '@/components/tutorial/BeginnerGuide'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter1() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showBeginnerGuide, setShowBeginnerGuide] = useState(true)

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  // Load progress on mount
  useEffect(() => {
    const progress = getProgress()
    const completed = steps
      .map((step, index) => isStepComplete(step.id) ? index : -1)
      .filter(index => index !== -1)
    setCompletedSteps(completed)
  }, [])

  const steps = [
    {
      id: 'project-structure',
      title: 'Understanding Project Structure',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 1: Building the Foundation</h2>
          <p className="text-lg text-gray-600">
            Welcome to your first hands-on development experience! We're going to build the Ministry of Silly Walks 
            task manager step by step, starting with the basic structure.
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What We're Building First</div>
            <div className="explanation-text">
              <p className="mb-3">
                Every web application has three main components that work together:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Frontend (Client-side):</strong> What users see and interact with in their browser</li>
                <li><strong>Backend (Server-side):</strong> The logic and processing that happens behind the scenes</li>
                <li><strong>Database:</strong> Where we store and retrieve information</li>
              </ul>
              <p className="mt-3">
                Think of it like a restaurant: the dining room is the frontend, the kitchen is the backend, 
                and the pantry/storage is the database.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Ministry of Silly Walks - Technical Requirements</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              Based on our requirements gathering, we need to build:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Frontend</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Task creation form</li>
                  <li>• Task list display</li>
                  <li>• Status updates</li>
                  <li>• GOV.UK styling</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Backend</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• API endpoints</li>
                  <li>• Business logic</li>
                  <li>• Data validation</li>
                  <li>• Security</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Database</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Task storage</li>
                  <li>• User information</li>
                  <li>• Status tracking</li>
                  <li>• Data relationships</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Requirements to Architecture
            </div>
            <p className="concept-text">
              Notice how our user stories directly influence this technical structure? When John Cleese said 
              "I want to see all my tasks in one place," that becomes our task list display. When Terry Jones 
              needed to "update task status," that becomes our status update functionality. This is how 
              requirements become code!
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll build the basic HTML structure for our task manager. You'll understand 
              how web pages are constructed and how HTML elements correspond to the features users need.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'understanding-html-template',
      title: 'Step 1: Understanding the HTML Template',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Breaking Down the HTML Structure</h3>
          
          <p className="text-gray-700">
            Before we start adding content, let's understand what's already in our HTML file. Every web page needs this basic structure - it's like the foundation of a house.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              The HTML Template Explained:
            </h4>
            <div className="bg-gray-800 text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div className="space-y-1">
                <div><span className="text-blue-400">&lt;!DOCTYPE html&gt;</span> <span className="text-green-400">← Tells the browser this is modern HTML</span></div>
                <div><span className="text-blue-400">&lt;html lang="en-GB"&gt;</span> <span className="text-green-400">← Starts the page, sets language to British English</span></div>
                <div><span className="text-blue-400">&lt;head&gt;</span> <span className="text-green-400">← Information about the page (not visible to users)</span></div>
                <div className="ml-4"><span className="text-blue-400">&lt;meta charset="UTF-8"&gt;</span> <span className="text-green-400">← Supports international characters</span></div>
                <div className="ml-4"><span className="text-blue-400">&lt;meta name="viewport"...&gt;</span> <span className="text-green-400">← Makes it work on mobile devices</span></div>
                <div className="ml-4"><span className="text-blue-400">&lt;title&gt;</span>Ministry of Silly Walks - Task Manager<span className="text-blue-400">&lt;/title&gt;</span> <span className="text-green-400">← Tab title</span></div>
                <div><span className="text-blue-400">&lt;/head&gt;</span></div>
                <div><span className="text-blue-400">&lt;body&gt;</span> <span className="text-green-400">← Where visible content goes</span></div>
                <div className="ml-4"><span className="text-gray-400">{'<!--'} This is where we'll add our Ministry content {'-->'}</span></div>
                <div><span className="text-blue-400">&lt;/body&gt;</span></div>
                <div><span className="text-blue-400">&lt;/html&gt;</span></div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">The &lt;head&gt; Section</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Contains information about the page</li>
                <li>• Not visible to users</li>
                <li>• Includes the page title (shows in browser tab)</li>
                <li>• Sets up mobile compatibility</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">The &lt;body&gt; Section</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Contains all visible content</li>
                <li>• This is where we'll build our task manager</li>
                <li>• Users see everything in here</li>
                <li>• Currently empty - let's fill it!</li>
              </ul>
            </div>
          </div>
          
          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Requirements to HTML Structure
            </div>
            <div className="concept-text">
              <p className="mb-3">When you write requirements like:</p>
              <ul className="text-sm space-y-1 mb-3">
                <li>• "The system should display clearly in browser tabs" → &lt;title&gt; tag</li>
                <li>• "The application must work on mobile devices" → viewport meta tag</li>
                <li>• "Support international character sets" → UTF-8 encoding</li>
              </ul>
              <p>These business requirements translate directly into HTML structure decisions!</p>
            </div>
          </div>
          
          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold mb-3">🎯 What's Next</h4>
            <p>
              Now that you understand the foundation, we'll start adding visible content inside the &lt;body&gt; section. 
              Every piece of content we add will be between &lt;body&gt; and &lt;/body&gt; tags.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'html-basics',
      title: 'Step 2: Adding a Simple Header',
      type: 'coding',
      exercise: {
        title: 'Add a Header to Your Page',
        description: 'Let\'s start really simple. We\'ll add just a header with the Ministry name. Don\'t worry - I\'ll guide you through each tiny step!',
        instructions: [
          'Look for the comment that says "<!-- Step 1: Add a header here -->"',
          'Delete that entire comment line',
          'Copy and paste the code shown below',
          'Click "Check My Work" to see if it\'s correct'
        ],
        codeBlock: {
          code: `<h1>Ministry of Silly Walks</h1>`,
          explanations: [
            {
              line: "<h1>",
              explanation: "This is an opening H1 tag - it tells the browser 'the next text is the main heading'",
              businessContext: "H1 tags create the largest, most prominent text on the page - perfect for the main system title that users need to see immediately."
            },
            {
              line: "Ministry of Silly Walks",
              explanation: "This is the actual text that users will see displayed as the heading.",
              businessContext: "Clear system identification helps users know they're in the right place - essential for user confidence and navigation."
            },
            {
              line: "</h1>",
              explanation: "This closes the H1 tag - it tells the browser 'the main heading ends here'",
              businessContext: "HTML tags work in pairs: an opening tag starts something, a closing tag ends it. This ensures the heading applies only to the text we want."
            }
          ]
        },
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <!-- Step 1: Add a header here -->
    
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
</body>
</html>`,
        hints: [
          "Look for the comment that says '<!-- Step 1: Add a header here -->'",
          "Replace that entire line with: <h1>Ministry of Silly Walks</h1>",
          "The <h1> tag creates a large heading - perfect for the main title of our page",
          "Make sure to type it exactly as shown, including the angle brackets < >",
          "HTML tags always come in pairs: <h1> opens and </h1> closes"
        ],
        explanation: {
          whatIsHappening: "Congratulations! You just wrote your first HTML code. The <h1> tag tells the web browser 'this is the most important heading on the page.' When users visit our Ministry website, they'll see 'Ministry of Silly Walks' displayed as a large, bold title at the top of the page.",
          whyItMatters: "This simple heading directly addresses one of our user requirements: users need to know what system they're using. When John Cleese opens this page, he immediately knows he's in the right place. Clear headings are also crucial for users with visual impairments who use screen readers.",
          realWorldConnection: "As a BA, you often write requirements like 'the page should clearly identify the system name.' Now you understand how developers implement this - with HTML headings! When you write 'prominent system branding' in a requirement, developers think '<h1> tag.'",
          keyTerms: {
            "HTML Tag": "Instructions written in angle brackets < > that tell the browser how to display content",
            "H1": "The main heading tag - there should only be one per page, like a newspaper headline",
            "Opening/Closing Tags": "Most HTML tags come in pairs: <h1> starts, </h1> ends",
            "Browser": "The program (Chrome, Firefox, Safari) that reads HTML and shows it as a website"
          }
        }
      }
    },
    {
      id: 'add-subtitle',
      title: 'Step 3: Adding a Subtitle',
      type: 'coding',
      exercise: {
        title: 'Add a Subtitle Below the Header',
        description: 'Great! Now let\'s add a subtitle to explain what this system does. We\'ll add it right below our Ministry title.',
        instructions: [
          'Find the comment "<!-- Step 2: Add a subtitle here -->"',
          'Delete that comment line',
          'Copy and paste the code shown below',
          'This will appear as smaller text below the main heading'
        ],
        codeBlock: {
          code: `<p>Task Management System</p>`,
          explanations: [
            {
              line: "<p>",
              explanation: "This is a paragraph tag - it tells the browser to display the text as a normal paragraph.",
              businessContext: "Paragraphs create readable text blocks that are smaller than headings - perfect for descriptions and explanatory text."
            },
            {
              line: "Task Management System",
              explanation: "This text explains what the system does - it gives users context about the application.",
              businessContext: "Clear system descriptions help users understand the purpose immediately, reducing confusion and support requests."
            },
            {
              line: "</p>",
              explanation: "This closes the paragraph tag, ending the text block.",
              businessContext: "Properly closed tags ensure the formatting applies only where intended, maintaining clean page structure."
            }
          ]
        },
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <!-- Step 2: Add a subtitle here -->
    
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
</body>
</html>`,
        hints: [
          "Look for the comment '<!-- Step 2: Add a subtitle here -->'",
          "Replace it with: <p>Task Management System</p>",
          "The <p> tag is used for paragraphs - perfect for our subtitle",
          "This will appear smaller than the <h1> heading, which is exactly what we want",
          "Remember: <p> opens the paragraph, </p> closes it"
        ],
        explanation: {
          whatIsHappening: "You've added a paragraph element (<p>) below your heading. The browser will display this as normal-sized text under the large title. This creates a clear hierarchy: big title first, then explanatory text underneath.",
          whyItMatters: "This subtitle answers the question 'What does this system do?' that users might have after seeing the Ministry name. It's like having a tagline that immediately explains the purpose. This addresses our user requirement for clear system identification.",
          realWorldConnection: "In your BA work, you might write requirements like 'The system should have a clear purpose statement' or 'Users should understand what the application does within 3 seconds.' This <p> tag is how developers implement those requirements - with descriptive text in appropriate HTML elements.",
          keyTerms: {
            "Paragraph tag": "The <p> element is used for regular text content, like descriptions or body text",
            "Hierarchy": "The visual order of importance - headings are bigger than paragraphs",
            "Content Structure": "How information is organized from most important (h1) to supporting details (p)",
            "User Experience": "How easy and clear it is for users to understand what they're looking at"
          }
        }
      }
    },
    {
      id: 'simple-form',
      title: 'Step 4: Creating a Simple Input Box',
      type: 'coding',
      exercise: {
        title: 'Add Section Heading and Input Field',
        description: 'Now let\'s create a proper section for adding tasks. We\'ll add a section heading first, then the input field.',
        instructions: [
          'Look for the comment "<!-- Step 3: Add section heading here -->"',
          'Replace it with: <h2>Add New Task</h2>',
          'Look for the comment "<!-- Step 4: Add an input box here -->"', 
          'Replace it with: <input type="text" placeholder="Enter task description">',
          'This creates a clear section for task input with proper heading structure'
        ],
        codeBlock: {
          code: `<h2>Add New Task</h2>
<input type="text" placeholder="Enter task description">`,
          explanations: [
            {
              line: "<h2>Add New Task</h2>",
              explanation: "Creates a section heading (H2) that's smaller than the main title (H1) but larger than regular text.",
              businessContext: "Clear section headings help users understand page organization and make the interface scannable - essential for usability."
            },
            {
              line: "<input",
              explanation: "This creates an input field where users can type information.",
              businessContext: "Input fields are the primary way users interact with web applications - they're essential for data collection and user engagement."
            },
            {
              line: 'type="text"',
              explanation: "Specifies this is a text input field (users can type letters, numbers, symbols).",
              businessContext: "Different input types serve different business needs: text for general information, email for contact details, number for quantities, etc."
            },
            {
              line: 'placeholder="Enter task description"',
              explanation: "Shows helpful text inside the input box before users start typing.",
              businessContext: "Good placeholder text reduces user confusion and support requests by clearly indicating what information is expected."
            },
            {
              line: ">",
              explanation: "Closes the input tag. Note: input elements are self-closing and don't need a separate closing tag.",
              businessContext: "Understanding HTML structure helps when reviewing developer implementations and writing technical requirements."
            }
          ]
        },
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <!-- Step 3: Add section heading here -->
    <!-- Step 4: Add an input box here -->
    
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" placeholder="Enter task description">
</body>
</html>`,
        hints: [
          "First find the comment '<!-- Step 3: Add section heading here -->' and replace it with <h2>Add New Task</h2>",
          "Then find '<!-- Step 4: Add an input box here -->' and replace it with the input field",
          "The <h2> tag creates a section heading - smaller than <h1> but bigger than regular text",
          "The <input> tag creates a text box where users can type",
          "Notice that <input> doesn't need a closing tag - it's self-contained!"
        ],
        explanation: {
          whatIsHappening: "You've created a proper task input section! The <h2> heading organizes the page into clear sections, while the input field provides a text box where users can type. The 'placeholder' text appears as light gray text inside the box to guide users. When they click in the box and start typing, their text replaces the placeholder.",
          whyItMatters: "This directly implements our user story: 'As a Junior Analyst, I want to add new walk evaluation tasks.' The section heading helps users understand what this part of the page does, while the input field lets Michael Palin actually type in a task description. Good information architecture like this reduces user confusion.",
          realWorldConnection: "When you write requirements like 'Users must be able to enter task information' or 'The interface should be clearly organized,' this is how developers implement it. Understanding headings and input types helps you specify requirements more precisely - like 'section headings,' 'text input,' 'dropdown menu,' or 'multi-line text area.'",
          keyTerms: {
            "Section heading (H2)": "A heading tag that organizes content into clear sections, smaller than H1 but larger than regular text",
            "Input field": "A box where users can type or select information",
            "Placeholder text": "Helpful text that shows what to enter, disappears when typing starts",
            "Information architecture": "How content is organized and structured to help users understand and navigate",
            "Self-closing tag": "Some HTML tags like <input> don't need a separate closing tag"
          }
        }
      }
    },
    {
      id: 'display-sample-task',
      title: 'Step 5: Showing an Example Task',
      type: 'coding',
      exercise: {
        title: 'Display a Sample Task',
        description: 'Let\'s show users what a task looks like! We\'ll add one example task so John Cleese can see how his tasks will appear.',
        instructions: [
          'Find the comment "<!-- Step 5: Add current tasks section here -->"',
          'Replace it with the code shown below',
          'This creates a section heading and a sample task display',
          'Notice how we organize content with headings and containers'
        ],
        codeBlock: {
          code: `<h2>Current Tasks</h2>
<div>
    <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
    <p>Review submitted video and assess walk silliness level.</p>
    <p>Assigned to: John Cleese</p>
</div>`,
          explanations: [
            {
              line: "<h2>Current Tasks</h2>",
              explanation: "Creates another section heading to organize the page into clear areas - one for adding tasks, one for viewing them.",
              businessContext: "Good information architecture separates different functions clearly, making the interface intuitive for users."
            },
            {
              line: "<div>",
              explanation: "Opens a container element that groups related information together.",
              businessContext: "Containers organize content logically - essential for structured data display and user interface design."
            },
            {
              line: "<h3>Evaluate Mr. Smith's Silly Walk Application</h3>",
              explanation: "Creates a medium-sized heading for the task title using H3 (smaller than H1 and H2).",
              businessContext: "Proper heading hierarchy helps users scan content quickly and improves accessibility for screen readers."
            },
            {
              line: "<p>Review submitted video and assess walk silliness level.</p>",
              explanation: "A paragraph containing the task description - what needs to be done.",
              businessContext: "Clear task descriptions reduce ambiguity and help ensure work is completed correctly."
            },
            {
              line: "<p>Assigned to: John Cleese</p>",
              explanation: "Another paragraph showing who is responsible for this task.",
              businessContext: "Assignment tracking is crucial for accountability and workload management in any system."
            },
            {
              line: "</div>",
              explanation: "Closes the container, keeping all task information grouped together.",
              businessContext: "Proper structure ensures related information stays together visually and semantically."
            }
          ]
        },
        language: 'html' as const,
        startingCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" placeholder="Enter task description">
    
    <!-- Step 5: Add current tasks section here -->
    
</body>
</html>`,
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
</head>
<body>
    <h1>Ministry of Silly Walks</h1>
    <p>Task Management System</p>
    
    <h2>Add New Task</h2>
    <input type="text" placeholder="Enter task description">
    
    <h2>Current Tasks</h2>
    <div>
        <h3>Evaluate Mr. Smith's Silly Walk Application</h3>
        <p>Review submitted video and assess walk silliness level.</p>
        <p>Assigned to: John Cleese</p>
    </div>
</body>
</html>`,
        hints: [
          "Find the comment '<!-- Step 5: Add current tasks section here -->'",
          "Start with <h2>Current Tasks</h2> to create a clear section heading",
          "Add a <div> to contain the task information",
          "Add an <h3> heading for the task title: 'Evaluate Mr. Smith's Silly Walk Application'",
          "Add <p> paragraphs for the description and assignment",
          "Don't forget to close the </div> at the end!"
        ],
        explanation: {
          whatIsHappening: "You've created a complete task viewing section! The <h2> heading clearly labels this section, while the <div> acts like a container that groups all the information about one task together. The <h3> creates a medium-sized heading for the task title, and the <p> elements show the description and who it's assigned to.",
          whyItMatters: "This directly fulfills John Cleese's user story: 'I want to see all my assigned tasks in one place.' The section heading helps him understand what this part of the page does, while the structured task display shows exactly what information will be available for each task - the title, what needs to be done, and who's responsible for it.",
          realWorldConnection: "When you write requirements like 'Users should see task title, description, and assignee' or 'The interface should be clearly organized into sections,' this is how developers implement it. Understanding how content is grouped and labeled in HTML helps you write better requirements about information display and user interfaces.",
          keyTerms: {
            "Section organization": "Using H2 headings to divide the page into clear functional areas",
            "Container": "A <div> element that groups related content together",
            "Content hierarchy": "How information is organized from most important (h2, h3) to details (p)",
            "Information grouping": "Putting related pieces of data together so they make sense",
            "Task representation": "How we show task information to users in a clear, organized way"
          }
        }
      }
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
      {/* Breadcrumb Navigation */}
      <TutorialBreadcrumb />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/tutorial/introduction")} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Introduction
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 1: Building the Foundation</h1>
              <p className="text-sm text-gray-600">Creating the HTML structure</p>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="tutorial-card sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 1 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 1 Complete!</p>
                  <Link 
                    href={getUrlWithParams("/tutorial/chapter-2")} 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 2
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Progress Bar */}
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

              {/* Beginner Guide */}
              {showBeginnerGuide && currentStep > 0 && (
                <div id="beginner-guide" className="mb-8">
                  <BeginnerGuide />
                </div>
              )}

              {/* Step Content */}
              {steps[currentStep].type === 'explanation' ? (
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
                          setShowBeginnerGuide(false) // Hide guide after first step
                        }
                      }}
                      className="tutorial-button-primary"
                    >
                      {completedSteps.includes(currentStep) 
                        ? currentStep === steps.length - 1 
                          ? 'Complete Chapter' 
                          : currentStep === 0 ? 'Start Coding!' : 'Next Step'
                        : 'Mark Complete & Continue'
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <CodeEditor
                  {...steps[currentStep].exercise!}
                  stepId={steps[currentStep].id}
                  currentChapter={1}
                  showFileTree={true}
                  onComplete={() => {
                    markStepCompleteLocal(currentStep)
                    setTimeout(() => {
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(currentStep + 1)
                      }
                    }, 2000)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}