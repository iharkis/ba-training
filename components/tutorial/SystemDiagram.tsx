'use client'

import { Monitor, Server, Database, ArrowRight, Users, Globe } from 'lucide-react'

export default function SystemDiagram() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Three-Tier Architecture: How Web Applications Work
      </h4>
      
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Users */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Users className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">Users</p>
          <p className="text-xs text-gray-500 text-center">John, Terry, Michael<br/>& Graham</p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col lg:flex-row items-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
          <span className="text-xs text-gray-500 mt-1 lg:mt-0 lg:ml-2">HTTP Requests</span>
        </div>

        {/* Frontend */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <Monitor className="w-10 h-10 text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-900">Frontend</p>
            <p className="text-xs text-blue-700">Browser / Client</p>
            <div className="bg-blue-50 p-2 rounded mt-2 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-center">
                  <Globe className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-blue-800">HTML Structure</span>
                </div>
                <div className="text-blue-700">CSS Styling</div>
                <div className="text-blue-700">JavaScript Logic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col lg:flex-row items-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
          <span className="text-xs text-gray-500 mt-1 lg:mt-0 lg:ml-2">API Calls</span>
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <Server className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-green-900">Backend</p>
            <p className="text-xs text-green-700">Server / API</p>
            <div className="bg-green-50 p-2 rounded mt-2 text-xs">
              <div className="space-y-1">
                <div className="text-green-800">Business Logic</div>
                <div className="text-green-700">Authentication</div>
                <div className="text-green-700">Data Processing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col lg:flex-row items-center">
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
          <span className="text-xs text-gray-500 mt-1 lg:mt-0 lg:ml-2">SQL Queries</span>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
            <Database className="w-10 h-10 text-yellow-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-yellow-900">Database</p>
            <p className="text-xs text-yellow-700">Data Storage</p>
            <div className="bg-yellow-50 p-2 rounded mt-2 text-xs">
              <div className="space-y-1">
                <div className="text-yellow-800">Task Records</div>
                <div className="text-yellow-700">User Data</div>
                <div className="text-yellow-700">Status History</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Description */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">How It Works:</h5>
        <ol className="text-sm text-gray-700 space-y-1">
          <li><strong>1.</strong> John Cleese opens the website in his browser (Frontend)</li>
          <li><strong>2.</strong> He clicks "Add Task" - JavaScript sends a request to the server (Backend)</li>
          <li><strong>3.</strong> The server processes the request and saves the task to the database</li>
          <li><strong>4.</strong> The database confirms the save and returns the task data</li>
          <li><strong>5.</strong> The server sends the updated task list back to John's browser</li>
          <li><strong>6.</strong> The frontend displays the new task in the list</li>
        </ol>
      </div>
    </div>
  )
}