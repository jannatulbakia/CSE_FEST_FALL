import React, { useState, useEffect } from "react";
import {
  Droplet,
  Thermometer,
  Sun,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Heart,
  Phone,
  Info,
} from "lucide-react";

const HealthTipsApp = () => {
  const [healthData, setHealthData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showYearRound, setShowYearRound] = useState(false);
  const [expandedTip, setExpandedTip] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api/health-tips";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API_BASE_URL);
      const json = await res.json();
      if (json.success) {
        setHealthData(json.data);
        const month = new Date().getMonth() + 1;
        const current = json.data.seasons.find((s) => s.months.includes(month));
        setSelectedSeason(current || json.data.seasons[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 text-lg font-semibold text-gray-600">
        স্বাস্থ্য পরামর্শ লোড হচ্ছে...
      </div>
    );

  const getIcon = (icon) =>
    ({ droplet: Droplet, thermometer: Thermometer, sun: Sun, calendar: Calendar }[icon] ||
    Calendar);

  const SeasonIcon = getIcon(selectedSeason?.icon);
  const activeColor = selectedSeason?.color || "#0EA5E9";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${activeColor}22 0%, #FFFFFF 100%)`,
      }}
    >
      {/* Header */}
      <header className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-3 shadow-lg">
          <Heart className="text-white" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          মৌসুমি স্বাস্থ্য পরামর্শ
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          {selectedSeason?.nameEn} Season Health Advisory – Stay Safe 💚
        </p>
      </header>

      {/* Season Selector */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {healthData?.seasons.map((season) => {
          const Icon = getIcon(season.icon);
          const isActive = selectedSeason.id === season.id && !showYearRound;
          return (
            <button
              key={season.id}
              onClick={() => {
                setSelectedSeason(season);
                setShowYearRound(false);
              }}
              className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 border backdrop-blur-sm transition-all ${
                isActive
                  ? "text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${season.color}, ${season.color}dd)`
                  : "",
              }}
            >
              <Icon size={20} />
              {season.name}
            </button>
          );
        })}
        <button
          onClick={() => setShowYearRound(!showYearRound)}
          className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 border transition-all ${
            showYearRound
              ? "bg-green-500 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Calendar size={20} />
          সারা বছর
        </button>
      </div>

      {/* Tips Section */}
      <main className="max-w-6xl mx-auto px-4 space-y-6 pb-12">
        {(showYearRound ? healthData.yearRound.tips : selectedSeason.tips).map(
          (tip) => (
            <div
              key={tip.id}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border transition-all"
              style={{
                borderLeft: `6px solid ${
                  tip.urgent ? "#EF4444" : activeColor
                }`,
              }}
            >
              <button
                onClick={() =>
                  setExpandedTip(expandedTip === tip.id ? null : tip.id)
                }
                className="w-full text-left p-5 flex justify-between items-center"
              >
                <div className="flex gap-3 items-start">
                  {tip.urgent && (
                    <AlertTriangle className="text-red-500 mt-1" size={20} />
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {tip.items.length} পরামর্শ
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    expandedTip === tip.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all ${
                  expandedTip === tip.id ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-4 space-y-3">
                  {tip.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <CheckCircle className="text-green-500 mt-1" size={18} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}

        {/* Emergency Contacts */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border-t-4 border-red-400 mt-8">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Phone className="text-red-500" size={24} />
            জরুরি যোগাযোগ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(healthData.emergencyContacts).map(([key, value]) => (
              <a
                key={key}
                href={`tel:${value}`}
                className="p-4 bg-red-100/60 rounded-xl hover:bg-red-200 transition text-center font-semibold"
              >
                {key === "ambulance"
                  ? "🚑 অ্যাম্বুলেন্স"
                  : key === "healthLine"
                  ? "☎️ স্বাস্থ্য হটলাইন"
                  : "⚕️ বিষক্রিয়া নিয়ন্ত্রণ"}
                <div className="text-2xl mt-1 text-gray-800">{value}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4 flex gap-3 items-start">
          <Info className="text-blue-500 mt-1" size={20} />
          <p className="text-sm text-gray-700 leading-relaxed">
            এগুলো সাধারণ প্রতিরোধমূলক পরামর্শ মাত্র। গুরুতর অসুস্থতায় দ্রুত
            যোগ্য ডাক্তারের পরামর্শ নিন বা জরুরি প্রয়োজনে ৯৯৯ নম্বরে কল করুন।
          </p>
        </div>
      </main>
    </div>
  );
};

export default HealthTipsApp;
