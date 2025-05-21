import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { FaStar } from 'react-icons/fa';

function Products({ setCartItems, isLoggedIn }) {
  const navigate = useNavigate();
  
  // State for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  // Available categories
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Flowers'];
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:6005/api/products');
        const data = await response.json();
        
        if (data.status === 'success') {
          setProducts(data.data.products);
        } else {
          throw new Error(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search, category, and price
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(query) && 
          !product.description.toLowerCase().includes(query) &&
          !product.category.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Category filter
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }
    
    // Price range filter
    if (priceRange.min && product.price < parseFloat(priceRange.min)) return false;
    if (priceRange.max && product.price > parseFloat(priceRange.max)) return false;
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });
  
  // Handle product click to navigate to details
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  // Add to cart functionality
  const addToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item exists
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // Add new item with quantity 1
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        return newItems;
      }
    });
  };
  
  if (loading) return <div className="loading-container">Loading products...</div>;
  if (error) return <div className="error-container">{error}</div>;
  
  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Fresh from farms to your doorstep</p>
      </div>
      
      <div className="products-container">
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <h3>Categories</h3>
            <div className="category-options">
              {categories.map(category => (
                <label key={category} className="category-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === category}
                    onChange={() => setCategoryFilter(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="price-input"
              />
            </div>
          </div>
          
          <div className="filter-group">
            <h3>Sort By</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </aside>
        
        <div className="products-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image" onClick={() => handleProductClick(product.id)}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      // Using a more reliable placeholder service
                      e.target.src = 'https://placehold.co/300x300/png?text=No+Image';
                    }}
                  />
                </div>
                <div className="product-info" onClick={() => handleProductClick(product.id)}>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₹{product.price.toFixed(2)}/kg</p>
                  <p className="product-description">{product.description.substring(0, 60)}...</p>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? 'Add to Cart' : 'Login to Add'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;