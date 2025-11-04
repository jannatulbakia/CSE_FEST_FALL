import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">প্রশাসক হোম</h1>

        {/* Time Widget */}
        <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-green-600 w-fit mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-3">
              <div className="text-2xl font-bold font-mono">
                {formatTime(dateTime)}
              </div>
              <div className="text-sm font-semibold">
                {formatDate(dateTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NGO Widget */}
          <div
            onClick={() => navigate('/admin/ngo')}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">এনজিও ব্যবস্থাপনা</h3>
                <p className="text-gray-600 mt-2">এনজিও তথ্য দেখুন এবং পরিচালনা করুন</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              এখানে যান →
            </button>
          </div>

          {/* More Widget Placeholders */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 opacity-60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">ব্যবহারকারী ব্যবস্থাপনা</h3>
                <p className="text-gray-600 mt-2">আসছে শীঘ্রই...</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600 opacity-60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">প্রকল্প ট্র্যাকিং</h3>
                <p className="text-gray-600 mt-2">আসছে শীঘ্রই...</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600 opacity-60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">রিপোর্ট এবং বিশ্লেষণ</h3>
                <p className="text-gray-600 mt-2">আসছে শীঘ্রই...</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;