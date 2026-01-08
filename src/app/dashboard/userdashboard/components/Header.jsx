import { useState } from 'react';
import { Search, Bell, User, ChevronDown, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: 'Your application for Content Writer has been shortlisted', time: '1d ago', unread: true },
        { id: 2, text: 'Service request for Website Redesign accepted', time: '2d ago', unread: true },
        { id: 3, text: 'New job opening: Social Media Manager', time: '3d ago', unread: false },
    ];

    return (
        <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 lg:left-64 z-30 flex items-center justify-between px-4 sm:px-6">
            {/* Mobile Menu Button */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl ml-0 lg:ml-0">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search services, applications..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-6">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                            <div className="px-4 py-2 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                            </div>
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`px - 4 py - 3 hover: bg - gray - 50 cursor - pointer ${notif.unread ? 'bg-yellow-50' : ''
                                        } `}
                                >
                                    <p className="text-sm text-gray-900">{notif.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 sm:gap-3 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-black" />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-semibold text-gray-900">Rahul Sharma</p>
                            <p className="text-xs text-gray-500">rahul.sharma@example.com</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                                View Profile
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                                Settings
                            </button>
                            <hr className="my-2" />
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
