import React, { useEffect, useState } from 'react'
import './CSS/Hero.css'

const Hero = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetch('./Products/hero-category.json')
            .then((res) => res.json())
            .then((data) => setCategory(data))
    }, [])
    console.log(category)
    return (
        <section className='Hero'>
            <div id='banner'>
                <img src="public/Images/banner1.jpg" alt="" />
            </div>
            <div className="hero-sale">
                <img src="public/Images/pharmacy-WEB.jpg" alt="" />
                <img src="public/Images/Pet-Care_WEB.jpg" alt="" />
                <img src="public/Images/babycare-WEB.jpg" alt="" />
            </div>
            <div className="hero-muti-img-grid">
                <div className="slice">
                    {category.map((item, index) =>
                        <>
                            <img src={item.img} alt={item.Title} key={index} />
                            <h1>{item.img}</h1>
                        </>

                    )}
                </div>
                <div className="slice">

                </div>
            </div>
        </section>
    )
}

export default Hero
