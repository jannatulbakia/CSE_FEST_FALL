import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router";

const slides = [
  {
    id: 1,
    title: "স্বাস্থ্যবন্ধু তে স্বাগতম",
    subtitle: "আপনার স্বাস্থ্য সচেতনতা বাড়ান এবং সুস্থ থাকুন প্রতিদিন।",
    image: "https://i.ibb.co.com/PzvdkXZ4/banners.webp",
  },
  {
    id: 2,
    title: "মানসিক ও শারীরিক সুস্থতা",
    subtitle: "প্রতিদিনের স্বাস্থ্য পরীক্ষা এবং সঠিক পরামর্শ নিন।",
    image: "https://i.ibb.co.com/VphB2SjH/1416915249750348047.jpg",
  },
  {
    id: 3,
    title: "কমিউনিটি সহায়তা",
    subtitle: "জরুরি হেল্পলাইন এবং কমিউনিটি ক্লিনিকের তথ্য সহজে পান।",
    image: "https://i.ibb.co.com/zh4MCgCL/natural-agriculture-beauties-bangladesh-rural-600nw-2309480897.webp",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-green-100 py-24">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                  <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-green-700 mb-6">{slide.subtitle}</p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
                  >
                    শুরু করুন
                  </button>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-64 md:w-80 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
