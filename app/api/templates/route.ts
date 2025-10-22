import { type NextRequest, NextResponse } from "next/server"

// Mock database
const templates: any[] = []

export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database
    return NextResponse.json({
      success: true,
      templates,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, trigger, message } = await request.json()

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    const template = {
      id: Date.now(),
      name,
      trigger,
      message,
      enabled: true,
      createdAt: new Date().toISOString(),
    }

    templates.push(template)

    return NextResponse.json({
      success: true,
      template,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
