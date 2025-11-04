// VolunteerManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const VolunteerManage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [currentVolunteer, setCurrentVolunteer] = useState(null);
    const [form, setForm] = useState({ name: '', village: '', skills: '', image: '' });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('https://cse-fest-backend-rho.vercel.app/api/volunteers');
            setVolunteers(response.data.data);
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            // Update existing volunteer
            try {
                await axios.put(`https://cse-fest-backend-rho.vercel.app/api/volunteers/${currentVolunteer._id}`, form);
                Swal.fire('Success', 'Volunteer updated!', 'success');
            } catch (error) {
                console.error('Error updating volunteer:', error);
            }
        } else {
            // Create new volunteer
            try {
                await axios.post('https://cse-fest-backend-rho.vercel.app/api/volunteers', form);
                Swal.fire('Success', 'Volunteer added!', 'success');
            } catch (error) {
                console.error('Error adding volunteer:', error);
            }
        }
        resetForm();
        fetchVolunteers();
    };

    const handleEdit = (volunteer) => {
        setCurrentVolunteer(volunteer);
        setForm({ name: volunteer.name, village: volunteer.village, skills: volunteer.skills.join(', '), image: volunteer.image });
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://cse-fest-backend-rho.vercel.app/api/volunteers/${id}`);
            Swal.fire('Deleted!', 'Volunteer has been deleted.', 'success');
            fetchVolunteers();
        } catch (error) {
            console.error('Error deleting volunteer:', error);
        }
    };

    const resetForm = () => {
        setForm({ name: '', village: '', skills: '', image: '' });
        setCurrentVolunteer(null);
        setEditing(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Volunteer' : 'Add Volunteer'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="village"
                    placeholder="Village"
                    value={form.village}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={form.skills}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleInputChange}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editing ? 'Update Volunteer' : 'Add Volunteer'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                    Cancel
                </button>
            </form>

            <h2 className="text-xl font-bold mb-4">Volunteer List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteers.map(volunteer => (
                    <div key={volunteer._id} className="border rounded-lg p-4 shadow-md">
                        <img src={volunteer.image} alt={volunteer.name} className="w-full h-48 object-cover rounded mb-2" />
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <p><strong>Village:</strong> {volunteer.village}</p>
                        <p><strong>Skills:</strong> {volunteer.skills.join(', ')}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => handleEdit(volunteer)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                            <button onClick={() => handleDelete(volunteer._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerManage;