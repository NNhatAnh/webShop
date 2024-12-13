import './product.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from '../../services/productService';

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

    // Handle delete product
    async function deleteItem(productID) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await productService.deleteItem(productID);
                setProducts((prevProducts) => prevProducts.filter(p => p.id !== productID));
                alert("Product deleted successfully!");
            } catch (err) {
                alert("Error deleting product: " + err.message);
            }
        }
    }

    useEffect(() => {
        listProduct();
    }, []);

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
                            <td>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="btn btn-edit"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => deleteItem(product.id)}
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