"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, MessageSquare, Copy, Eye, EyeOff, Save, X } from "lucide-react"

interface Template {
  id: number
  name: string
  trigger: string
  message: string
  enabled: boolean
  createdAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "Welcome Message",
      trigger: "new_customer",
      message: "Hi! Thanks for reaching out. How can I help you today?",
      enabled: true,
      createdAt: "2025-10-15",
    },
    {
      id: 2,
      name: "Order Confirmation",
      trigger: "order_placed",
      message: "Your order has been confirmed! You'll receive it within 2-3 business days.",
      enabled: true,
      createdAt: "2025-10-18",
    },
    {
      id: 3,
      name: "Out of Stock",
      trigger: "manual",
      message: "Sorry, this item is currently out of stock. We'll notify you when it's back!",
      enabled: false,
      createdAt: "2025-10-20",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", trigger: "", message: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTrigger, setFilterTrigger] = useState("all")

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTrigger = filterTrigger === "all" || t.trigger === filterTrigger
    return matchesSearch && matchesTrigger
  })

  const openForm = (template?: Template) => {
    if (template) {
      setEditingId(template.id)
      setFormData({ name: template.name, trigger: template.trigger, message: template.message })
    } else {
      setEditingId(null)
      setFormData({ name: "", trigger: "", message: "" })
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: "", trigger: "", message: "" })
  }

  const saveTemplate = () => {
    if (formData.name && formData.message) {
      if (editingId) {
        setTemplates(
          templates.map((t) =>
            t.id === editingId
              ? { ...t, name: formData.name, trigger: formData.trigger, message: formData.message }
              : t,
          ),
        )
      } else {
        setTemplates([
          ...templates,
          {
            id: Date.now(),
            name: formData.name,
            trigger: formData.trigger,
            message: formData.message,
            enabled: true,
            createdAt: new Date().toISOString().split("T")[0],
          },
        ])
      }
      closeForm()
    }
  }

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id))
  }

  const toggleTemplate = (id: number) => {
    setTemplates(templates.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)))
  }

  const copyTemplate = (message: string) => {
    navigator.clipboard.writeText(message)
  }

  const triggerOptions = [
    { value: "new_customer", label: "New Customer" },
    { value: "order_placed", label: "Order Placed" },
    { value: "inquiry", label: "Customer Inquiry" },
    { value: "payment_received", label: "Payment Received" },
    { value: "shipping", label: "Shipping Update" },
    { value: "manual", label: "Manual" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Auto-Reply Templates</h1>
          <p className="text-muted-foreground">Create and manage automatic reply templates</p>
        </div>
        <Button onClick={() => openForm()}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterTrigger}
          onChange={(e) => setFilterTrigger(e.target.value)}
          className="px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Triggers</option>
          {triggerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Card className="p-6 border border-border bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{editingId ? "Edit Template" : "Create New Template"}</h2>
            <button onClick={closeForm} className="p-1 hover:bg-muted rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Welcome Message"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Event</Label>
              <select
                id="trigger"
                value={formData.trigger}
                onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select trigger...</option>
                {triggerOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <textarea
                id="message"
                placeholder="Enter your auto-reply message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
              />
              <p className="text-xs text-muted-foreground">{formData.message.length}/160 characters (WhatsApp limit)</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={saveTemplate}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Update Template" : "Save Template"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Templates List */}
      <div className="grid gap-4">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="p-6 border border-border hover:border-primary/50 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">{template.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        template.enabled ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {template.enabled ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Trigger:{" "}
                      <span className="font-medium">
                        {triggerOptions.find((o) => o.value === template.trigger)?.label || "Manual"}
                      </span>
                    </span>
                    <span>Created: {template.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleTemplate(template.id)}
                    title={template.enabled ? "Disable" : "Enable"}
                  >
                    {template.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => copyTemplate(template.message)} title="Copy message">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => openForm(template)} title="Edit template">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteTemplate(template.id)} title="Delete template">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 border border-dashed border-border text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm || filterTrigger !== "all"
                ? "No templates match your search"
                : "No templates yet. Create your first one!"}
            </p>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{templates.length}</p>
          <p className="text-xs text-muted-foreground">Total Templates</p>
        </Card>
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-green-600">{templates.filter((t) => t.enabled).length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 border border-border text-center">
          <p className="text-2xl font-bold text-muted-foreground">{templates.filter((t) => !t.enabled).length}</p>
          <p className="text-xs text-muted-foreground">Inactive</p>
        </Card>
      </div>
    </div>
  )
}
