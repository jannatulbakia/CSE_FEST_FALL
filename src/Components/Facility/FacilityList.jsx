import React from "react";

const FacilityList = ({ facilities = [] }) => {
  const safe = Array.isArray(facilities) ? facilities : [];

  if (!safe.length) return <p className="p-2 text-gray-600">⚠️ কোনো তথ্য পাওয়া যায়নি।</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">নিকটস্থ কেন্দ্রসমূহ</h3>
      <ul className="space-y-2">
        {safe.map((f) => (
          <li key={f.id} className="border rounded p-3 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition transform">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-blue-700">{f.name}</h4>
                <div className="text-sm text-gray-700">{f.type} — {f.upazila}, {f.union}</div>
                {f.landmark && <div className="text-sm text-gray-500">ল্যান্ডমার্ক: {f.landmark}</div>}
                <div className="text-sm text-gray-600">খোলার সময়: {f.open}</div>
              </div>
              <div className="text-right">
                {typeof f.distance === "number" ? (
                  <div className="text-sm font-medium">{(f.distance / 1000).toFixed(2)} km</div>
                ) : (
                  <div className="text-sm text-gray-500">দূরত্ব অনুপলব্ধ</div>
                )}
                <div className="text-xs mt-1">{f.busAccess ? "Bus access" : "No bus"}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityList;
