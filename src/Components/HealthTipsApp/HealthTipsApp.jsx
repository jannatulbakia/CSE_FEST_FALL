import React, { useState, useEffect } from 'react';
import { Droplet, Thermometer, Sun, Calendar, AlertTriangle, CheckCircle, Info, Heart, Phone, Loader } from 'lucide-react';

const HealthTipsApp = () => {
  const [healthData, setHealthData] = useState(null);
  const [allSeasons, setAllSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showYearRound, setShowYearRound] = useState(false);
  const [expandedTip, setExpandedTip] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/health-tips';

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();

      if (result.success) {
        const data = result.data;
        setAllSeasons(data.seasons);
        setHealthData(data);
        const currentMonth = new Date().getMonth() + 1;
        const currentSeason = data.seasons.find(season => season.months.includes(currentMonth));
        
        setSelectedSeason(currentSeason || data.seasons[0]);
      } else {
        setError('Failed to load health tips');
      }
    } catch (err) {
      setError('Unable to connect to server. Please check if backend is running.');
      console.error('Error fetching health tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      droplet: Droplet,
      thermometer: Thermometer,
      sun: Sun,
      calendar: Calendar
    };
    return icons[iconName] || Calendar;
  };

  const changeSeason = (seasonId) => {
    const season = allSeasons.find(s => s.id === seasonId);
    if (season) {
      setSelectedSeason(season);
      setShowYearRound(false);
      setExpandedTip(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-blue-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600 text-lg">স্বাস্থ্য পরামর্শ লোড হচ্ছে...</p>
          <div className="mt-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg animate-pulse p-4 mb-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">সমস্যা হয়েছে</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchHealthData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  if (!healthData || !selectedSeason) return null;

  const SeasonIcon = getIcon(selectedSeason?.icon);
  const displayData = showYearRound ? healthData.yearRound : selectedSeason;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-4 pb-8">
        <div className="text-center mb-8 pt-6 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4 animate-bounce-slow">
            <Heart className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            মৌসুমি স্বাস্থ্য পরামর্শ
          </h1>
          <p className="text-gray-600 text-lg">বাংলাদেশের আবহাওয়া অনুযায়ী স্বাস্থ্য সতর্কতা</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {allSeasons.map((season, idx) => {
            const Icon = getIcon(season.icon);
            return (
              <button
                key={season.id}
                onClick={() => changeSeason(season.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedSeason.id === season.id && !showYearRound
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
                style={{
                  background: selectedSeason.id === season.id && !showYearRound 
                    ? `linear-gradient(135deg, ${season.color} 0%, ${season.color}dd 100%)`
                    : undefined,
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{season.name}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowYearRound(!showYearRound)}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              showYearRound
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <Calendar size={20} />
            <span className="hidden sm:inline">সারা বছর</span>
          </button>
        </div>

        {showYearRound && (
          <div className="mb-6 rounded-2xl p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl animate-slideInDown">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                <Calendar size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{healthData.yearRound.name}</h2>
                <p className="opacity-90">প্রতিদিন মেনে চললে অনেক রোগ এড়ানো যায়</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {displayData.tips.map((tip, idx) => (
            <div
              key={tip.id || idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slideInUp border-l-4"
              style={{ 
                borderLeftColor: tip.urgent ? '#EF4444' : (showYearRound ? '#10B981' : selectedSeason.color),
                animationDelay: `${idx * 100}ms`
              }}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {tip.urgent && (
                      <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                        <AlertTriangle className="text-red-500" size={20} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{tip.title}</h3>
                      <span className="text-sm text-gray-500">{tip.items.length} টি পরামর্শ</span>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-300 flex-shrink-0 ${expandedTip === tip.id ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div 
                className={`overflow-hidden transition-all duration-500 ${expandedTip === tip.id ? 'max-h-[1000px]' : 'max-h-0'}`}
              >
                <div className="px-4 pb-4 space-y-3">
                  {tip.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fadeIn"
                      style={{ animationDelay: `${itemIdx * 50}ms` }}
                    >
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {healthData.emergencyContacts && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl animate-slideInUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold">জরুরি যোগাযোগ</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {healthData.emergencyContacts.ambulance && (
                <a href={`tel:${healthData.emergencyContacts.ambulance}`} className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-xl hover:bg-opacity-30 transition-all transform hover:scale-105">
                  <div className="text-sm opacity-90">অ্যাম্বুলেন্স</div>
                  <div className="text-2xl font-bold">{healthData.emergencyContacts.ambulance}</div>
                </a>
              )}
              {healthData.emergencyContacts.healthLine && (
                <a href={`tel:${healthData.emergencyContacts.healthLine}`} className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-xl hover:bg-opacity-30 transition-all transform hover:scale-105">
                  <div className="text-sm opacity-90">স্বাস্থ্য হটলাইন</div>
                  <div className="text-2xl font-bold">{healthData.emergencyContacts.healthLine}</div>
                </a>
              )}
              {healthData.emergencyContacts.poisonControl && (
                <a href={`tel:${healthData.emergencyContacts.poisonControl}`} className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-xl hover:bg-opacity-30 transition-all transform hover:scale-105">
                  <div className="text-sm opacity-90">বিষক্রিয়া নিয়ন্ত্রণ</div>
                  <div className="text-2xl font-bold">{healthData.emergencyContacts.poisonControl}</div>
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-gray-700 font-medium mb-1">মনে রাখবেন:</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                এগুলো প্রতিরোধমূলক পরামর্শ। গুরুতর অসুস্থতায় দ্রুত যোগ্য ডাক্তারের পরামর্শ নিন। 
                জরুরি অবস্থায় ৯৯৯ বা নিকটস্থ হাসপাতালে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out forwards; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default HealthTipsApp;