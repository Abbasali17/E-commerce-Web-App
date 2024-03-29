
import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from'./Home';
import { BrowserRouter as BrowserRouter, Switch, Route, } 
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import {useStateValue} from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51MCRpOSIBw0BoqkuuMORdXaUhysoY6LpFPIht84S58tIfffvHqtHV1bBxDB1MbPWdpsS4YDZSAblimq9K0F9nCOC00g4GtzmKK');
  
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads..

    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>>', authUser);

      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  
  return (
    <BrowserRouter>

      <div className="App">
        

          <Switch>
          <Route exact path='/login' >
              <Login />

            </Route>
            <Route exact path='/checkout' >
              <Header />

              <Checkout />

            </Route>
            <Route exact path='/payment' >
              <Header />
              
              <Elements stripe={promise}>
                <Payment />
              </Elements>

            </Route>

              
            

            <Route exact path='/' >
              <Header />

              <Home />

            </Route>
          </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
