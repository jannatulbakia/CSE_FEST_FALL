import React from "react";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-teal-600 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">আপনি কি সুস্থ থাকতে চান?</h2>
      <p className="text-white mb-6 max-w-xl mx-auto">স্বাস্থ্যবন্ধু অ্যাপে আপনার স্বাস্থ্য লগ করুন এবং গ্রাম পর্যায়ে সুস্থ থাকুন।</p>
      <button onClick={() => navigate("/signup")} className="px-8 py-4 bg-green-900 rounded-lg text-white hover:bg-green-800 transition duration-300">
        অ্যাপে যোগ দিন
      </button>
    </section>
  );
};

export default CallToAction;
