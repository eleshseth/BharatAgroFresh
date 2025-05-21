import { useState } from "react";
import "./AddProduct.css";

function AddProduct({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // Added missing required field
    weightOptions: ["1kg", "5kg", "10kg"], // Added with default options
    moq: "", // Added missing required field
    packaging: "", // Added missing required field
    delivery: "", // Added missing required field
    shipping: "", // Added missing required field
    locations: "", // Added missing required field
    stock: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Vegetables", "Fruits", "Grains", "Spices", "Organic"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch("http://localhost:6005/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
          weightOptions: ["1kg", "5kg", "10kg"],
          moq: "",
          packaging: "",
          delivery: "",
          shipping: "",
          locations: "",
          stock: "",
        });
        
        // Call the callback if provided
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      setError(error.message || "Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹/kg)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="moq">Minimum Order Quantity</label>
          <input
            type="text"
            id="moq"
            name="moq"
            value={formData.moq}
            onChange={handleChange}
            placeholder="e.g., 5kg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="packaging">Packaging</label>
          <input
            type="text"
            id="packaging"
            name="packaging"
            value={formData.packaging}
            onChange={handleChange}
            placeholder="e.g., Available in 5kg & 10kg bags"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="delivery">Delivery</label>
          <input
            type="text"
            id="delivery"
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            placeholder="e.g., 2-3 days"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping">Shipping</label>
          <input
            type="text"
            id="shipping"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            placeholder="e.g., Free shipping on orders above ₹1000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="locations">Locations</label>
          <input
            type="text"
            id="locations"
            name="locations"
            value={formData.locations}
            onChange={handleChange}
            placeholder="e.g., Delhi, Mumbai, Bangalore"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock (units)</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
