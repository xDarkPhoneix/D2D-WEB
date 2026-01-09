import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Building2,
  Megaphone,
  Calculator,
  LogOut,
  Mail, // Added icon import
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "brands", label: "Brands", icon: Building2 },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "service-applications", label: "Service Applications", icon: Clipboard },
  { id: "users", label: "Users", icon: Users },
  { id: "jobs", label: "Job Openings", icon: FileText },
  { id: "applications", label: "Job Applications", icon: ClipboardList },
  { id: "calculator", label: "Calculator Settings", icon: Calculator },
  { id: "admins", label: "Admin Requests", icon: Users }, // Changed icon to Users for Admin Requests if duplicate
  { id: "contact-submissions", label: "Contact Us", icon: Mail }, // Added new menu item
];

export default function Sidebar({ currentPage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <aside
      className={`bg-black text-white transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
        } min-h-screen fixed left-0 top-0 z-40 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            D2D Studio
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
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
      <div className="p-4 border-t border-gray-800 space-y-4">
        {!collapsed && (
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-4 text-black">
            <h3 className="font-bold mb-1">Need Help?</h3>
            <p className="text-sm opacity-90">Check our docs</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-red-400`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
