import React, { useEffect, useState } from 'react';
import '../../styles/ProductDetails.css';
import axios from 'axios';
import { useParams } from 'react-router';

const ProductDetails = () => {

    const [product, setProduct] = useState();
    const { id } = useParams();

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
            window.location.reload();
        } else {
            setCartItems([...cartItems, { id, productName, price, img }]);
            window.location.reload();
        }
    };

    useEffect(() => {
        const asyncFunc = async () => {
            await axios.get(`http://localhost:3001/products/${id}`).then(res => {
                setProduct(res.data);
            })
        }
        asyncFunc();
    }, [id])

    return (
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
                                <div className='productDetail-price'>{product.price}</div>
                                <button className='productDetail-addToCart-btn' onClick={() => handleAddToCart(product.id, product.productName, product.price, product.img)}>Add To Cart</button>
                                <button className='productDetail-buyNow-btn'>Buy Now</button>
                            </div>
                        </div>
                    </div>
                ) : (null)}

            </div>
        </div>
    )
}

export default ProductDetails