import { useState } from "react";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    Grid,
    X,
} from "lucide-react";

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "allservices", label: "Browse Services", icon: Grid },
    { id: "myservices", label: "My Applications", icon: Briefcase },
    { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`bg-black text-white transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
                    } min-h-screen fixed left-0 top-0 z-50 flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-gray-800">
                    {!collapsed && (
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                            My Dashboard
                        </h1>
                    )}

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Collapse button for desktop */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {collapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => onNavigate(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-yellow-400 text-black font-semibold"
                                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        {!collapsed && <span>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                {!collapsed && (
                    <div className="p-4 border-t border-gray-800">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-4 text-black">
                            <h3 className="font-bold mb-1">Need Support?</h3>
                            <p className="text-sm opacity-90">Contact our team</p>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}
