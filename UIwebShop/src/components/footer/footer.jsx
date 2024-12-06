import React from "react";
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About WatchShop</h4>
                    <p>
                        WatchShop is your one-stop destination for premium watches, offering a wide range of styles from classic to modern designs.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@watchshop.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Watch Lane, Time City, USA</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 WatchShop. All rights reserved.</p>
            </div>
        </footer>
    );
}
