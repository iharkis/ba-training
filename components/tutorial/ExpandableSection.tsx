'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  variant?: 'default' | 'gentle' | 'encouraging'
  size?: 'sm' | 'md' | 'lg'
}

export default function ExpandableSection({ 
  title, 
  children, 
  defaultExpanded = false,
  variant = 'default',
  size = 'md'
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const variantStyles = {
    default: 'border-gray-200 bg-white',
    gentle: 'border-blue-200 bg-blue-50',
    encouraging: 'border-emerald-200 bg-emerald-50'
  }

  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`border rounded-xl ${variantStyles[variant]} ${sizeStyles[size]} transition-all duration-200 hover:shadow-sm`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isExpanded}
      >
        <h3 className={`font-medium text-gray-800 ${titleSizes[size]}`}>
          {title}
        </h3>
        <div className="flex items-center ml-4">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="mt-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  )
}