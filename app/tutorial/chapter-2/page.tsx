'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Palette, Lightbulb } from 'lucide-react'
import CodeEditor from '@/components/tutorial/CodeEditor'
import TutorialBreadcrumb from '@/components/tutorial/TutorialBreadcrumb'
import CssDiagram from '@/components/tutorial/CssDiagram'
import { getProgress, markStepComplete, isStepComplete } from '@/lib/progress'

export default function Chapter2() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Helper function to preserve URL parameters
  const getUrlWithParams = (path: string) => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString() ? `${path}?${params.toString()}` : path
  }

  // Helper function to change step
  const changeStep = (newStep: number) => {
    setCurrentStep(newStep)
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
      id: 'css-introduction',
      title: 'Understanding CSS',
      type: 'explanation',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Chapter 2: Making It Look Professional</h2>
          <p className="text-lg text-gray-600">
            Great work on Chapter 1! You've built the basic HTML structure. Now let's make it look like a proper government website using CSS (Cascading Style Sheets).
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What is CSS?</h3>
            <p className="mb-3 text-gray-700">
              CSS is like the styling department of web development. While HTML provides the structure and content, CSS makes it look professional and user-friendly.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>HTML:</strong> "Here's a heading and some text"</li>
              <li><strong>CSS:</strong> "Make that heading blue, bigger, and add some spacing"</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Think of HTML as the blueprint of a house, and CSS as the interior design that makes it livable and attractive.
            </p>
          </div>

          <CssDiagram />

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Styling Matters for Government Systems</h3>
            <p className="mb-4 text-gray-700">
              The Ministry of Silly Walks needs their task management system to meet specific government design standards: minimum 4.5:1 color contrast ratio, maximum 3-second load time, and 98% accessibility compliance.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Business Risks of Poor Design</h4>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>40% reduction in task completion speed</li>
                  <li>£250K annual cost of accessibility non-compliance fines</li>
                  <li>Failed government audit findings requiring system replacement</li>
                  <li>25% increase in training costs due to complex interface</li>
                  <li>Parliamentary committee criticism on digital transformation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Business Value of Professional Design</h4>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>60% faster task processing saves 15 hours/week per user</li>
                  <li>Full WCAG 2.1 AA compliance avoids £250K penalties</li>
                  <li>Passes government digital service assessments</li>
                  <li>80% reduction in help desk tickets</li>
                  <li>Meets Cabinet Office design system requirements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="concept-callout">
            <div className="concept-title">
              <div className="w-5 h-5 bg-tutorial-primary rounded mr-2"></div>
              BA Insight: Design Requirements
            </div>
            <div className="concept-text space-y-4">
              <p>
                Design requirements are often vague ("make it look professional") but CSS implementation requires precise specifications. Understanding this gap helps you write requirements that achieve the business vision through technical implementation.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Vague vs. Specific Design Requirements:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-red-500 pl-3">
                    <div><strong>Vague:</strong> "Make it look professional and government-like"</div>
                    <div><strong>Problem:</strong> Subjective, no measurable criteria, leaves interpretation to developers</div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3">
                    <div><strong>Specific:</strong> "Follow GOV.UK Design System: Transport font, #1d70b8 blue headers, minimum 4.5:1 contrast ratio"</div>
                    <div><strong>Benefit:</strong> Objective, testable, achieves consistent brand compliance</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">CSS-Informed Requirements Framework:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Typography:</strong> Font families, sizes (px/rem), weights, line-height ratios</div>
                  <div><strong>Color Palette:</strong> Exact hex codes, contrast ratios, semantic color usage</div>
                  <div><strong>Spacing:</strong> Consistent padding/margin scales (8px, 16px, 24px, etc.)</div>
                  <div><strong>Layout:</strong> Grid systems, breakpoints, responsive behavior</div>
                  <div><strong>Interactive States:</strong> Hover, focus, active, disabled styling</div>
                  <div><strong>Accessibility:</strong> Focus indicators, color alternatives, text alternatives</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Business Impact of Design Requirements:</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Brand Consistency:</strong> Precise color/font specs ensure brand compliance across all touchpoints</div>
                  <div><strong>Accessibility Compliance:</strong> Contrast ratios and focus states meet legal requirements (WCAG 2.1)</div>
                  <div><strong>User Experience:</strong> Consistent spacing and typography improve task completion rates</div>
                  <div><strong>Maintenance:</strong> Design systems reduce development time and ensure consistency</div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Common BA Mistakes in Design Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Using subjective terms like "modern," "clean," or "user-friendly"</li>
                  <li>• Not specifying exact colors, fonts, or dimensions</li>
                  <li>• Ignoring responsive design needs for different screen sizes</li>
                  <li>• Forgetting accessibility requirements until late in development</li>
                  <li>• Not considering interactive states (hover, focus, error)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objective</h3>
            <p className="text-gray-700">
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
        title: 'Create Your First CSS Styles',
        description: 'Let\'s add professional styling to our task manager by creating CSS in a separate stylesheet file. This follows industry best practices. But first, let\'s understand the basic CSS terminology you\'ll need to know.',
        instructions: [
          'First, complete the fill-in-the-blank exercise to understand CSS structure',
          'Focus on the CSS file - the HTML is provided and complete from Chapter 1',
          'Replace the comment "/* Step 1: Add body styles here */" with the CSS code shown below',
          'The HTML file shows the complete structure but you can\'t edit it - focus only on styling',
          'Each CSS property should end with a semicolon',
          'Watch how your CSS changes transform the HTML structure into a professional design'
        ],
        fillInTheBlank: {
          template: 'CSS uses {{selectors}} to target HTML elements. Each style rule has a {{property}} (like color) and a {{value}} (like blue). Together they create style declarations.',
          answers: {
            selectors: 'selectors',
            property: 'property',
            value: 'value'
          } as { [key: string]: string },
          hints: {
            selectors: 'What do you use to "select" which HTML elements to style? (Think: h1, body, .class)',
            property: 'In "color: blue;", what part comes before the colon?',
            value: 'In "color: blue;", what part comes after the colon?'
          } as { [key: string]: string },
          options: {
            selectors: ['selectors', 'elements', 'tags', 'classes', 'attributes', 'functions'],
            property: ['property', 'attribute', 'rule', 'style', 'declaration', 'method'],
            value: ['value', 'setting', 'parameter', 'content', 'data', 'option']
          } as { [key: string]: string[] },
          description: 'Before we add CSS, let\'s understand the three key parts of any CSS rule: **Selectors** (which HTML elements to style, like "body" or "h1"), **Properties** (what aspect to change, like "color" or "font-size"), and **Values** (how to change it, like "blue" or "16px"). For example: "h1 { color: blue; }" - here "h1" is the selector, "color" is the property, and "blue" is the value.'
        },
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
              explanation: "Let's break this down step by step:<br/><br/><strong>CSS Selector Breakdown:</strong><ul class='space-y-2'><li><code>'body'</code> = This is a CSS selector that targets the &lt;body&gt; HTML element</li><li><code>'{'</code> = Opens a style rule block where we list all the styling properties</li><li><strong>Think of it like:</strong> Selectors are like addressing a letter - 'body' tells CSS 'apply these styles to the body element'</li><li><strong>Why it matters:</strong> The body element contains all visible content, so styling it affects the entire page</li></ul>",
              businessContext: "This lets you control the overall appearance of the entire application - like setting company branding standards that apply to every page."
            },
            {
              line: "font-family: Arial, sans-serif;",
              explanation: "Let's break down font selection:<br/><br/><strong>Font Family Properties:</strong><ul class='space-y-2'><li><code>'font-family'</code> = The CSS property that controls which typeface to use</li><li><code>'Arial'</code> = The primary font choice (a clean, professional typeface)</li><li><code>'sans-serif'</code> = The fallback if Arial isn't available (means 'without decorative strokes')</li><li><strong>How it works:</strong> The comma creates a priority list - try Arial first, then any sans-serif font</li><li><strong>Result:</strong> This ensures consistent appearance across different computers and devices</li></ul>",
              businessContext: "Professional applications need consistent, readable fonts - this fulfills your requirement for 'minimum 16px font size with Arial/Helvetica font family for 95% readability across devices'."
            },
            {
              line: "max-width: 800px;",
              explanation: "Understanding width control:<br/><br/><strong>Width Control Properties:</strong><ul class='space-y-2'><li><code>'max-width'</code> = Sets the maximum width an element can grow to</li><li><code>'800px'</code> = 800 pixels wide (about 80% of a typical laptop screen)</li><li><code>'px'</code> = Pixels, the smallest unit on your screen</li><li><strong>Purpose:</strong> This prevents text lines from becoming too long to read comfortably</li><li><strong>Analogy:</strong> Think of it like setting margins on a Word document for better readability</li></ul>",
              businessContext: "This improves usability - users can read content more easily, reducing eye strain and increasing productivity. Research shows lines longer than 75 characters become hard to follow."
            },
            {
              line: "margin: 0 auto;",
              explanation: "This is CSS shorthand for centering content:<br/><br/><strong>Margin Properties:</strong><ul class='space-y-2'><li><code>'margin'</code> = Space around the outside of an element</li><li><code>'0'</code> = Sets top and bottom margins to zero (no extra space above/below)</li><li><code>'auto'</code> = Sets left and right margins to automatic (splits remaining space equally)</li><li><strong>Effect:</strong> This creates the centering effect - imagine a box floating in the middle of the page</li><li><strong>Analogy:</strong> It's like using 'Center' alignment in Word, but for the entire content block</li></ul>",
              businessContext: "Centered layouts look more professional and polished - important for government applications that need to appear trustworthy and well-designed."
            },
            {
              line: "padding: 20px;",
              explanation: "Understanding internal spacing:<br/><br/><strong>Padding Properties:</strong><ul class='space-y-2'><li><code>'padding'</code> = Space inside an element between its border and content</li><li><code>'20px'</code> = 20 pixels of space (about the width of your thumb on screen)</li><li><strong>Coverage:</strong> This applies to all four sides: top, right, bottom, left</li><li><strong>Analogy:</strong> Think of padding like the margins inside a picture frame</li><li><strong>Without it:</strong> Text would touch the edges and look cramped</li></ul>",
              businessContext: "White space makes interfaces feel less cramped and more professional - users find well-spaced layouts easier to use and less stressful."
            },
            {
              line: "background-color: #f8f9fa;",
              explanation: "Understanding color codes:<br/><br/><strong>Background Color Properties:</strong><ul class='space-y-2'><li><code>'background-color'</code> = The CSS property that sets the background color</li><li><code>'#f8f9fa'</code> = A hex color code (hexadecimal number representing a specific color)</li><li><code>'#'</code> = Indicates this is a hex color</li><li><code>'f8f9fa'</code> = A very light gray (almost white but softer)</li><li><strong>Consistency:</strong> Hex codes ensure exact color consistency across all browsers and devices</li><li><strong>Analogy:</strong> This is like choosing a specific Pantone color for business branding</li></ul>",
              businessContext: "Subtle background colors reduce eye strain and give a more modern, professional look that users expect from quality applications."
            }
          ]
        },
        language: 'css' as const,
        hints: [
          "Having trouble with CSS syntax? Remember the pattern: selector { property: value; }",
          "Can't find where to add the code? Look for the comment /* Step 1: Add body styles here */",
          "Not seeing changes in the preview? Make sure you're editing the CSS file tab, not HTML",
          "Confused about 'body'? It's the HTML element that wraps all visible page content",
          "Still stuck? Try typing just 'body {' first, then add the properties inside the braces"
        ],
        startingCode: `/* Ministry of Silly Walks - Task Manager Styles */

/* Step 1: Add body styles here */`,
        targetCode: `/* Ministry of Silly Walks - Task Manager Styles */

body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
}`,
        showFileTree: true,
        currentChapter: 2,
        explanation: {
          whatIsHappening: "You're working with CSS in a separate file from the HTML! The HTML structure is complete (from Chapter 1) and now you're adding professional styling. The body selector targets the <body> element and applies styling to the entire page. You're setting a professional font, centering the content, adding padding for breathing room, and giving it a light background color.",
          whyItMatters: "This demonstrates the separation of concerns principle - HTML provides structure, CSS provides styling. The Ministry needed 'consistent 16px typography with maximum 65 characters per line and 1.5x line-height for optimal readability' and you're implementing that requirement purely through CSS, without touching the HTML. This is how real development teams work - frontend developers often focus on just the styling while others handle the HTML structure.",
          realWorldConnection: "In real projects, you might receive completed HTML from a designer or developer, and your job is to make it look professional with CSS. This is exactly what you're doing here - taking working HTML and transforming it into a polished, government-appropriate interface through styling alone.",
          keyTerms: {
            "CSS Selector": "The part that chooses which HTML elements to style (like 'body')",
            "Property": "What aspect you want to change (like 'font-family' or 'background-color')",
            "Value": "How you want to change it (like 'Arial' or '#f8f9fa')",
            "External Stylesheet": "A separate .css file linked to HTML that contains all styling rules",
            "Separation of Concerns": "Keeping HTML (content) and CSS (styling) in separate files for better organization"
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
          'First, complete the fill-in-the-blank exercise to understand heading styles',
          'Continue working in the CSS file - the HTML remains read-only',
          'Find the comment "/* Step 2: Add heading styles here */" in the styles.css file',
          'Replace it with the CSS code shown below',
          'This will style both h1 and h2 headings with government colors',
          'Watch how CSS creates clear visual hierarchy without changing the HTML'
        ],
        fillInTheBlank: {
          template: 'We will style {{heading1}} elements with a professional {{color}} color and add {{spacing}} below them. For {{heading2}} elements, we will add a {{border}} at the bottom.',
          answers: {
            heading1: 'h1',
            color: 'blue',
            spacing: 'margin',
            heading2: 'h2',
            border: 'border'
          } as { [key: string]: string },
          hints: {
            heading1: 'What HTML tag creates the main heading? (Think: the biggest heading)',
            color: 'What color represents professionalism and government authority?',
            spacing: 'What CSS property adds space around elements?',
            heading2: 'What HTML tag creates secondary headings?',
            border: 'What CSS property adds lines around or under elements?'
          } as { [key: string]: string },
          options: {
            heading1: ['h1', 'h2', 'h3', 'header', 'title', 'main'],
            color: ['blue', 'red', 'green', 'black', 'gray', 'purple'],
            spacing: ['margin', 'padding', 'border', 'width', 'height', 'display'],
            heading2: ['h2', 'h1', 'h3', 'section', 'nav', 'aside'],
            border: ['border', 'outline', 'shadow', 'background', 'color', 'font']
          } as { [key: string]: string[] },
          description: 'Before we style the headings, let\'s understand what we\'re doing:'
        },
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
              explanation: "Understanding element targeting:<br/><br/><strong>Heading Selector Properties:</strong><ul class='space-y-2'><li><code>'h1'</code> = CSS selector that finds all &lt;h1&gt; HTML elements</li><li><code>&lt;h1&gt;</code> = The most important heading on a page (like a document title)</li><li><code>'{'</code> = Opens the style rule where we define how h1 should look</li><li><strong>Scope:</strong> This will apply to every h1 element automatically</li><li><strong>Analogy:</strong> Think of it like setting 'Heading 1' style in Microsoft Word</li></ul>",
              businessContext: "The main title of your application needs to stand out and establish authority - this targets that specific element."
            },
            {
              line: "color: #003d7a;",
              explanation: "Breaking down color selection:<br/><br/><strong>Color Properties:</strong><ul class='space-y-2'><li><code>'color'</code> = CSS property that controls text color</li><li><code>'#003d7a'</code> = Hex code for deep government blue</li><li><code>'00'</code> = No red component</li><li><code>'3d'</code> = Some green component (creates depth)</li><li><code>'7a'</code> = Strong blue component</li><li><strong>Standards:</strong> This specific blue is used across UK government websites for consistency</li><li><strong>Analogy:</strong> It's like having an official company color that must be used exactly</li></ul>",
              businessContext: "Professional applications need consistent branding - this blue color establishes trust and government authority that users expect."
            },
            {
              line: "margin-bottom: 10px;",
              explanation: "Understanding directional spacing:<br/><br/><strong>Directional Margin Properties:</strong><ul class='space-y-2'><li><code>'margin-bottom'</code> = Space outside the element, specifically below it</li><li><code>'10px'</code> = 10 pixels (about 1/8 inch on screen)</li><li><strong>Scope:</strong> Only affects the bottom - doesn't change top, left, or right spacing</li><li><strong>Purpose:</strong> Creates visual separation between the heading and whatever comes next</li><li><strong>Analogy:</strong> Like pressing Enter after a title in Word to add space</li></ul>",
              businessContext: "Proper spacing improves readability and helps users quickly scan the page hierarchy - essential for busy civil servants."
            },
            {
              line: "h2 {",
              explanation: "Targeting secondary headings:<ul><li>'h2' = CSS selector for all <h2> HTML elements</li><li><h2> = Second-level headings (like section titles in a document)</li><li>These are less important than h1 but more important than regular text</li><li>Think of h1 as the document title, h2 as chapter headings</li><li>This creates a visual hierarchy that guides the user's eye</li></ul>",
              businessContext: "Section headings like 'Add New Task' and 'Current Tasks' need to be visually distinct but secondary to the main title."
            },
            {
              line: "color: #4b5563;",
              explanation: "Creating visual hierarchy with color:<ul><li>'color' = Text color property (same as before)</li><li>'#4b5563' = Medium gray hex code</li><li>'4b' = Moderate red component</li><li>'55' = Moderate green component</li><li>'63' = Moderate blue component (creates neutral gray)</li><li>This gray is darker than body text but lighter than the main heading</li><li>Creates a hierarchy: Blue h1 (most important) > Gray h2 (sections) > Black text (content)</li></ul>",
              businessContext: "Visual hierarchy helps users understand the page structure - gray section headings are prominent but don't compete with the main blue title."
            },
            {
              line: "border-bottom: 2px solid #e5e7eb;",
              explanation: "Creating visual separators:<ul><li>'border-bottom' = Adds a border only to the bottom edge</li><li>'2px' = Border thickness (2 pixels - thin but visible)</li><li>'solid' = Border style (continuous line, not dashed or dotted)</li><li>'#e5e7eb' = Light gray color for the border (subtle, not overpowering)</li><li>This creates a horizontal line under each h2 heading</li><li>Like using the underline feature in Word, but more controlled</li></ul>",
              businessContext: "Visual separators help users quickly identify different sections like 'Add Task' vs 'View Tasks' - reducing cognitive load and improving task completion speed."
            },
            {
              line: "padding-bottom: 5px;",
              explanation: "Fine-tuning visual spacing:<ul><li>'padding-bottom' = Internal space at the bottom, inside the element</li><li>'5px' = Small amount (half the size of margin-bottom above)</li><li>Creates breathing room between the text and the underline border</li><li>Without this, the border would touch the text directly</li><li>It's like adjusting line spacing in Word to make text more readable</li><li>The difference between padding and margin: padding is inside, margin is outside</li></ul>",
              businessContext: "Small details like proper spacing make interfaces feel polished and professional - important for government applications that need to appear trustworthy."
            }
          ]
        },
        language: 'css' as const,
        hints: [
          "CSS uses curly braces { } to group style rules - open with { and close with }",
          "Color codes like #003d7a are hex values - this creates a professional government blue",
          "Spacing tip: margin adds space outside elements, padding adds space inside",
          "The 'px' unit means pixels - 10px is roughly the width of your fingernail",
          "Not seeing changes? Check that each CSS line ends with a semicolon ;"
        ],
        startingCode: `/* Ministry of Silly Walks - Task Manager Styles */

body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
}

/* Step 2: Add heading styles here */`,
        targetCode: `/* Ministry of Silly Walks - Task Manager Styles */

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
}`,
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
        title: 'Style the Task Input and Task Display with External CSS',
        description: 'Let\'s make the input field look professional and create a proper task card design that makes tasks easy to read and manage using our external CSS file.',
        instructions: [
          'Continue working in the CSS file to complete the styling',
          'Find the comment "/* Step 3: Add input and task styles here */" in the styles.css file',
          'Replace it with the CSS code shown below',
          'This will style both the input field and task cards',
          'The input will become full-width with professional padding',
          'Watch how CSS transforms basic HTML elements into professional interface components'
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
              explanation: "Targeting form elements:<br/><br/><strong>Input Selector Properties:</strong><ul class='space-y-2'><li><code>'input'</code> = CSS selector that finds all &lt;input&gt; HTML elements</li><li><code>&lt;input&gt;</code> = Form fields where users type information</li><li><strong>Scope:</strong> This will style text inputs, not buttons or checkboxes</li><li><strong>Consistency:</strong> All input fields on the page will get the same styling for consistency</li><li><strong>Analogy:</strong> Think of it like setting a default format for all text boxes in a Word form</li></ul>",
              businessContext: "The input field is where users enter their task descriptions - it needs to be prominent and easy to use for quick data entry."
            },
            {
              line: "width: 100%;",
              explanation: "Understanding responsive width:<br/><br/><strong>Width Properties:</strong><ul class='space-y-2'><li><code>'width'</code> = CSS property that controls how wide an element is</li><li><code>'100%'</code> = Take up all available width in the parent container</li><li><code>'%'</code> = Percentage unit (adapts to container size)</li><li><strong>Behavior:</strong> This makes the input stretch across the full width available</li><li><strong>Responsive:</strong> On mobile it's narrower, on desktop it's wider - adapts automatically</li><li><strong>Analogy:</strong> Like setting a table column to 'auto-fit' in Word</li></ul>",
              businessContext: "Wide input fields allow users to see more of what they're typing, reducing errors and improving the user experience when creating tasks."
            },
            {
              line: "padding: 10px;",
              explanation: "Creating comfortable input space:<br/><br/><strong>Input Padding Properties:</strong><ul class='space-y-2'><li><code>'padding'</code> = Internal space inside the input field</li><li><code>'10px'</code> = 10 pixels on all sides (top, right, bottom, left)</li><li><strong>Purpose:</strong> This is space between the border and where text appears when typing</li><li><strong>Effect:</strong> Makes the input field taller and the text easier to click on</li><li><strong>Without it:</strong> Text would be cramped right against the edges</li><li><strong>Analogy:</strong> Like adding margins inside a text box to make it more comfortable</li></ul>",
              businessContext: "Adequate padding makes form fields feel more clickable and professional - important for a tool civil servants will use daily."
            },
            {
              line: "border: 1px solid #d1d5db;",
              explanation: "Creating clear boundaries:<br/><br/><strong>Border Properties:</strong><ul class='space-y-2'><li><code>'border'</code> = CSS property that adds a line around an element</li><li><code>'1px'</code> = Border thickness (very thin, just 1 pixel)</li><li><code>'solid'</code> = Border style (continuous line, not dashed)</li><li><code>'#d1d5db'</code> = Light gray hex code for the border color</li><li><strong>Purpose:</strong> This creates a visible rectangle showing where the input field is</li><li><strong>UX Impact:</strong> Without borders, users wouldn't know where to click to type</li><li><strong>Analogy:</strong> Like drawing a box around a fill-in-the-blank area on a form</li></ul>",
              businessContext: "Clear visual boundaries help users understand where they can click to interact - essential for efficient task creation workflow."
            },
            {
              line: "border-radius: 4px;",
              explanation: "Softening sharp edges:<br/><br/><strong>Border Radius Properties:</strong><ul class='space-y-2'><li><code>'border-radius'</code> = CSS property that rounds the corners of elements</li><li><code>'4px'</code> = Amount of rounding (small - just softens harsh corners)</li><li><strong>Coverage:</strong> Applies to all four corners equally</li><li><strong>Range:</strong> '0' would be perfectly square, higher numbers create more rounding</li><li><strong>Effect:</strong> This makes the input look modern and friendly instead of harsh</li><li><strong>Analogy:</strong> Like using rounded corners when drawing shapes in PowerPoint</li></ul>",
              businessContext: "Rounded corners feel more modern and approachable than sharp corners - making the government tool feel user-friendly rather than austere."
            },
            {
              line: "font-size: 16px;",
              explanation: "Setting readable text size:<br/><br/><strong>Font Size Properties:</strong><ul class='space-y-2'><li><code>'font-size'</code> = CSS property controlling how big text appears</li><li><code>'16px'</code> = 16 pixels tall (standard readable size)</li><li><code>'px'</code> = Pixel units (fixed size regardless of screen)</li><li><strong>Accessibility:</strong> 16px is the minimum size recommended for mobile accessibility</li><li><strong>Balance:</strong> Smaller text would be hard to read, larger would look oversized</li><li><strong>Analogy:</strong> Like setting 12pt font in Word, but using pixel measurements</li></ul>",
              businessContext: "Proper font size prevents zoom-in on mobile devices and ensures readability for users of all ages - important for accessibility compliance."
            },
            {
              line: "margin-bottom: 20px;",
              explanation: "Creating space between elements:<br/><br/><strong>Element Spacing Properties:</strong><ul class='space-y-2'><li><code>'margin-bottom'</code> = External space below the element</li><li><code>'20px'</code> = 20 pixels of space (twice the size of the padding above)</li><li><strong>Direction:</strong> Only affects the bottom - leaves space before the next element</li><li><strong>Purpose:</strong> Prevents the input from touching whatever comes after it</li><li><strong>Key difference:</strong> Margin is outside the element, padding is inside</li><li><strong>Analogy:</strong> Like pressing Enter twice after a paragraph in Word</li></ul>",
              businessContext: "Proper spacing between interface elements prevents users from accidentally clicking the wrong thing - crucial for efficient task management."
            },
            {
              line: "div {",
              explanation: "Styling container elements:<br/><br/><strong>Container Selector Properties:</strong><ul class='space-y-2'><li><code>'div'</code> = CSS selector targeting all &lt;div&gt; HTML elements</li><li><code>&lt;div&gt;</code> = Generic container elements used to group content</li><li><strong>Context:</strong> In our case, each task is wrapped in a div</li><li><strong>Effect:</strong> This will make every div look like a professional card</li><li><strong>Concept:</strong> Think of divs as invisible boxes that we're now making visible and styled</li><li><strong>Analogy:</strong> Like applying a border and shading to text boxes in Word</li></ul>",
              businessContext: "Each task needs to be visually distinct and easy to scan - cards help users quickly identify and read individual tasks."
            },
            {
              line: "background-color: white;",
              explanation: "Creating contrast with background color:<br/><br/><strong>Background Color Properties:</strong><ul class='space-y-2'><li><code>'background-color'</code> = CSS property for the element's background</li><li><code>'white'</code> = Keyword for pure white color (could also write #ffffff)</li><li><strong>Contrast:</strong> Creates contrast against the light gray page background</li><li><strong>Visual effect:</strong> Makes each task 'pop' visually like cards on a table</li><li><strong>Psychology:</strong> White suggests cleanliness and readability</li><li><strong>Analogy:</strong> Like highlighting text with a white background in Word</li></ul>",
              businessContext: "White cards on a gray background create clear visual separation - helping users focus on one task at a time."
            },
            {
              line: "border: 1px solid #e5e7eb;",
              explanation: "Defining card boundaries:<br/><br/><strong>Card Border Properties:</strong><ul class='space-y-2'><li><code>'border'</code> = Same as before, adds a line around the element</li><li><code>'1px solid'</code> = Thin, continuous line (same style as input)</li><li><code>'#e5e7eb'</code> = Light gray hex code (lighter than input border)</li><li><strong>Effect:</strong> Creates a subtle outline around each task card</li><li><strong>Balance:</strong> Not too dark (would be distracting) or too light (would be invisible)</li><li><strong>Analogy:</strong> Like drawing a light pencil line around each item in a list</li></ul>",
              businessContext: "Clear card boundaries help users understand where one task ends and another begins - essential for scanning task lists quickly."
            },
            {
              line: "border-radius: 8px;",
              explanation: "Creating card-like appearance:<br/><br/><strong>Card Radius Properties:</strong><ul class='space-y-2'><li><code>'border-radius'</code> = Rounds corners (same property as input)</li><li><code>'8px'</code> = More rounding than input (4px) for stronger card effect</li><li><strong>Visual effect:</strong> Makes each task look like a physical card with rounded corners</li><li><strong>Hierarchy:</strong> Larger radius creates more obvious 'card' feeling</li><li><strong>Modern design:</strong> Consistent with modern interface design patterns</li><li><strong>Analogy:</strong> Like using rounded rectangles instead of sharp boxes</li></ul>",
              businessContext: "Card-style design makes each task feel like a separate, manageable item - psychologically helping users feel organized and in control."
            },
            {
              line: "padding: 15px;",
              explanation: "Creating comfortable reading space:<br/><br/><strong>Card Padding Properties:</strong><ul class='space-y-2'><li><code>'padding'</code> = Internal space inside the card (same concept as input)</li><li><code>'15px'</code> = More space than input padding (10px) for better readability</li><li><strong>Coverage:</strong> Applies to all sides - top, right, bottom, left</li><li><strong>Protection:</strong> Prevents task text from touching the card edges</li><li><strong>Comfort:</strong> Creates a comfortable 'cushion' around the content</li><li><strong>Analogy:</strong> Like setting margins inside a text box to make content more readable</li></ul>",
              businessContext: "Internal padding makes task content more readable and gives the interface breathing room - reducing visual stress for busy civil servants."
            },
            {
              line: "margin-bottom: 15px;",
              explanation: "Separating individual tasks:<ul><li>'margin-bottom' = External space below each card</li><li>'15px' = Same amount as internal padding for visual consistency</li><li>Creates gaps between task cards (like spaces between playing cards)</li><li>Prevents tasks from visually running together</li><li>Makes it easy to see where one task ends and another begins</li><li>Like double-spacing between paragraphs in a document</li></ul>",
              businessContext: "Spacing between tasks helps users scan the list and prevents them from reading the wrong task - crucial for accurate work assignment."
            },
            {
              line: "box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);",
              explanation: "Creating realistic depth with shadows:<ul><li>'box-shadow' = CSS property that adds shadow effects</li><li>'0' = No horizontal offset (shadow directly below)</li><li>'1px' = Vertical offset (shadow 1 pixel down)</li><li>'3px' = Blur radius (how soft/spread out the shadow is)</li><li>'rgba(0, 0, 0, 0.1)' = Semi-transparent black (10% opacity)</li><li>Creates the illusion that cards are floating slightly above the page</li><li>Like adding a drop shadow effect in PowerPoint or Word</li></ul>",
              businessContext: "Subtle shadows make task cards feel more interactive and important - helping users understand these are actionable items they can work with."
            }
          ]
        },
        language: 'css' as const,
        startingCode: `/* Ministry of Silly Walks - Task Manager Styles */

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

/* Step 3: Add input and task styles here */`,
        targetCode: `/* Ministry of Silly Walks - Task Manager Styles */

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
}`,
        hints: [
          "Input styling tip: width: 100% makes the field stretch across the full container width",
          "Border-radius rounds corners - try changing 4px to 15px to see a dramatic difference!",
          "Box-shadow creates depth - the numbers control horizontal, vertical, blur, and opacity",
          "Struggling with 'div'? It targets all <div> elements to turn them into styled cards",
          "Pro tip: Save frequently and watch the preview update - CSS changes are instant!"
        ],
        explanation: {
          whatIsHappening: "You've transformed the basic input and task display into professional UI components using external CSS. The input field now spans the full width with comfortable padding and rounded corners. The task is displayed in a card format with a white background, subtle border, and shadow - making it stand out from the page background while being easy to read.",
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

  const allStepsComplete = completedSteps.length === steps.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <TutorialBreadcrumb />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlWithParams("/tutorial/chapter-1")} className="flex items-center text-gray-600 hover:text-gray-900">
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
                    onClick={() => changeStep(index)}
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
                    href={getUrlWithParams("/tutorial/chapter-3")} 
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
                      onClick={() => changeStep(Math.max(0, currentStep - 1))}
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
                          changeStep(currentStep + 1)
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
                        changeStep(currentStep + 1)
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