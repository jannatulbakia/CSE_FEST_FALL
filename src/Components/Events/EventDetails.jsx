// src/EventDetails.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state?.event; // Use optional chaining

    // If event is not found, redirect to the events page
    if (!event) {
        navigate('/'); // Redirect to the events page
        return null; // Return null or a loading message
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
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
            <p><strong>Description:</strong> {event.description}</p>
        </div>
    );
};

export default EventDetails;