import React, { useEffect, useState} from "react";

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

  const BACKEND_URL = "http://localhost:5000";

  // Fetch anonymous name
  useEffect(() => {
    async function fetchAnonName() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/anon-name`);
        const data = await res.json();
        console.log("Fetched anon name:", data);
        setAnonName(data.anonymousName);
      } catch (err) {
        console.error("Anon name fetch failed:", err);
        setAnonName("Guest-" + Math.floor(1000 + Math.random() * 9000));
      }
    }
    fetchAnonName();
  }, []);

  // Local queue helpers
  const getQueue = () => {
    try {
      const raw = localStorage.getItem("help_requests");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const saveQueue = (q) => localStorage.setItem("help_requests", JSON.stringify(q));

  // Submit request
  const submitRequest = async (payload) => {
    console.log("Submitting request:", payload);
    try {
      const res = await fetch(`${BACKEND_URL}/api/anonymous-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok || !data.success) throw new Error("Server error");

      setLastSentId(data.requestId);
      setAnonName(data.anonymousName);
      setStatusMessage(`✅ বার্তা পাঠানো হয়েছে। রিকোয়েস্ট আইডি: ${data.requestId}`);
      return true;
    } catch (err) {
      console.error("Submit request error:", err);
      setStatusMessage("❌ বার্তা পাঠাতে ব্যর্থ হয়েছে। পরে চেষ্টা করুন।");
      return false;
    }
  };

  // Process queued requests
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

  // Enqueue request
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">অ্যানোনিমাস হেল্প রিকোয়েস্ট</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CHANNELS.map((c) => (
          <div key={c.id} onClick={() => setSelected(c)} className={`cursor-pointer p-4 rounded-lg shadow ${selected?.id === c.id ? "ring-2 ring-indigo-400 bg-indigo-50" : "bg-white"}`}>
            <div className="text-3xl">{c.logo}</div>
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-gray-500">{c.tagline}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-700">{statusMessage}</div>
          {lastSentId && <div className="text-xs text-gray-500 mt-2">শেষ রিকোয়েস্ট আইডি: {lastSentId}</div>}
          <div className="mt-4 text-xs text-gray-400">🔒 আপনার তথ্য প্রথমে আপনার ফোনে থাকে</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          {!selected ? (
            <div className="text-sm text-gray-500">একটি চ্যানেল সিলেক্ট করুন।</div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-semibold">চ্যানেল: {selected.title}</div>
              <label className="block text-xs text-gray-600">অ্যানোনিমাস নাম</label>
              <input className="border w-full px-2 py-1 text-sm rounded" value={anonName} readOnly />
              <textarea className="border w-full px-2 py-2 text-sm rounded" rows="5" placeholder="আপনার বার্তা লিখুন..." value={message} onChange={(e) => setMessage(e.target.value)} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> আমি সম্মত।</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={shareContact} onChange={(e) => setShareContact(e.target.checked)} /> পরে যোগাযোগ শেয়ার করবো।</label>
              <button onClick={handleSend} className="w-full bg-indigo-600 text-white py-1 rounded text-sm hover:bg-indigo-700 transition">পাঠান</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnonymousHelp;
