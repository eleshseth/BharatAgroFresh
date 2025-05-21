import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails({ isLoggedIn, cartItems, setCartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:6005/api/products/${id}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setProduct(data.data.product);
          if (data.data.product.weightOptions && data.data.product.weightOptions.length > 0) {
            setSelectedWeight(data.data.product.weightOptions[0]);
          }
        } else {
          throw new Error(data.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getItemQuantity = (productId) => {
    const currentCartItems = cartItems || [];
    const item = currentCartItems.find(item => item.id === parseInt(productId));
    const quantity = item ? item.quantity : 0;
    // Log quantity check
    console.log(`getItemQuantity for ${productId}:`, quantity, 'Cart:', currentCartItems);
    return quantity;
  };

  const handleAddToCart = () => {
    console.log('handleAddToCart called'); // Log function call
    if (!isLoggedIn) {
      console.log('User not logged in, navigating to /login');
      navigate('/login');
      return;
    }

    if (product) {
      console.log('Adding/Increasing item:', product.id, 'Selected Weight:', selectedWeight); // Log item details
      // Check the type right before calling it
      console.log('handleAddToCart - Type of setCartItems before call:', typeof setCartItems);
      setCartItems(prevItems => { // Line 58 where error occurs
        console.log('setCartItems (Add) - Previous state:', prevItems); // Log previous state
        const currentCartItems = Array.isArray(prevItems) ? prevItems : [];
        const existingItem = currentCartItems.find(item => item.id === product.id);

        let updatedItems;
        if (existingItem) {
          console.log('Item exists, increasing quantity');
          updatedItems = currentCartItems.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + 1, selectedWeight: selectedWeight}
              : item
          );
        } else {
          console.log('Item is new, adding to cart');
          updatedItems = [...currentCartItems, {...product, quantity: 1, selectedWeight: selectedWeight}];
        }

        console.log('setCartItems (Add) - New state:', updatedItems); // Log new state
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      });
    } else {
      console.error('handleAddToCart called but product is null');
    }
  };

  const decreaseQuantity = () => {
    console.log('decreaseQuantity called'); // Log function call
    if (!isLoggedIn || !product) {
      console.log('decreaseQuantity - Guard clause hit (not logged in or no product)');
      return;
    }

    console.log('Decreasing item:', product.id); // Log item details
    setCartItems(prevItems => {
      console.log('setCartItems (Decrease) - Previous state:', prevItems); // Log previous state
      const currentCartItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = currentCartItems.find(item => item.id === product.id);

      let updatedItems;
      if (existingItem && existingItem.quantity === 1) {
        console.log('Item quantity is 1, removing item');
        updatedItems = currentCartItems.filter(item => item.id !== product.id);
      } else if (existingItem) {
        console.log('Item quantity > 1, decreasing quantity');
        updatedItems = currentCartItems.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        console.log('Item not found in cart, returning previous state');
        return currentCartItems; // Item not found
      }

      console.log('setCartItems (Decrease) - New state:', updatedItems); // Log new state
      // Update local storage
      if (updatedItems.length === 0) {
        console.log('Cart is empty, removing from localStorage');
        localStorage.removeItem('cartItems');
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  if (!product) {
    return <div className="error-container">Product not found</div>;
  }

  // Ensure cartItems is initialized if null/undefined before calling getItemQuantity
  // Log before rendering cart actions
  const currentQuantity = getItemQuantity(product.id);
  console.log('Rendering Cart Actions - Current Quantity:', currentQuantity);

  return (
    // Renamed class for clarity
    <div className="product-detail-page-container">
      <button className="back-button" onClick={() => navigate('/products')}>
        {/* Use a proper arrow icon if available, or keep text */}
        ← Back to Products
      </button>

      {/* Renamed class for the grid */}
      <div className="product-detail-grid">
        <div className="product-image-container"> {/* Added container for potential zoom/gallery */}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          {/* Consider making category a Link if categories have pages */}
          <span className="product-category">{product.category}</span>
          {/* Display price per selected weight if applicable, or keep per kg */}
          <p className="product-price">₹{product.price} / kg</p>
          <p className="product-description">{product.description}</p>

          {product.weightOptions && product.weightOptions.length > 0 && (
            <div className="product-options">
              <label>
                Select Weight:
                <select 
                  value={selectedWeight} 
                  onChange={(e) => setSelectedWeight(e.target.value)}
                >
                  {product.weightOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          
          <div className="product-meta">
            {/* Use definition list (dl, dt, dd) for semantic structure */}
            <dl>
              <div><dt>Minimum Order:</dt> <dd>{product.moq}</dd></div>
              <div><dt>Packaging:</dt> <dd>{product.packaging}</dd></div>
              <div><dt>Delivery Time:</dt> <dd>{product.delivery}</dd></div>
              <div><dt>Shipping:</dt> <dd>{product.shipping}</dd></div>
              <div><dt>Available in:</dt> <dd>{product.locations}</dd></div>
            </dl>
          </div>

          {/* Cart Actions Section */}
          <div className="cart-actions">
            {currentQuantity === 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div className="quantity-control">
                <button className="quantity-btn decrease-btn" onClick={decreaseQuantity}>-</button>
                <span className="item-count">{currentQuantity}</span>
                <button className="quantity-btn increase-btn" onClick={handleAddToCart}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;