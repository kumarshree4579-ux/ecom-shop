import React, { useState } from 'react'
import './CSS/Header.css'
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
const Header = ({ search, setSearch, isSearchOpen, setIsSearchOpen }) => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [isFocused ,setIsFocused] = useState(false)
    const placeHolder=[
                "Search anything and get in 10 minutes",
                "Search Breads",
                "Search Fruits",
                "Search Vegetables",
                "Search Milk",
                "Search Sugar",
                "Search Butter",
                "Search egg",
    ]
    const [placeHolderIndex, setPlaceHolderIndex]=useState(0);
    useState(()=>{
        if(search)
            return;

        const interval= setInterval (()=>{
            setPlaceHolderIndex((p)=>(p+1)%placeHolder.length)
        }, 2000)
        return ()=>  clearInterval(interval)
    },[search])

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
    return (
        <>
            <div className="header-outer">
                <div className="header-logo" onClick={() => navigate('/')}><span className='ecom'>E</span><span className='shop'>Shop</span></div>

                <div className="header-top">
                    <div className="header-location">
                        <h4>Delivery in 6 minutes</h4>
                        <span>B-36 2nd floor Aliganj Lucknow <i onClick={() => { alert("Location detected") }} className="bi bi-caret-down-fill header-location-btn"></i></span>

                    </div>
                    <div className="header-profile">
                        <h1><i onClick={() => { alert("Profile clicked") }} className="bi bi-person-circle header-location-btn"></i></h1>
                    </div>
                </div>

                <div className={!isSearchOpen ? "header-search" : "header-search-open"}>
                    <div className="search-outer">
                        <div className="search-icon"><i className="bi bi-search"></i></div>

                        {!isFocused && search==="" &&(
                         <span key={placeHolderIndex} className='search-placeholder'>
                            {placeHolder[placeHolderIndex]}
                        </span>
                       )}

                        <input type="search" onFocus={() =>{ setIsSearchOpen(true); setIsFocused(true) }} onBlur={()=>setIsFocused(false)} value={search} onChange={(e) => setSearch(e.target.value)} />
                       
                    </div>
                </div>
                <div className={`header-btn ${totalItems > 0 ? "header-active" : "header-disabled"}`}>
                    {!isSearchOpen && (

                        <button className='btn-login'>Login</button>
                    )}
                    <button onClick={() => navigate("/cart")} className='btn-cart'> <i className="bi bi-cart4"></i> My Cart {totalItems}</button>
                </div>
            </div>
                <LoginForm/>

        </>
    )
}

export default Header