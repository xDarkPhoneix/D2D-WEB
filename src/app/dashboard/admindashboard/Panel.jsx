"use client"
import { Users, Briefcase, CheckCircle, FileText } from "lucide-react";
import StatCard from "./components/StatCard";
import Card from "./components/Card";
import Chart from "./components/Chart";
import {
  mockActivities,
  monthlyUserGrowth,
  serviceRequests,
} from "./mockdata.js";

export default function Panel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="168"
          icon={Users}
          color="blue"
          trend={{ value: "12% from last month", isPositive: true }}
        />
        <StatCard
          title="Service Requests"
          value="48"
          icon={Briefcase}
          color="yellow"
          trend={{ value: "8% from last month", isPositive: true }}
        />
        <StatCard
          title="Active Services"
          value="32"
          icon={CheckCircle}
          color="green"
          trend={{ value: "5% from last month", isPositive: true }}
        />
        <StatCard
          title="Open Positions"
          value="3"
          icon={FileText}
          color="purple"
          trend={{ value: "1 new this week", isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Chart
            data={monthlyUserGrowth}
            type="bar"
            color="blue"
            label="Monthly User Growth"
          />
        </Card>

        <Card className="p-6">
          <Chart
            data={serviceRequests}
            type="bar"
            color="yellow"
            label="Service Requests Trend"
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "service"
                    ? "bg-yellow-400"
                    : activity.type === "user"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
              />

              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
