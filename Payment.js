import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from "./axios";



function Payment() {
    const [{ basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState();

    const[error, setError] = useState(null);
    const[disabled, setDisabled] = useState(null);
    const[clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        console.log("helloooo")
      //generates a special client Secret which allows us to charge a customer
      const getClientSecret = async () => {
        const response = await axios({       //axious use to make request for eg GET, POST etc
            method: "post",
            url: `/payment/create?total=${getBasketTotal(basket)*100}`
        })
        .then((response) => console.log("client secrent inside is >>>", response.data.clientSecret))
        .catch((err) => console.log("oops: ", err));
        setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
    }, [basket])

    console.log('The secret is >>>', clientSecret)
    

    const handleSubmit = async (event) => {
        // fancy stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payLoad = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card:elements.getElement(CardElement)
            }
        }).then(({ paymentIntent}) => {
            //paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders')
        })
    }

    const handleChange = event => {


        setDisabled(event.empty)
        setError(event.error ? event.error.message :"")

    }
    
  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (<Link to = '/checkout'>{basket?.length} items</Link>)
            </h1>
            {/* Payment section - Delivery Address*/}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>

                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angles,CA</p>
                </div>

            </div>
            {/* Payment section - Review Items*/}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>

                </div>
                <div className="payment__items">
                    {basket.map(item =>(
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            {/* Payment section - Payment Method*/}
            <div className='payment__section'>
                <div className="payment__title">
                    <h3>
                        Payemnt Method
                    </h3>
                </div>
                <div className="payment__details">
                     {/* stripe*/}

                     <form onSubmit={handleSubmit}>
                        
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                            <CurrencyFormat
                                    renderText={(value) => (
                                        
                                        <h3>Order Total: {value}</h3>
                                          
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} 
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                
                                />

                                <button disabled={processing || disabled ||succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}
                                    
                                    </span>
                                </button>
                            </div>

                            {/*Erros*/}
                            {error && <div>{error}</div>}
                         
                     </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Payment