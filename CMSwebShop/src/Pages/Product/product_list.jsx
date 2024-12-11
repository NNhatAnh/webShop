import './product.css'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from '../../services/productService';

function Product_list(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    async function listProduct() {
        try {
            const data = await productService.listProduct();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        listProduct();
    }, []);

    return(
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
                        <th>Categori</th>
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
                                <button className="btn btn-edit">
                                <Link
                                    to="/productEdit"
                                    onClick={() => {
                                        sessionStorage.setItem("selectedProduct", JSON.stringify(product));
                                    }}
                                    >
                                    Edit
                                </Link>
                                </button>
                                <button className="btn btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
}

export default Product_list