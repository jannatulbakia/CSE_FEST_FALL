import React, { useEffect, useState } from "react";

const AnonymousHelp = () => {
  const CHANNELS = [
    { id: "ngo", title: "স্থানীয় NGO", tagline: "গোপনে সাহায্য নিন", logo: "🏠" },
    { id: "chw", title: "কমিউনিটি হেলথ ওয়ার্কার", tagline: "স্বাস্থ্য সহায়তা", logo: "👩‍⚕️" },
    { id: "line", title: "সাপোর্ট লাইন", tagline: "ফোন/চ্যাট সহায়তা", logo: "📞" },
  ];

  const [selected, setSelected] = useState(null);
  const [anonName, setAnonName] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [shareContact, setShareContact] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [lastSentId, setLastSentId] = useState(null);

  const BACKEND_URL = "https://cse-fest-backend-rho.vercel.app";

  // Fetch anonymous name
  useEffect(() => {
    async function fetchAnonName() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/anon-name`);
        const data = await res.json();
        setAnonName(data.anonymousName);
      } catch {
        setAnonName("Guest-" + Math.floor(1000 + Math.random() * 9000));
      }
    }
    fetchAnonName();
  }, []);

  const getQueue = () => {
    try {
      const raw = localStorage.getItem("help_requests");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const saveQueue = (q) => localStorage.setItem("help_requests", JSON.stringify(q));

  const submitRequest = async (payload) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/anonymous-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Server error");

      setLastSentId(data.requestId);
      setAnonName(data.anonymousName);
      setStatusMessage(`✅ বার্তা পাঠানো হয়েছে। রিকোয়েস্ট আইডি: ${data.requestId}`);
      return true;
    } catch {
      setStatusMessage("❌ বার্তা পাঠাতে ব্যর্থ হয়েছে। পরে চেষ্টা করুন।");
      return false;
    }
  };

  const processQueue = async () => {
    const q = getQueue();
    if (!q.length) return;
    const remaining = [];
    for (const item of q) {
      const success = await submitRequest(item);
      if (!success) remaining.push(item);
    }
    saveQueue(remaining);
  };

  const enqueueRequest = (channel, name, text, contactOpt) => {
    const q = getQueue();
    const payload = { channel, anonymousName: name, message: text, shareContact: contactOpt, createdAt: new Date().toISOString() };
    q.push(payload);
    saveQueue(q);
    setStatusMessage("💾 অনুরোধ সংরক্ষিত হয়েছে। অনলাইনে গেলে পাঠানো হবে।");
    if (navigator.onLine) processQueue();
  };

  const handleSend = () => {
    if (!selected) return setStatusMessage("অনুগ্রহ করে একটি চ্যানেল নির্বাচন করুন।");
    if (!consent) return setStatusMessage("অনুগ্রহ করে সম্মতি দিন।");
    if (!message.trim()) return setStatusMessage("অনুগ্রহ করে একটি বার্তা লিখুন।");
    enqueueRequest(selected.id, anonName, message.trim(), shareContact);
    setMessage("");
  };

  useEffect(() => {
    const handleOnline = () => {
      setStatusMessage("🌐 অনলাইন — বার্তা পাঠানো হচ্ছে...");
      processQueue();
    };
    const handleOffline = () => setStatusMessage("📴 অফলাইন — বার্তাগুলো পরে পাঠানো হবে।");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (navigator.onLine) processQueue();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-900 text-center">অ্যানোনিমাস হেল্প রিকোয়েস্ট</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {CHANNELS.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className={`cursor-pointer p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl text-center ${selected?.id === c.id ? "ring-4 ring-green-400 bg-green-100" : "bg-white"}`}
          >
            <div className="text-4xl mb-2">{c.logo}</div>
            <div className="text-lg font-semibold text-green-800">{c.title}</div>
            <div className="text-sm text-green-600">{c.tagline}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg transition transform hover:shadow-2xl">
          <div className="text-sm text-green-700">{statusMessage}</div>
          {lastSentId && <div className="text-xs text-green-500 mt-2">শেষ রিকোয়েস্ট আইডি: {lastSentId}</div>}
          <div className="mt-4 text-xs text-green-400">🔒 আপনার তথ্য প্রথমে আপনার ফোনে থাকে</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:shadow-2xl">
          {!selected ? (
            <div className="text-sm text-green-600 text-center py-4">একটি চ্যানেল সিলেক্ট করুন।</div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-green-800 mb-2">চ্যানেল: {selected.title}</div>
              <label className="block text-xs text-green-600">অ্যানোনিমাস নাম</label>
              <input className="border w-full px-3 py-2 rounded text-sm focus:ring-2 focus:ring-green-300 focus:outline-none" value={anonName} readOnly />
              <textarea
                className="border w-full px-3 py-2 mt-2 rounded text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
                rows="5"
                placeholder="আপনার বার্তা লিখুন..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm mt-1">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                আমি সম্মত।
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={shareContact} onChange={(e) => setShareContact(e.target.checked)} />
                পরে যোগাযোগ শেয়ার করবো।
              </label>
              <button
                onClick={handleSend}
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-2 hover:bg-green-700 transition-colors font-semibold"
              >
                পাঠান
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnonymousHelp;