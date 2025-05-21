import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure CSS is imported
import { addUser } from '../../services/localStorage';
import farmimage from '../../assets/farm-background.jpg';

// Assuming you have icons for show/hide password
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup({ setIsLoggedIn }) {
  // Removed unused props
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
    setError('');

    // Validation checks remain the same
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
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

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:6005/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          mobile: phoneNumber,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSignupSuccess(true);
        // Show success message briefly before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='main-container'>
      <div className='signup-page'>
        <div className='signup-content'>
          {signupSuccess ? (
            <div className='signup-success'>
              <h2>Registration Successful!</h2>
              <p>
                Thank you for registering! We'll verify your account and notify
                you shortly.
              </p>
              <p>
                You can now <Link to='/login'>log in</Link> or continue
                browsing.
              </p>
            </div>
          ) : (
            <div className='signup-form-container'>
              <form className='signup-form' onSubmit={handleSubmit}>
                <h1>Create Your Account</h1>
                {error && (
                  <div className='error-message'>{error}</div>
                )}

                {/* Name */}
                <div className='form-group'>
                  <label htmlFor='name'>Full Name</label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your full name'
                    required
                  />
                </div>

                {/* Email */}
                <div className='form-group'>
                  <label htmlFor='email'>Email Address</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className='form-group'>
                  <label htmlFor='phoneNumber'>Mobile Number</label>
                  <input
                    type='tel'
                    id='phoneNumber'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='Enter your 10-digit mobile number'
                    maxLength='10'
                    required
                  />
                </div>

                {/* Password */}
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <div className='password-input-container'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Create a password '
                      required
                    />
                    <button
                      type='button'
                      className='password-toggle'
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <div className='password-input-container'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Confirm your password'
                      required
                    />
                    <button
                      type='button'
                      className='password-toggle'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  className='auth-button'
                  disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              {/* Link to Login */}
              <div className='auth-links'>
                <p>
                  Already have an account? <Link to='/login'>Sign In</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
