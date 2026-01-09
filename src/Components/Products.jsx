import React, { useEffect, useRef, useState } from 'react'
import './CSS/Products.css'
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() => {
        fetch('/Products/products.json')
            .then((res) => res.json())
            .then((data) => {
                // setProducts(data))
                const grouped = data.reduce((acc, product) => {
                    acc[product.category] = acc[product.category] || [];
                    acc[product.category].push(product);
                    return acc;
                }, {});
                setGroupedProducts(grouped);
            });
    }, [])



    return (
        <>
            {Object.entries(groupedProducts).map(([category, products]) => (
                <ProductSlider
                    key={category}
                    title={category}
                    products={products}
                />
            ))}

            {/* <ProductSlider title="Dairy, Bread & Eggs" products={products} /> */}
            {/* <ProductSlider title="Rolling paper & tobacco" products={products} />
            <ProductSlider title="Snacks & Munchies" products={products} />
            <ProductSlider title="Hookah" products={products} />
            <ProductSlider title="Mouth fresheners" products={products} /> */}
        </>
    )
}

export default Products

const ProductSlider = ({ title, products }) => {
    const sliderRef = useRef(null);
    const slideLeft = () => {
        sliderRef.current.scrollLeft -= 250; // adjust scroll amount
    };

    const slideRight = () => {
        sliderRef.current.scrollLeft += 250;
    };

    return (
        <div className="products-section">
            <h1 style={{ marginLeft: "20px" }}>{title}</h1>

            <div className="slider-container">
                <button onClick={slideLeft} className="slider-btn"><i className="bi bi-caret-left-fill"></i></button>

                <section id="products" ref={sliderRef}>
                    {products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </section>

                <button onClick={slideRight} className="slider-btn"><i className="bi bi-caret-right-fill"></i></button>
            </div>
        </div>
    );

};
