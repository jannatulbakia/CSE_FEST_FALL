// src/components/EventManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState({
        title: '',
        type: '',
        date: '',
        time: '',
        location: {
            venue: '',
            area: '',
            upazila: '',
            district: '',
            address: ''
        },
        organizer: {
            name: '',
            contact: '',
            email: ''
        },
        services: [],
        capacity: '',
        rsvpRequired: false,
        cost: '',
        eligibility: '',
        description: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://cse-fest-backend-rho.vercel.app/api/event');
            setEvents(response.data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`https://cse-fest-backend-rho.vercel.app/api/event/${currentId}`, eventData);
                Swal.fire('Updated!', 'Event has been updated.', 'success');
            } else {
                await axios.post('https://cse-fest-backend-rho.vercel.app/api/event', eventData);
                Swal.fire('Created!', 'Event has been created.', 'success');
            }
            resetForm();
            fetchEvents();
        } catch (error) {
            Swal.fire('Error!', 'There was an error processing your request.', 'error');
        }
    };

    const handleEdit = (event) => {
        setEventData(event);
        setEditMode(true);
        setCurrentId(event._id);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://cse-fest-backend-rho.vercel.app/api/event/${id}`);
            Swal.fire('Deleted!', 'Event has been deleted.', 'success');
            fetchEvents();
        } catch (error) {
            Swal.fire('Error!', 'There was an error deleting the event.', 'error');
        }
    };

    const resetForm = () => {
        setEventData({
            title: '',
            type: '',
            date: '',
            time: '',
            location: {
                venue: '',
                area: '',
                upazila: '',
                district: '',
                address: ''
            },
            organizer: {
                name: '',
                contact: '',
                email: ''
            },
            services: [],
            capacity: '',
            rsvpRequired: false,
            cost: '',
            eligibility: '',
            description: ''
        });
        setEditMode(false);
        setCurrentId(null);
        setModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Event Manager</h1>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-green-500 text-white rounded px-4 py-2 mb-4"
            >
                Create Event
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div key={event._id} className="bg-white border rounded-lg shadow p-4">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Type:</strong> {event.type}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleEdit(event)}
                                className="bg-yellow-500 text-white rounded px-2 py-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="bg-red-500 text-white rounded px-2 py-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Event' : 'Create Event'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={eventData.title}
                                onChange={handleChange}
                                placeholder="Event Title"
                                required
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="type"
                                value={eventData.type}
                                onChange={handleChange}
                                placeholder="Event Type"
                                required
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                required
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="time"
                                name="time"
                                value={eventData.time}
                                onChange={handleChange}
                                required
                                className="border p-2 w-full mb-2"
                            />
                            {/* Add more fields as necessary */}
                            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                                {editMode ? 'Update Event' : 'Create Event'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManager;