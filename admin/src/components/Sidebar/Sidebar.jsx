import './Sidebar.css';

function Sidebar({ setCurrentView }) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <button 
            onClick={() => setCurrentView('active-sellers')} 
            className="nav-item"
          >
            <i className="material-icons">store</i>
            <span>Active Sellers</span>
          </button>
          <button 

            onClick={() => setCurrentView('active-customers')} 
            className="nav-item"
          >
            <i className="material-icons">people</i>

            <span>Active Customers</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
