import React, { useRef, useState } from 'react'
import './CSS/LoginForm.css'
import Swal from 'sweetalert2'

const LoginForm = ({setIsLoginFormOpen}) => {
    const [isOTPSent, setIsOTPSent] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            Swal.fire({
                icon: 'error',
                title: 'error!',
                text: 'Please enter a valid 10-digit phone number',
            })
            return;
        }
        setIsOTPSent(true)
    }

    const [phone, setPhone] = useState('')
    const handleOnChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhone(value)
    }
    const handleBack = () => {
        if (isOTPSent) {
            setIsOTPSent(false)
            return
        }
        setIsLoginFormOpen(false)

    }
    const resendOTP = () => {
        Swal.fire({
            icon: 'success',
            title: 'success!',
            text: 'OTP sent to ' + phone,
            confirmButtonColor: "#3085d6"
        })
    }

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState(false);

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(false);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }

        if (newOtp.join("").length === 4) {
            verifyOtp(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    
    const verifyOtp = (enteredOtp) => {
        if (enteredOtp === "1234") {
            Swal.fire({
                icon: "success",
                title: "Verified!",
                text: "OTP verified successfully",
            });
            setIsLoginFormOpen(false)
        } else {
            setError(true);
        }
    };


    return (
        <>
            <div className="login-outer" onClick={()=>{setIsLoginFormOpen(false)}}>
                <form className="login-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="left-arrow" onClick={handleBack}>
                        <i className="bi bi-arrow-left"></i>
                    </div>
                    {!isOTPSent ?
                        <>
                            <div className="login-top">
                                <div className="login-logo">
                                    <span className='login-ecom'>E</span><span className='login-shop'>Shop</span>
                                </div>
                            </div>
                            <h2>India's last minute app</h2>
                            <p>Log in or Sign up</p>
                            <div className="login-input-outer">
                                <div className="login-input">
                                    <span className="Isd-Code">+91-</span>
                                    <input type="tel" name="login-phone" id="login-phone" maxLength={10} placeholder='Enter Phone Number' value={phone} onChange={handleOnChange} />
                                </div>
                            </div>
                            <div className="login-btn-outer">
                                <button type="submit" className={`login-submit ${phone.length === 10 ? 'active' : 'inActive'}`}>
                                    Continue
                                </button>
                            </div>
                            <small>By continuing, you agree to our  Terms of service & Privacy policy</small>
                        </>
                        :
                        <>
                            <div className="login-otp-form">
                                <div className="login-top">
                                    <div className="otp-top">OTP Verification</div>
                                </div>
                                <div className="login-otp-bottom">
                                    <small>We have sent a verification code to</small>
                                    <h3 className="login-otp-phone">+91-{phone}</h3>
                                    <div className="login-otp-input">
                                        {otp.map((digit, index) => (
                                            <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={digit} inputMode="numeric" onChange={(e) => handleOtpChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
                                        ))}
                                    </div>
                                    <div className="login-resend" onClick={resendOTP}>
                                        Resend Code
                                    </div>
                                </div>
                                {error && (
                                    <div className="login-bottom">
                                        Verification Failed
                                    </div>
                                )}

                            </div>

                        </>
                    }

                </form>
            </div>
        </>
    )
}

export default LoginForm
