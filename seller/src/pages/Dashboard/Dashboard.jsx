import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProduct from '../../components/AddProduct/AddProduct';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const renderContent = () => {
    switch (currentView) {
      case 'add-product':
        return <AddProduct />;
      default:
        return <h2>Welcome to Seller Dashboard</h2>;
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
}

export default Dashboard;