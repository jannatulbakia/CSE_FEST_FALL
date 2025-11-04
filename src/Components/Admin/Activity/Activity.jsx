import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Activity = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get("https://cse-fest-backend-rho.vercel.app/api/mood-entries");
                if (response.data.success) {
                    setEntries(response.data.entries);
                } else {
                    console.error("Error fetching entries:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching entries:", error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-green-50 to-green-100 shadow-xl rounded-3xl mt-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-900">কার্যকলাপ</h2>

            {entries.length === 0 ? (
                <p className="text-green-500 text-center">কোনো এন্ট্রি এখনো নেই</p>
            ) : (
                <div className="space-y-3">
                    {entries.map((entry) => (
                        <div key={entry._id} className="p-4 border rounded-2xl bg-green-50 shadow-sm">
                            <p className="text-sm text-green-600">📅 {new Date(entry.date).toLocaleDateString()}</p>
                            <p className="font-semibold text-green-700">মুড: {entry.mood}</p>
                            <p className="mt-1 text-green-800">📝 {entry.note}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Activity;