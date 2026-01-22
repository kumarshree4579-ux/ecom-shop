import React, { useEffect, useRef, useState } from 'react'
import './CSS/Products.css'
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom'
import ProductSkelton from './ProductSkelton'

const Products = ({ category, products, groupedProducts, setGroupedProducts, loading }) => {
    const sliderRef = useRef(null);
    const slideLeft = () => {
        sliderRef.current.scrollLeft -= 250; // adjust scroll amount
    };

    const slideRight = () => {
        sliderRef.current.scrollLeft += 250;
    };


    return (
        <>

            {category.map((cat) =>
                <div className="products-section" key={cat._id}>
                    <h1 style={{ padding: "20px" }} >{cat.categoryName}</h1>
                    <div className="slider-container">
                        <button onClick={slideLeft} className="slider-btn"><i className="bi bi-caret-left-fill"></i></button>

                        <section id="products" ref={sliderRef}>
                            {loading ? Array(6).fill().map((_, i) => <ProductSkelton key={i} />) :
                                products.filter(products => products.category === cat._id)
                                    .map((product, i) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                            }
                        </section>

                        <button onClick={slideRight} className="slider-btn"><i className="bi bi-caret-right-fill"></i></button>
                    </div>



                </div>
            )}
        </>
    )
}

export default Products