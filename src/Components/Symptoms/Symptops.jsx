import { useEffect, useState } from "react";
import "./Symptoms.css";

export default function Symptom() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/symptoms")
      .then((res) => res.json())
      .then((data) => {
        setSymptoms(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Symptom Awareness Guide
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {symptoms.map((symptom) => (
          <div
            key={symptom.id || symptom._id}
            className="p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border-l-4 border-green-400 bg-green-50"
          >
            <h2 className="font-bold text-2xl mb-3 text-gray-800">{symptom.name}</h2>
            <p className="text-gray-700 mb-3 text-base">
              <span className="font-semibold">Danger Signs:</span> {symptom.danger_signs}
            </p>
            <p className="text-gray-800 text-base">
              <span className="font-semibold">Action:</span> {symptom.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
