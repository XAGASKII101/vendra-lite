import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const broadcastId = Number.parseInt(params.id)

    // In production, update in database
    const broadcast = {
      id: broadcastId,
      status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      broadcast,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update broadcast" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const broadcastId = Number.parseInt(params.id)

    // In production, delete from database
    return NextResponse.json({
      success: true,
      message: "Broadcast deleted",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete broadcast" }, { status: 500 })
  }
}
