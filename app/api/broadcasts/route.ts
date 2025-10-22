import { type NextRequest, NextResponse } from "next/server"

// Mock database
const broadcasts: any[] = []

export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database
    return NextResponse.json({
      success: true,
      broadcasts,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch broadcasts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, message, recipients, scheduledDate, scheduledTime } = await request.json()

    if (!title || !message || !scheduledDate) {
      return NextResponse.json({ error: "Title, message, and scheduled date are required" }, { status: 400 })
    }

    const broadcast = {
      id: Date.now(),
      title,
      message,
      recipients: 156, // Mock recipient count
      status: "scheduled",
      scheduledDate,
      scheduledTime,
      createdAt: new Date().toISOString(),
    }

    broadcasts.push(broadcast)

    return NextResponse.json({
      success: true,
      broadcast,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create broadcast" }, { status: 500 })
  }
}
