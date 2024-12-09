import React, { useState, useEffect } from "react";
import "./product.css";
import productService from "../../services/productService";
import Login from "../../components/login/login";
import orderService from "../../services/orderService";
import useAuth from "../../hooks/useAuth";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const listProduct = async () => {
            try {
                const data = await productService.listProduct();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const decodedToken = useAuth.DecodeToken(storedUser);
            setUser(decodedToken?.data || null);
        }

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

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    };

    const addToCart = (product) => {
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem) {
            const updatedCart = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedCart);
        } else {
            const newCartItem = {
                ...product,
                quantity: 1,
            };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCart = [...cartItems];
        if (newQuantity >= 1) {
            updatedCart[index].quantity = newQuantity;
            setCartItems(updatedCart);
        } else if (newQuantity === 0) {
            handleRemoveItem(index);
        }
    };

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        const item = updatedCart[index];

        if (item.quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }

        setCartItems(updatedCart);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const submitCart = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setShowLoginPopup(true);
            return;
        }
    
        const userId = useAuth.getUserID(storedUser);
    
        if (!userId) {
            alert("User ID is missing.");
            return;
        }
    
        const transformedCartItems = cartItems.map((item) => ({
            product: item.id,       
            quantity: item.quantity,
            price: item.price,
        }));
    
        try {
            await orderService.addItem(userId, transformedCartItems);
            setCartItems([]);
            setShowModal(false);
            setSelectedProduct(null);
            alert("Cart submitted successfully!");
        } catch (err) {
            console.error("Error submitting cart:", err);
            alert("Failed to submit the cart.");
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
                        <button
                            className="add-to-cart-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {cartItems.length > 0 && (
                <div className="cart-modal">
                    <h2>Your Cart</h2>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <p>{item.name}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Total: ${item.price * item.quantity}</p>
                                    <button
                                        className="remove-item-btn"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        <i className="fa-solid fa-trash-alt"></i> Remove
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <p>Total: ${calculateTotal()}</p>
                        <button className="submit-cart-btn" onClick={submitCart}>
                            Order
                        </button>
                    </div>
                </div>
            )}

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
                                <p><strong>Price:</strong> ${selectedProduct.price}</p>
                                <p><strong>Last Updated:</strong> {new Date(selectedProduct.updateTime).toLocaleString()}</p>
                            </div>
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={() => addToCart(selectedProduct)}
                        >
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>
                    </div>
                </div>
            )}
            {showLoginPopup && (
                <Login closePopup={closeLoginPopup} />
            )}
        </div>
    );
}
