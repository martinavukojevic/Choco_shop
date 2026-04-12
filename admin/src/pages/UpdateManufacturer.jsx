import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const UpdateManufacturer = ({ token }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [manufacturer, setManufacturer] = useState(null);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [yearFounded, setYearFounded] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(false);
  const [existingLogo, setExistingLogo] = useState('');

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/manufacturer/single`, { manufacturerId: id });
        if (res.data.success) setManufacturer(res.data.manufacturer);
        else toast.error(res.data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchManufacturer();
  }, [id]);

  useEffect(() => {
    if (manufacturer) {
      setName(manufacturer.name || '');
      setCountry(manufacturer.country || '');
      setYearFounded(manufacturer.yearFounded || '');
      setDescription(manufacturer.description || '');
      setExistingLogo(manufacturer.logoUrl || '');
      setLogo(false);
    }
  }, [manufacturer]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('manufacturerId', id);
      formData.append('name', name);
      formData.append('country', country);
      formData.append('yearFounded', yearFounded);
      formData.append('description', description);
      if (logo) formData.append('logo', logo);
      formData.append('existingLogo', existingLogo);

      const res = await axios.post(`${backendUrl}/api/manufacturer/update/${id}`, formData, {
        headers: { token, "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        toast.success('Manufacturer updated successfully!');
        navigate('/manufacturer/list'); 
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!manufacturer) return <p>Loading...</p>;

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md w-full max-w-lg">

      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-xl">Upload Logo</h2>
        <div className="flex gap-3">
          <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-[#bfa980] transition">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={logo ? URL.createObjectURL(logo) : existingLogo || assets.upload_area}
              alt="Logo"
            />
            <input type="file" hidden onChange={e => setLogo(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Manufacturer Name</label>
        <input
          type="text"
          placeholder="Enter manufacturer name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border p-2 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-medium">Country</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-medium">Year Founded</label>
          <input
            type="number"
            placeholder="Enter founding year"
            value={yearFounded}
            onChange={e => setYearFounded(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Description</label>
        <textarea
          placeholder="Enter short description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded-md resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-[#bfa980] hover:bg-[#a68b6f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-4"
      >
        Update Manufacturer
      </button>

    </form>
  );
};

export default UpdateManufacturer;
