import React from 'react'
import './CSS/ProductCard.css'
import { Link } from 'react-router-dom'
const ProductCard = ({ product }) => {
  return (
    <>
      {/* <Link to={product.path}> */}
        <div className='product-card-outer'>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.quantity}</p>
          <div className="price-section">
            {product.price === product.mrp ?
              <span className="product-price">₹{product.price}</span>
              :
              <>
                <span className="product-price">₹{product.price}</span>
                <span className="product-mrp">₹{product.mrp}</span>
                <span className="product-discount">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            };
          </div>

          <div className="product-footer">
            <button className="add-btn">Add To Cart</button>
            <button className="add-btn">Buy Now</button>
          </div>

        </div>
      {/* </Link> */}
    </>
  )
}

export default ProductCard