'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Palette, Lightbulb } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter2() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

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
      id: 'css-introduction',
      title: 'Understanding CSS',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 2: Making It Look Professional</h2>
          <p className="text-lg text-gray-600">
            Great work on Chapter 1! You've built the basic HTML structure. Now let's make it look like a proper government website using CSS (Cascading Style Sheets).
          </p>

          <div className="explanation-box">
            <div className="explanation-title">What is CSS?</div>
            <div className="explanation-text">
              <p className="mb-3">
                CSS is like the styling department of web development. While HTML provides the structure and content, CSS makes it look professional and user-friendly.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>HTML:</strong> "Here's a heading and some text"</li>
                <li><strong>CSS:</strong> "Make that heading blue, bigger, and add some spacing"</li>
              </ul>
              <p className="mt-3">
                Think of HTML as the blueprint of a house, and CSS as the interior design that makes it livable and attractive.
              </p>
            </div>
          </div>

          <div className="ministry-header">
            <h3 className="text-xl font-bold">Why Styling Matters for Government Systems</h3>
          </div>
          <div className="ministry-content">
            <p className="mb-4">
              The Ministry of Silly Walks needs their task management system to look professional and follow government design standards. Poor design can lead to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Problems with Poor Design</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Staff refuse to use the system</li>
                  <li>• Important tasks get missed</li>
                  <li>• Parliament questions system costs</li>
                  <li>• Public accessibility complaints</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Benefits of Good Design</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Staff adoption and satisfaction</li>
                  <li>• Clear information hierarchy</li>
                  <li>• Meets accessibility standards</li>
                  <li>• Professional government appearance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <Lightbulb className="w-5 h-5 mr-2" />
              BA Insight: Design Requirements
            </div>
            <p className="concept-text">
              When you write requirements like "the system should be easy to use" or "follow brand guidelines," developers implement these through CSS. Understanding CSS helps you write more specific, actionable requirements like "use high contrast colors for accessibility" or "follow GOV.UK design system spacing."
            </p>
          </div>

          <div className="bg-tutorial-primary text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3">🎯 Learning Objective</h3>
            <p>
              In this chapter, you'll add CSS styling to make your task manager look professional. You'll learn how styling decisions directly impact user experience and business requirements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'add-basic-styles',
      title: 'Step 1: Adding Basic Styles',
      type: 'coding',
      exercise: {
        title: 'Add a Style Section to Your HTML',
        description: 'Let\'s start by adding a CSS section to our HTML file. We\'ll put the styles right in the HTML for now to keep things simple.',
        instructions: [
          'Find the comment "<!-- Step 1: Add styles here -->" in the <head> section',
          'Replace it with a <style> tag opening: <style>',
          'Copy and paste the CSS code shown below',
          'Close with: </style>',
          'This will make our page look much more professional'
        ],
        codeBlock: {
          code: `body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
}`,
          explanations: [
            {
              line: "body {",
              explanation: "This targets the <body> element, which contains all the visible content on the page.",
              businessContext: "This lets you control the overall appearance of the entire application."
            },
            {
              line: "font-family: Arial, sans-serif;",
              explanation: "Sets the font to Arial (or similar if Arial isn't available) for better readability.",
              businessContext: "Professional applications need consistent, readable fonts - this fulfills your requirement for a 'professional appearance'."
            },
            {
              line: "max-width: 800px;",
              explanation: "Limits the content width to 800 pixels so text lines aren't too long to read comfortably.",
              businessContext: "This improves usability - users can read content more easily, reducing eye strain and increasing productivity."
            },
            {
              line: "margin: 0 auto;",
              explanation: "Centers the content horizontally on the page by setting top/bottom margins to 0 and left/right margins to automatic.",
              businessContext: "Centered layouts look more professional and polished - important for government applications that need to appear trustworthy."
            },
            {
              line: "padding: 20px;",
              explanation: "Adds 20 pixels of space inside the body element, preventing content from touching the edges.",
              businessContext: "White space makes interfaces feel less cramped and more professional - users find well-spaced layouts easier to use."
            },
            {
              line: "background-color: #f8f9fa;",
              explanation: "Sets a light gray background color (#f8f9fa) instead of pure white for a softer appearance.",
              businessContext: "Subtle background colors reduce eye strain and give a more modern, professional look that users expect from quality applications."
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
    <!-- Step 1: Add styles here -->
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
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
    </style>
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
          "Look for the comment '<!-- Step 1: Add styles here -->' in the <head> section",
          "Replace the entire comment with <style> to start the CSS section",
          "Copy and paste the CSS code from the code block above",
          "Don't forget to close with </style>",
          "The styles will center the content and add a professional look"
        ],
        explanation: {
          whatIsHappening: "You've added your first CSS! The <style> tag tells the browser 'everything inside here is styling instructions.' The body selector targets the <body> element and applies styling to the entire page. You've set a professional font, centered the content, added padding for breathing room, and given it a light background color.",
          whyItMatters: "This simple styling transformation shows how CSS directly serves business requirements. The Ministry needed a 'professional appearance' - you've just implemented that requirement. The centered layout and clean font make the system look trustworthy and government-appropriate.",
          realWorldConnection: "When you write requirements like 'the system should look professional' or 'use a clean, readable layout,' developers implement these through CSS properties like font-family, max-width, and background-color. Understanding these basics helps you write more specific design requirements.",
          keyTerms: {
            "CSS Selector": "The part that chooses which HTML elements to style (like 'body')",
            "Property": "What aspect you want to change (like 'font-family' or 'background-color')",
            "Value": "How you want to change it (like 'Arial' or '#f8f9fa')",
            "Style Tag": "The <style> element that contains CSS code within HTML"
          }
        }
      }
    },
    {
      id: 'style-headings',
      title: 'Step 2: Styling the Headings',
      type: 'coding',
      exercise: {
        title: 'Make the Headings Look Professional',
        description: 'Now let\'s style our headings to follow government design standards. We\'ll add colors and spacing that make the hierarchy clear.',
        instructions: [
          'Find the comment "/* Step 2: Add heading styles here */" inside the <style> tag',
          'Replace it with the CSS code shown below',
          'This will style both h1 and h2 headings with government colors',
          'The styling creates clear visual hierarchy for your users'
        ],
        codeBlock: {
          code: `h1 {
    color: #003d7a;
    margin-bottom: 10px;
}
h2 {
    color: #4b5563;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 5px;
}`,
          explanations: [
            {
              line: "h1 {",
              explanation: "This targets all <h1> elements (main headings) on the page.",
              businessContext: "The main title of your application needs to stand out and establish authority - this targets that specific element."
            },
            {
              line: "color: #003d7a;",
              explanation: "Sets the text color to a deep government blue (#003d7a), commonly used in UK government websites.",
              businessContext: "Professional applications need consistent branding - this blue color establishes trust and government authority that users expect."
            },
            {
              line: "margin-bottom: 10px;",
              explanation: "Adds 10 pixels of space below the main heading to separate it from content below.",
              businessContext: "Proper spacing improves readability and helps users quickly scan the page hierarchy - essential for busy civil servants."
            },
            {
              line: "h2 {",
              explanation: "This targets all <h2> elements (section headings) throughout the page.",
              businessContext: "Section headings like 'Add New Task' and 'Current Tasks' need to be visually distinct but secondary to the main title."
            },
            {
              line: "color: #4b5563;",
              explanation: "Sets section headings to a professional gray color that's darker than body text but lighter than the main heading.",
              businessContext: "Visual hierarchy helps users understand the page structure - gray section headings are prominent but don't compete with the main blue title."
            },
            {
              line: "border-bottom: 2px solid #e5e7eb;",
              explanation: "Adds a subtle gray line under each section heading to visually separate sections.",
              businessContext: "Visual separators help users quickly identify different sections like 'Add Task' vs 'View Tasks' - reducing cognitive load and improving task completion speed."
            },
            {
              line: "padding-bottom: 5px;",
              explanation: "Adds 5 pixels of space between the heading text and the border line.",
              businessContext: "Small details like proper spacing make interfaces feel polished and professional - important for government applications that need to appear trustworthy."
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
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        /* Step 2: Add heading styles here */
    </style>
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
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
        }
    </style>
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
          "Find the comment '/* Step 2: Add heading styles here */' inside the <style> section",
          "Copy and paste the CSS code from the code block above",
          "Make sure to include both the h1 and h2 style rules",
          "Each style rule targets different heading levels",
          "The colors follow government design guidelines - blue for main headings, gray for sections"
        ],
        explanation: {
          whatIsHappening: "You've added professional government-style colors to your headings. The h1 (main title) is now deep blue (#003d7a) - a color commonly used in UK government websites. The h2 headings are gray with a subtle underline border, creating clear visual sections without being overwhelming.",
          whyItMatters: "This styling creates clear information hierarchy - exactly what John Cleese and Terry Jones need when quickly scanning their tasks. The visual separation helps them distinguish between the main system title, section headings, and content. This reduces cognitive load and improves task completion speed.",
          realWorldConnection: "When you write requirements about 'clear navigation' or 'easy to scan interface,' this is how developers implement them. Color hierarchy and visual separators are the technical implementation of user experience requirements. You're now equipped to specify color and layout requirements more precisely.",
          keyTerms: {
            "Color codes": "Hex codes like #003d7a that specify exact colors for consistency",
            "Margin/Padding": "Spacing around (margin) and inside (padding) elements",
            "Border": "Lines around elements, used here as visual separators",
            "Visual hierarchy": "Using size, color, and spacing to show importance and organization"
          }
        }
      }
    },
    {
      id: 'style-form-task',
      title: 'Step 3: Styling the Input and Task Card',
      type: 'coding',
      exercise: {
        title: 'Style the Task Input and Task Display',
        description: 'Let\'s make the input field look professional and create a proper task card design that makes tasks easy to read and manage.',
        instructions: [
          'Find the comment "/* Step 3: Add input and task styles here */"',
          'Replace it with the CSS code shown below',
          'This will style both the input field and task cards',
          'The input will become full-width with professional padding',
          'The div will become a card with white background and subtle shadow'
        ],
        codeBlock: {
          code: `input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
}
div {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`,
          explanations: [
            {
              line: "input {",
              explanation: "This targets all <input> elements on the page, making the text input field look professional.",
              businessContext: "The input field is where users enter their task descriptions - it needs to be prominent and easy to use for quick data entry."
            },
            {
              line: "width: 100%;",
              explanation: "Makes the input field stretch to fill the full width of its container.",
              businessContext: "Wide input fields allow users to see more of what they're typing, reducing errors and improving the user experience when creating tasks."
            },
            {
              line: "padding: 10px;",
              explanation: "Adds 10 pixels of space inside the input field, making it easier to click and type in.",
              businessContext: "Adequate padding makes form fields feel more clickable and professional - important for a tool civil servants will use daily."
            },
            {
              line: "border: 1px solid #d1d5db;",
              explanation: "Adds a subtle gray border around the input field to define its boundaries clearly.",
              businessContext: "Clear visual boundaries help users understand where they can click to interact - essential for efficient task creation workflow."
            },
            {
              line: "border-radius: 4px;",
              explanation: "Rounds the corners of the input field by 4 pixels for a modern, softer appearance.",
              businessContext: "Rounded corners feel more modern and approachable than sharp corners - making the government tool feel user-friendly rather than austere."
            },
            {
              line: "font-size: 16px;",
              explanation: "Sets the text size inside the input to 16 pixels, ensuring good readability.",
              businessContext: "Proper font size prevents zoom-in on mobile devices and ensures readability for users of all ages - important for accessibility compliance."
            },
            {
              line: "margin-bottom: 20px;",
              explanation: "Adds 20 pixels of space below the input field to separate it from content below.",
              businessContext: "Proper spacing between interface elements prevents users from accidentally clicking the wrong thing - crucial for efficient task management."
            },
            {
              line: "div {",
              explanation: "This targets all <div> elements, turning them into professional-looking task cards.",
              businessContext: "Each task needs to be visually distinct and easy to scan - cards help users quickly identify and read individual tasks."
            },
            {
              line: "background-color: white;",
              explanation: "Sets the background of each task card to white, making them stand out from the gray page background.",
              businessContext: "White cards on a gray background create clear visual separation - helping users focus on one task at a time."
            },
            {
              line: "border: 1px solid #e5e7eb;",
              explanation: "Adds a subtle light gray border around each task card to define its boundaries.",
              businessContext: "Clear card boundaries help users understand where one task ends and another begins - essential for scanning task lists quickly."
            },
            {
              line: "border-radius: 8px;",
              explanation: "Rounds the corners of task cards by 8 pixels for a modern card-like appearance.",
              businessContext: "Card-style design makes each task feel like a separate, manageable item - psychologically helping users feel organized and in control."
            },
            {
              line: "padding: 15px;",
              explanation: "Adds 15 pixels of space inside each task card, preventing text from touching the edges.",
              businessContext: "Internal padding makes task content more readable and gives the interface breathing room - reducing visual stress for busy civil servants."
            },
            {
              line: "margin-bottom: 15px;",
              explanation: "Adds 15 pixels of space below each task card to separate it from the next task.",
              businessContext: "Spacing between tasks helps users scan the list and prevents them from reading the wrong task - crucial for accurate work assignment."
            },
            {
              line: "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);",
              explanation: "Adds a subtle shadow below each task card to create depth and make it appear raised from the page.",
              businessContext: "Subtle shadows make task cards feel more interactive and important - helping users understand these are actionable items they can work with."
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
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
        }
        /* Step 3: Add input and task styles here */
    </style>
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
        targetCode: `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministry of Silly Walks - Task Manager</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #003d7a;
            margin-bottom: 10px;
        }
        h2 {
            color: #4b5563;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        div {
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
    </style>
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
          "Find the comment '/* Step 3: Add input and task styles here */'",
          "Copy and paste the CSS code from the code block above",
          "Make sure to include both the input and div style rules",
          "The input will become full-width with professional padding",
          "The div will become a card with white background and subtle shadow"
        ],
        explanation: {
          whatIsHappening: "You've transformed the basic input and task display into professional UI components. The input field now spans the full width with comfortable padding and rounded corners. The task is displayed in a card format with a white background, subtle border, and shadow - making it stand out from the page background while being easy to read.",
          whyItMatters: "These styling changes directly address user experience requirements. The full-width input makes it clear where to type, and the card design helps John Cleese quickly identify individual tasks in his workload. The visual separation reduces errors and speeds up task processing - crucial for busy government work.",
          realWorldConnection: "When you write requirements like 'tasks should be clearly distinguished' or 'input fields should be easy to use,' these CSS properties are how developers implement them. Understanding concepts like padding, borders, and shadows helps you write more specific UX requirements and have informed discussions about interface design decisions.",
          keyTerms: {
            "Box-shadow": "Creates a subtle shadow effect to make elements appear elevated",
            "Border-radius": "Rounds the corners of elements for a modern, friendly appearance",
            "Padding": "Space inside an element between the border and content",
            "Full-width": "width: 100% makes an element take up all available horizontal space"
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
            <Link href="/tutorial/chapter-1" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Chapter 1
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Chapter 2: Professional Styling with CSS</h1>
              <p className="text-sm text-gray-600">Making it look like a real government system</p>
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
              <h3 className="font-semibold text-gray-900 mb-4">Chapter 2 Progress</h3>
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
                  <p className="text-sm text-green-800 font-medium mb-2">Chapter 2 Complete!</p>
                  <Link 
                    href="/tutorial/chapter-3" 
                    className="inline-flex items-center text-sm text-green-700 hover:text-green-900"
                  >
                    Start Chapter 3
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
                        }
                      }}
                      className="tutorial-button-primary"
                    >
                      {completedSteps.includes(currentStep) 
                        ? currentStep === steps.length - 1 
                          ? 'Complete Chapter' 
                          : 'Next Step'
                        : 'Start Styling!'
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <CodeEditor
                  {...steps[currentStep].exercise!}
                  stepId={steps[currentStep].id}
                  currentChapter={2}
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