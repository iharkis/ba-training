'use client'

import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'

interface SyntaxHighlighterProps {
  code: string
  language: 'html' | 'css' | 'javascript'
  title?: string
}

export default function SyntaxHighlighter({ code, language, title }: SyntaxHighlighterProps) {
  const [isDark, setIsDark] = useState(true)

  const highlightHTML = (code: string, isDark: boolean) => {
    const colors = isDark ? {
      tag: 'text-blue-400',
      attribute: 'text-green-400',
      value: 'text-yellow-300',
      text: 'text-gray-300',
      comment: 'text-gray-500'
    } : {
      tag: 'text-blue-600',
      attribute: 'text-green-600',
      value: 'text-red-600',
      text: 'text-gray-800',
      comment: 'text-gray-500'
    }

    // Simple highlighting - just escape HTML and add basic coloring
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')

    return escaped
      .replace(/(&lt;\/?)([\w-]+)/g, `<span class="${colors.tag}">$1$2</span>`)
      .replace(/([\w-]+)=(&quot;[^&]*&quot;)/g, `<span class="${colors.attribute}">$1</span>=<span class="${colors.value}">$2</span>`)
      .replace(/&gt;/g, `<span class="${colors.tag}">&gt;</span>`)
  }

  const highlightCSS = (code: string, isDark: boolean) => {
    const colors = isDark ? {
      selector: 'text-yellow-300',
      property: 'text-blue-400',
      value: 'text-green-400',
      comment: 'text-gray-500'
    } : {
      selector: 'text-purple-600',
      property: 'text-blue-600',
      value: 'text-green-600',
      comment: 'text-gray-500'
    }

    return code
      .replace(/\/\*(.*?)\*\//g, `<span class="${colors.comment}">/*$1*/</span>`)
      .replace(/([^{}\s]+)\s*{/g, `<span class="${colors.selector}">$1</span> {`)
      .replace(/(\w+[\w-]*)\s*:/g, `<span class="${colors.property}">$1</span>:`)
      .replace(/:\s*([^;]+);/g, `: <span class="${colors.value}">$1</span>;`)
  }

  const highlightJavaScript = (code: string, isDark: boolean) => {
    const colors = isDark ? {
      keyword: 'text-purple-400',
      string: 'text-green-400',
      function: 'text-yellow-300',
      comment: 'text-gray-500'
    } : {
      keyword: 'text-purple-600',
      string: 'text-green-600',
      function: 'text-blue-600',
      comment: 'text-gray-500'
    }

    return code
      .replace(/\/\/(.*?)$/gm, `<span class="${colors.comment}">//$1</span>`)
      .replace(/\/\*(.*?)\*\//g, `<span class="${colors.comment}">/*$1*/</span>`)
      .replace(/\b(const|let|var|function|if|else|for|while|return|document|getElementById|addEventListener)\b/g, 
        `<span class="${colors.keyword}">$1</span>`)
      .replace(/'([^']*)'/g, `<span class="${colors.string}">'$1'</span>`)
      .replace(/"([^"]*)"/g, `<span class="${colors.string}">"$1"</span>`)
      .replace(/(\w+)\s*\(/g, `<span class="${colors.function}">$1</span>(`)
  }

  const getHighlightedCode = () => {
    switch (language) {
      case 'html':
        return highlightHTML(code, isDark)
      case 'css':
        return highlightCSS(code, isDark)
      case 'javascript':
        return highlightJavaScript(code, isDark)
      default:
        return code
    }
  }

  return (
    <div 
      className="rounded-lg border"
      style={{
        backgroundColor: isDark ? '#111827' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb'
      }}
    >
      {title && (
        <div 
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#f9fafb',
            borderColor: isDark ? '#374151' : '#e5e7eb'
          }}
        >
          <h3 className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h3>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      )}
      <div 
        className="p-4"
        style={{
          backgroundColor: isDark ? '#111827' : '#ffffff'
        }}
      >
        <pre 
          className="text-sm overflow-x-auto"
          style={{
            backgroundColor: isDark ? '#111827' : '#ffffff'
          }}
        >
          <code
            className={`block font-mono ${isDark ? 'text-gray-300' : 'text-gray-800'}`}
            dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
          />
        </pre>
      </div>
    </div>
  )
}