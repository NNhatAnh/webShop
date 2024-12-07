import React, { useState, useEffect } from "react";
import "./product.css";
import productService from "../../services/productService";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="product-container">
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}

            <div className="product-grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-item"
                        onClick={() => handleProductClick(product)}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-title">{product.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedProduct && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}>X</button>
                        <h2 className="modal-title">{selectedProduct.name}</h2>
                        <div className="product-details">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="product-modal-image"
                            />
                            <div className="details-text">
                                <p><strong>Title:</strong> {selectedProduct.title}</p>
                                <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                                <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                                <p><strong>Category:</strong> {selectedProduct.category}</p>
                                <p><strong>Last Updated:</strong> {new Date(selectedProduct.updateTime).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
