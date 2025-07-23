'use client'

import { MousePointer, Zap, Code, Settings } from 'lucide-react'

export default function JavaScriptDiagram() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 my-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">How JavaScript Makes Web Pages Interactive</h4>
      
      {/* Flow diagram showing interaction */}
      <div className="flex items-center justify-center space-x-8 mb-6">
        
        {/* User Action */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <MousePointer className="w-8 h-8 text-blue-600" />
          </div>
          <h5 className="font-semibold text-gray-900 mb-1">User Action</h5>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <p>User clicks<br/>"Add Task" button</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-2xl font-bold text-gray-400">→</div>

        {/* JavaScript Processing */}
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Code className="w-8 h-8 text-yellow-600" />
          </div>
          <h5 className="font-semibold text-gray-900 mb-1">JavaScript</h5>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <p>1. Get input text<br/>2. Validate not empty<br/>3. Create task element</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-2xl font-bold text-gray-400">→</div>

        {/* Page Update */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Zap className="w-8 h-8 text-green-600" />
          </div>
          <h5 className="font-semibold text-gray-900 mb-1">Page Updates</h5>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <p>New task appears<br/>instantly without<br/>page reload</p>
          </div>
        </div>
      </div>

      {/* Code examples */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">Vanilla JavaScript (This Tutorial)</h5>
          <div className="bg-white p-3 rounded text-sm font-mono">
            <code className="text-blue-800">
              document.getElementById('btn')<br/>
              &nbsp;&nbsp;.addEventListener('click', function() &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;// Add task logic here<br/>
              &nbsp;&nbsp;&#125;);
            </code>
          </div>
          <p className="text-xs text-blue-700 mt-2">Direct DOM manipulation - simple but verbose</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-semibold text-purple-900 mb-2">React Framework (Real World)</h5>
          <div className="bg-white p-3 rounded text-sm font-mono">
            <code className="text-purple-800">
              const [tasks, setTasks] = useState([]);<br/>
              <br/>
              &lt;button onClick=&#123;addTask&#125;&gt;<br/>
              &nbsp;&nbsp;Add Task<br/>
              &lt;/button&gt;
            </code>
          </div>
          <p className="text-xs text-purple-700 mt-2">Component-based - more powerful and maintainable</p>
        </div>
      </div>

      {/* Framework comparison */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-3">JavaScript in the Real World</h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h6 className="font-medium text-gray-800 mb-2">Frontend Frameworks</h6>
            <ul className="text-gray-700 space-y-1">
              <li>• React (most popular)</li>
              <li>• Vue.js</li>
              <li>• Angular</li>
              <li>• Svelte</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-800 mb-2">Backend JavaScript</h6>
            <ul className="text-gray-700 space-y-1">
              <li>• Node.js</li>
              <li>• Express.js</li>
              <li>• Next.js</li>
              <li>• Serverless functions</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-800 mb-2">Alternative Languages</h6>
            <ul className="text-gray-700 space-y-1">
              <li>• TypeScript (JavaScript++)</li>
              <li>• Kotlin (Android/Web)</li>
              <li>• Dart (Flutter)</li>
              <li>• Swift (iOS/Web)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-sm text-blue-800">
          <strong>Why Learn Vanilla JavaScript First:</strong> Understanding the fundamentals helps you communicate with developers regardless of which framework they use. The core concepts (events, DOM manipulation, validation) are the same across all JavaScript frameworks.
        </p>
      </div>
    </div>
  )
}