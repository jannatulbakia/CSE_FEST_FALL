// Volunteers.js
import React, { useEffect, useState } from 'react';

const Volunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/volunteers');
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

    if (loading) return <p className="text-center">Loading volunteers...</p>;
    if (error) return <p className="text-red-500 text-center">Error fetching volunteers: {error}</p>;

    return (
        <div className='expert'>
            <div className="py-20 px-6 flex flex-col items-center">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-extrabold text-white">Meet Our Amazing Volunteers</h2>
                    <p className="mt-4 text-black text-lg max-w-2xl mx-auto leading-relaxed">
                        Dedicated individuals committed to making a difference in our community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl">
                    {volunteers.map(volunteer => (
                        <div key={volunteer._id} className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                            <img
                                src={volunteer.image}
                                alt={volunteer.name}
                                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 transition-all duration-500"></div>
                            <div className="absolute bottom-0 p-6 text-white">
                                <h3 className="text-2xl font-semibold">{volunteer.name}</h3>
                                <p className="text-sm text-gray-200 mb-2">{volunteer.village}</p>
                                <p className="text-sm opacity-90">
                                    {volunteer.skills.join(', ')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 text-center max-w-2xl">
                    <p className="text-black text-lg">
                        Our mission is to make a positive impact in the community through dedicated service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Volunteers;