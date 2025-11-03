import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/mental-health-checkin', label: 'Health Check' },
        { to: '/anonymous-help', label: 'HelpLine' },
        { to: '/community-map', label: 'Find Locations' },
        { to: '/health-tips', label: 'Health Tips' },
        { to: '/symptoms', label: 'Health Awareness' },
        { to: '/about', label: 'About' }
    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-green-700 transition duration-200">
                            Shastho Bondhu
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition duration-200 font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center">
                        <Link
                            to="/signup"
                            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transform transition duration-200 font-medium"
                        >
                            Get Started
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition duration-200"
                    >
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1 bg-gradient-to-br from-emerald-50 to-teal-50">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-emerald-600 hover:shadow-md transition duration-200 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center px-4 py-3 mt-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg transition duration-200 font-medium"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;