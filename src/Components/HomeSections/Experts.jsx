import React from "react";

const experts = [
  { id: 1, name: "সোহেল", role: "স্বাস্থ্য পরামর্শদাতা", image: "https://i.ibb.co/wNhMhhbY/download-3.jpg" },
  { id: 2, name: "রুমা", role: "কমিউনিটি স্বাস্থ্য কর্মী", image: "https://i.ibb.co/bRzMqkvz/download-4.jpg" },
  { id: 3, name: "জসিম", role: "মানসিক স্বাস্থ্য সহায়ক", image: "https://i.ibb.co/mCPZNPCK/images-1.jpg" },
];

const Experts = () => {
  return (
    <section className="py-24 bg-green-50 relative overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-green-900 mb-16">
        আপনার পাশে থাকা স্বাস্থ্য পরামর্শদাতা
      </h2>

      <div className="max-w-5xl mx-auto relative">
        {/* Center vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-green-200 hidden md:block"></div>

        <div className="space-y-20">
          {experts.map((exp, i) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-64 h-64 rounded-xl object-cover shadow-lg border-4 border-green-100"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 text-center md:text-left px-4">
                <h3 className="text-2xl font-semibold text-green-800">{exp.name}</h3>
                <p className="text-green-600 font-medium">{exp.role}</p>
                <p className="mt-4 text-green-700">
                  {exp.name} গ্রামের মানুষের স্বাস্থ্য সচেতনতা বাড়াতে তাদেরকে সহায়তা করেন, যত্ন এবং সতর্কতার সাথে।
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experts;
