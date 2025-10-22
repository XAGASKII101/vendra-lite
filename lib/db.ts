// Database connection utilities
// In production, use Supabase, Neon, or similar

export interface User {
  id: string
  email: string
  name: string
  whatsappNumber?: string
  subscriptionPlan: string
  createdAt: Date
}

export interface Template {
  id: string
  userId: string
  name: string
  trigger: string
  message: string
  enabled: boolean
  createdAt: Date
}

export interface Broadcast {
  id: string
  userId: string
  title: string
  message: string
  recipientCount: number
  status: "draft" | "scheduled" | "sent" | "paused"
  scheduledDate: Date
  sentAt?: Date
  opens: number
  clicks: number
  createdAt: Date
}

export interface Customer {
  id: string
  userId: string
  whatsappNumber: string
  name?: string
  email?: string
  segment?: string
  lastMessageAt?: Date
  createdAt: Date
}

export interface Message {
  id: string
  userId: string
  customerId: string
  broadcastId?: string
  messageType: string
  content: string
  direction: "inbound" | "outbound"
  status: "sent" | "delivered" | "read" | "failed"
  openedAt?: Date
  clickedAt?: Date
  createdAt: Date
}

// Mock database functions for MVP
export const db = {
  users: {
    create: async (data: Omit<User, "id" | "createdAt">) => {
      return { id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() }
    },
    findByEmail: async (email: string) => {
      return null
    },
  },
  templates: {
    create: async (data: Omit<Template, "id" | "createdAt">) => {
      return { id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() }
    },
    findByUserId: async (userId: string) => {
      return []
    },
  },
  broadcasts: {
    create: async (data: Omit<Broadcast, "id" | "createdAt">) => {
      return { id: Math.random().toString(36).substr(2, 9), ...data, createdAt: new Date() }
    },
    findByUserId: async (userId: string) => {
      return []
    },
  },
}
