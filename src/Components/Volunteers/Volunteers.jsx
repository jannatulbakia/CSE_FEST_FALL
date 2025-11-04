// Volunteers.js
import React, { useEffect, useState } from 'react';

const Volunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await fetch('https://cse-fest-backend-rho.vercel.app/api/volunteers');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setVolunteers(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers();
    }, []);

    if (loading) return <p className="text-center mt-20 text-lg">Loading volunteers...</p>;
    if (error) return <p className="text-red-500 text-center mt-20">Error fetching volunteers: {error}</p>;

    return (
        <div className="bg-gradient-to-b from-green-50 to-green-200 py-20">
            <div className="text-center mb-16 px-6">
                <h2 className="text-5xl font-extrabold text-green-900">Meet Our Amazing Volunteers</h2>
                <p className="mt-4 text-green-800 text-lg max-w-2xl mx-auto leading-relaxed">
                    Dedicated individuals committed to making a difference in our community.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
                {volunteers.map((volunteer) => (
                    <div
                        key={volunteer._id}
                        className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group bg-white"
                    >
                        <img
                            src={volunteer.image}
                            alt={volunteer.name}
                            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                            <h3 className="text-2xl font-semibold text-white">{volunteer.name}</h3>
                            <p className="text-sm text-gray-200 mt-1">{volunteer.village}</p>
                            <p className="text-sm text-gray-200 mt-2">{volunteer.skills.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center max-w-2xl mx-auto px-6">
                <p className="text-green-900 text-lg">
                    Our mission is to make a positive impact in the community through dedicated service.
                </p>
            </div>
        </div>
    );
};

export default Volunteers;
