import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo_village.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const location = useLocation();
  const managementRef = useRef(null);

  const navLinks = [
    { to: '/', label: 'হোম' },
    { to: '/mental-health-checkin', label: 'স্বাস্থ্য পরীক্ষা' },
    { to: '/anonymous-help', label: 'হেল্পলাইন' },
    { to: '/community-map', label: 'স্থান খুঁজুন' },
    { to: '/health-tips', label: 'স্বাস্থ্য টিপস' },
    { to: '/symptoms', label: 'স্বাস্থ্য সচেতনতা' },
    { to: '/about', label: 'আপনার কণ্ঠ' }
  ];

  const managementLinks = [
    { to: '/voluenteer', label: 'স্বেচ্ছাসেবক' },
    { to: '/event', label: 'ইভেন্ট' }
  ];

  useEffect(() => {
    setIsOpen(false);
    setIsManagementOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managementRef.current && !managementRef.current.contains(event.target)) {
        setIsManagementOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-green-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img 
                src={logo} 
                alt="স্বাস্থ্যবন্ধু লোগো" 
                className="h-10 w-10 rounded-full shadow-sm border-2 border-green-400" 
              />
              <span className="text-xl sm:text-2xl font-bold text-white">স্বাস্থ্যবন্ধু</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg font-medium transition duration-200 ${
                    location.pathname === link.to
                      ? 'bg-green-800 text-green-300'
                      : 'text-white hover:bg-green-800 hover:text-green-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Management Dropdown */}
              <div className="relative" ref={managementRef}>
                <button
                  onClick={() => setIsManagementOpen(!isManagementOpen)}
                  className={`px-3 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-1 ${
                    managementLinks.some(link => location.pathname === link.to)
                      ? 'bg-green-800 text-green-300'
                      : 'text-white hover:bg-green-800 hover:text-green-300'
                  }`}
                >
                  ম্যানেজমেন্ট
                  <svg 
                    className={`w-4 h-4 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isManagementOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-green-950 rounded-lg shadow-xl border border-green-800 overflow-hidden">
                    {managementLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-4 py-3 transition duration-200 ${
                          location.pathname === link.to
                            ? 'bg-green-800 text-green-300'
                            : 'text-white hover:bg-green-800 hover:text-green-300'
                        }`}
                        onClick={() => setIsManagementOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                to="/signup"
                className="ml-2 px-6 py-2 bg-green-400 text-green-900 font-semibold rounded-lg hover:bg-green-500 hover:shadow-lg transform hover:scale-105 transition duration-200"
              >
                শুরু করুন
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-green-800 transition duration-200"
              aria-label="মেনু"
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
      </nav>

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 sm:w-80 bg-green-950 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-green-800">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="লোগো" 
                className="h-8 w-8 rounded-full border-2 border-green-400" 
              />
              <span className="text-xl font-bold text-green-400">স্বাস্থ্যবন্ধু</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 rounded-lg hover:bg-green-800 transition duration-200"
              aria-label="বন্ধ করুন"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col flex-1 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                  location.pathname === link.to
                    ? 'text-green-300 font-bold bg-green-900 border-l-4 border-green-400'
                    : 'text-white hover:text-green-300 hover:bg-green-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Management Section */}
            <div>
              <button
                onClick={() => setIsManagementOpen(!isManagementOpen)}
                className={`w-full px-4 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-between ${
                  managementLinks.some(link => location.pathname === link.to)
                    ? 'text-green-300 bg-green-900'
                    : 'text-white hover:text-green-300 hover:bg-green-900'
                }`}
              >
                ম্যানেজমেন্ট
                <svg 
                  className={`w-4 h-4 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isManagementOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {managementLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition duration-200 ${
                        location.pathname === link.to
                          ? 'text-green-300 bg-green-900'
                          : 'text-white hover:text-green-300 hover:bg-green-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div className="p-4 border-t border-green-800">
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 bg-green-400 text-green-900 font-semibold rounded-lg hover:bg-green-500 hover:text-white text-center transition duration-200"
            >
              শুরু করুন
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
