import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./product_edit.css";
import productService from "../../services/productService";

const Product_edit = () => {
  const { productID } = useParams();
  const navigate = useNavigate();

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

  const CancelEdit = () => {
    if (confirm("Are you sure want to cancel ?")) {
      navigate("/productList");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("product", formData.product);
      updateData.append("title", formData.title);
      updateData.append("brand", formData.brand);
      updateData.append("price", formData.price);
      updateData.append("category", formData.category);
      if (formData.image) {
        updateData.append("image", formData.image);
      }

      const response = await productService.updateProduct(updateData, productID);
      alert(response);
      navigate("/productList");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.productDetail(productID);
        const product = response || {};

        setFormData({
          product: product.name || "",
          imagePreview: product.image || "",
          title: product.title || "",
          brand: product.brand || "",
          category: product.category || "",
          price: product.price || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productID]);

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
          <button type="button" onClick={() => CancelEdit()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product_edit;
