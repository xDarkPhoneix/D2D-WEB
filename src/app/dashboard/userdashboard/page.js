"use client"
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Panel from './Panel';
import MyServices from './MyServices';
import MyApplications from './MyApplications';
import Profile from './Profile';

function UserDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Panel />;
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
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <div className="pl-64">
                <Header />
                <main className="pt-16 p-8">{renderPage()}</main>
            </div>
        </div>
    );
}

export default UserDashboard;
