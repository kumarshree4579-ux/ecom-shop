import React from 'react'
import './CSS/LoginForm.css'

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted for Login")
    }
    return (
        <>
            <div className="login-outer">
                <div className="login-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <div className="left-arrow">
                            <i class="bi bi-arrow-left"></i>
                        </div>
                    <div className="login-top">
                        <div className="login-logo">
                            <span className='login-ecom'>E</span><span className='login-shop'>Shop</span>
                        </div>

                    </div>
                        <h2>India's last minute app</h2>

                </div>
            </div>
        </>
    )
}

export default LoginForm
