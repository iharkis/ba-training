import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BA Development Tutorial - Ministry of Silly Walks',
  description: 'Interactive tutorial teaching Business Analysts web development fundamentals through building a government task management system',
  keywords: 'business analyst, web development, tutorial, typescript, react, mongodb',
  authors: [{ name: 'BA Training Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1d70b8" />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}