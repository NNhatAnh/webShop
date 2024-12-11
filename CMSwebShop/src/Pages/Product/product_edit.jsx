import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./product_edit.css";

const Product_edit = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    product: "",
    image: null,
    imagePreview: "",
    title: "",
    brand: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Thực hiện gọi API cập nhật dữ liệu ở đây
  };

  useEffect(() => {
    const savedProduct = sessionStorage.getItem("selectedProduct");
    if (savedProduct) {
      const product = JSON.parse(savedProduct);
      setFormData({
        product: product.name || "",
        imagePreview: product.image || "",
        title: product.title || "",
        brand: product.brand || "",
        quantity: product.quantity || "",
        category: product.category || "",
        price: product.price || "",
      });
    }
  }, []);
  

  return (
    <div className="product-add-container">
      <h2>Update Product</h2>
      <form className="product-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product:</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Selected"
              className="image-preview"
            />
          )}
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title" 
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand" 
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => console.log("Cancelled")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product_edit;
