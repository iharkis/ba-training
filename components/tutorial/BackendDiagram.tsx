'use client'

import { Monitor, Server, Database, Users, ArrowRight, Cloud, Shield } from 'lucide-react'

export default function BackendDiagram() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 my-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Frontend vs Backend Architecture</h4>
      
      {/* Frontend Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900">Frontend (Client-Side)</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">User's Browser</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>HTML, CSS, JavaScript</p>
              <p>Temporary data only</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">User Interaction</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Click buttons</p>
              <p>Enter data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Arrow */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <div className="text-lg text-gray-400 mb-1">⬇</div>
          <div className="bg-yellow-50 px-3 py-1 rounded border border-yellow-200">
            <span className="text-xs font-medium text-yellow-800">HTTP Requests</span>
          </div>
          <div className="text-lg text-gray-400 mt-1">⬇</div>
        </div>
      </div>

      {/* Backend Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-900">Backend (Server-Side)</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Server className="w-8 h-8 text-purple-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Web Server</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Node.js, Python, Java</p>
              <p>Business logic</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Database</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>MySQL, PostgreSQL</p>
              <p>Permanent storage</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Security</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Authentication</p>
              <p>Authorization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow Example */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h6 className="font-medium text-gray-900 mb-3">Example: Adding a Task</h6>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">1</div>
            <span><strong>Frontend:</strong> User types "Review John's silly walk" and clicks Add Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full text-xs text-white flex items-center justify-center">2</div>
            <span><strong>Server:</strong> Validates data, creates unique task ID, applies business rules</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full text-xs text-white flex items-center justify-center">3</div>
            <span><strong>Database:</strong> Saves task permanently with timestamp and user info</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">4</div>
            <span><strong>Response:</strong> Server sends success message back to frontend</span>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-3">
        <p className="text-sm text-blue-800">
          <strong>Key Difference:</strong> Frontend handles user experience and display. Backend handles data persistence, security, and business logic. Both are essential for a complete government application.
        </p>
      </div>
    </div>
  )
}