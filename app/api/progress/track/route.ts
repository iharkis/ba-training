import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface UserActivity {
  name: string
  lastStep: string
  lastChapter: string
  lastActivity: string
  stepsCompleted: string[]
  stepTimestamps: { [stepId: string]: string }
  chaptersStarted: { [chapterId: string]: string }
}

interface ProgressData {
  users: { [userId: string]: UserActivity }
  analytics: {
    totalUsers: number
    lastUpdated: string
  }
}

const DATA_FILE = path.join(process.cwd(), 'data', 'user-progress.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load existing data or create empty structure
async function loadProgressData(): Promise<ProgressData> {
  await ensureDataDirectory()
  
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    // File doesn't exist, return empty structure
    return {
      users: {},
      analytics: {
        totalUsers: 0,
        lastUpdated: new Date().toISOString()
      }
    }
  }
}

// Save progress data
async function saveProgressData(data: ProgressData) {
  await ensureDataDirectory()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// Generate user ID from name (simple approach)
function generateUserId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now()
}

export async function POST(request: NextRequest) {
  try {
    const { name, stepId, chapterId, timestamp } = await request.json()

    if (!name || !stepId || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: name, stepId, timestamp' },
        { status: 400 }
      )
    }

    // Load existing data
    const data = await loadProgressData()

    // Find existing user or create new one
    let userId = Object.keys(data.users).find(id => 
      data.users[id].name.toLowerCase() === name.toLowerCase()
    )

    if (!userId) {
      userId = generateUserId(name)
      data.users[userId] = {
        name,
        lastStep: stepId,
        lastChapter: chapterId || 'unknown',
        lastActivity: timestamp,
        stepsCompleted: [],
        stepTimestamps: {},
        chaptersStarted: {}
      }
      data.analytics.totalUsers = Object.keys(data.users).length
    }

    const user = data.users[userId]

    // Ensure stepTimestamps exists for existing users
    if (!user.stepTimestamps) {
      user.stepTimestamps = {}
    }

    // Update user data
    user.lastStep = stepId
    user.lastActivity = timestamp
    
    if (chapterId) {
      user.lastChapter = chapterId
      
      // Track when chapter was first started
      if (!user.chaptersStarted[chapterId]) {
        user.chaptersStarted[chapterId] = timestamp
      }
    }

    // Add step to completed list if not already there
    if (!user.stepsCompleted.includes(stepId)) {
      user.stepsCompleted.push(stepId)
    }

    // Always update the timestamp for this step (in case they repeat it)
    user.stepTimestamps[stepId] = timestamp

    // Update analytics
    data.analytics.lastUpdated = new Date().toISOString()

    // Save data
    await saveProgressData(data)

    return NextResponse.json({ success: true, userId })

  } catch (error) {
    console.error('Progress tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track progress' },
      { status: 500 }
    )
  }
}

// GET endpoint for admin to retrieve data
export async function GET(request: NextRequest) {
  try {
    const data = await loadProgressData()
    
    // Transform data for admin view
    const users = data.users ? Object.entries(data.users).map(([userId, user]) => {
      // Sort steps by timestamp (most recent first)
      const stepDetails = user.stepTimestamps ? Object.entries(user.stepTimestamps)
        .map(([stepId, timestamp]) => ({ stepId, timestamp }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) : []

      return {
        id: userId,
        name: user.name,
        lastStep: user.lastStep,
        lastChapter: user.lastChapter,
        lastActivity: user.lastActivity,
        stepsCompleted: user.stepsCompleted ? user.stepsCompleted.length : 0,
        chaptersStartedCount: user.chaptersStarted ? Object.keys(user.chaptersStarted).length : 0,
        firstChapterStart: user.chaptersStarted ? (Object.values(user.chaptersStarted)[0] || user.lastActivity) : user.lastActivity,
        stepDetails,
        chaptersStarted: user.chaptersStarted || {}
      }
    }) : []

    // Sort by last activity (most recent first)
    users.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())

    return NextResponse.json({
      users,
      analytics: data.analytics
    })

  } catch (error) {
    console.error('Failed to retrieve progress data:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve data' },
      { status: 500 }
    )
  }
}