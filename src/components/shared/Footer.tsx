import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                width={90}
                height={90}
                className="rounded-lg"
              />
              <span className="ml-2 text-xl font-bold text-white">
                Dream Auto
              </span>
            </div>
            <p className="mb-4">
              The premier car marketplace in Uzbekistan connecting buyers and
              sellers for a seamless automotive experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="hover:text-white transition duration-300"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Car Valuation
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Insurance Advice
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition duration-300"
                >
                  Dealer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Chilonzor 21, Tashkent, Uzbekistan</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+998 (90) 123-45-67</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>support@dreamauto.uz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} Dream Auto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
