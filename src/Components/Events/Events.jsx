import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../EventCard/EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/event');
                setEvents(response.data.data);
                setFilteredEvents(response.data.data);
                const upazilasSet = new Set(response.data.data.map(event => event.location.upazila));
                setUpazilas(Array.from(upazilasSet));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchData();
    }, []);

    const filterEvents = () => {
        const filtered = selectedUpazila
            ? events.filter(event => event.location.upazila === selectedUpazila)
            : events;

        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFilteredEvents(filtered);
    };

    useEffect(() => {
        filterEvents();
    }, [selectedUpazila, events]);

    return (
        <div className="p-6 bg-gradient-to-b from-green-50 to-emerald-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-900 mb-6">
                🔹 Events
            </h1>

            {/* Filter UI */}
            <div className="flex justify-center mb-6">
                <select
                    className="border-2 border-green-400 rounded-lg p-2 px-4 text-green-900 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    value={selectedUpazila}
                >
                    <option value="">All Upazilas</option>
                    {upazilas.map((upazila, index) => (
                        <option key={index} value={upazila}>{upazila}</option>
                    ))}
                </select>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                    <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
