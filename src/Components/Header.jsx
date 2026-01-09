import React from 'react'
import './CSS/Header.css'
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
    return (
        <>
            <div className="header-outer">
                <div className="header-logo"><span className='ecom'>E</span><span className='shop'>Shop</span></div>

                <div className="header-top">
                    <div className="header-location">
                        <h4>Delivery in 6 minutes</h4>
                        <span>B-36 2nd floor Aliganj Lucknow <i onClick={() => { alert("Location detected") }} className="bi bi-caret-down-fill header-location-btn"></i></span>

                    </div>
                    <div className="header-profile">
                        <h1><i onClick={() => { alert("Profile clicked") }} className="bi bi-person-circle header-location-btn"></i></h1>
                    </div>
                </div>

                <div className="header-search">
                    <div className="search-outer">
                        <div className="search-icon"><i className="bi bi-search"></i></div>
                        <input type="search" placeholder='search anything and get in minutes' />
                    </div>
                </div>
                <div className={`header-btn ${totalItems > 0 ? "header-active" : "header-disabled"}`}>
                    <button>Login</button>
                    <button onClick={() => navigate("/cart")}> <i className="bi bi-cart4"></i> My Cart {totalItems}</button>
                </div>
            </div>

        </>
    )
}

export default Header