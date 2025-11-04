import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state?.event;

    if (!event) {
        navigate('/');
        return null;
    }

    return (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen flex justify-center">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 space-y-4 border-l-8 border-green-400">
                <h1 className="text-3xl font-bold text-green-900">{event.title}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Venue:</strong> {event.location.venue}</p>
                    <p><strong>Upazila:</strong> {event.location.upazila}</p>
                    <p><strong>District:</strong> {event.location.district}</p>
                    <p><strong>Organizer:</strong> {event.organizer.name}</p>
                    <p><strong>Contact:</strong> {event.organizer.contact}</p>
                    <p><strong>Email:</strong> {event.organizer.email}</p>
                    <p><strong>Services:</strong> {event.services.join(', ')}</p>
                    <p><strong>Capacity:</strong> {event.capacity}</p>
                    <p><strong>Registered:</strong> {event.registered}</p>
                    <p><strong>Status:</strong> {event.status}</p>
                    <p><strong>Cost:</strong> {event.cost}</p>
                    <p><strong>Eligibility:</strong> {event.eligibility}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-green-800 mb-2">Description</h2>
                    <p className="text-gray-700">{event.description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
