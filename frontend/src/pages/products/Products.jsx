import React, { useState, useEffect } from 'react'; // Import useEffect
import {  useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './Products.css'; // Ensure CSS is imported
// Example icons (install react-icons: npm install react-icons)
import { FaStar } from 'react-icons/fa';

function Products({ products, setCartItems, cartItems, isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get location object for query params

  // --- State for Filters ---
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  // const [minRating, setMinRating] = useState(0); // REMOVED Rating filter state
  // const [availability, setAvailability] = useState('all'); // REMOVED Availability filter state
  const [searchQuery, setSearchQuery] = useState('');

  // --- State for Sorting ---
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc', 'newest', 'rating'

  // --- Categories ---
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Flowers']; // Keep this

  // --- Effect to read search query from URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setSearchQuery(search);
    // Optional: Reset other filters when search changes? Decide based on UX preference.
    // setCategoryFilter('All');
    // setPriceRange({ min: '', max: '' });
    // setMinRating(0); // REMOVED
    // setAvailability('all'); // REMOVED
  }, [location.search]);


  // --- Filtering Logic ---
  const filteredProducts = products.filter(product => {
    // 1. Search Query Filter (Name, Description, Category)
    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(lowerSearch);
      const descMatch = product.description?.toLowerCase().includes(lowerSearch); // Optional chaining for description
      const categoryMatch = product.category?.toLowerCase().includes(lowerSearch);
      if (!(nameMatch || descMatch || categoryMatch)) {
        return false;
      }
    }

    // 2. Category Filter
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }

    // 3. Price Range Filter
    const price = product.price; // Assuming price is a number
    const minPrice = parseFloat(priceRange.min);
    const maxPrice = parseFloat(priceRange.max);
    if (!isNaN(minPrice) && price < minPrice) {
      return false;
    }
    if (!isNaN(maxPrice) && price > maxPrice) {
      return false;
    }

    // 4. Rating Filter (Assuming product has a 'rating' property) - REMOVED
    // if (minRating > 0 && (!product.rating || product.rating < minRating)) {
    //   return false;
    // }

    // 5. Availability Filter (Assuming product has an 'inStock' boolean property) - REMOVED
    // if (availability === 'in-stock' && !product.inStock) {
    //   return false;
    // }

    return true; // Product passes all filters
  });

  // --- Sorting Logic ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        // Assuming product has a 'dateAdded' property (e.g., timestamp or ISO string)
        return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
      case 'rating':
        // Assuming product has a 'rating' property
        return (b.rating || 0) - (a.rating || 0);
      // Add 'best-sellers' logic if you have sales data
      // case 'best-sellers':
      //   return (b.sales || 0) - (a.sales || 0);
      default:
        return 0; // No sorting or default order
    }
  });


  // --- Cart Functions (Keep existing addToCart, decreaseQuantity, getItemQuantity) ---
  const addToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const currentCartItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = currentCartItems.find(item => item.id === product.id);

      let updatedItems;
      if (existingItem) {
        // Only increase quantity, don't change selectedWeight from here
        updatedItems = currentCartItems.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      } else {
        // Add new item
        // Determine default weight if options exist
        const defaultWeight = (product.weightOptions && product.weightOptions.length > 0)
          ? product.weightOptions[0]
          : undefined; // Or set to null or a standard default like '1 kg'

        updatedItems = [...currentCartItems, {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            // Add selectedWeight if determined
            ...(defaultWeight !== undefined && { selectedWeight: defaultWeight })
            // Add other relevant fields if needed
        }];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  const decreaseQuantity = (product) => {
    if (!setCartItems) return; // Guard clause

    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const currentCartItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = currentCartItems.find(item => item.id === product.id);

      let updatedItems;
      if (existingItem && existingItem.quantity === 1) {
        // Remove item
        updatedItems = currentCartItems.filter(item => item.id !== product.id);
      } else if (existingItem) {
        // Decrease quantity, don't change selectedWeight from here
        updatedItems = currentCartItems.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity - 1}
            : item
        );
      } else {
        // Item not found
        return currentCartItems;
      }

      // Update local storage
      if (updatedItems.length === 0) {
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  }

  const getItemQuantity = (productId) => {
    // Ensure cartItems is treated as an array
    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    const item = currentCartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // --- Handlers for Filter Changes ---
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Optional: Update URL as user types (can be noisy)
    // navigate(`${location.pathname}?search=${e.target.value}`, { replace: true });
  };

  return (
    <div className="products-page">
      <h1>{searchQuery ? `Results for "${searchQuery}"` : 'Fresh From Our Farms'}</h1>

      <div className="products-layout">
        {/* --- Filters Sidebar --- */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          {/* Search Filter */}
          <div className="filter-group">
            <h4>Search Products</h4>
            <input
              type="text"
              placeholder="Search by name, category..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.9rem' }} // Inline styles for simplicity, move to CSS if preferred
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range (₹)</h4>
            <div className="price-inputs">
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={priceRange.min}
                onChange={handlePriceChange}
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={priceRange.max}
                onChange={handlePriceChange}
                min="0"
              />
            </div>
            {/* --- Main Content Area (Sorting + Grid) --- */}
        <main className="products-main-content">
          {/* Sorting Dropdown */}
          <div className="sorting-section">
            <label htmlFor="sort-by">Sort by: </label>
            <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Most Rated</option>
              {/* <option value="best-sellers">Best Sellers</option> */}
            </select>
          </div>
          </main>
            {/* Placeholder for Slider */}
            {/* <p>(Price Slider Here)</p> */}
          </div>

          {/* Rating Filter - REMOVED */}
          {/* <div className="filter-group">
            <h4>Minimum Rating</h4>
            <StarRating rating={minRating} setRating={setMinRating} />
          </div> */}

          {/* Availability Filter - REMOVED */}
          {/* <div className="filter-group">
            <h4>Availability</h4>
            <label>...</label>
            <label>...</label>
          </div> */}

        </aside>

        

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="product-grid">
              {sortedProducts.map(product => {
                const quantity = getItemQuantity(product.id);
                return (
                  // --- Product Card JSX (Keep existing structure) ---
                  <div className="product-card" key={product.id}>
                    <div
                      className="product-link"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div className="product-content">
                        <h3>{product.name}</h3>
                        <p className="category">{product.category}</p>
                        {/* Display rating if available */}
                        {product.rating && (
                          <div className="card-rating">
                             <FaStar color="#ffc107" /> {product.rating.toFixed(1)}
                          </div>
                        )}
                        <p className="price">₹{product.price.toFixed(2)}/kg</p>
                        <p className="description">{product.description}</p>
                      </div>
                    </div>
                    <div className="product-actions">
                      {!isLoggedIn ? (
                         <button className="add-to-cart-btn" onClick={() => navigate('/login')}>
                           Login to Add
                         </button>
                      ) : quantity === 0 ? (
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      ) : (
                        <div className="quantity-control">
                          <button className="quantity-btn" onClick={() => decreaseQuantity(product)}>-</button>
                          <span className="quantity">{quantity}</span>
                          <button className="quantity-btn" onClick={() => addToCart(product)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                  // --- End Product Card JSX ---
                );
              })}
            </div>
          ) : (
             <p className="no-products-message">No products found matching your criteria.</p>
          )}
        
      </div>
    </div>
  );
}

export default Products;