"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Plus, Edit2, Trash2, Eye, Target, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Campaign {
  id: number
  name: string
  type: "standard" | "ab_test" | "segmented"
  status: "draft" | "running" | "completed" | "paused"
  targetSegment: string
  messageA: string
  messageB?: string
  recipients: number
  sent: number
  opens: number
  clicks: number
  conversions: number
  roi: number
  startDate: string
  endDate?: string
  createdAt: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Summer Sale - High Engagement",
      type: "segmented",
      status: "completed",
      targetSegment: "High Engagement Customers",
      messageA: "🌞 Summer Sale! Get 50% off on selected items. Limited time only!",
      recipients: 245,
      sent: 245,
      opens: 189,
      clicks: 145,
      conversions: 67,
      roi: 340,
      startDate: "2025-10-15",
      endDate: "2025-10-20",
      createdAt: "2025-10-14",
    },
    {
      id: 2,
      name: "New Product Launch - A/B Test",
      type: "ab_test",
      status: "running",
      targetSegment: "All Active Customers",
      messageA: "Introducing our latest product! Be the first to get exclusive access.",
      messageB: "New product alert! Limited early access available for our VIP customers.",
      recipients: 500,
      sent: 250,
      opens: 156,
      clicks: 98,
      conversions: 34,
      roi: 220,
      startDate: "2025-10-20",
      createdAt: "2025-10-19",
    },
    {
      id: 3,
      name: "Re-engagement Campaign",
      type: "segmented",
      status: "running",
      targetSegment: "Inactive Customers (30+ days)",
      messageA: "We miss you! Come back and enjoy 30% off your next purchase.",
      recipients: 156,
      sent: 156,
      opens: 78,
      clicks: 45,
      conversions: 12,
      roi: 180,
      startDate: "2025-10-18",
      createdAt: "2025-10-17",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "standard" as "standard" | "ab_test" | "segmented",
    targetSegment: "all",
    messageA: "",
    messageB: "",
  })
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredCampaigns = campaigns.filter((c) => filterStatus === "all" || c.status === filterStatus)

  const openForm = (campaign?: Campaign) => {
    if (campaign) {
      setEditingId(campaign.id)
      setFormData({
        name: campaign.name,
        type: campaign.type,
        targetSegment: campaign.targetSegment,
        messageA: campaign.messageA,
        messageB: campaign.messageB || "",
      })
    } else {
      setEditingId(null)
      setFormData({
        name: "",
        type: "standard",
        targetSegment: "all",
        messageA: "",
        messageB: "",
      })
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: "",
      type: "standard",
      targetSegment: "all",
      messageA: "",
      messageB: "",
    })
  }

  const saveCampaign = () => {
    if (formData.name && formData.messageA) {
      if (editingId) {
        setCampaigns(
          campaigns.map((c) =>
            c.id === editingId
              ? {
                  ...c,
                  name: formData.name,
                  type: formData.type,
                  targetSegment: formData.targetSegment,
                  messageA: formData.messageA,
                  messageB: formData.messageB,
                }
              : c,
          ),
        )
      } else {
        setCampaigns([
          ...campaigns,
          {
            id: Date.now(),
            name: formData.name,
            type: formData.type,
            status: "draft",
            targetSegment: formData.targetSegment,
            messageA: formData.messageA,
            messageB: formData.messageB,
            recipients: 0,
            sent: 0,
            opens: 0,
            clicks: 0,
            conversions: 0,
            roi: 0,
            startDate: new Date().toISOString().split("T")[0],
            createdAt: new Date().toISOString().split("T")[0],
          },
        ])
      }
      closeForm()
    }
  }

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "running":
        return <Zap className="w-4 h-4 text-blue-600" />
      case "paused":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "running":
        return "bg-blue-100 text-blue-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ab_test":
        return "A/B Test"
      case "segmented":
        return "Segmented"
      default:
        return "Standard"
    }
  }

  const calculateEngagementRate = (campaign: Campaign) => {
    if (campaign.sent === 0) return 0
    return ((campaign.opens / campaign.sent) * 100).toFixed(1)
  }

  const calculateCTR = (campaign: Campaign) => {
    if (campaign.opens === 0) return 0
    return ((campaign.clicks / campaign.opens) * 100).toFixed(1)
  }

  const calculateConversionRate = (campaign: Campaign) => {
    if (campaign.clicks === 0) return 0
    return ((campaign.conversions / campaign.clicks) * 100).toFixed(1)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Smart Campaigns</h1>
          <p className="text-muted-foreground">Create intelligent campaigns with targeting and A/B testing</p>
        </div>
        <Button onClick={() => openForm()}>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "draft", "running", "completed", "paused"].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <Card className="p-6 border border-border bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Campaign" : "Create Smart Campaign"}</h2>
            <button onClick={closeForm} className="p-1 hover:bg-muted rounded-lg transition">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Summer Sale - High Engagement"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Campaign Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="standard">Standard</option>
                  <option value="segmented">Segmented</option>
                  <option value="ab_test">A/B Test</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Target Segment</Label>
                <select
                  id="segment"
                  value={formData.targetSegment}
                  onChange={(e) => setFormData({ ...formData, targetSegment: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Customers</option>
                  <option value="high-engagement">High Engagement</option>
                  <option value="medium-engagement">Medium Engagement</option>
                  <option value="low-engagement">Low Engagement</option>
                  <option value="inactive">Inactive (30+ days)</option>
                  <option value="vip">VIP Customers</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="messageA">Message A *</Label>
              <textarea
                id="messageA"
                placeholder="Enter your campaign message..."
                value={formData.messageA}
                onChange={(e) => setFormData({ ...formData, messageA: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">{formData.messageA.length}/160 characters</p>
            </div>

            {formData.type === "ab_test" && (
              <div className="space-y-2">
                <Label htmlFor="messageB">Message B (for A/B testing)</Label>
                <textarea
                  id="messageB"
                  placeholder="Enter alternative message for A/B testing..."
                  value={formData.messageB}
                  onChange={(e) => setFormData({ ...formData, messageB: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">{formData.messageB.length}/160 characters</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={saveCampaign}>
                <Zap className="w-4 h-4 mr-2" />
                {editingId ? "Update Campaign" : "Create Campaign"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Campaigns Grid */}
      <div className="grid gap-4">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6 border border-border hover:border-primary/50 transition">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(campaign.status)}
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {getTypeLabel(campaign.type)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{campaign.messageA}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Target className="w-4 h-4" />
                    {campaign.targetSegment}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="ghost" title="View details">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => openForm(campaign)} title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteCampaign(campaign.id)} title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Recipients</p>
                  <p className="font-semibold text-sm">{campaign.recipients}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sent</p>
                  <p className="font-semibold text-sm">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Opens</p>
                  <p className="font-semibold text-sm">{campaign.opens}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                  <p className="font-semibold text-sm text-green-600">{calculateEngagementRate(campaign)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CTR</p>
                  <p className="font-semibold text-sm text-blue-600">{calculateCTR(campaign)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                  <p className="font-semibold text-sm">{campaign.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">ROI</p>
                  <p className="font-semibold text-sm text-green-600">{campaign.roi}%</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 border border-dashed border-border text-center">
            <Zap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filterStatus !== "all" ? "No campaigns with this status" : "No campaigns yet. Create your first one!"}
            </p>
          </Card>
        )}
      </div>

      {/* Campaign Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Total Campaigns</p>
          <p className="text-2xl font-bold text-primary">{campaigns.length}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Running</p>
          <p className="text-2xl font-bold text-blue-600">{campaigns.filter((c) => c.status === "running").length}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Avg Engagement</p>
          <p className="text-2xl font-bold text-green-600">
            {campaigns.length > 0
              ? (
                  campaigns.reduce((sum, c) => sum + Number.parseFloat(calculateEngagementRate(c)), 0) /
                  campaigns.length
                ).toFixed(1)
              : 0}
            %
          </p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Total ROI</p>
          <p className="text-2xl font-bold text-green-600">
            {campaigns.reduce((sum, c) => sum + c.roi, 0) / Math.max(campaigns.length, 1)}%
          </p>
        </Card>
      </div>
    </div>
  )
}
