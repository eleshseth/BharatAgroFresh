import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

function UserProfile({ user, handleLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Early return with loading state or null
  if (!user?.email) {
    return null;
  }

  const getInitial = (name) => {
    return name && typeof name === 'string' ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="user-profile">
      <div 
        className="profile-trigger" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="avatar">
          {getInitial(user?.name)}
        </div>
        <span className="user-name">{user?.name || 'User'}</span>
      </div>

      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="user-info">
              <h4>{user?.name || 'User'}</h4>
              <p>{user?.email || 'No email'}</p>
              {user?.phoneNumber && <p>Phone: {user.phoneNumber}</p>}
            </div>
          </div>
          
          <div className="dropdown-menu">
            <Link to="/orders" className="menu-item">
              <i className="material-icons">shopping_bag</i>
              My Orders
            </Link>
            <button onClick={handleLogout} className="menu-item logout">
              <i className="material-icons">exit_to_app</i>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;