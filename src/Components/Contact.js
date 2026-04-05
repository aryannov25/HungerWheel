import React, { useState } from "react";
import Nav from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://hunger-wheel-default-rtdb.firebaseio.com/data.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setSent(true);
      setName(""); setEmail(""); setMessage("");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white focus:border-transparent transition-all placeholder-gray-400";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {sent ? (
            /* Success state */
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-400 text-sm mb-6">Thanks for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setSent(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submitHandler} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">

              {/* Header */}
              <div className="text-center mb-2">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">
                  💬
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900">Get in Touch</h1>
                <p className="text-gray-400 text-sm mt-1">We'd love to hear from you</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name</label>
                <input
                  type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                <textarea
                  required rows="4" value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message…"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
