'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TutorialRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the introduction page
    router.replace('/tutorial/introduction')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Redirecting to Tutorial...
        </h1>
        <p className="text-gray-600">
          If you are not redirected automatically, 
          <a href="/tutorial/introduction" className="text-blue-600 hover:underline ml-1">
            click here
          </a>
        </p>
      </div>
    </div>
  )
}