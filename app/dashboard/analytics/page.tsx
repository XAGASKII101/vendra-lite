"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, MessageSquare, Users, Clock, Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days")

  // Mock data for charts
  const messageActivityData = [
    { day: "Mon", sent: 45, received: 38 },
    { day: "Tue", sent: 52, received: 42 },
    { day: "Wed", sent: 48, received: 35 },
    { day: "Thu", sent: 61, received: 55 },
    { day: "Fri", sent: 55, received: 48 },
    { day: "Sat", sent: 67, received: 62 },
    { day: "Sun", sent: 72, received: 68 },
  ]

  const engagementData = [
    { name: "Opened", value: 68, fill: "oklch(0.55 0.22 262.5)" },
    { name: "Clicked", value: 45, fill: "oklch(0.65 0.22 262.5)" },
    { name: "Replied", value: 32, fill: "oklch(0.75 0.15 150)" },
    { name: "Ignored", value: 23, fill: "oklch(0.92 0 0)" },
  ]

  const topPerformingMessages = [
    { message: "Summer Sale Announcement", opens: 245, clicks: 156, replies: 89 },
    { message: "New Product Launch", opens: 198, clicks: 132, replies: 67 },
    { message: "Flash Deal", opens: 187, clicks: 145, replies: 78 },
    { message: "Customer Feedback Request", opens: 156, clicks: 98, replies: 45 },
  ]

  const stats = [
    {
      icon: MessageSquare,
      label: "Total Messages",
      value: "12,543",
      change: "+15%",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Users,
      label: "Active Customers",
      value: "856",
      change: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: TrendingUp,
      label: "Engagement Rate",
      value: "68%",
      change: "+5%",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Clock,
      label: "Avg Response Time",
      value: "2.3m",
      change: "-0.5m",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your business performance and customer engagement</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message Activity Chart */}
        <Card className="lg:col-span-2 p-6 border border-border">
          <h3 className="text-lg font-semibold mb-6">Message Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={messageActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="sent" fill="oklch(0.55 0.22 262.5)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="received" fill="oklch(0.65 0.22 262.5)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Engagement Breakdown */}
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-6">Engagement Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {engagementData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performing Messages */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold mb-6">Top Performing Messages</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Message</th>
                <th className="text-right py-3 px-4 font-semibold">Opens</th>
                <th className="text-right py-3 px-4 font-semibold">Clicks</th>
                <th className="text-right py-3 px-4 font-semibold">Replies</th>
                <th className="text-right py-3 px-4 font-semibold">CTR</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingMessages.map((msg, idx) => {
                const ctr = ((msg.clicks / msg.opens) * 100).toFixed(1)
                return (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-3 px-4">{msg.message}</td>
                    <td className="text-right py-3 px-4">{msg.opens}</td>
                    <td className="text-right py-3 px-4">{msg.clicks}</td>
                    <td className="text-right py-3 px-4">{msg.replies}</td>
                    <td className="text-right py-3 px-4 font-medium">{ctr}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-6">Customer Segments</h3>
          <div className="space-y-4">
            {[
              { name: "High Engagement", count: 234, percentage: 27 },
              { name: "Medium Engagement", count: 412, percentage: 48 },
              { name: "Low Engagement", count: 156, percentage: 18 },
              { name: "Inactive", count: 54, percentage: 7 },
            ].map((segment, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{segment.name}</span>
                  <span className="text-sm text-muted-foreground">{segment.count} customers</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: `${segment.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-6">Message Performance</h3>
          <div className="space-y-4">
            {[
              { type: "Promotional", sent: 2543, delivered: 2487, opened: 1691 },
              { type: "Transactional", sent: 1856, delivered: 1845, opened: 1654 },
              { type: "Informational", sent: 1234, delivered: 1198, opened: 892 },
            ].map((perf, idx) => (
              <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-sm mb-2">{perf.type}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Sent</p>
                    <p className="font-semibold">{perf.sent}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Delivered</p>
                    <p className="font-semibold">{perf.delivered}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Opened</p>
                    <p className="font-semibold">{perf.opened}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
