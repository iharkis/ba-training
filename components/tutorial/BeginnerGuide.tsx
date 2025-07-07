'use client'

import { useState } from 'react'
import { ChevronRight, Code, Eye, Lightbulb, CheckCircle } from 'lucide-react'

export default function BeginnerGuide() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Welcome to Your First Code!",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-tutorial-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg text-gray-700">
            Don't worry if you've never coded before! We'll guide you through every single step.
          </p>
          <p className="text-gray-600">
            Think of this like learning to write - we'll start with simple "words" (HTML tags) 
            and build up to "sentences" (complete features).
          </p>
        </div>
      )
    },
    {
      title: "How the Code Editor Works",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">✏️ Code Editor (Left Side)</h4>
            <p className="text-sm text-gray-700">
              This is where you'll type your code. It's like a text editor, but for creating websites. 
              We'll tell you exactly what to type and where.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">👁️ Live Preview (Right Side)</h4>
            <p className="text-sm text-gray-700">
              As you type code, you'll see the actual website appear here in real-time. 
              It's like magic - your code becomes a real webpage!
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Pro tip:</strong> If you get stuck, click the "Need Help?" button for hints!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What Are HTML Tags?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            HTML tags are like instructions that tell the web browser what to display. 
            They're written inside angle brackets like this:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            &lt;h1&gt;This is a heading&lt;/h1&gt;<br/>
            &lt;p&gt;This is a paragraph&lt;/p&gt;
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-900">Opening Tag</h4>
              <p className="text-sm text-blue-800">&lt;h1&gt; - starts the heading</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-900">Closing Tag</h4>
              <p className="text-sm text-green-800">&lt;/h1&gt; - ends the heading</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Think of them like quotation marks - they wrap around the content to define what it is.
          </p>
        </div>
      )
    },
    {
      title: "Ready to Start?",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg text-gray-700">
            You're all set! Remember:
          </p>
          <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">✅ Follow the instructions step by step</p>
            <p className="text-sm">✅ Type exactly what we show you</p>
            <p className="text-sm">✅ Use the hints if you get stuck</p>
            <p className="text-sm">✅ Watch the preview update as you type</p>
          </div>
          <p className="text-gray-600">
            Let's build something amazing for the Ministry of Silly Walks!
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="tutorial-card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Before We Start Coding...
        </h3>
        <p className="text-gray-600">
          A quick 2-minute introduction for first-time coders
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center space-x-2 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-tutorial-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Slide content */}
      <div className="min-h-[300px] flex items-center">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {slides[currentSlide].title}
          </h4>
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-blue-200 mt-6">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentSlide === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-tutorial-primary hover:bg-blue-100'
          }`}
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-600">
          {currentSlide + 1} of {slides.length}
        </span>

        {currentSlide < slides.length - 1 ? (
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            className="flex items-center px-4 py-2 bg-tutorial-primary text-white rounded-md hover:bg-blue-700"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        ) : (
          <button 
            onClick={() => {
              // Hide this guide and start the first exercise
              const guide = document.getElementById('beginner-guide');
              if (guide) guide.style.display = 'none';
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Start Coding! <Code className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  )
}