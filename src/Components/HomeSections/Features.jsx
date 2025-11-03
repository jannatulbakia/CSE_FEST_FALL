import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const features = [
  { title: "স্বাস্থ্য পরীক্ষা", desc: "প্রতিদিন নিজের মানসিক ও শারীরিক অবস্থা লগ করুন।" },
  { title: "হেল্পলাইন", desc: "অ্যানোনিমাসভাবে সহায়তা চেয়ে নিরাপদে যোগাযোগ করুন।" },
  { title: "স্থান খুঁজুন", desc: "কমিউনিটি ক্লিনিক, স্বাস্থ্যকর্মী এবং জরুরি কেন্দ্রের ঠিকানা দেখুন।" },
  { title: "ডিজিটাল রেকর্ড", desc: "সকল স্বাস্থ্য ডেটা সহজে সংরক্ষণ করুন।" },
  { title: "আপডেট নোটিফিকেশন", desc: "আপনার এলাকার জরুরি স্বাস্থ্য আপডেট সময়মতো পান।" },
];

const Features = () => (
  <section className="py-20 bg-green-50">
    <h2 className="text-3xl font-bold text-green-900 text-center mb-8">আমাদের ফিচারসমূহ</h2>
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="max-w-7xl mx-auto px-4"
    >
      {features.map((feature, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
            <p className="text-green-700">{feature.desc}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default Features;
