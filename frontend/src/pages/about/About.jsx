import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Bharat Agro Fresh</h1>
        <p>Connecting farmers and consumers since 2010</p>
      </section>
      
      <section className="our-story">
        <h2>Our Story</h2>
        <div className="story-content">
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Our farm" />
          </div>
          
          <div className="story-text">
            <p>AgroMarket was founded with a simple yet powerful vision: to bridge the gap between farmers and consumers. What started as a small initiative in 2010 has now grown into a trusted platform that serves thousands of customers and supports hundreds of farmers across the country.</p>
            <p>Our journey has been guided by our commitment to sustainability, fair trade, and quality. We believe in creating a marketplace that values the hard work of farmers and provides consumers with access to fresh, high-quality agricultural products.</p>
          </div>
        </div>
      </section>
      
      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>To revolutionize the agricultural supply chain by creating a transparent, efficient, and fair marketplace that benefits both farmers and consumers.</p>
        
        <div className="mission-values">
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We promote sustainable farming practices that protect our environment for future generations.</p>
          </div>
          <div className="value-card">
            <h3>Fair Trade</h3>
            <p>We ensure farmers receive fair compensation for their hard work and quality produce.</p>
          </div>
          <div className="value-card">
            <h3>Quality</h3>
            <p>We never compromise on the quality of products available on our platform.</p>
          </div>
        </div>
      </section>
      
      {/* <section className="team">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team member" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team member" />
            <h3>Jane Smith</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team member" />
            <h3>Mike Johnson</h3>
            <p>Agricultural Expert</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Team member" />
            <h3>Sarah Williams</h3>
            <p>Customer Relations</p>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default About