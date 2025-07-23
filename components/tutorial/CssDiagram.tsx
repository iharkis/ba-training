'use client'

import { FileText, Palette, Monitor } from 'lucide-react'

export default function CssDiagram() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 my-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">How CSS Works With HTML</h4>
      
      {/* HTML and CSS sections side by side, then Result below */}
      <div className="flex flex-col space-y-4">
        {/* HTML + CSS Row */}
        <div className="flex justify-center items-start gap-1">
          {/* HTML Column */}
          <div className="text-center flex-1 max-w-xs">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-1">HTML</h5>
            <div className="bg-gray-50 p-1 rounded text-xs text-left">
              <code className="text-blue-600">
                &lt;h1&gt;Task Manager&lt;/h1&gt;<br/>
                &lt;p&gt;Welcome&lt;/p&gt;<br/>
                &lt;input&gt;
              </code>
            </div>
            <p className="text-xs text-gray-600 mt-1">Provides structure and content</p>
          </div>

          {/* Plus sign */}
          <div className="flex items-center justify-center px-2 mt-8">
            <div className="text-xl font-bold text-gray-400">+</div>
          </div>

          {/* CSS Column */}
          <div className="text-center flex-1 max-w-xs">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <h5 className="font-semibold text-gray-900 mb-1">CSS</h5>
            <div className="bg-gray-50 p-1 rounded text-xs text-left">
              <code className="text-purple-600">
                h1 &#123; color: blue &#125;<br/>
                p &#123; font: 16px &#125;<br/>
                input &#123; width: 100% &#125;
              </code>
            </div>
            <p className="text-xs text-gray-600 mt-1">Adds styling and visual design</p>
          </div>
        </div>

        {/* Arrow pointing down */}
        <div className="flex justify-center">
          <div className="text-xl text-gray-400">↓</div>
        </div>

        {/* Result */}
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Monitor className="w-6 h-6 text-green-600" />
          </div>
          <h5 className="font-semibold text-gray-900 mb-1">Professional Website</h5>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded border">
            <h3 className="text-sm font-bold text-blue-700 mb-1">Task Manager</h3>
            <p className="text-gray-700 mb-1 text-xs">Welcome</p>
            <input 
              type="text" 
              placeholder="Enter task" 
              className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
              disabled
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">Final result users see</p>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-3">
        <p className="text-sm text-blue-800">
          <strong>Key Insight:</strong> HTML without CSS looks like a basic document. CSS transforms it into a professional, user-friendly interface that meets government design standards.
        </p>
      </div>
    </div>
  )
}