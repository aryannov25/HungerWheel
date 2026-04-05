import Logo from "../assets/img/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="HungerWheel" className="h-8 w-auto brightness-0 invert" />
            <span className="text-xs text-gray-500">Great food, delivered fast.</span>
          </div>

          {/* Credit */}
          <p className="text-xs text-gray-500">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/aryan-chaudhary-133855230/"
              target="_blank"
              rel="noreferrer"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Aryan Chaudhary
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
