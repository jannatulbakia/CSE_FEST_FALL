import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo_village.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'হোম' },
    { to: '/mental-health-checkin', label: 'স্বাস্থ্য পরীক্ষা' },
    { to: '/anonymous-help', label: 'হেল্পলাইন' },
    { to: '/community-map', label: 'স্থান খুঁজুন' },
    { to: '/health-tips', label: 'স্বাস্থ্য টিপস' },
    { to: '/symptoms', label: 'স্বাস্থ্য সচেতনতা' },
    { to: '/about', label: 'আমাদের সম্পর্কে' }
  ];

  return (
    <nav className="bg-green-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full shadow-sm border border-green-400" />
            <span className="text-2xl font-bold text-white">স্বাস্থ্যবন্ধু</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  location.pathname === link.to
                    ? 'text-green-400 font-bold border-b-2 border-green-400'
                    : 'text-white hover:text-green-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              className="ml-4 px-6 py-2 bg-green-400 text-green-900 font-semibold rounded-lg hover:bg-green-500 hover:text-white transition duration-200"
            >
              শুরু করুন
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-green-800 transition duration-200"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-green-950 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40`}
      >
        <div className="flex flex-col h-full p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-400">স্বাস্থ্যবন্ধু</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-green-800 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col mt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                  location.pathname === link.to
                    ? 'text-green-400 font-bold border-l-4 border-green-400 bg-green-900'
                    : 'text-white hover:text-green-400 hover:bg-green-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="mt-auto px-4 py-3 bg-green-400 text-green-900 font-semibold rounded-lg hover:bg-green-500 hover:text-white text-center transition duration-200"
            >
              শুরু করুন
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
