import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const AddManufacturer = ({ token }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [yearFounded, setYearFounded] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('country', country);
      formData.append('yearFounded', yearFounded);
      formData.append('description', description);
      if (logo) formData.append('logo', logo);

      const response = await axios.post(
        `${backendUrl}/api/manufacturer/add`,
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success('Manufacturer added successfully!');
        setName(''); setCountry(''); setYearFounded(''); setDescription(''); setLogo(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">

      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-xl">Upload Logo</h2>
        <div className="flex gap-3">
          <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-[#bfa980] transition">
            {logo ? <img className="w-full h-full object-cover rounded-lg" src={URL.createObjectURL(logo)} alt="Upload" /> : "+"}
            <input type="file" hidden onChange={e => setLogo(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Manufacturer Name</label>
        <input type='text' placeholder='Enter manufacturer name' value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Country</label>
        <input type='text' placeholder='Enter country' value={country} onChange={e => setCountry(e.target.value)} className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Year Founded</label>
        <input type='number' placeholder='Enter founding year' value={yearFounded} onChange={e => setYearFounded(e.target.value)} className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Description</label>
        <textarea placeholder='Enter short description' value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded-md resize-none" />
      </div>

      <button type='submit' className="bg-[#bfa980] hover:bg-[#a68b6f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-4">Add Manufacturer</button>
    </form>
  );
};

export default AddManufacturer;
