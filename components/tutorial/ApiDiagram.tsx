'use client'

import { Monitor, Server, Database, ArrowRight, ArrowLeft, Globe, Shield, Users } from 'lucide-react'

export default function ApiDiagram() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 my-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">API Communication Flow</h4>
      
      {/* Frontend Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900">Frontend (User Interface)</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Task Manager</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>User clicks "Add Task"</p>
              <p>Form data collected</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">HTTP Request</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>POST /api/tasks</p>
              <p>JSON data sent</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Gateway Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-900">API Layer (Communication Bridge)</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Authentication</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Check user permissions</p>
              <p>Validate JWT token</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Business Logic</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Validate task data</p>
              <p>Apply business rules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Section */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-900">Backend (Data & Processing)</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Server className="w-8 h-8 text-orange-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Server Processing</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Generate unique ID</p>
              <p>Add timestamp</p>
            </div>
          </div>
          
          <ArrowRight className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Database Storage</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Save task permanently</p>
              <p>Update task list</p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Flow */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-900">Response Flow</h5>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">201</span>
            </div>
            <h6 className="font-medium text-gray-900 text-sm">Success Response</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Task created successfully</p>
            </div>
          </div>
          
          <ArrowLeft className="text-gray-400" size={20} />
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h6 className="font-medium text-gray-900 text-sm">UI Update</h6>
            <div className="bg-gray-50 p-2 rounded text-xs mt-1">
              <p>Task appears in list</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ministry Example */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h6 className="font-medium text-blue-900 mb-3">Ministry Example: Adding a Silly Walk Task</h6>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="bg-blue-600 text-white px-2 py-1 rounded mb-1">1</div>
            <p className="text-blue-800">Staff member enters: "Review John's application"</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white px-2 py-1 rounded mb-1">2</div>
            <p className="text-blue-800">API validates user has evaluation permissions</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-600 text-white px-2 py-1 rounded mb-1">3</div>
            <p className="text-blue-800">Server creates task with ID: TASK-2024-001</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white px-2 py-1 rounded mb-1">4</div>
            <p className="text-blue-800">Database stores task permanently</p>
          </div>
        </div>
      </div>
    </div>
  )
}