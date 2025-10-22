import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { productName, description, tone, language, category } = await request.json()

    if (!productName) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 })
    }

    // In production, call AI service (OpenAI, Anthropic, etc.)
    // For MVP, return mock captions
    const captions = [
      `✨ Introducing ${productName}! ${description || "Your new favorite product"}. Get yours today! 🛍️ #NewProduct`,
      `🎯 ${productName} - ${description || "The perfect solution for you"}. Limited stock available! Order now 📦`,
      `💫 Discover ${productName}! ${description || "Quality you can trust"}. Shop now and save! 🔥`,
      `🌟 ${productName} is here! ${description || "Everything you need in one place"}. Don't miss out! ⏰`,
      `🚀 Level up with ${productName}! ${description || "Experience the difference"} today. 💯`,
    ]

    return NextResponse.json({
      success: true,
      captions,
      metadata: {
        productName,
        tone,
        language,
        category,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Caption generation failed" }, { status: 500 })
  }
}
