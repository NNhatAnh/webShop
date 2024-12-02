import React, { useState, useEffect } from "react";
import "./product_edit.css";

const Product_edit = () => {
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
    // Khởi tạo CKEditor 5 cho title
    if (window.ClassicEditor) {
      window.ClassicEditor.create(document.querySelector("#title"), {
        toolbar: [
          "bold",
          "italic",
          "underline",
          "link",
          "bulletedList",
          "numberedList",
        ],
      })
        .then((editor) => {
          editor.model.document.on("change:data", () => {
            const value = editor.getData();
            handleEditorChange("title", value);
          });
        })
        .catch((error) => {
          console.error("There was a problem initializing CKEditor:", error);
        });

      // Khởi tạo CKEditor 5 cho brand
      window.ClassicEditor.create(document.querySelector("#brand"), {
        toolbar: [
          "bold",
          "italic",
          "underline",
          "link",
          "bulletedList",
          "numberedList",
        ],
      })
        .then((editor) => {
          editor.model.document.on("change:data", () => {
            const value = editor.getData();
            handleEditorChange("brand", value);
          });
        })
        .catch((error) => {
          console.error("There was a problem initializing CKEditor:", error);
        });
    }

    return () => {
      // Cleanup CKEditor khi component unmount
      if (window.ClassicEditor) {
        const editors = document.querySelectorAll(".ck-editor__editable");
        editors.forEach((editor) => {
          const instance = editor.ckeditorInstance;
          if (instance) {
            instance.destroy();
          }
        });
      }
    };
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
          <textarea
            id="title"
            value={formData.title}
            onChange={() => {}}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <textarea
            id="brand"
            value={formData.brand}
            onChange={() => {}}
          ></textarea>
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
            Cập nhật
          </button>
          <button type="button" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product_edit;
