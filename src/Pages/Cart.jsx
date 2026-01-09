import React from "react";
import { useCart } from "../Context/CartContext";
import "./CSS/Cart.css";

const Cart = () => {
  const { cart, IncreaseQty, DecreaseQty, removeItem } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <section className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">
          <i className="bi bi-cart-x"></i>
          <p>Your cart is currently empty</p>
        </div>
      ) : (
        <div className="cart-content">
          {/* Left Column: Cart Items */}
          <div className="cart-items-column">
            <header className="cart-header">
              <h2>Shopping Cart</h2>
              <span>{cart.length} Items</span>
            </header>

            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-item-image-wrapper">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    {item.price < item.mrp && (
                      <span className="discount-badge">
                        {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <span className="cart-item-category">{item.category}</span>
                    <span className="cart-item-quantity">{item.quantity}</span>

                    <div className="cart-item-prices">
                      {item.price < item.mrp && (
                        <span className="cart-item-mrp">₹{item.mrp}</span>
                      )}
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>

                    <div className="cart-qty-controls">
                      <button className="qty-btn" onClick={() => DecreaseQty(item._id)}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => IncreaseQty(item._id)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <p className="cart-item-subtotal">₹{item.price * item.qty}</p>
                    <button className="remove-item-btn" onClick={() => removeItem(item._id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <aside className="cart-summary-column">
            <div className="cart-summary-box">
              <h3>Order Summary</h3>
              <div className="cart-summary-details">
                <span>Total Items:</span>
                <span>{cart.length}</span>
              </div>
               <div className="cart-summary-details">
                <span>Total Qty:</span>
                <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
              </div>
              <div className="cart-summary-details">
                <span>Total Amount:</span>
                <strong>₹{totalPrice}</strong>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
