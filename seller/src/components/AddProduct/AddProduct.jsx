import { useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
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
          stock: "",
        });
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
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
          <label htmlFor="stock">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
