import './Login.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth =>{
                history.push('/')
            })
    }
    const register = e =>{
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to = '/'>
        <img 
            className='login__logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png " alt="" />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange = {e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type="password" value={password} onChange = {e => setPassword(e.target.value)}/>

                <button  type='submit' onClick={signIn} className='login__signInButton'>Sign in</button>
            </form>

            <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please <br />
            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.                   
            </p>

            <button onClick={register} className='login__registerButton'> Create Account</button>

        </div>
    </div>
  )
}

export default Login