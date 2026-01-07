"use client"
import { Briefcase, FileText, Clock, CheckCircle } from "lucide-react";
import StatCard from "./components/StatCard";
import Card from "./components/Card";
import {
    mockUserServices,
    mockUserApplications,
    mockUserActivities,
} from "./mockdata.js";

export default function Panel() {
    const totalServices = mockUserServices.length;
    const totalApplications = mockUserApplications.length;
    const pendingServices = mockUserServices.filter(
        (s) => s.status === "pending"
    ).length;
    const acceptedServices = mockUserServices.filter(
        (s) => s.status === "accepted"
    ).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome Back!
                </h1>
                <p className="text-gray-600">
                    Here's an overview of your activity
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Services"
                    value={totalServices.toString()}
                    icon={Briefcase}
                    color="blue"
                    trend={{ value: "All time", isPositive: true }}
                />
                <StatCard
                    title="Pending Reviews"
                    value={pendingServices.toString()}
                    icon={Clock}
                    color="yellow"
                    trend={{ value: "Awaiting approval", isPositive: false }}
                />
                <StatCard
                    title="Accepted Services"
                    value={acceptedServices.toString()}
                    icon={CheckCircle}
                    color="green"
                    trend={{ value: "Approved", isPositive: true }}
                />
                <StatCard
                    title="Job Applications"
                    value={totalApplications.toString()}
                    icon={FileText}
                    color="purple"
                    trend={{ value: "All time", isPositive: true }}
                />
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Recent Activity
                </h2>

                <div className="space-y-4">
                    {mockUserActivities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div
                                className={`w-2 h-2 rounded-full mt-2 ${activity.type === "service"
                                        ? "bg-blue-400"
                                        : activity.type === "application"
                                            ? "bg-purple-400"
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Service Status Breakdown
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Pending</span>
                            <span className="font-bold text-yellow-600">
                                {pendingServices}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Accepted</span>
                            <span className="font-bold text-green-600">
                                {acceptedServices}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Rejected</span>
                            <span className="font-bold text-red-600">
                                {
                                    mockUserServices.filter((s) => s.status === "rejected")
                                        .length
                                }
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Application Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Shortlisted</span>
                            <span className="font-bold text-green-600">
                                {
                                    mockUserApplications.filter(
                                        (a) => a.status === "shortlisted"
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Pending</span>
                            <span className="font-bold text-yellow-600">
                                {
                                    mockUserApplications.filter(
                                        (a) => a.status === "pending"
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Rejected</span>
                            <span className="font-bold text-red-600">
                                {
                                    mockUserApplications.filter(
                                        (a) => a.status === "rejected"
                                    ).length
                                }
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
