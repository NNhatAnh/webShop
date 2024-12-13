import React, { useState, useEffect } from 'react';
import './home.css';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "../images/slide1.jpg",
        "../images/slide2.jpg",
        "../images/slide3.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Chuyển ảnh mỗi 

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);
    return (
        <div className="home-container">    
            <div className="slider">
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className={index === currentSlide ? 'active' : ''} 
                    />
                ))}
            </div>        
            <div className="home">
                <div className="home-content">
                    <h2>Home</h2>
                    <p>
                    Welcome to Watch Shop, your premier destination for exquisite timepieces. We offer a curated collection of watches, ranging from timeless classics to the latest trends, ensuring there's a perfect piece for every individual and occasion. Discover the artistry of horology with our diverse selection of renowned brands, each reflecting exceptional craftsmanship and precision. At Watch Shop, we're more than just a retailer; we're purveyors of style and enduring elegance.  Experience the world of luxury and find the watch that speaks to you.
                    </p>

                    <div className="image-row">
                        <img src="../images/home_rv.png" alt="Đồng hồ 4" />
                        <img src="../images/home_rv3.jpg" alt="Đồng hồ 5" />
                        <img src="../images/home_rv2.jpg" alt="Đồng hồ 6" />
                    </div>

                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide exceptional quality, unmatched service, and a seamless shopping experience.
                        We strive to connect you with the perfect watch that complements your personality and elevates your look.
                    </p>
                </div>
            </div>
            <div className="mission-section"> 
                <img src="../images/back_ground.jpg" alt="Our Mission" />
                <div className="mission-overlay"> 
                    <div className="feature-item">
                        <div className="feature-icon"></div>
                        <h3>Miễn Phí Giao Hàng</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"></div>
                        <h3>Quà Tặng Đặc Biệt</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"></div>
                        <h3>Tiết Kiệm Khi Mua Ở Rolex</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
            </div>
            <div className="home">
                <div className="home-content">
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