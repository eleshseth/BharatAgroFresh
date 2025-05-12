import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProduct from '../../components/AddProduct/AddProduct';
import ProductList from '../../components/ProductList/ProductList';  // New import
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (currentView === 'products') {
      fetchSellerProducts();
    }
  }, [currentView]);

  const fetchSellerProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch('http://localhost:6005/api/products/seller', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setProducts(data.data.products);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add-product':
        return <AddProduct onProductAdded={fetchSellerProducts} />;
      case 'products':
        return <ProductList 
          products={products} 
          loading={loading} 
          error={error} 
          onRefresh={fetchSellerProducts}
        />;
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