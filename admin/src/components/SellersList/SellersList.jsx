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
    return <div className="sellers-loading">Loading sellers...</div>;
  }

  if (error) {
    return <div className="sellers-error">{error}</div>;
  }

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
  };

  return (
    <section className="sellers-list-wrapper">
      <h2 className="sellers-title">Active Sellers</h2>
      <div className="sellers-table">
        <div className="sellers-table-header">
          <div className="header-cell">Business Name</div>
          <div className="header-cell">Owner Name</div>
          <div className="header-cell">Phone Number</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Actions</div>
        </div>

        {sellers.map((seller) => (
          <div key={seller._id} className="sellers-table-row">
            <div className="row-cell" data-label="Business Name">{seller.businessName}</div>
            <div className="row-cell" data-label="Owner Name">{seller.ownerName}</div>
            <div className="row-cell" data-label="Phone Number">{seller.phoneNumber}</div>
            <div className="row-cell" data-label="Status">
              <span className={`status-badge ${seller.isActive ? 'active' : 'inactive'}`}>
                {seller.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="row-cell action-cell" data-label="Actions">
              <button className={`status-btn ${seller.isActive ? 'deactivate' : 'activate'}`}>
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
    </section>
  );
}

export default SellersList;
