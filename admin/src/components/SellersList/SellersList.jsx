import { useState, useEffect } from 'react';
import './SellersList.css';
import SellerDetails from '../SellerDetails/SellerDetails';

function SellersList() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:6005/api/seller/all');
      const data = await response.json();

      if (data.status === 'success') {
        setSellers(data.data.sellers);
      } else {
        throw new Error(data.message || 'Failed to fetch sellers');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading sellers...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
  };

  return (
    <div className="sellers-list-container">
      <h2>Active Sellers</h2>
      <div className="sellers-grid">
        <div className="grid-header">
          <div>Business Name</div>
          <div>Owner Name</div>
          <div>Phone Number</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {sellers.map((seller) => (
          <div key={seller._id} className="seller-row">
            <div>{seller.businessName}</div>
            <div>{seller.ownerName}</div>
            <div>{seller.phoneNumber}</div>
            <div>
              <span className={`status-badge ${seller.isActive ? 'active' : 'inactive'}`}>
                {seller.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="action-buttons">
              <button 
                className={`status-btn ${seller.isActive ? 'deactivate' : 'activate'}`}
              >
                {seller.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                className="view-btn"
                onClick={() => handleViewDetails(seller)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSeller && (
        <SellerDetails 
          seller={selectedSeller} 
          onClose={() => setSelectedSeller(null)} 
        />
      )}
    </div>
  );
}

export default SellersList;