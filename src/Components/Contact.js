import React, { useState, useRef } from "react";
import Nav from "./Navbar.js";
import Footer from "./Footer";

function Contact() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare data object for submission
    const Data = {
      name: name,
      email: email,
      message: message,
    };

    // Perform the fetch API call to submit the form data
    fetch("https://hunger-wheel-default-rtdb.firebaseio.com/data.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then(() => {
        alert("Success");
        // Reset form fields after successful submission
        setMessage("");
        setEmail("");
        setName("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Nav />
        <div className="flex justify-center items-center px-4 py-2 ">
          <form
            className="w-full max-w-lg space-y-4 bg-white rounded-lg shadow-md p-4"
            onSubmit={submitHandler}
            style={{ flex: 1 }} // This will allow the form to be flexible
          >
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Contact Us
              </h1>
              <p className="mt-2 text-gray-600">
                We'd love to hear feedback from you
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  name="name"
                  value={name} // Controlled component
                  onChange={(e) => setName(e.target.value)} // Update state on change
                  className="mt-1 w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-gray-700">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={email} // Controlled component
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  className="mt-1 w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-gray-700">
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows="4"
                  value={message} // Controlled component
                  onChange={(e) => setMessage(e.target.value)} // Update state on change
                  className="mt-1 w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-lg text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
