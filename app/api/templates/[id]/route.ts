import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, trigger, message, enabled } = await request.json()
    const templateId = Number.parseInt(params.id)

    // In production, update in database
    const template = {
      id: templateId,
      name,
      trigger,
      message,
      enabled,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      template,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const templateId = Number.parseInt(params.id)

    // In production, delete from database
    return NextResponse.json({
      success: true,
      message: "Template deleted",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 })
  }
}
