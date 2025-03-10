"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Overview } from "../../components/overview"

// Dummy data for analytics
const salesData = {
  today: 1234.56,
  yesterday: 2345.67,
  twoDaysAgo: 3456.78,
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.today.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yesterday's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.yesterday.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Two Days Ago Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.twoDaysAgo.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
    </div>
  )
}

