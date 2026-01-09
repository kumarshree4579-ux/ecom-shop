import React from 'react'
import './CSS/ProductCard.css'
import { useCart } from '../Context/CartContext'
const ProductCard = ({ product }) => {
  const { cart, addToCart, IncreaseQty, DecreaseQty } = useCart();
  const cartItem = cart.find(item => item._id === product._id);

  return (
    <>
      {/* <Link to={product.path}> */}
      <div className='product-card-outer'>
        <img src={product.image} alt={product.title} />
        <h3>{product.title.length > 35 ? product.title.slice(0, 41) + "..." : product.title}</h3>
        <p>{product.quantity}</p>
        <div className="price-section">
          {product.price >= product.mrp ?
            <span className="product-price">₹{product.price}</span>
            :
            <>
              <span className="product-price">₹{product.price}</span>
              <span className="product-mrp">₹{product.mrp}</span>
              <span className="product-discount">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </span>
            </>
          }
        </div>

        {/* <div className="product-footer">
          <button onClick={() => addToCart(product)} className="add-btn">Add To Cart</button>
          <button className="add-btn">Buy Now</button>
        </div> */}

        <div className="product-footer">
          {cartItem ? (
            <div className="qty-controller">
              <button onClick={() => DecreaseQty(product._id)}>-</button>
              <span>{cartItem.qty}</span>
              <button onClick={() => IncreaseQty(product._id)}>+</button>
            </div>
          ) : (
            <button onClick={() => addToCart(product)} className="add-btn">
              Add To Cart
            </button>
          )}

          <button className="add-btn">Buy Now</button>
        </div>


      </div>
      {/* </Link> */}
    </>
  )
}

export default ProductCard