import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure CSS is imported
import { addUser } from '../../services/localStorage'; // Assuming this service exists

// Assuming you have icons for show/hide password
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup({ setIsLoggedIn }) { // Removed unused props
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phone number
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('buyer'); // Default to buyer

  // State for UI control
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false); // State for success message

  // Vendor specific fields (optional for now, can be added to profile later)
  // const [businessName, setBusinessName] = useState('');
  // const [gstNumber, setGstNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Validation ---
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Basic phone number check (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // --- Prepare User Data ---
    const userData = {
      name,
      email,
      phoneNumber,
      password, // Password will be handled by the addUser service (ideally hashed)
      accountType,
      // Add vendor details if needed here or handle in profile
      // ...(accountType === 'vendor' && { businessName, gstNumber }),
    };

    setIsLoading(true);
    try {
      // --- Attempt to Add User ---
      addUser(userData); // Use your service to add the user (handles duplicates etc.)

      // --- Handle Success ---
      setSignupSuccess(true); // Show success message instead of logging in
      // Optional: Clear form fields
      // setName(''); setEmail(''); setPhoneNumber(''); setPassword(''); setConfirmPassword('');

      // Optional: Redirect after a delay or let user click a link
      // setTimeout(() => {
      //   navigate('/login');
      // }, 5000); // Redirect to login after 5 seconds

    } catch (err) {
      // --- Handle Errors ---
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="auth-container">
        {signupSuccess ? (
          // --- Success Message View ---
          <div className="signup-success">
            <h2>Registration Successful!</h2>
            <p>Thank you for registering! We’ll verify your account and notify you shortly.</p>
            <p>You can now <Link to="/login">log in</Link> or continue browsing.</p>
            {/* Optionally add a button to browse */}
            {/* <button onClick={() => navigate('/')} className="auth-button browse-btn">Start Browsing</button> */}
          </div>
        ) : (
          // --- Signup Form View ---
          <>
            <h1>Create Your Account</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

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

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  type="tel" // Use tel type for mobile numbers
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your 10-digit mobile number"
                  maxLength="10" // Enforce 10 digits
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
                    placeholder="Create a password (min. 6 characters)"
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
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {/* Replace with icons if available */}
                    {showConfirmPassword ? 'Hide' : 'Show'}
                    {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                  </button>
                </div>
              </div>

              {/* Account Type Selection */}
              <div className="form-group account-type">
                <label htmlFor="accountType">I am a:</label>
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="buyer">Buyer (Hotel, Caterer, Distributor, etc.)</option>
                  <option value="vendor">Vendor (Farmer, Trader)</option>
                </select>
              </div>

              {/* Optional Vendor Fields (Can be moved to profile) */}
              {/* {accountType === 'vendor' && (
                <div className="vendor-fields">
                   <div className="form-group"> ... Business Name ... </div>
                   <div className="form-group"> ... GST Number ... </div>
                </div>
              )} */}

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Link to Login */}
            <div className="auth-links">
              <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;