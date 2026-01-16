import React, { useEffect, useState } from 'react'
import './CSS/Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetch('./Products/hero-category.json')
            .then((res) => res.json())
            .then((data) => setCategory(data))
    }, [])
    
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
                    {category.slice(0, 10).map((item, index) => (
                        <div className="slice-item" key={index}>
                            <Link to={item.path} >
                            <img className='slice-img' src={item.img} alt={item.Title} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="slice">
                    {category.slice(10, 20).map((item, index) => (
                        <div className="slice-item" key={index}>
                             <Link to={item.path} >
                            <img className='slice-img' src={item.img} alt={item.Title} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
