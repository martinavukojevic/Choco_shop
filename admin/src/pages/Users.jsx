import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const debounceTimeoutRef = useRef(null);


  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm]);


  useEffect(() => {

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${backendUrl}/api/user/list?search=${debouncedSearchTerm}`, {
          headers: { token }
        });

        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          toast.error(response.data.message);
          setError(response.data.message);
        }
      } catch (err) {
        toast.error("Error fetching users.");
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, debouncedSearchTerm]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const getUserInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  };


  const handleDeleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const response = await axios.post(
      `${backendUrl}/api/user/delete`,
      { id },
      { headers: { token } }
    );

    if (response.data.success) {
      toast.success("User deleted!");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Failed to delete user.");
  }
};


return (
  <div className="p-6 bg-white min-h-screen text-gray-800">

    <h2 className="text-2xl font-bold mb-6 text-center border-b pb-2">
      User List
    </h2>

 
    <div className="mb-6 flex items-center justify-center">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-md w-full max-w-md focus:outline-none"
      />
      {loading && <p className="ml-4 text-gray-600">Loading...</p>}
    </div>

    {error && (
      <p className="text-red-500 mb-4 text-center">Error: {error}</p>
    )}

    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#d2b48c] text-white">
            <th className="py-3 px-4 border-b"></th>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">E-mail</th>
            <th className="py-3 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-600">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? 'bg-[#f5f5dc]' : 'bg-white'}
              >
                <td className="py-4 px-6 text-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                    {getUserInitials(user.name)}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">{user._id}</td>
                <td className="py-4 px-6 text-center font-semibold">{user.name}</td>
                <td className="py-4 px-6 text-center">{user.email}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default Users;
