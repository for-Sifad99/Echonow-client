import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaBell } from "react-icons/fa";

const SubModal = ({ isOpen, onRequestClose }) => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const overlayRef = useRef();
    const bellRef = useRef();

    // Modal open/close animation
    useEffect(() => {
        let timeout;
        if (isOpen) {
            // Show animation
            gsap.fromTo(
                modalRef.current,
                { x: 300, y: 300, opacity: 0 },
                { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });

            // Set timeout to auto-close after 3 seconds
            timeout = setTimeout(() => {
                gsap.to(modalRef.current, {
                    x: 300,
                    y: 300,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.in",
                    onComplete: onRequestClose,
                });
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                });
            }, 5000);
        }

        return () => clearTimeout(timeout); 
    }, [isOpen, onRequestClose]);

    // Bell shaking animation
    useEffect(() => {
        if (isOpen && bellRef.current) {
            gsap.to(bellRef.current, {
                rotation: 10,
                duration: 0.1,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
                transformOrigin: "top center",
            });
        }
    }, [isOpen]);

    const handleSubscribe = () => {
        onRequestClose();
        setTimeout(() => {
            navigate("/subscription");
        }, 400);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 bg-white/10 backdrop-blur-xs z-[9999] flex justify-end items-end"
        >
            <div
                ref={modalRef}
                className="font-jost text-[var(--dark)] dark:text-[var(--white)] bg-[var(--accent-white)] dark:bg-[var(--dark2-bg)] py-5 px-6 w-11/12 max-w-xs m-4 rounded-lg shadow-xl"
            >
                <div className="flex items-center gap-2 mb-2">
                    <FaBell ref={bellRef} className="text-[18px] text-yellow-500" />
                    <h2 className="text-sm sm:text-base font-bold font-oxygen leading-3.5">Become a Premium Member!</h2>
                </div>
                <p className="mb-3 text-[11px] sm:text-[13px] leading-2.5 sm:leading-3">
                    Upgrade your reading experience and access exclusive articles by subscribing to our premium plan.
                </p>
                <div className="flex justify-end gap-2 sm:gap-4">
                    <button
                        className="text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 bg-[var(--white)] hover:bg-gray-200 text-[var(--dark)] duration-500 cursor-pointer"
                        onClick={onRequestClose}
                    >
                        Maybe Later
                    </button>
                    <button
                        className="text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 bg-[var(--dark)] text-white rounded hover:bg-gray-800 duration-500 cursor-pointer"
                        onClick={handleSubscribe}
                    >
                        Go Premium
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubModal;
