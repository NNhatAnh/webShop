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
    quantity: "",
    category: "",
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

  const handleEditorChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const handleUpdate = () => {
    console.log("Update button clicked");
    // Logic for updating can be added here
  };

  const handleCancel = () => {
    setFormData({
      product: "",
      image: null,
      imagePreview: "",
      title: "",
      brand: "",
      quantity: "",
      category: "",
    });
    console.log("Form reset (cancelled)");
  };

  useEffect(() => {
    if (location.state && location.state.product) {
      const product = location.state.product;
      console.log(product)
      setFormData({
        product: product.name || "",
        image: null, 
        imagePreview: product.image || "",
        title: product.title || "",
        brand: product.brand || "",
        quantity: product.quantity || "",
        category: product.category || "",
      });
    }
  }, [location.state]);

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
            name="product"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="product"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
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
        <div className="form-actions">
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product_edit;
