"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, MessageSquare, Sparkles, Send, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    { icon: Send, label: "Messages Sent", value: "2,543", change: "+12%" },
    { icon: Users, label: "Active Customers", value: "156", change: "+8%" },
    { icon: MessageSquare, label: "Auto-Replies", value: "24", change: "+3" },
    { icon: TrendingUp, label: "Engagement Rate", value: "68%", change: "+5%" },
  ]

  const recentActivity = [
    { type: "broadcast", message: "Sent broadcast to 150 customers", time: "2 hours ago" },
    { type: "template", message: "Created new auto-reply template", time: "5 hours ago" },
    { type: "caption", message: "Generated 5 product captions", time: "1 day ago" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-muted-foreground mb-6">Here's what's happening with your business today.</p>
        <div className="flex gap-4">
          <Link href="/dashboard/captions">
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Caption
            </Button>
          </Link>
          <Link href="/dashboard/broadcasts">
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Send Broadcast
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Caption Generator</h3>
          <p className="text-sm text-muted-foreground mb-4">Generate engaging product captions with AI</p>
          <Link href="/dashboard/captions">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Open
            </Button>
          </Link>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Auto-Reply Templates</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage your auto-reply templates</p>
          <Link href="/dashboard/templates">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Open
            </Button>
          </Link>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground mb-4">View detailed analytics and insights</p>
          <Link href="/dashboard/analytics">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Open
            </Button>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <p className="font-medium text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
