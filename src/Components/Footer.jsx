import React from "react";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-outer">
      <div className="footer-container">

        {/* Useful Links */}
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li>Blog</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>FAQs</li>
            <li>Security</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Partner Links */}
        <div className="footer-section">
          <ul className="footer-spaced">
            <li>Partner</li>
            <li>Franchise</li>
            <li>Seller</li>
            <li>Warehouse</li>
            <li>Deliver</li>
            <li>Resources</li>
          </ul>
        </div>

        {/* Recipes */}
        <div className="footer-section">
          <ul className="footer-spaced">
            <li>Recipes</li>
            <li>Bistro</li>
            <li>District</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section footer-categories">
          <div className="categories-header">
            <h4>Categories</h4>
            <span className="see-all">see all</span>
          </div>

          <div className="categories-grid">
            <ul>
              <li>Vegetables & Fruits</li>
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Dry Fruits, Masala & Oil</li>
              <li>Paan Corner</li>
              <li>Pharma & Wellness</li>
              <li>Personal Care</li>
              <li>Kitchen & Dining</li>
              <li>Stationery Needs</li>
              <li>Print Store</li>
            </ul>

            <ul>
              <li>Dairy & Breakfast</li>
              <li>Instant & Frozen Food</li>
              <li>Sweet Tooth</li>
              <li>Sauces & Spreads</li>
              <li>Organic & Premium</li>
              <li>Cleaning Essentials</li>
              <li>Pet Care</li>
              <li>Fashion & Accessories</li>
              <li>Books</li>
              <li>E-Gift Cards</li>
            </ul>

            <ul>
              <li>Munchies</li>
              <li>Tea, Coffee & Milk Drinks</li>
              <li>Atta, Rice & Dal</li>
              <li>Chicken, Meat & Fish</li>
              <li>Baby Care</li>
              <li>Home Furnishing & Decor</li>
              <li>Beauty & Cosmetics</li>
              <li>Electronics & Electricals</li>
              <li>Toys & Games</li>
              <li>Rakhi Gifts</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="app-download">
        <p><small>&copy; All Rights Reserved by Shree Kumar 2026 </small> </p>

        {/* Left */}
        <div className="download-left">
          <span className="download-text">Download App</span>

          <div className="store-buttons">
            <div className="store-btn">
              <i className="bi bi-apple"></i>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </div>

            <div className="store-btn">
              <i className="bi bi-google-play"></i>
              <div>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="social-icons">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter-x"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-linkedin"></i>
          <i className="bi bi-at"></i>
        </div>

      </div>
      <p className="footer-bottom">
        EShop is owned and operated by Shree Kumar. Use of this website is subject to our Terms of Service and Privacy Policy.
        All content and services are governed by applicable laws of India and the United States, and protected under relevant intellectual property and data protection regulations.
      </p>
    </footer>
  );
};

export default Footer;
