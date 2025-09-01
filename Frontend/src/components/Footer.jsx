import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      {/* Logo / Brand */}
      <div className="text-lg font-bold text-white">
        CineScope
      </div>

      {/* Links / Social Icons */}
      <div className="flex space-x-4">
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
          aria-label="Facebook"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
          aria-label="Twitter"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-sm text-gray-400">
        © {new Date().getFullYear()} CineScope. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
