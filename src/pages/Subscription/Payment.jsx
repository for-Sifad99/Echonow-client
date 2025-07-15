import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
    const { duration, cost } = useParams();

    return (
        <div className="relative isolate bg-white px-4 py-4 sm:py-10 lg:px-8">
            <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl" aria-hidden="true">
                <div className="mx-auto aspect-1000/650 w-100.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30" ></div>
            </div>
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-[var(--primary)] font-oxygen">Payment</h2>
                <p className="mt-4 sm:mt-8 text-3xl font-semibold tracking-tight text-balance text-[var(--dark)] sm:text-6xl leading-6 sm:leading-12 font-libreBas"> Complete Your Subscription</p>
            </div>
            <p className="mx-auto mt-3 sm:mt-6 max-w-sm sm:max-w-2xl text-center text-base text-pretty text-gray-600 sm:text-xl/8 leading-4 sm:leading-6 font-jost"> Have a  good day? You're subscribing for ${cost}.</p>
          
                {/* Stripe Form */}
            <div className="max-w-5xl mx-auto pt-10 sm:pt-12 pb-10">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm duration={duration} cost={cost} />
                    </Elements>
                </div>
            </div>
    );
};

export default Payment;
