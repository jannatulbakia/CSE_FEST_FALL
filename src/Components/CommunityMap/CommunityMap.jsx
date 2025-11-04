// src/Components/CommunityMap/CommunityMap.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import FacilityMap from "../Facility/FacilityMap";
import FacilityList from "../Facility/FacilityList";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371e3; 
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; 
};

const CommunityMap = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://cse-fest-backend-rho.vercel.app/api/facilities");
        if (Array.isArray(res.data)) {
          setFacilities(res.data);
          localStorage.setItem("facilities_cache", JSON.stringify(res.data));
          setOffline(false);
        } else {
          console.error("Unexpected response:", res.data);
          const cache = localStorage.getItem("facilities_cache");
          if (cache) {
            setFacilities(JSON.parse(cache));
            setOffline(true);
          } else {
            setFacilities([]);
            setOffline(true);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        const cache = localStorage.getItem("facilities_cache");
        if (cache) {
          setFacilities(JSON.parse(cache));
        } else {
          setFacilities([]);
        }
        setOffline(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation failed or denied:", err.message);
          setUserLocation(null);
        },
        { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5, timeout: 10000 }
      );
    }
  }, []);

  useEffect(() => {
    const s = searchTerm.trim().toLowerCase();
    const pool = facilities.filter((f) => {
      if (!s) return true;
      return (
        (f.name || "").toLowerCase().includes(s) ||
        (f.type || "").toLowerCase().includes(s) ||
        (f.upazila || "").toLowerCase().includes(s) ||
        (f.union || "").toLowerCase().includes(s) ||
        (f.landmark || "").toLowerCase().includes(s)
      );
    });

    const withDist = pool.map((f) => {
      let distance = null;
      if (userLocation) {
        distance = haversineDistance(
          userLocation.lat,
          userLocation.lon,
          Number(f.lat),
          Number(f.lon)
        );
      }
      return { ...f, distance };
    });

    if (userLocation) {
      withDist.sort((a, b) => {
        if (a.distance == null && b.distance == null) return 0;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;

        const diff = a.distance - b.distance;
        if (Math.abs(diff) > 5) {
          return diff;
        }

        if (a.busAccess && !b.busAccess) return -1;
        if (!a.busAccess && b.busAccess) return 1;
        return (a.id || 0) - (b.id || 0);
      });
    }

    setFilteredFacilities(withDist);
  }, [facilities, searchTerm, userLocation]);

  const groupByUpazila = (list) => {
    const groups = {};
    list.forEach((f) => {
      const key = `${f.upazila} › ${f.union}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });
    return groups;
  };

  if (loading) {
    return <p className="p-4 text-center">⏳ তথ্য লোড হচ্ছে...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[70vh]">
      <div className="md:w-1/3 p-4 overflow-y-auto bg-gray-50">
        <h1 className="text-2xl font-bold mb-3">🏥 কমিউনিটি হেলথ ম্যাপ</h1>

        <div className="mb-3">
          <input
            type="text"
            placeholder="সার্চ (নাম, ধরন, উপজেলা, ইউনিয়ন, landmark...)"
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              if (!("geolocation" in navigator)) {
                alert("আপনার ব্রাউজার GPS সমর্থন করে না।");
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setUserLocation({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                  });
                },
                (err) => {
                  alert("Geolocation error: " + err.message);
                },
                { enableHighAccuracy: true, timeout: 10000 }
              );
            }}
          >
            🔎 আমার কাছে নিকটতম দেখাও
          </button>
        </div>

        {offline && (
          <div className="mb-2 p-2 bg-yellow-100 border rounded text-sm">
            ⚠️ অনলাইন নেই — cached ডেটা ব্যবহার করা হচ্ছে অথবা শুধুমাত্র তালিকা দেখানো হচ্ছে।
          </div>
        )}

        {(!userLocation && offline) ? (
          <div>
            <h3 className="font-semibold mb-2">উপজেলা ভিত্তিক তালিকা</h3>
            {Object.entries(groupByUpazila(filteredFacilities)).map(([group, items]) => (
              <div key={group} className="mb-3">
                <h4 className="font-medium">{group}</h4>
                <ul className="ml-3">
                  {items.map((f) => (
                    <li key={f.id} className="text-sm">• {f.name} — {f.type} ({f.open})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <FacilityList facilities={filteredFacilities} />
        )}
      </div>

      <div className="md:w-2/3 h-[80vh]">
        <FacilityMap facilities={filteredFacilities} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default CommunityMap;
