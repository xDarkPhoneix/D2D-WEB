"use client"
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Panel from './Panel';
import AllServices from './AllServices';
import MyServices from './MyServices';
import MyApplications from './MyApplications';
import Profile from './Profile';

function UserDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Panel />;
            case 'allservices':
                return <AllServices />;
            case 'myservices':
                return <MyServices />;
            case 'myapplications':
                return <MyApplications />;
            case 'profile':
                return <Profile />;
            default:
                return <Panel />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                currentPage={currentPage}
                onNavigate={(page) => {
                    setCurrentPage(page);
                    setSidebarOpen(false); // Close sidebar on mobile after navigation
                }}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="lg:pl-64">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="pt-16 p-4 sm:p-6 lg:p-8">{renderPage()}</main>
            </div>
        </div>
    );
}

export default UserDashboard;
