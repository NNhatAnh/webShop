import "./product.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/productService";
import orderService from "../../services/orderService";

function Product_list() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch list of products
  async function listProduct() {
    try {
      const data = await productService.listProduct();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Toggle hide/show product
  async function toggleHideShow(product) {
    const action = product.is_deleted ? "public" : "private";
    console.log(action);
    if (window.confirm(`Are you sure you want to ${action} this product?`)) {
      try {
        await productService.selectedItem(product.id);

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, is_deleted: !product.privacy } : p
          )
        );
        alert(`Product ${action} successfully!`);
        window.location.reload();
      } catch (err) {
        alert(`Error trying to ${action} product: ${err.message}`);
      }
    }
  }

  // Delete product
  async function deleteProduct(product) {
    if (window.confirm(`Are you sure you want to delete this product?`)) {
      try {
        await productService.deleteItem(product.id);
        await orderService.removeProductFromOrder(product.id);

        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );

        alert(`Product deleted successfully from the order!`);
      } catch (err) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    listProduct();
  }, [setProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-content-main-content">
      <h2>List Product</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Image</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.privacy ? "Hidden" : "Visible"}</td>
              <td>
                <Link to={`/product/${product.id}`} className="btn btn-edit">
                  Edit
                </Link>

                <button
                  className={`btn ${
                    product.privacy ? "btn-show" : "btn-delete"
                  }`}
                  onClick={() => toggleHideShow(product)}
                >
                  {product.privacy ? "Public" : "Private"}
                </button>

                <button
                  className="btn btn-delete"
                  onClick={() => deleteProduct(product)}
                  disabled={!product.privacy}
                  title={
                    product.privacy === true
                      ? ""
                      : "Cannot delete when product is public"
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product_list;
