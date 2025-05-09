import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure CSS is imported
// Assuming you have icons
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      // --- Authentication Logic ---
      // Retrieve users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password); // Simple password check (replace with secure method)

      if (!user) {
        // Simulate network delay for failed login
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error('Invalid email or password.');
      }

      // --- Handle Success ---
      // Prepare user data for app state (exclude password)
      const loggedInData = {
        id: user.id, // Assuming user has an ID from addUser service
        name: user.name,
        email: user.email,
        accountType: user.accountType || 'buyer', // Default role if missing
        phoneNumber: user.phoneNumber,
        // Add other relevant details if stored
      };

      // Store essential, non-sensitive data for session persistence if needed
      localStorage.setItem('userData', JSON.stringify(loggedInData));

      // Update app's login state
      setIsLoggedIn(loggedInData);

      // --- Redirect based on role or to a default page ---
      // Example: Redirect vendors to a specific dashboard
      // if (loggedInData.accountType === 'vendor') {
      //   navigate('/vendor-dashboard');
      // } else {
      //   navigate('/products'); // Default redirect
      // }
      navigate('/products'); // Redirect to products page for now

    } catch (error) {
      // --- Handle Errors ---
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Sign in to continue to AgroConnect</p> {/* Added subtitle */}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                 {/* Replace with icons if available */}
                 {showPassword ? 'Hide' : 'Show'}
                 {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
              </button>
            </div>
            {/* Optional: Add Forgot Password link */}
            {/* <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Link to Signup */}
        <div className="auth-links">
          <p>Don't have an account? <Link to="/signup">Sign Up Now</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;