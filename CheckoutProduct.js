import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image, title, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () =>{
        // remove the item from basket
        dispatch({
            type:'Remove_From_Basket',
            id: id,
        })
    }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} />

        <div className='checkouytProuct__info'>
            <p className='checkoutProduct__title'>{title}</p>
            <p className='checkoutProduct__price'>
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating)
                .fill()
                .map((_, i) => (
                    <p>🌟</p>
                ))}
            </div>
            <button onClick={removeFromBasket} className = 'Remove'>Remove from Basket</button>

        </div>
    </div>
  )
}

export default CheckoutProduct