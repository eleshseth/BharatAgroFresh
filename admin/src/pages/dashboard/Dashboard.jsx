import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SellersList from '../../components/SellersList/SellersList';
import './Dashboard.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('active-sellers');
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  const renderContent = () => {
    switch (currentView) {
      case 'active-sellers':
        return <SellersList />;
      case 'active-customers':
        return <h2>Active Customers List</h2>;
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar setCurrentView={setCurrentView} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;