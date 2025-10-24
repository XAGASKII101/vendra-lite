"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, MessageSquare, Sparkles, Send, Users, DollarSign, Target, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const businessMetrics = [
    { icon: DollarSign, label: "Total Revenue", value: "₦245,680", change: "+24%", subtext: "This month" },
    { icon: ShoppingCart, label: "Total Orders", value: "1,248", change: "+18%", subtext: "This month" },
    { icon: Users, label: "Customer Lifetime Value", value: "₦1,960", change: "+12%", subtext: "Average" },
    { icon: Target, label: "Conversion Rate", value: "12.4%", change: "+3.2%", subtext: "From messages" },
  ]

  const revenueTrendData = [
    { week: "Week 1", revenue: 45000, orders: 180, customers: 120 },
    { week: "Week 2", revenue: 52000, orders: 195, customers: 135 },
    { week: "Week 3", revenue: 48000, orders: 175, customers: 125 },
    { week: "Week 4", revenue: 100680, orders: 698, customers: 280 },
  ]

  const businessKPIs = [
    { label: "Customer Acquisition Cost", value: "₦156", trend: "-8%" },
    { label: "Average Order Value", value: "₦197", trend: "+5%" },
    { label: "Customer Retention Rate", value: "78%", trend: "+6%" },
    { label: "Message to Sale Conversion", value: "8.2%", trend: "+2.1%" },
  ]

  const recentActivity = [
    { type: "sale", message: "New order from Chioma - ₦2,500", time: "15 minutes ago", value: "₦2,500" },
    { type: "customer", message: "New customer acquired via broadcast", time: "1 hour ago", value: "1 customer" },
    { type: "campaign", message: "Campaign generated ₦18,500 in sales", time: "3 hours ago", value: "₦18,500" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-muted-foreground mb-6">
          Your business is performing well. Here's your business impact summary.
        </p>
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

      {/* Business Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessMetrics.map((metric, idx) => (
          <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-green-600">{metric.change}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold">{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{metric.subtext}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <Card className="p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue and order performance</p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="oklch(0.55 0.22 262.5)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Business KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessKPIs.map((kpi, idx) => (
          <Card key={idx} className="p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-3">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">{kpi.value}</p>
              <span className="text-sm font-medium text-green-600">{kpi.trend}</span>
            </div>
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
        <h3 className="text-lg font-semibold mb-6">Recent Business Activity</h3>
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
              <span className="text-sm font-semibold text-primary">{activity.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
