import React from "react";

const ideas = [
  { id: 1, title: "যোগ ব্যায়াম", image: "https://i.ibb.co.com/1BZLD6D/images.jpg" },
  { id: 2, title: "প্রাকৃতিক খাবার", image: "https://i.ibb.co.com/HDzpz7nb/download-1.jpg" },
  { id: 3, title: "পরিবেশ বান্ধব জীবন", image: "https://i.ibb.co.com/TxQg7G1V/download-2.jpg" },
];

const WellnessIdeas = () => (
  <section className="py-24 bg-green-50">
    <h2 className="text-4xl font-bold text-green-900 text-center mb-8">স্বাস্থ্য সচেতনতার ধারণা 🌿</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {ideas.map((idea) => (
        <div key={idea.id} className="relative overflow-hidden rounded-3xl shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
          <img src={idea.image} alt={idea.title} className="w-full h-60 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-green-900 bg-opacity-50 p-3">
            <h3 className="text-white font-semibold">{idea.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WellnessIdeas;
