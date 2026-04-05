import { Link } from "react-router-dom";

const Modal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-[fadeUp_0.3s_ease-out_both]">

        {/* Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
          🎉
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Your order has been confirmed. Our delivery partner will reach you shortly.
        </p>

        {/* Estimated time badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <i className="fa-solid fa-clock" />
          Estimated delivery: 30–45 mins
        </div>

        <Link to="/" onClick={() => closeModal(false)}>
          <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
            Back to Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Modal;
