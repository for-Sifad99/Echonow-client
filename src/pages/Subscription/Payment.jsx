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
        <div className="relative isolate bg-[var(--white)] dark:bg-[var(--dark2-bg)] px-2 sm:px-4 py-10">
            <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl" aria-hidden="true">
                <div className=" dark:hidden mx-auto aspect-1000/650 w-100.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30" ></div>
            </div>
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-2xl text-[var(--dark)] dark:text-[var(--white)] sm:text-3xl font-libreBas font-bold">
                        Payment
                    </h2>
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                    Have a  good day? You're subscribing for ${cost}.
                </p>
            </div>
            {/* Stripe Form */}
            <div className="max-w-5xl mx-auto pb-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm duration={duration} cost={cost} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
