import React, { useState, useEffect } from "react";
import "./product.css";
import productService from "../../services/productService";
import Login from "../../components/login/login";
import orderService from "../../services/orderService";
import useAuth from "../../hooks/useAuth";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const pageSize = 6;  // Số sản phẩm mỗi trang

    // Fetch sản phẩm từ API khi component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.listProduct();
                const publicProducts = data.filter(product => !product.privacy);
                setProducts(publicProducts);
                setFilteredProducts(publicProducts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Tìm kiếm sản phẩm theo tên
    const handleSearch = (query) => {
        if (!query.trim()) {  
            setFilteredProducts(products);  
        } else {
            const result = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(result);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Backspace' || event.target.value === '') {
            handleSearch(event.target.value);
        }
    };

    // Hiển thị modal khi người dùng click vào sản phẩm
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    // Tắt modal khi click ngoài nội dung
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Đóng popup đăng nhập
    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    };

    // Thêm sản phẩm vào giỏ hàng
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
            const newCartItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
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

    // Tính tổng giá trị giỏ hàng
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Xử lý việc đặt hàng
    const submitCart = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setShowLoginPopup(true);
            return;
        } else if (useAuth.checkExpired(storedUser)) {
            alert("User token expired! Please login again.");
            localStorage.removeItem("user");
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
            alert("Cart submitted successfully!");
        } catch (err) {
            console.error("Error submitting cart:", err);
            alert("Failed to submit the cart.");
        }
    };

    // Tính toán số trang và sản phẩm hiển thị trên mỗi trang
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize, 
        currentPage * pageSize
    );

    // Cập nhật trang khi người dùng nhấn vào nút phân trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* Thanh tìm kiếm */}
            <div className="search-bar">
                <div className="search-container">
                    <i className="search-icon fas fa-search"></i>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for products..."
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="product-container">
                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">Error: {error}</p>}

                <div className="product-grid">
                    {currentProducts.map((product) => (
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

                {/* Phân trang */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Giỏ hàng */}
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
                                        <p>Quantity: {item.quantity}</p>
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

                {/* Modal sản phẩm */}
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
                                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                                    <p><strong>Price:</strong> ${selectedProduct.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Popup đăng nhập */}
            {showLoginPopup && (
                <Login closePopup={closeLoginPopup} />
            )}
        </>
    );
}
