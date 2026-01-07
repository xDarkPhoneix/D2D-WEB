"use client"
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";
import Card from "./components/Card";
import Button from "./components/Button";
import { mockUserProfile } from "./mockdata.js";

export default function Profile() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Profile
                </h1>
                <p className="text-gray-600">
                    View and manage your profile information
                </p>
            </div>

            {/* Profile Card */}
            <Card className="p-8">
                <div className="flex items-start gap-6 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-black" />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {mockUserProfile.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{mockUserProfile.role}</p>

                        <div className="flex gap-3">
                            <Button size="md">Edit Profile</Button>
                            <Button variant="secondary" size="md">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.phone}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Location</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Company</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.company}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Member Since</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.joinedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">User ID</p>
                                <p className="font-semibold text-gray-900">
                                    {mockUserProfile.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Account Settings
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-semibold text-gray-900">
                                Email Notifications
                            </h4>
                            <p className="text-sm text-gray-600">
                                Receive updates about your services and applications
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-semibold text-gray-900">
                                SMS Notifications
                            </h4>
                            <p className="text-sm text-gray-600">
                                Get text messages for important updates
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-semibold text-gray-900">
                                Marketing Emails
                            </h4>
                            <p className="text-sm text-gray-600">
                                Receive newsletters and promotional content
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 border-red-200">
                <h3 className="text-lg font-bold text-red-600 mb-4">
                    Danger Zone
                </h3>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-900">
                            Delete Account
                        </h4>
                        <p className="text-sm text-gray-600">
                            Permanently delete your account and all data
                        </p>
                    </div>
                    <Button variant="danger" size="sm">
                        Delete Account
                    </Button>
                </div>
            </Card>
        </div>
    );
}
