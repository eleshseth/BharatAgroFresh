import { useState } from 'react';
import './SellerDetails.css';

function SellerDetails({ seller, onClose }) {
  // Ensure address exists or provide default empty object
  const address = seller.address || {};

  return (
    <div className="seller-details-overlay">
      <div className="seller-details-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="seller-details-content">
          <h2>{seller.businessName || 'N/A'}</h2>
          
          <div className="detail-group">
            <h3>Business Information</h3>
            <div className="detail-row">
              <span className="label">Business Type:</span>
              <span>{seller.businessType || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">GST Number:</span>
              <span>{seller.gstNumber || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Contact Information</h3>
            <div className="detail-row">
              <span className="label">Owner Name:</span>
              <span>{seller.ownerName || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span>{seller.email || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone:</span>
              <span>{seller.phoneNumber || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Address</h3>
            <div className="detail-row">
              <span className="label">Street:</span>
              <span>{address.street || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">City:</span>
              <span>{address.city || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">State:</span>
              <span>{address.state || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Pincode:</span>
              <span>{address.pincode || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Account Status</h3>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`status-badge ${seller.isActive ? 'active' : 'inactive'}`}>
                {seller.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Verification:</span>
              <span className={`status-badge ${seller.verificationStatus || 'pending'}`}>
                {seller.verificationStatus || 'Pending'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Joined:</span>
              <span>
                {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;