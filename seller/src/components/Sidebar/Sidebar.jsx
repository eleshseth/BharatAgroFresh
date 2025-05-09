import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ setCurrentView }) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <button 
            onClick={() => setCurrentView('add-product')} 
            className="nav-item"
          >
            <i className="material-icons">add_box</i>
            <span>Add Product</span>
          </button>
          <button 
            onClick={() => setCurrentView('products')} 
            className="nav-item"
          >
            <i className="material-icons">inventory</i>
            <span>Product List</span>
          </button>
          <button 
            onClick={() => setCurrentView('orders')} 
            className="nav-item"
          >
            <i className="material-icons">shopping_bag</i>
            <span>Orders</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
