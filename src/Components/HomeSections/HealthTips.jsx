import React from "react";

const tips = [
  { title: "ডেঙ্গু প্রতিরোধ", desc: "বৃষ্টির পানি জমে থাকা জায়গা পরিষ্কার করুন এবং মশারি ব্যবহার করুন।" },
  { title: "মানসিক স্বাস্থ্য", desc: "প্রতিদিন ১০ মিনিট নিজেকে সময় দিন। চিন্তা বেশি হলে কারো সঙ্গে কথা বলুন।" },
  { title: "শিশু টিকা", desc: "শিশুর টিকা সময়মতো নিশ্চিত করুন এবং কমিউনিটি ক্লিনিকে রেকর্ড রাখুন।" },
];

const HealthTips = () => (
  <section className="py-20 max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">স্বাস্থ্য টিপস ও সচেতনতা</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tips.map((tip, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl shadow hover:-translate-y-2 hover:scale-105 transition duration-300 text-center">
          <h3 className="text-xl font-semibold mb-2 text-green-800">{tip.title}</h3>
          <p className="text-green-700">{tip.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HealthTips;
