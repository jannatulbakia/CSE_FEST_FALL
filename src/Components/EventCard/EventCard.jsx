import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    // Check if event is full
    const isFull = event.registered >= event.capacity;

    return (
        <div
            onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
            className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border-l-4 ${
                isFull ? 'border-red-500' : 'border-green-400'
            }`}
        >
            {/* Event Info */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-green-900 truncate">{event.title}</h3>
                <p className="text-sm text-gray-600">
                    <strong>Venue:</strong> {event.location.venue}, {event.location.upazila}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Services:</strong> {event.services.join(', ')}
                </p>
                <p className="text-sm font-medium text-green-700">
                    <strong>Capacity:</strong> {event.capacity} | <strong>Registered:</strong> {event.registered}
                </p>

                {/* Status badge */}
                <div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {isFull ? 'Full' : 'Available'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
