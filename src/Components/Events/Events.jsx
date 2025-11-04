// src/Events.js
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
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Events</h1>
            <div className="flex justify-center mb-4">
                <select 
                    className="border rounded p-2" 
                    onChange={(e) => setSelectedUpazila(e.target.value)} 
                    value={selectedUpazila}>
                    <option value="">All Upazilas</option>
                    {upazilas.map((upazila, index) => (
                        <option key={index} value={upazila}>{upazila}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;