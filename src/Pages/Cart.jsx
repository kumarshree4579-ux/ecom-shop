import React, { useMemo, useState } from "react";
import { useCart } from "../Context/CartContext";
import Swal from 'sweetalert2'
import "./CSS/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, IncreaseQty, DecreaseQty, removeItem } = useCart();
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    name: "",
    add: "",
    city: "",
    state: "",
    zip: "",
    mobile: ""
  })

  const { totalMrp, totalPrice, totalQty } = useMemo(() => {
    const totalMrp = cart.reduce(
      (total, item) => total + item.mrp * item.qty, 0
    );

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    return { totalMrp, totalPrice, totalQty };
  }, [cart]);


  const tax = Math.round(totalPrice * 0.05);
  const delivery = totalPrice > 999 ? 0 : 49;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!orderData.name || !orderData.add || !orderData.city || !orderData.state || !orderData.zip || !orderData.mobile) {
      Swal.fire({
        title: 'error!',
        text: 'Please fill all fields.',
        icon: 'error',
      })
      return
    }
    if (orderData.mobile.length !== 10) {
      Swal.fire({ icon: "error", text: "Enter valid 10-digit mobile number" });
      return;
    }

    if (orderData.zip.length !== 6) {
      Swal.fire({ icon: "error", text: "Enter valid 6-digit ZIP code" });
      return;
    }

    const order = {
      customer: orderData,
      product: cart,
      totalAmount: totalPrice + tax + delivery,
      orderDate: new Date().toLocaleString()
    }
    const prevOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
    localStorage.setItem("myOrders", JSON.stringify([...prevOrders, order]));

    Swal.fire({
      icon: 'success',
      title: 'success!',
      text: 'Your Order has beed placed successfully',
      confirmButtonColor: "#3085d6"
    })
    setShowForm(false)
    setOrderData({
      name: "",
      mobile: "",
      add: "",
      city: "",
      state: "",
      zip: ""
    })
  }

  return (
    <section className="cart-container">
      {cart.length === 0 ? (
        <div className="cart-empty">
          <i className="bi bi-cart-x"></i>
          <p>Your cart is currently empty</p>
          <br />
          <button className="checkout-btn" onClick={() => navigate("/")}>Continue Shopping</button>
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
                <span>{totalQty}</span>
              </div>
              <hr />
              <div className="cart-summary-details">
                <span>Total MRP:</span>
                <span>₹{totalMrp}</span>
              </div>
              <div className="cart-summary-details savings">
                <span className="green">You Save:</span>
                <span>-₹{totalMrp - totalPrice}</span>
              </div>
              <div className="cart-summary-details">
                <span>Total Amount:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="cart-summary-details">
                <span>GST & Other Tax:</span>
                <span>₹{tax}</span>
              </div>
              <div className="cart-summary-details">
                <span>Delivery Charge:</span>
                <span>{delivery === 0 ? "Free" : "₹" + delivery}</span>
              </div>
              <div className="cart-summary-total">
                <span>Payable Amount:</span>
                <strong>₹{totalPrice + tax + delivery}</strong>
              </div>
              <button className="checkout-btn" onClick={() => setShowForm(true)}>Proceed to Checkout</button>
            </div>
          </aside>
        </div>
      )}

      {showForm && (
        <div style={modalStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <h2>Order Details</h2>

            <input
              type="text"
              name='name'
              placeholder='Full name'
              value={orderData.name}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="tel"
              name='mobile'
              placeholder='Mobile Number'
              value={orderData.mobile}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="add"
              placeholder='Delivery Address'
              value={orderData.add}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="city"
              placeholder='City'
              value={orderData.city}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="state"
              placeholder='State'
              value={orderData.state}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="zip"
              placeholder='Zip'
              maxLength={6}
              value={orderData.zip}
              onChange={handleChange}
              style={inputStyle}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button type='submit'>Confirm Order</button>
              <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Cart;


const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"

}
const formStyle = {
  background: "#fff",
  padding: "10px",
  width: "500px"
}

const inputStyle = {
  width: "90%",
  padding: "9px",
  marginBottom: "10px"
}