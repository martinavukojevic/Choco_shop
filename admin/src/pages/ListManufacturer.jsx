import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const ListManufacturer = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/manufacturer/list`, { headers: { token } });
      if (response.data.success) {
        setList(response.data.manufacturers);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeManufacturer = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/manufacturer/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h2 className="font-serif text-xl mb-2">All Manufacturers List</h2>
      {list.length > 0 ? (
        list.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-20 h-20 flex-shrink-0">
              <img className="w-full h-full object-contain rounded-lg border" src={item.logoUrl || assets.upload_area} alt="logo" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600">{item.country || '-'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/manufacturer/update/${item._id}`)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => removeManufacturer(item._id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No manufacturers available.</p>
      )}
    </div>
  );
};

export default ListManufacturer;
