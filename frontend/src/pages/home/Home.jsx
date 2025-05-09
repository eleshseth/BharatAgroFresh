import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  // Removed scroll animation effect and useEffect hook

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          {/* Corrected class to className */}
          <h1 className="welcome-line">Welcome to <br/><span>Bharat Agro Fresh</span></h1>
          <p>Connecting Farms to Businesses with Freshness & Trust</p>
          <Link to="/products" className="cta-button">Explore Products</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Fresh Products</h3>
            <p>Direct from farms to your doorstep</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Quality Assured</h3>
            <p>All products pass our strict quality checks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery service</p>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Organic Tomatoes" />
            </div>
            {/* Ensure this structure matches the latest CSS (no .product-info wrapper) */}
            <div className="product-details">
              <h3>Organic Tomatoes</h3>
              <p>Fresh organic tomatoes from local farms</p>
              <Link to="/products" className="view-product-btn">View Details</Link>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="https://images.unsplash.com/photo-1613758235402-745466bb7efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Premium Rice" />
            </div>
            <div className="product-details">
              <h3>Premium Rice</h3>
              <p>High-quality rice from sustainable farms</p>
              <Link to="/products" className="view-product-btn">View Details</Link>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Fresh Apples" />
            </div>
            <div className="product-details">
              <h3>Fresh Apples</h3>
              <p>Juicy apples from mountain orchards</p>
              <Link to="/products" className="view-product-btn">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <div className="quote">"The quality of products is exceptional. I've been a regular customer for over a year now!"</div>
            <div className="customer">- Rahul</div>
          </div>
          <div className="testimonial">
            <div className="quote">"Fast delivery and fresh products every time. Highly recommended!"</div>
            <div className="customer">- Tlo Food Chain</div>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest products and offers</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  )
}

export default Home