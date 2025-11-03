import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HealthCheckIn = () => {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState(new Date());
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        setEntries(savedEntries);
    }, []);

    const handleSave = () => {
        if (!mood && !note) return;

        let updated;
        if (editingId) {
            updated = entries.map((entry) =>
                entry.id === editingId
                    ? { ...entry, mood, note, date: date.toLocaleDateString() }
                    : entry
            );
            setEditingId(null);
        } else {
            const newEntry = {
                id: Date.now(),
                date: date.toLocaleDateString(),
                mood,
                note,
            };
            updated = [newEntry, ...entries];
        }

        setEntries(updated);
        localStorage.setItem('moodEntries', JSON.stringify(updated));
        setMood('');
        setNote('');
    };

    const handleDelete = (id) => {
        const updated = entries.filter((entry) => entry.id !== id);
        setEntries(updated);
        localStorage.setItem('moodEntries', JSON.stringify(updated));
    };

    const handleEdit = (entry) => {
        setMood(entry.mood);
        setNote(entry.note);
        setDate(new Date(entry.date));
        setEditingId(entry.id);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-2xl mt-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-700">আজ কেমন লাগছে?</h2>

            <div className="flex flex-wrap justify-between gap-2 mb-4">
                {['খুব খুশি', 'ভাল/ঠিক আছে', 'খানিকটা চিন্তিত', 'মন খারাপ লাগছে', 'খুব খারাপ'].map((item) => (
                    <button
                        key={item}
                        onClick={() => setMood(item)}
                        className={`flex-1 px-3 py-2 rounded-xl border transition-colors duration-200 ${mood === item ? 'bg-blue-500 text-white border-blue-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <textarea
                className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows="3"
                placeholder={editingId ? 'নোট সম্পাদনা করুন...' : 'আজকের দিনটি নিয়ে কিছু লিখতে চাও?'}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <button
                onClick={handleSave}
                className={`w-full ${editingId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'
                    } text-white py-2 rounded-xl font-semibold transition-colors duration-200`}
            >
                {editingId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
            </button>

            <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">📖 তোমার ভার্চুয়াল ডায়েরি</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto bg-white p-3 rounded-xl border">
                {entries.length === 0 && <p className="text-gray-500 text-center">কোনো এন্ট্রি এখনো নেই</p>}
                {entries.map((entry) => (
                    <div key={entry.id} className="p-4 border rounded-xl bg-blue-50 shadow-sm">
                        <p className="text-sm text-gray-600">📅 {entry.date}</p>
                        <p className="font-semibold text-blue-700">মুড: {entry.mood}</p>
                        <p className="mt-1 text-gray-800">📝 {entry.note}</p>
                        <div className="flex gap-3 mt-3">
                            <button
                                onClick={() => handleEdit(entry)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            >
                                সম্পাদনা
                            </button>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                            >
                                মুছে ফেলুন
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 ">📆 ক্যালেন্ডার</h3>

            <Calendar onChange={setDate} value={date} className="rounded-3xl" />
        </div>
    );
};

export default HealthCheckIn;
