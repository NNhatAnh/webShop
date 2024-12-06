import React from "react";
import './home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home">
                <h1>Welcome to Watch Shop</h1>
                <p>Your ultimate destination for premium timepieces.</p>
                <div className="home-content">
                    <h2>Home</h2>
                    <p>
                        At Watch Shop, we specialize in offering a curated collection of luxury and affordable watches.
                        Whether you're looking for a timeless classic or the latest in modern design, we have something
                        to suit your style.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide exceptional quality, unmatched service, and a seamless shopping experience.
                        We strive to connect you with the perfect watch that complements your personality and elevates your look.
                    </p>
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Wide range of brands and styles</li>
                        <li>Authenticity guaranteed</li>
                        <li>Fast and reliable shipping</li>
                        <li>Friendly customer support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}