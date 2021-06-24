import React, {Component} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Payment from './Payment'
import NavTop from '../a_global/NavTop'


function Payment_Page(){


  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  const stripePromise = loadStripe('pk_test_51IycFUK6bx2C8jRtjnuOFmI5sZazqP7x3RpsngcYK4xBR8A6Y8IYjXR4KFlfzZN2ShpGp1Y15VpgY2WPos6U5oOR00SH3Ep4Vh');

  return(
      <div>
        <NavTop icon_img = {process.env.PUBLIC_URL + '/favicon.ico'} name = "test"/>
        <Elements stripe={stripePromise}>
            <Payment/>
        </Elements>
      </div>
      

      )
}


export default Payment_Page