import React from 'react';
import '../../styles/Cart.css';
import { HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router';

const Cart = () => {

  let cartItems = JSON.parse(localStorage.getItem('cart-list'));


  const navigate = useNavigate();

  const handleClear = (id) => {
    let cartItem = cartItems.map(cartItem => cartItem.id);
    const indexValue = cartItem.findIndex(item => item === id);
    cartItems.splice(indexValue, 1);
    localStorage.setItem('cart-list', JSON.stringify(cartItems));
    window.location.reload();
  }

  return (
    <div className='cart'>
      <div className='container'>
        {cartItems && cartItems.map((cartItem, index) => (
          <div className='cartItem-container' key={index}>
            <div className='cartItem-img-container' onClick={() => navigate(`/product/${cartItem.id}`)}>
              <img className='cartItem-img' src={cartItem.img} alt={cartItem.productName} />
            </div>
            <div className='cartItem-details-container'>
              <div className='cartItem-name'>{cartItem.productName}</div>
              <div className='cartItem-price'>{cartItem.price}</div>
              <HiTrash className='cartItem-trash' onClick={() => handleClear(cartItem.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart