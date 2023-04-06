import React, { useEffect, useState } from 'react';
import '../../styles/ProductDetails.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { Snackbar, Alert, } from '@mui/material';
import Loading from '../plugins/Loading';

const ProductDetails = () => {

    const [product, setProduct] = useState();
    const [alert, setAlert] = useState();
    const { id } = useParams();

    const LOCAL_STORAGE_KEY = "cart-list"

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
    });
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (id, productName, price, img, quantity = '1') => {
        const existingItem = cartItems.find(item => item.id === id)
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
            setCartItems([...cartItems]);
            setAlert(true)
        } else {
            setCartItems([...cartItems, { id, productName, price, img, quantity: parseInt(quantity) }]);
            setAlert(true)
        }
    };

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false)
            }, 1500)
        }
    })

    useEffect(() => {
        const asyncFunc = async () => {
            await axios.get(`http://localhost:3001/products/${id}`).then(res => {
                setProduct(res.data);
            })
        }
        asyncFunc();
    }, [id])

    return (
        <>
            {product ? (
                <div className='productDetails'>
                    <div className='container'>
                        {product ? (
                            <div className='productDetails-containers'>
                                <div className='productDetails-container-1'>
                                    <div className='container'>
                                        <div className='productDetails-img-container'>
                                            <img className='productDetails-img' src={product.img} alt={product.productName} />
                                        </div>
                                    </div>
                                </div>
                                <div className='productDetails-container-2'>
                                    <div className='container'>
                                        <div className='productDetail-id'>{product.id}</div>
                                        <div className='productDetail-name'>{product.productName}</div>
                                        <div className='productDetail-detail'>{product.detail}</div>
                                        <div className='productDetail-price'>${product.price}</div>
                                        <button className='productDetail-addToCart-btn' onClick={() => handleAddToCart(product.id, product.productName, product.price, product.img, product.quantity)}>Add To Cart</button>
                                        <button className='productDetail-buyNow-btn'>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ) : (null)}

                    </div>
                    <Snackbar
                        open={alert}
                        toHideDuration={1000}
                        anchorOrigin={
                            {
                                horizontal: 'center',
                                vertical: 'top'
                            }
                        }
                        transitionDuration={1500}
                        onClose={() => setAlert(false)}
                    >
                        <Alert severity='success' onClose={() => setAlert(false)}>
                            Item added successfully!
                        </Alert>
                    </Snackbar>
                </div>
            ) : (
                <Loading />
            )}


        </>
    )
}

export default ProductDetails