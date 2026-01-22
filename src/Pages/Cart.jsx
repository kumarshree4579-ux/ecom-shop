import React, { useMemo, useState } from "react";
import { useCart } from "../Context/CartContext";
import Swal from 'sweetalert2'
import "./CSS/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, IncreaseQty, DecreaseQty, removeItem, clearCart } = useCart();
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
    return cart.reduce((acc, item) => {
      acc.totalMrp += item.mrp * item.qty;
      acc.totalPrice += item.price * item.qty;
      acc.totalQty += item.qty;
      return acc;
    }, { totalMrp: 0, totalPrice: 0, totalQty: 0 });
  }, [cart]);



  const tax = Number((totalPrice * 0.05).toFixed(2));
  const delivery = totalPrice > 999 ? 0 : 49;
  const actualAmount = totalPrice + tax + delivery;
  const payable = Math.round(actualAmount);
  const roundOff = Number((payable - actualAmount).toFixed(2));




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
      totalAmount: payable, roundOff,
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
    clearCart();
  }
  const handleBack = () => {
   navigate("/")

  }

  return (
    <>
      <section className="cart-container">
        <div className="left-arrow" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <i className="bi bi-cart-x"></i>
            <p>Your cart is currently empty</p>
            <br />
            <button className="checkout-btn" onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-column">
              <header className="cart-header">
                <h2>Shopping Cart</h2>

                <button className="checkout-btn btn-top" onClick={() => setShowForm(true)}>Proceed to Checkout <div className="checkout-details"><span className="checkout-len">{totalQty} Items</span> <span><strong>₹{payable}</strong></span></div></button>
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

                <div className="cart-summary-details savings">
                  <span className={roundOff > 0 ? "" : ""}>Round Off:</span>
                  <span>
                    {roundOff > 0 ? `+₹${roundOff}` : `₹${roundOff}`}
                  </span>
                </div>
                <div className="cart-summary-total">
                  <span>Payable Amount:</span>
                  <strong>₹{payable}</strong>
                </div>
                <button className="checkout-btn" onClick={() => setShowForm(true)}>Proceed to Checkout</button>
              </div>
            </aside>
          </div>
        )}

        {showForm && (
          <div className="order-modal" onClick={() => setShowForm(false)}>
            <form className="order-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              <h2>Order Details</h2>

              <input type="text" name="name" placeholder="Full Name" value={orderData.name} onChange={handleChange} />
              <input type="tel" name="mobile" placeholder="Mobile Number" value={orderData.mobile} onChange={handleChange} />
              <input type="text" name="add" placeholder="Delivery Address" value={orderData.add} onChange={handleChange} />
              <input type="text" name="city" placeholder="City" value={orderData.city} onChange={handleChange} />
              <input type="text" name="state" placeholder="State" value={orderData.state} onChange={handleChange} />
              <input type="text" name="zip" placeholder="Zip Code" maxLength={6} value={orderData.zip} onChange={handleChange} />

              <div className="form-actions">
                <button type="submit">Confirm Order</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

      </section>
    </>
  );
};

export default Cart;