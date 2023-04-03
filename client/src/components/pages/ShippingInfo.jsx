import React, { useState } from 'react';
import '../../styles/ShippingInfo.css';
import { useNavigate } from 'react-router';

const ShippingInfo = () => {
    const navigate = useNavigate()
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        phone: "",
        postalCode: "",
        country: "",
        state: "",
    })

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem("shipping-info", JSON.stringify(shippingInfo))
        if (!shippingInfo.address ||
            !shippingInfo.city ||
            !shippingInfo.state ||
            !shippingInfo.country ||
            !shippingInfo.postalCode ||
            !shippingInfo.phone) {
            alert("Pls fill all the details")
        } else navigate("/confirmorder")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div>
            <div className='container'>
                <div className='shippingInfo-form'>
                    <form onSubmit={submitHandler} className='shadow-lg p-4'>
                        <h1 className='shippingInfo-heading'>Shipping Details</h1>
                        <div className='shippingInfo-address-container'>
                            <label className='shippingInfo-address-label'>Address</label>
                            <input type='text' className='shippingInfo-address-input' name='address' value={shippingInfo.address} onChange={handleChange} />
                        </div>
                        <div className='shippingInfo-city-container'>
                            <label className='shippingInfo-city-label'>City</label>
                            <input type='text' className='shippingInfo-city-input' name='city' value={shippingInfo.city} onChange={handleChange} />
                        </div>
                        <div className='shippingInfo-phoneNo-container'>
                            <label className='shippingInfo-phoneNo-label'>Phone No</label>
                            <input
                                type='text'
                                className='shippingInfo-phoneNo-input'
                                name='phone'
                                value={shippingInfo.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-postalCode-container'>
                            <label className='shippingInfo-postalCode-label'>Postal Code</label>
                            <input
                                type='text'
                                className='shippingInfo-postalCode-input'
                                name='postalCode'
                                value={shippingInfo.postalCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-country-container'>
                            <label className='shippingInfo-country-label'>Country</label>
                            <input
                                type='text'
                                className='shippingInfo-country-input'
                                name='country'
                                value={shippingInfo.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='shippingInfo-state-container'>
                            <label className='shippingInfo-state-label'>State</label>
                            <input
                                type='text'
                                className='shippingInfo-state-input'
                                name='state'
                                value={shippingInfo.state}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='continue-btn' type='submit'>Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShippingInfo;