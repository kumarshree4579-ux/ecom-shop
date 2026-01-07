import React from 'react'
import './CSS/ProductCard.css'
const ProductCard = ({product}) => {
  return (
    <>
        <div className='product-card-outer'>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.quantity}</p>
        <p>{product.price}</p>

       <div className='product-btn-outer'>
         <button>Add to cart</button>
        <button>Buy Now</button>
       </div>
        </div>
    </>
  )
}

export default ProductCard