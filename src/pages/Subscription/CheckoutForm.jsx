import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext/themeContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const CheckoutForm = ({ duration, cost }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

    const [selected, setSelected] = useState(null);
    const singleOption = { value: duration, label: `Period: ${duration}` };

    // OnSubmit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !selected) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            // Create payment intent via axiosSecure
            const res = await axiosSecure.post('/create-payment-intent', { cost });
            const clientSecret = res.data.clientSecret;

            // Confirm card payment
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
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

    // Select custom styles
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            boxShadow: "none",
            minHeight: 42,
            cursor: "pointer",
            color: "inherit",
            borderRadius: 0,
            outline: "none",
        }),
        input: (base) => ({
            ...base,
            backgroundColor: "transparent",
            color: "inherit",
            margin: 0,
            padding: 0,
            outline: "none",
        }),
        singleValue: (base) => ({
            ...base,
            color: "inherit",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "white",
            color: "#000",
            borderRadius: 0,
        }),
        multiValue: (base) => ({
            ...base,
            color: "#000",
            borderRadius: 0,
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "rgba(255, 85, 85, 0.2)" : "transparent",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
        }),
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="text-[var(--dark)] dark:text-[var(--white)] max-w-sm mx-auto ring-2 ring-red-100 dark:ring-[#3f3f3f] shadow-sm px-6 pt-8 pb-6 font-jost flex flex-col"
        >
            {/* Single Option Dropdown */}
            <Select
                options={[singleOption]}
                value={selected}
                onChange={setSelected}
                placeholder="Select period once again"
                isSearchable={false}
                styles={customSelectStyles}
                className='text-[var(--dark)] dark:text-[var(--white)] border border-[#e0e0e0] dark:border-[#3f3f3f] no-outline'
            />

            {/* Card Field - Show only if selected */}
            <div className={`mt-2 ${selected ? '' : 'pointer-events-none opacity-50'} transition-all duration-300`}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                color: theme === 'dark' ? '#fff' : '#000',
                                '::placeholder': {
                                    color: theme === 'dark' ? '#bbbbbb' : '#888888',
                                },
                            },
                        },
                    }}
                />
            </div>

            {/* Error Message */}
            {error && <p className="text-sm mt-1">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!stripe || !selected}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold transition duration-300 disabled:opacity-50 cursor-pointer"
            >
                Pay ${cost}
            </button>
        </form>
    );
};

export default CheckoutForm;
