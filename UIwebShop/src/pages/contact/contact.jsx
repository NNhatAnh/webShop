import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Thông tin liên hệ */}
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> 123 Main Street, Cityville</p>
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
        <p><strong>Working Hours:</strong> Mon - Fri, 9 AM - 6 PM</p>
      </div>

      {/* Liên kết mạng xã hội */}
      <div className="social-links">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>

      {/* Bản đồ Google Maps */}
      <div className="map">
        <h2>Our Location</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.301267570859!2d105.78657997504257!3d20.98055738065673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1734018265827!5m2!1svi!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Câu hỏi thường gặp */}
      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>What is your return policy?</summary>
          <p>We accept returns within 30 days of purchase. The item must be in original condition.</p>
        </details>
        <details>
          <summary>Do you offer international shipping?</summary>
          <p>Yes, we ship worldwide. Shipping fees vary based on location.</p>
        </details>
        <details>
          <summary>How can I track my order?</summary>
          <p>Once your order is shipped, you will receive a tracking link via email.</p>
        </details>
      </div>
    </div>
  );
};

export default Contact;