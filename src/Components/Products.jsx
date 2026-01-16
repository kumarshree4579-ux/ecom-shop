import React, { useEffect, useRef, useState } from 'react'
import './CSS/Products.css'
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom'
import ProductSkelton from './ProductSkelton'

const Products = ({groupedProducts,setGroupedProducts,loading}) => {
    return (
        <>
            {Object.entries(groupedProducts).map(([category, products]) => (
                <ProductSlider
                    key={category}
                    title={category}
                    products={products}
                    loading={loading}
                />
            ))}
        </>
    )
}

export default Products

const ProductSlider = ({ title, products, loading }) => {
    const sliderRef = useRef(null);
    const slideLeft = () => {
        sliderRef.current.scrollLeft -= 250; // adjust scroll amount
    };

    const slideRight = () => {
        sliderRef.current.scrollLeft += 250;
    };

    return (
        <div className="products-section">
            <h1 style={{ padding: "20px" }}>{title}</h1>

            <div className="slider-container">
                <button onClick={slideLeft} className="slider-btn"><i className="bi bi-caret-left-fill"></i></button>

                <section id="products" ref={sliderRef}>
                   {loading?Array(6).fill().map((_,i)=><ProductSkelton key={i}/>):
                    products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))
                }
                </section>

                <button onClick={slideRight} className="slider-btn"><i className="bi bi-caret-right-fill"></i></button>
            </div>
        </div>
    );

};
