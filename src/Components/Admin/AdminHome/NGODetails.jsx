import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

const NGODetails = () => {
  const [ngos, setNgos] = useState([
    {
      id: 1,
      name: 'সেবা ফাউন্ডেশন',
      registrationNumber: 'NGO-2023-001',
      address: 'ঢাকা, বাংলাদেশ',
      phone: '01712345678',
      email: 'info@seba.org',
      mission: 'শিক্ষা ও স্বাস্থ্যসেবা প্রদান',
      establishedYear: 2020,
      members: 150,
    },
    {
      id: 2,
      name: 'আশা সমিতি',
      registrationNumber: 'NGO-2022-045',
      address: 'চট্টগ্রাম, বাংলাদেশ',
      phone: '01898765432',
      email: 'contact@asha.org',
      mission: 'গ্রামীণ উন্নয়ন কর্মসূচি',
      establishedYear: 2019,
      members: 200,
    },
    {
      id: 3,
      name: 'পরিবেশ রক্ষা সংস্থা',
      registrationNumber: 'NGO-2021-078',
      address: 'সিলেট, বাংলাদেশ',
      phone: '01756789012',
      email: 'eco@nature.org',
      mission: 'পরিবেশ সংরক্ষণ ও বৃক্ষরোপণ',
      establishedYear: 2018,
      members: 280,
    },
    {
      id: 4,
      name: 'মহিলা ক্ষমতায়ন কেন্দ্র',
      registrationNumber: 'NGO-2020-112',
      address: 'খুলনা, বাংলাদেশ',
      phone: '01834567890',
      email: 'women@empowerment.org',
      mission: 'নারী শিক্ষা ও দক্ষতা উন্নয়ন',
      establishedYear: 2017,
      members: 320,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    address: '',
    phone: '',
    email: '',
    mission: '',
    establishedYear: '',
    members: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (editingId) {
      setNgos(ngos.map(ngo => ngo.id === editingId ? { ...formData, id: editingId } : ngo));
      setEditingId(null);
    } else {
      setNgos([...ngos, { ...formData, id: Date.now() }]);
    }
    setFormData({
      name: '',
      registrationNumber: '',
      address: '',
      phone: '',
      email: '',
      mission: '',
      establishedYear: '',
      members: '',
    });
    setShowForm(false);
  };

  const handleEdit = (ngo) => {
    setFormData(ngo);
    setEditingId(ngo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNgos(ngos.filter(ngo => ngo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">এনজিও বিবরণ</h1>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', registrationNumber: '', address: '', phone: '', email: '', mission: '', establishedYear: '', members: '' }); }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} /> নতুন যোগ করুন
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingId ? 'এনজিও সম্পাদনা করুন' : 'নতুন এনজিও যোগ করুন'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="এনজিও নাম"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="registrationNumber"
                placeholder="নিবন্ধন নম্বর"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="address"
                placeholder="ঠিকানা"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="ফোন নম্বর"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="ইমেইল"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                name="mission"
                placeholder="মিশন"
                value={formData.mission}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="number"
                name="establishedYear"
                placeholder="প্রতিষ্ঠার বছর"
                value={formData.establishedYear}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="number"
                name="members"
                placeholder="সদস্য সংখ্যা"
                value={formData.members}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                {editingId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                বাতিল করুন
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {ngos.map(ngo => (
            <div key={ngo.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{ngo.name}</h3>
                  <p className="text-sm text-gray-500">নিবন্ধন: {ngo.registrationNumber}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(ngo)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(ngo.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">ঠিকানা</p>
                  <p className="text-gray-800">{ngo.address}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">ফোন</p>
                  <p className="text-gray-800">{ngo.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">ইমেইল</p>
                  <p className="text-gray-800">{ngo.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">প্রতিষ্ঠা বছর</p>
                  <p className="text-gray-800">{ngo.establishedYear}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 font-semibold">মিশন</p>
                  <p className="text-gray-800">{ngo.mission}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">সদস্য</p>
                  <p className="text-gray-800">{ngo.members}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NGODetails;