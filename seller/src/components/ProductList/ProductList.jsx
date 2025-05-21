import React from 'react';
import './ProductList.css';

function ProductList({ products, loading, error, onRefresh }) {
  if (loading) {
    return <div className='loading'>Loading products...</div>;
  }

  if (error) {
    return (
      <div className='error-container'>
        <p>{error}</p>
        <button onClick={onRefresh} className='refresh-btn'>
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='empty-products'>
        <h3>No products found</h3>
        <p>Start adding products to see them here</p>
      </div>
    );
  }

  return (
    <div className='product-list-container'>
      <div className='heading'>
        <h2>Your Products</h2>
      </div>
      <div className='product-list'>
        {products.map((product) => (
          <div key={product._id} className='product-card'>
            <div className='product-image'>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/100?text=No+Image';
                  }}
                />
              ) : (
                <div className='placeholder-image'>No Image</div>
              )}
            </div>
            <div className='product-details'>
              <h3>{product.name}</h3>
              <p className='category'>{product.category}</p>

              <p className='price'>₹{product.price}/kg</p>
              <p className='stock'>Stock: {product.stock || 0} units</p>
            </div>
            <div className='product-actions'>
              <button className='edit-btn'>Edit</button>
              <button className='delete-btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
