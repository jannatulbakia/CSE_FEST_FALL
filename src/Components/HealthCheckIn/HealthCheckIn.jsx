import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HealthCheckIn = () => {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState(new Date());
    const [editingId, setEditingId] = useState(null);

    const BACKEND_URL = "https://cse-fest-backend-rho.vercel.app/api"; // Replace with your backend URL

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/mood-entries`);
                const data = await response.json();
                if (data.success) {
                    setEntries(data.entries);
                }
            } catch (error) {
                console.error("Error fetching entries:", error);
            }
        };

        fetchEntries();
    }, []);

    const handleSave = async () => {
        if (!mood && !note) return;

        const entryData = {
            mood,
            note,
            date: date.toISOString(),
        };

        try {
            const response = await fetch(`${BACKEND_URL}/mood-entries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData),
            });

            const data = await response.json();
            if (data.success) {
                // Add the new entry to the state
                const newEntry = {
                    id: data.entryId, // Use the ID returned from the backend
                    date: date.toLocaleDateString(),
                    mood,
                    note,
                };
                setEntries([newEntry, ...entries]);
                setMood('');
                setNote('');
            }
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };

    const handleDelete = async (id) => {
        const updated = entries.filter((entry) => entry.id !== id);
        setEntries(updated);
        // Optionally, call a delete API if you implement it
    };

    const handleEdit = (entry) => {
        setMood(entry.mood);
        setNote(entry.note);
        setDate(new Date(entry.date));
        setEditingId(entry.id);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-green-50 to-green-100 shadow-xl rounded-3xl mt-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-900">আজ কেমন লাগছে?</h2>

            <div className="flex flex-wrap justify-between gap-2 mb-4">
                {['খুব খুশি', 'ভাল/ঠিক আছে', 'খানিকটা চিন্তিত', 'মন খারাপ লাগছে', 'খুব খারাপ'].map((item) => (
                    <button
                        key={item}
                        onClick={() => setMood(item)}
                        className={`flex-1 px-3 py-2 rounded-2xl border transition-all duration-200 font-medium ${
                            mood === item
                                ? 'bg-green-600 text-white border-green-700'
                                : 'bg-white hover:bg-green-50 border-green-200 text-green-800'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <textarea
                className="w-full border border-green-200 rounded-2xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-900"
                rows="3"
                placeholder={editingId ? 'নোট সম্পাদনা করুন...' : 'আজকের দিনটি নিয়ে কিছু লিখুন...'}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <button
                onClick={handleSave}
                className={`w-full py-2 rounded-2xl font-semibold text-white transition-colors duration-200 ${
                    editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {editingId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
            </button>

            <h3 className="text-2xl font-semibold mt-8 mb-3 text-green-900">📖 তোমার ভার্চুয়াল ডায়েরি</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto bg-white p-4 rounded-2xl border border-green-200 shadow-sm">
                {entries.length === 0 && <p className="text-green-500 text-center">কোনো এন্ট্রি এখনো নেই</p>}
                {entries.map((entry) => (
                    <div key={entry.id} className="p-4 border rounded-2xl bg-green-50 shadow-sm">
                        <p className="text-sm text-green-600">📅 {entry.date}</p>
                        <p className="font-semibold text-green-700">মুড: {entry.mood}</p>
                        <p className="mt-1 text-green-800">📝 {entry.note}</p>
                        <div className="flex gap-3 mt-3">
                            <button
                                onClick={() => handleEdit(entry)}
                                className="px-3 py-1 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm"
                            >
                                সম্পাদনা
                            </button>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm"
                            >
                                মুছে ফেলুন
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-3 text-green-900">📆 ক্যালেন্ডার</h3>
            <Calendar
                onChange={setDate}
                value={date}
                className="rounded-3xl border border-green-200 shadow-inner"
            />
        </div>
    );
};

export default HealthCheckIn;