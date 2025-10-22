import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const dateRange = request.nextUrl.searchParams.get("dateRange") || "7days"

    // Mock analytics data
    const analytics = {
      totalMessages: 12543,
      activeCustomers: 856,
      engagementRate: 68,
      avgResponseTime: 2.3,
      messageActivity: [
        { day: "Mon", sent: 45, received: 38 },
        { day: "Tue", sent: 52, received: 42 },
        { day: "Wed", sent: 48, received: 35 },
        { day: "Thu", sent: 61, received: 55 },
        { day: "Fri", sent: 55, received: 48 },
        { day: "Sat", sent: 67, received: 62 },
        { day: "Sun", sent: 72, received: 68 },
      ],
      topMessages: [
        { message: "Summer Sale", opens: 245, clicks: 156 },
        { message: "New Product", opens: 198, clicks: 132 },
        { message: "Flash Deal", opens: 187, clicks: 145 },
      ],
    }

    return NextResponse.json({
      success: true,
      analytics,
      dateRange,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
