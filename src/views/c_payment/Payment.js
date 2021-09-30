import React, { useMemo } from "react";
import './Payment.css'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      value: "123",
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
  };

  return (
    <div className="tec-payBox">
    <div >
      <h1>Payment</h1>

    </div> 
     <form onSubmit={handleSubmit} className="tec-payForm">
                    <label>
                      Card number
                      <CardNumberElement
                        options={options}
                        onReady={() => {
                        }}
                        onChange={(event) => {
                        }}
                        onBlur={() => {
                        }}
                        onFocus={() => {
                        }}
                      />
                    </label>
                    <label>
                      Expiration date
                      <CardExpiryElement
                        options={options}
                        onReady={() => {
                        }}
                        onChange={(event) => {
                        }}
                        onBlur={() => {
                        }}
                        onFocus={() => {
                        }}
                      />
                    </label>
                    <label>
                      CVC
                      <CardCvcElement
                        options={options}
                        onReady={() => {
                        }}
                        onChange={(event) => {
                        }}
                        onBlur={() => {
                        }}
                        onFocus={() => {
                        }}
                      />
                    </label>
                    <button type="submit" disabled={!stripe}>
                      Pay
                    </button>
        </form>

    </div>
   



      
  );
};


export default Payment;
