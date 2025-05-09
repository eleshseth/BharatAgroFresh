// Example in App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './styles/base.css';
import ScrollToTop from '../ScrollToTop.js'; // Import ScrollToTop component


// Import the new Header component
import Header from '../src/components/Header/Header.jsx'; // Adjust path if needed

// Page components
import Home from './pages/home/Home.jsx';
import Products from './pages/products/Products.jsx';
import About from './pages/about/About.jsx';
import Blog from './pages/blog/Blog.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Cart from './pages/cart/Cart.jsx';
import ProductDetails from './pages/products/ProductDetails.jsx';
// UserProfile is now used within Header.jsx, no need to import here unless used elsewhere
// import UserProfile from './components/UserProfile/UserProfile';
import { products as sampleProducts } from './assets/assets';

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  // Replace API fetch with local data
  useEffect(() => {
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  // Load cart items and user data from localStorage when the app starts
  useEffect(() => {
    // Fix for the JSON parse error - check if the value exists before parsing
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart && savedCart !== "undefined") {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem('cartItems'); // Clear invalid data
      }
    }
    
    // Check if user is logged in - add similar error handling
    const userData = localStorage.getItem('userData');
    if (userData && userData !== "undefined") {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('userData'); // Clear invalid data
      }
    }
  }, []);

  const toggleAuthForm = () => {
    setShowLoginForm(!showLoginForm);
  }

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userData');
    // Keep cart items in localStorage but clear from state
    setCartItems([]);
  }

  // Remove handleAdminLogin function

  return (
    // Remove the opening <Router> tag
    <div className="app">
      {/* Use the new Header component and pass props */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        cartItems={cartItems}
      />

      {/* Remove the old header JSX */}
      {/* <header> ... </header> */}

      <main>
      <ScrollToTop />
        {loading ? (
          <div className="loading-container">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={
              <Products
                products={products}
                setCartItems={setCartItems}
                cartItems={cartItems}
                isLoggedIn={isLoggedIn}
              />
            } />
            <Route path="/products/:id" element={
              <ProductDetails
                products={products}
                // Pass setCartItems correctly
                setCartItems={setCartItems}
                cartItems={cartItems} // Pass cartItems if needed in ProductDetails
                isLoggedIn={isLoggedIn}
              />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={
              isLoggedIn ?
                <Navigate to="/" /> :
                <Login
                  setIsLoggedIn={handleLogin}
                  // toggleAuthForm={toggleAuthForm} // Pass if needed by Login
                  // showLoginForm={showLoginForm} // Pass if needed by Login
                />
            } />
            <Route path="/signup" element={
              isLoggedIn ?
                <Navigate to="/" /> :
                <Signup
                  setIsLoggedIn={handleLogin}
                  // toggleAuthForm={toggleAuthForm} // Pass if needed by Signup
                  // showLoginForm={showLoginForm} // Pass if needed by Signup
                />
            } />
            <Route path="/cart" element={
              isLoggedIn ?
                <Cart cartItems={cartItems} setCartItems={setCartItems} /> :
                <Navigate to="/login" />
            } />
            {/* Remove admin route */}
          </Routes>
        )}
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} AgroMarket. All rights reserved.</p>
      </footer>
    </div>
  // Remove the closing </Router> tag
  )
}

export default App
  