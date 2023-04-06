import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Snackbar, Alert } from '@mui/material';
import Loading from '../plugins/Loading';

const Home = () => {

    const [products, setProducts] = useState();
    const [alert, setAlert] = useState();
    const navigate = useNavigate();

    const handleProduct = (id) => {
        navigate(`/product/${id}`)
    }
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
        // window.location.reload();
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
            await axios.get(`http://localhost:3001/products`).then(res => {
                setProducts(res.data);
            })
        }
        asyncFunc();
    }, [])

    return (
        <>
            {products ? (
                <div className='home'>
                    <div className='container'>
                        <div className='products'>
                            {products && products.map((product) => (
                                <div className='product' key={product.id}>
                                    <div className='container'>
                                        <div className='product-img-container' onClick={() => handleProduct(product.id)}><img className='product-img' src={product.img} alt={product.productName} /></div>
                                        <div className='product-name'>{product.productName}</div>
                                        <div className='product-price'>${product.price}</div>
                                        <button className='addToCart-btn' onClick={() => handleAddToCart(product.id, product.productName, product.price, product.img)}>Add To Cart</button>
                                        <button className='buyNow-btn' onClick={() => handleProduct(product.id)}>Buy Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='alert-msg'>
                        <div className='container'>
                            <Snackbar
                                open={alert}
                                anchorOrigin={
                                    {
                                        horizontal: 'center',
                                        vertical: 'top'
                                    }
                                }
                                transitionDuration={1500}
                            >
                                <Alert severity='success' onClose={() => setAlert(false)}>
                                    Item added successfully!
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}

        </>
    )
}

export default Home;