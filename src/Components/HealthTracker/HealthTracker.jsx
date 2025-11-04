import { useState, useEffect } from "react";

// Safe localStorage helpers
const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("ডাটা সংরক্ষণে সমস্যা:", err);
  }
};

const loadData = (key) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : [];
  } catch (err) {
    console.error("ডাটা লোডে সমস্যা:", err);
    return [];
  }
};

function HealthTracker() {
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ancVisits, setAncVisits] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(false); // Loading spinner state

  // Load saved data on mount
  useEffect(() => {
    setAncVisits(loadData("ancVisits"));
    setVaccinations(loadData("vaccinations"));
  }, []);

  const handleANCSubmit = () => {
    if (!expectedDelivery) return;
    const deliveryDate = new Date(expectedDelivery);
    if (isNaN(deliveryDate)) return;

    setLoading(true); // Start spinner
    setTimeout(() => { // Simulate processing delay
      const visits = [8, 16, 24, 32, 36].map((week) => {
        const visitDate = new Date(deliveryDate);
        visitDate.setDate(visitDate.getDate() - week * 7);
        return { week, date: visitDate.toISOString().split("T")[0], done: false };
      });

      setAncVisits(visits);
      saveData("ancVisits", visits);
      setLoading(false); // Stop spinner
    }, 800); // 0.8s animation
  };

  const handleVaccinationSubmit = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    if (isNaN(birth)) return;

    setLoading(true);
    setTimeout(() => {
      const schedule = [
        { name: "BCG", month: 0 },
        { name: "পেন্টা ১", month: 6 },
        { name: "পেন্টা ২", month: 10 },
        { name: "MR", month: 9 },
        { name: "মিজলস ২", month: 15 },
      ].map((vaccine) => {
        const dueDate = new Date(birth);
        dueDate.setMonth(dueDate.getMonth() + vaccine.month);
        return { ...vaccine, dueDate: dueDate.toISOString().split("T")[0], done: false };
      });

      setVaccinations(schedule);
      saveData("vaccinations", schedule);
      setLoading(false);
    }, 800);
  };

  const toggleAncDone = (index) => {
    const updated = [...ancVisits];
    updated[index].done = !updated[index].done;
    setAncVisits(updated);
    saveData("ancVisits", updated);
  };

  const toggleVaccineDone = (index) => {
    const updated = [...vaccinations];
    updated[index].done = !updated[index].done;
    setVaccinations(updated);
    saveData("vaccinations", updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-6">মাতৃ ও শৈশব স্বাস্থ্য ট্র্যাকার</h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ANC Tracker */}
      <div className="mb-8 p-4 bg-green-50 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">গর্ভকালীন স্বাস্থ্য (ANC) ট্র্যাকার</h2>
        <input
          type="date"
          value={expectedDelivery}
          onChange={(e) => setExpectedDelivery(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleANCSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ANC চেকআপ তৈরি করুন
        </button>

        {ancVisits.length > 0 && (
          <ul className="mt-4 space-y-2">
            {ancVisits.map((visit, i) => (
              <li
                key={i}
                className={`p-2 rounded ${
                  visit.done ? "bg-green-200" : "bg-white"
                } flex justify-between items-center shadow`}
              >
                <span>সপ্তাহ {visit.week}: {visit.date}</span>
                <button
                  onClick={() => toggleAncDone(i)}
                  className={`px-3 py-1 rounded ${
                    visit.done ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {visit.done ? "সম্পন্ন" : "মার্ক সম্পন্ন"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vaccination Tracker */}
      <div className="mb-8 p-4 bg-green-50 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">শিশুর টিকাদান ট্র্যাকার</h2>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleVaccinationSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          টিকাদান সময়সূচি তৈরি করুন
        </button>

        {vaccinations.length > 0 && (
          <ul className="mt-4 space-y-2">
            {vaccinations.map((vaccine, i) => (
              <li
                key={i}
                className={`p-2 rounded ${
                  vaccine.done ? "bg-green-200" : "bg-white"
                } flex justify-between items-center shadow`}
              >
                <span>{vaccine.name}: {vaccine.dueDate}</span>
                <button
                  onClick={() => toggleVaccineDone(i)}
                  className={`px-3 py-1 rounded ${
                    vaccine.done ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {vaccine.done ? "সম্পন্ন" : "মার্ক সম্পন্ন"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HealthTracker;
