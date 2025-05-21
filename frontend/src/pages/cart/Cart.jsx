import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate import
import './Cart.css'; // Ensure CSS is imported

// Assuming Material Icons are linked in your public/index.html or imported
// Example: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Load cart items from localStorage only if the initial prop is empty/null
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart && (!cartItems || cartItems.length === 0)) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure each item has a valid ID and price is a number
        const validCartItems = parsedCart.filter(item =>
          item && typeof item.id !== 'undefined' && typeof item.price === 'number' && !isNaN(item.price)
        );
        if (validCartItems.length > 0) {
          setCartItems(validCartItems);
        } else {
           localStorage.removeItem('cartItems'); // Clean up invalid storage
        }
      } catch (error) {
        console.error("Failed to parse cart items from localStorage:", error);
        localStorage.removeItem('cartItems'); // Clear corrupted storage
      }
    }
    // Intentionally run only on mount if cartItems prop is initially empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    // Only save if cartItems is an array
    if (Array.isArray(cartItems)) {
        if (cartItems.length > 0) {
            // Ensure we only save items with valid IDs and numeric prices
            const validCartItems = cartItems.filter(item =>
                item && typeof item.id !== 'undefined' && typeof item.price === 'number' && !isNaN(item.price)
            );
            localStorage.setItem('cartItems', JSON.stringify(validCartItems));
        } else {
            // Remove item from storage if cart becomes empty
            localStorage.removeItem('cartItems');
        }
    }
  }, [cartItems]); // Re-run whenever cartItems changes

  const updateQuantity = (id, newQuantity) => {
    // Prevent quantity from going below 1 directly, use remove button instead
    const quantity = Math.max(1, newQuantity);

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
    // Note: localStorage update happens via the useEffect hook watching cartItems
  };

  const removeItem = (id) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
    // Note: localStorage update happens via the useEffect hook watching cartItems
  };

  // Helper to safely get item price
  const getItemPrice = (item) => (item && typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0);

  const calculateSubtotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + (getItemPrice(item) * (item.quantity || 1)), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 5000) return 0; // Free shipping threshold
    // Ensure deliveryOption is valid, default to standard if not
    const option = ['standard', 'express'].includes(deliveryOption) ? deliveryOption : 'standard';
    return option === 'express' ? 150 : 80;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  // Render logic
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Your Cart</h1>
        <div className="empty-cart-message">
          <div className="empty-cart-icon" aria-hidden="true">🛒</div>
          <p>Your cart is currently empty.</p>
          <p className="empty-cart-subtext">Add some products to get started!</p>
          <Link to="/products" className="checkout-btn continue-shopping-btn">Browse Products</Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal(); // Calculate once for reuse
  const shippingCost = calculateShipping();
  const totalCost = calculateTotal();

  const handleCheckout = async () => {
    if (!cartItems.length) {
      setError('Your cart is empty');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to proceed with checkout');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const orderItems = cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity || 1,
        price: item.price
      }));

      const response = await fetch('http://localhost:6005/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: calculateTotal(),
          shippingAddress: {
            street: '',
            city: '',
            state: '',
            pincode: ''
          }
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        alert('Order placed successfully!');
        navigate('/orders');
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            // Ensure item and item.id exist before rendering
            item && typeof item.id !== 'undefined' && (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  {/* Use a placeholder if image source is missing */}
                  <img src={item.image || '/placeholder-image.png'} alt={item.name || 'Product Image'} />
                </div>
                <div className="item-details">
                  <h3>{item.name || 'Unnamed Product'}</h3>
                  {item.category && <p className="item-category">{item.category}</p>}
                  <p className="item-price">₹{getItemPrice(item).toFixed(2)}</p>

                  {item.selectedWeight && (
                    <div className="item-weight">
                      <span className="weight-label">Weight:</span> {item.selectedWeight}
                    </div>
                  )}

                  <div className="item-packaging">
                    <span className="packaging-label">Packaging:</span> {item.packaging || 'Standard'}
                  </div>

                  {item.moq && (
                    <div className="item-moq">
                      <span className="moq-label">MOQ:</span> {item.moq}
                    </div>
                  )}
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="quantity-btn"
                    aria-label={`Decrease quantity of ${item.name || 'product'}`}
                    disabled={(item.quantity || 1) <= 1} // Disable if quantity is 1
                  >
                    -
                  </button>
                  {/* Ensure quantity is at least 1 */}
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="quantity-btn"
                    aria-label={`Increase quantity of ${item.name || 'product'}`}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p>₹{(getItemPrice(item) * (item.quantity || 1)).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name || 'product'} from cart`}
                >
                  {/* Ensure material-icons class is available globally */}
                  <span className="material-icons">delete</span>
                </button>
              </div>
            )
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (18%):</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>₹{calculateShipping().toFixed(2)}</span>
            </div>
            
            {/* Add delivery time estimate */}
            <div className="delivery-info">
              <div className="delivery-icon">🚚</div>
              <div className="delivery-details">
                <p className="delivery-title">Estimated Delivery Time</p>
                <p className="delivery-time">
                  {deliveryOption === 'express' ? '1-2 Business Days' : '3-5 Business Days'}
                </p>
              </div>
            </div>

            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isProcessing || !cartItems.length}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Cart;