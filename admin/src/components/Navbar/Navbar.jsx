import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo")) || {};

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="company-name">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="company-logo"
          />
          Bharat Agro Fresh 
        </h1>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="profile-info">
            <span className="user-name">{adminInfo.username}</span>
            <div className="profile-image">
              {adminInfo.username?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;