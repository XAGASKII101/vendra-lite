"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Copy, Heart, Share2, Download, Loader } from "lucide-react"

export default function CaptionGeneratorPage() {
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [tone, setTone] = useState("professional")
  const [language, setLanguage] = useState("english")
  const [category, setCategory] = useState("general")
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [savedCaptions, setSavedCaptions] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateCaptions = async () => {
    if (!productName) return
    setLoading(true)

    // Simulate AI caption generation with more variety
    setTimeout(() => {
      const toneModifiers = {
        professional: "Premium quality",
        casual: "Check out",
        playful: "OMG, meet",
        urgent: "Limited time only",
      }

      const categoryEmojis = {
        fashion: "👗👠",
        electronics: "📱💻",
        beauty: "💄✨",
        food: "🍔🍕",
        general: "🛍️",
      }

      const baseModifier = toneModifiers[tone as keyof typeof toneModifiers]
      const emoji = categoryEmojis[category as keyof typeof categoryEmojis]

      const mockCaptions = [
        `${baseModifier} ${productName}! ${description ? description : "Your new favorite product"}. Get yours today! ${emoji} #NewProduct`,
        `🎯 ${productName} - ${description ? description : "The perfect solution for you"}. Limited stock available! Order now 📦`,
        `💫 Discover ${productName}! ${description ? description : "Quality you can trust"} Shop now and save! 🔥`,
        `🌟 ${productName} is here! ${description ? description : "Everything you need in one place"}. Don't miss out! ⏰`,
        `🚀 Level up with ${productName}! ${description ? description : "Experience the difference"} today. 💯`,
        `✨ Introducing ${productName} - ${description ? description : "The game changer you've been waiting for"} 🎉`,
      ]
      setCaptions(mockCaptions)
      setLoading(false)
    }, 1500)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const saveCaption = (caption: string) => {
    if (!savedCaptions.includes(caption)) {
      setSavedCaptions([...savedCaptions, caption])
    }
  }

  const removeSavedCaption = (caption: string) => {
    setSavedCaptions(savedCaptions.filter((c) => c !== caption))
  }

  const downloadCaptions = () => {
    const text = captions.join("\n\n---\n\n")
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
    element.setAttribute("download", "captions.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Caption Generator</h1>
        <p className="text-muted-foreground">Generate engaging product captions powered by AI</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-1 p-6 border border-border sticky top-8 h-fit">
          <h2 className="text-lg font-semibold mb-6">Generate Caption</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product Name *</Label>
              <Input
                id="product"
                placeholder="e.g., Wireless Headphones"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Describe your product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="general">General</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="beauty">Beauty</option>
                <option value="food">Food & Beverage</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="playful">Playful</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="english">English</option>
                <option value="yoruba">Yoruba</option>
                <option value="igbo">Igbo</option>
                <option value="hausa">Hausa</option>
              </select>
            </div>

            <Button onClick={generateCaptions} disabled={!productName || loading} className="w-full">
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Captions
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-4">
          {captions.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Generated Captions ({captions.length})</h2>
                <Button size="sm" variant="outline" onClick={downloadCaptions}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              {captions.map((caption, idx) => (
                <Card key={idx} className="p-4 border border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm leading-relaxed flex-1">{caption}</p>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(caption, idx)}
                        className={copiedIndex === idx ? "text-green-600" : ""}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => saveCaption(caption)}
                        className={savedCaptions.includes(caption) ? "text-red-600" : ""}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <Card className="p-12 border border-dashed border-border text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Enter a product name and click "Generate Captions" to get started</p>
            </Card>
          )}
        </div>
      </div>

      {/* Saved Captions */}
      {savedCaptions.length > 0 && (
        <Card className="p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">Saved Captions ({savedCaptions.length})</h2>
          <div className="grid gap-3">
            {savedCaptions.map((caption, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-4 p-3 bg-card/50 rounded-lg border border-border/50"
              >
                <p className="text-sm leading-relaxed flex-1">{caption}</p>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(caption, -1)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeSavedCaption(caption)}>
                    <Heart className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
