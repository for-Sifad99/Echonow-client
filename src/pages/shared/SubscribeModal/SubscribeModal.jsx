import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const SubscribeModal = ({ isOpen, onRequestClose }) => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        onRequestClose();
        navigate("/subscription");
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Subscribe Modal"
            className="font-jost text-[var(--dark)] dark:text-[var(--white)] bg-[var(--white)] dark:bg-[var(--dark2-bg)] p-6 w-11/12 max-w-md mx-auto mt-40 shadow-lg"
            overlayClassName="fixed inset-0 backdrop-blur-xs bg-white/20 flex justify-center items-start "
        >
            <h2 className="text-xl font-bold mb-4">Become a Premium Member!</h2>
            <p className="mb-6">
                Upgrade your reading experience and access exclusive articles by subscribing to our premium plan.
            </p>
            <div className="flex justify-end gap-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
                    onClick={onRequestClose}
                >
                    Maybe Later
                </button>
                <button
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
                    onClick={handleSubscribe}
                >
                    Go Premium
                </button>
            </div>
        </Modal>
    );
};

export default SubscribeModal;
