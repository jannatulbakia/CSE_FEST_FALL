// src/EventCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate(); // Use the useNavigate hook

    return (
        <div
            className="bg-white border rounded-lg shadow-md p-4 m-4 cursor-pointer"
            onClick={() => navigate(`/event/${event.id}`, { state: { event } })} // Use navigate to go to the details page
            key={event.id} // Assign the unique key prop
        >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600"><strong>Venue:</strong> {event.location.venue}</p>
            <p className="text-sm text-gray-600"><strong>Services:</strong> {event.services.join(', ')}</p>
            <p className="text-sm text-gray-600"><strong>Capacity:</strong> {event.capacity}</p>
        </div>
    );
};

export default EventCard;