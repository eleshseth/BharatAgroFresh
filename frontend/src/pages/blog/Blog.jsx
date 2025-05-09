import React from 'react';
import './Blog.css'; // Ensure CSS is imported
// Removed unused Link import for now

function Blog() {
  // Update blog post images in the blogPosts array
  const blogPosts = [
    {
      id: 1,
      title: 'Sustainable Farming Practices for the Modern Farmer',
      author: 'John Doe',
      date: 'June 15, 2023',
      excerpt: 'Learn about the latest sustainable farming techniques that can increase yield while protecting the environment.',
      image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
      featuredImage: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80' // Specific image for featured
    },
    {
      id: 2,
      title: 'The Benefits of Organic Produce',
      author: 'Jane Smith',
      date: 'May 28, 2023',
      excerpt: 'Discover why organic produce is not just better for your health but also for the planet.',
      image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=600&q=80'
    },
    {
      id: 3,
      title: 'Seasonal Planting Guide: Summer Edition',
      author: 'Mike Johnson',
      date: 'April 10, 2023',
      excerpt: 'Get ready for summer with our comprehensive guide on what to plant during the warmer months.',
      image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600&q=80'
    },
    {
      id: 4,
      title: 'Farm to Table: The Journey of Your Food',
      author: 'Sarah Williams',
      date: 'March 22, 2023',
      excerpt: 'Follow the fascinating journey of how food travels from farms to your dinner table.',
      image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=600&q=80'
    },
    {
      id: 5,
      title: 'Innovations in Agricultural Technology',
      author: 'David Brown',
      date: 'February 15, 2023',
      excerpt: 'Explore the cutting-edge technologies that are transforming modern agriculture.',
      image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Placeholder function for Read More button click
  const handleReadMore = (postId) => {
    console.log(`Navigate to blog post with ID: ${postId}`);
    // In a real app, you would use react-router-dom's useNavigate hook:
    // navigate(`/blog/${postId}`);
  };

  // Placeholder function for Subscribe button click
  const handleSubscribe = (event) => {
    event.preventDefault(); // Prevent form submission
    const email = event.target.elements.email.value;
    if (email) {
      console.log(`Subscribing email: ${email}`);
      alert(`Thank you for subscribing with ${email}!`);
      // Add actual subscription logic here (e.g., API call)
      event.target.reset(); // Clear the input field
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const featuredPost = blogPosts[0]; // Assuming the first post is featured

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <h1>Bharat Agro Fresh Blog</h1>
        <p>Stay updated with the latest news, tips, and insights from the world of agriculture</p>
      </section>

      {/* Featured Post Section
      {featuredPost && (
        <section className="featured-post">
          <h2>Featured Post</h2>
          <div className="featured-post-content">
            <div className="featured-image">
              <img src={featuredPost.featuredImage || featuredPost.image} alt={featuredPost.title || "Featured post image"} />
            </div>
            <div className="featured-text">
              <h3>{featuredPost.title}</h3>
              <p className="post-meta">By {featuredPost.author} | {featuredPost.date}</p>
              <p>{featuredPost.excerpt}</p>
              <button className="read-more" onClick={() => handleReadMore(featuredPost.id)}>Read More</button>
            </div>
          </div>
        </section>
      )} */}

      {/* Recent Posts Section
      <section className="blog-posts">
        <h2>Recent Posts</h2>
        <div className="posts-grid">
          {blogPosts.slice(1).map(post => ( // Display posts other than the featured one
            <div className="blog-card" key={post.id}>
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p className="post-meta">By {post.author} | {post.date}</p>
                <p>{post.excerpt}</p>
                <button className="read-more" onClick={() => handleReadMore(post.id)}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Subscribe Section */}
      <section className="subscribe">
        <h2>Stay Informed</h2>
        <p>Subscribe to our newsletter for the latest updates and exclusive content delivered straight to your inbox.</p>
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <input type="email" name="email" placeholder="Enter your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

    </div>
  );
}

export default Blog;