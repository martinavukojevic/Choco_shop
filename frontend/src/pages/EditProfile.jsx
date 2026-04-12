import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const EditProfile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/about-user`, {
          headers: { token }
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [backendUrl, token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${backendUrl}/api/user/update`, user, {
        headers: { token }
      });
      if (response.data.success) {
        alert('Profile updated!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <img src={assets.profile_icon} alt="Profile" className="w-24 h-24 mb-4" />

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-cocoa text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
