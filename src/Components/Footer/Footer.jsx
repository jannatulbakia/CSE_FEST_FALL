import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-green-400">স্বাস্থ্যবন্ধু</h2>
            <p className="text-sm mt-1 text-white/90">
              মানবিক ও স্বাস্থ্য সচেতনতা অ্যাপ, গ্রামের মানুষের জন্য।
            </p>
          </div>

          {/* Center Section */}
          <div className="flex space-x-6">
            <a
              href="/"
              className="text-white hover:text-green-400 transition duration-200 font-medium"
            >
              হোম
            </a>
            <a
              href="/about"
              className="text-white hover:text-green-400 transition duration-200 font-medium"
            >
              আমাদের সম্পর্কে
            </a>
           
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right text-sm text-white/80">
            © {new Date().getFullYear()} স্বাস্থ্যবন্ধু। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>

        {/* Optional bottom line */}
        <div className="mt-6 border-t border-green-800 pt-4 text-center text-xs text-white/50">
          Designed with ❤️ for rural health awareness
        </div>
      </div>
    </footer>
  );
};

export default Footer;
