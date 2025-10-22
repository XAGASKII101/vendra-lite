"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Send,
  Calendar,
  Users,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Pause,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface Broadcast {
  id: number
  title: string
  message: string
  recipients: number
  status: "draft" | "scheduled" | "sent" | "paused"
  scheduledDate: string
  createdAt: string
  sentAt?: string
  opens?: number
  clicks?: number
}

export default function BroadcastsPage() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([
    {
      id: 1,
      title: "Summer Sale Announcement",
      message: "Don't miss our summer sale! Get up to 50% off on selected items. Shop now!",
      recipients: 245,
      status: "sent",
      scheduledDate: "2025-10-20",
      createdAt: "2025-10-18",
      sentAt: "2025-10-20",
      opens: 189,
      clicks: 145,
    },
    {
      id: 2,
      title: "New Product Launch",
      message: "Introducing our latest product! Be the first to get exclusive early access.",
      recipients: 189,
      status: "scheduled",
      scheduledDate: "2025-10-25",
      createdAt: "2025-10-20",
    },
    {
      id: 3,
      title: "Flash Deal - 24 Hours Only",
      message: "⚡ Flash Deal Alert! Limited time offer on our bestselling items.",
      recipients: 312,
      status: "paused",
      scheduledDate: "2025-10-22",
      createdAt: "2025-10-21",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipients: "all",
    scheduledDate: "",
    scheduledTime: "",
  })
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredBroadcasts = broadcasts.filter((b) => filterStatus === "all" || b.status === filterStatus)

  const openForm = (broadcast?: Broadcast) => {
    if (broadcast) {
      setEditingId(broadcast.id)
      setFormData({
        title: broadcast.title,
        message: broadcast.message,
        recipients: "all",
        scheduledDate: broadcast.scheduledDate,
        scheduledTime: "09:00",
      })
    } else {
      setEditingId(null)
      setFormData({
        title: "",
        message: "",
        recipients: "all",
        scheduledDate: "",
        scheduledTime: "",
      })
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: "",
      message: "",
      recipients: "all",
      scheduledDate: "",
      scheduledTime: "",
    })
  }

  const saveBroadcast = () => {
    if (formData.title && formData.message && formData.scheduledDate) {
      if (editingId) {
        setBroadcasts(
          broadcasts.map((b) =>
            b.id === editingId
              ? {
                  ...b,
                  title: formData.title,
                  message: formData.message,
                  scheduledDate: formData.scheduledDate,
                }
              : b,
          ),
        )
      } else {
        setBroadcasts([
          ...broadcasts,
          {
            id: Date.now(),
            title: formData.title,
            message: formData.message,
            recipients: 156,
            status: "draft",
            scheduledDate: formData.scheduledDate,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ])
      }
      closeForm()
    }
  }

  const deleteBroadcast = (id: number) => {
    setBroadcasts(broadcasts.filter((b) => b.id !== id))
  }

  const updateStatus = (id: number, newStatus: "scheduled" | "paused" | "sent") => {
    setBroadcasts(broadcasts.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "paused":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-700"
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Broadcast Manager</h1>
          <p className="text-muted-foreground">Send messages to multiple customers at once</p>
        </div>
        <Button onClick={() => openForm()}>
          <Plus className="w-4 h-4 mr-2" />
          New Broadcast
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "draft", "scheduled", "sent", "paused"].map((status) => (
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
            <h2 className="text-lg font-semibold">{editingId ? "Edit Broadcast" : "Create New Broadcast"}</h2>
            <button onClick={closeForm} className="p-1 hover:bg-muted rounded-lg transition">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Broadcast Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Sale Announcement"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                placeholder="Enter your broadcast message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{formData.message.length}/1000 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <select
                  id="recipients"
                  value={formData.recipients}
                  onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Customers</option>
                  <option value="active">Active Only</option>
                  <option value="high-engagement">High Engagement</option>
                  <option value="custom">Custom Segment</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Schedule Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Schedule Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={saveBroadcast}>
                <Send className="w-4 h-4 mr-2" />
                {editingId ? "Update Broadcast" : "Schedule Broadcast"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Broadcasts List */}
      <div className="grid gap-4">
        {filteredBroadcasts.length > 0 ? (
          filteredBroadcasts.map((broadcast) => (
            <Card key={broadcast.id} className="p-6 border border-border hover:border-primary/50 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(broadcast.status)}
                    <h3 className="font-semibold">{broadcast.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(broadcast.status)}`}>
                      {broadcast.status.charAt(0).toUpperCase() + broadcast.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{broadcast.message}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {broadcast.recipients} recipients
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {broadcast.scheduledDate}
                    </div>
                    {broadcast.status === "sent" && broadcast.opens && (
                      <>
                        <div>Opens: {broadcast.opens}</div>
                        <div>Clicks: {broadcast.clicks}</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {broadcast.status === "scheduled" && (
                    <>
                      <Button size="sm" variant="ghost" title="Pause">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" title="Send now">
                        <Send className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {broadcast.status === "paused" && (
                    <Button size="sm" variant="ghost" title="Resume">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  {broadcast.status === "sent" && (
                    <Button size="sm" variant="ghost" title="View details">
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => openForm(broadcast)} title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteBroadcast(broadcast.id)} title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 border border-dashed border-border text-center">
            <Send className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filterStatus !== "all" ? "No broadcasts with this status" : "No broadcasts yet. Create your first one!"}
            </p>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{broadcasts.length}</p>
          <p className="text-xs text-muted-foreground">Total Broadcasts</p>
        </Card>
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-blue-600">
            {broadcasts.filter((b) => b.status === "scheduled").length}
          </p>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </Card>
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-green-600">{broadcasts.filter((b) => b.status === "sent").length}</p>
          <p className="text-xs text-muted-foreground">Sent</p>
        </Card>
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-yellow-600">{broadcasts.filter((b) => b.status === "paused").length}</p>
          <p className="text-xs text-muted-foreground">Paused</p>
        </Card>
      </div>
    </div>
  )
}
