import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import "./Subtotal.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function Subtotal() {
    const history= useHistory();
    const [{basket}, dispatch] =  useStateValue();
    const stripePromise = loadStripe('pk_test_51MCRpOSIBw0BoqkuuMORdXaUhysoY6LpFPIht84S58tIfffvHqtHV1bBxDB1MbPWdpsS4YDZSAblimq9K0F9nCOC00g4GtzmKK');

  return (

    <div className='subtotal'>
    <CurrencyFormat
        renderText={(value) => (
            <>
                <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type="checkbox" /> 
                    This order contains a gift

                </small>
            </>    
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
    
    />

       
        <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
        
    

    </div>
  )
}

export default Subtotal