import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";

const features = [
  { icon: "📍", title: "Location-aware",       desc: "Uses the Geolocation API to auto-fetch nearby restaurants." },
  { icon: "🍽️", title: "Live Restaurant Data",  desc: "Pulls real-time data from Google Places via a local proxy." },
  { icon: "🔍", title: "Search & Filter",        desc: "Instantly filter by name or cuisine category." },
  { icon: "🛒", title: "Cart Management",        desc: "Redux-powered cart that persists across pages." },
  { icon: "⚡", title: "Shimmer UI",             desc: "Skeleton screens keep the experience smooth while loading." },
  { icon: "♾️", title: "Infinite Scroll",        desc: "Loads more restaurants automatically as you scroll down." },
];

const stack = [
  { name: "React 18",          desc: "Functional components & hooks",       href: "https://react.dev/" },
  { name: "Redux Toolkit",     desc: "Global cart state management",        href: "https://redux-toolkit.js.org/" },
  { name: "React Router v6",   desc: "Client-side routing",                 href: "https://reactrouter.com/" },
  { name: "Tailwind CSS",      desc: "Utility-first styling",               href: "https://tailwindcss.com/" },
  { name: "Parcel 2",          desc: "Zero-config bundler",                 href: "https://parceljs.org/" },
  { name: "Google Places API", desc: "Live restaurant & location data",     href: "https://developers.google.com/maps/documentation/places/web-service" },
];

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-rose-500 text-white py-20 px-4 text-center">
        <p className="text-orange-100 text-xs font-semibold uppercase tracking-widest mb-3">About the project</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">HungerWheel</h1>
        <p className="text-orange-100 max-w-lg mx-auto text-base leading-relaxed">
          A full-featured food ordering app built with React — live data, real-time cart, and a clean UI.
        </p>
      </section>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-14 space-y-16">

        {/* About */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Project</h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
            HungerWheel is a single-page food ordering app built to practise core React concepts in a
            real-world setting. It pulls live restaurant listings from Google Places through a local
            Express proxy, displays them with a responsive Tailwind UI, and lets users build a cart
            managed by Redux Toolkit.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stack.map((tech) => (
              <a
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-orange-500 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1">{tech.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Developer */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Developer</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-5 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shrink-0">
              AC
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-gray-900">Aryan Chaudhary</h3>
              <p className="text-sm text-gray-400 mt-1">
                Building projects to learn React inside-out — from hooks and state management to real API integration.
              </p>
              <a
                href="https://github.com/aryannov25/HungerWheel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors"
              >
                <i className="fa-brands fa-github" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default About;
