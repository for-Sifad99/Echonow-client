import React, { useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ duration, cost }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const singleOption = { value: duration, label: `Period: ${duration}` };
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !selected) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            console.log(cost)
            // Create payment intent via axiosSecure
            const res = await axiosSecure.post('/create-payment-intent', { cost });
            const clientSecret = res.data.clientSecret;

            // Confirm card payment
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name : user.displayName,
                        email : user.email
                    }}
                });

            if (error) {
                setError(error.message);
            } else {
                setError('');
                Swal.fire({
                    icon: "success",
                    title: "Done! Subscription successful.",
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
                    position: "top-end"
                });
                await axiosSecure.post('/users', {
                    email: user?.email,
                    premiumTaken: new Date(),
                    duration: selected?.value || duration
                });

                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (err) {
            toast.error(err);
            setError('Something went wrong during payment.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto ring-2 ring-red-100 shadow-sm px-6 pt-8 pb-6 rounded-md font-jost flex flex-col"
        >
            {/* Single Option Dropdown */}
            <Select
                options={[singleOption]}
                value={selected}
                onChange={setSelected}
                placeholder="Select period once again"
                isSearchable={false}
            />

            {/* Card Field - Show only if selected */}
            <div className={`mt-2 ${selected ? '' : 'pointer-events-none opacity-50'} transition-all duration-300`}>
                <CardElement />
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!stripe || !selected}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
            >
                Pay ${cost}
            </button>
        </form>
    );
};

export default CheckoutForm;
