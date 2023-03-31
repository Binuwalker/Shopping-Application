import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {

    const [products, setProducts] = useState();
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

    const handleAddToCart = (id, productName, price, img) => {
        if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) === null || undefined) {
            setCartItems([{ id, productName, price, img }]);
        } else {
            setCartItems([...cartItems, { id, productName, price, img }]);
        }
    };

    useEffect(() => {
        const asyncFunc = async () => {
            await axios.get(`http://localhost:3001/products`).then(res => {
                setProducts(res.data);
            })
        }
        asyncFunc();
    }, [])

    return (
        <div className='home'>
            <div className='container'>
                <div className='products'>
                    {products && products.map((product) => (
                        <div className='product' key={product.id}>
                            <div className='container'>
                                <div className='product-img-container' onClick={() => handleProduct(product.id)}><img className='product-img' src={product.img} alt={product.productName} /></div>
                                <div className='product-name'>{product.productName}</div>
                                <div className='product-price'>{product.price}</div>
                                <button className='addToCart-btn' onClick={() => handleAddToCart(product.id, product.productName, product.price, product.img)}>Add To Cart</button>
                                <button className='buyNow-btn'>Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;