"use client"
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Panel from './Panel';
import BrandsManagement from './BrandsManagement';
import CampaignManagement from './CampaignManagement';
import Services from './Services';
import ServiceApplications from './ServiceApplications';
import Users from './Users';
import Jobs from './Jobs';
import Applications from './Applications';
import CalculatorManagement from './CalculatorManagement';

function admindashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Panel />;
      case 'brands':
        return <BrandsManagement />;
      case 'campaigns':
        return <CampaignManagement />;
      case 'services':
        return <Services />;
      case 'service-applications':
        return <ServiceApplications />;
      case 'users':
        return <Users />;
      case 'jobs':
        return <Jobs />;
      case 'applications':
        return <Applications />;
      case 'calculator':
        return <CalculatorManagement />;
      default:
        return <Panel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="pl-64">
        <Header />
        <main className="pt-16 p-8">{renderPage()}</main>
      </div>
    </div>
  );
}

export default admindashboard;
