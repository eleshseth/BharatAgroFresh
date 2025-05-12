import React from 'react';
import './ProductList.css';

function ProductList({ products, loading, error, onRefresh }) {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={onRefresh} className="refresh-btn">Try Again</button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="empty-products">
        <h3>No products found</h3>
        <p>Start adding products to see them here</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2 className='heading'>Your Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price}/kg</p>
              <p className="stock">Stock: {product.stock} units</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;