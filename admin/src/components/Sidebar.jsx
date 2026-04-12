import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white border-r-2 px-4 py-6 hidden md:flex flex-col gap-4">
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.add_icon} alt="add" />
        </div>
        <span className="hidden md:block font-medium">Add Items</span>
      </NavLink>

      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.order_icon} alt="list" />
        </div>
        <span className="hidden md:block font-medium">List Items</span>
      </NavLink>

      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.order_icon} alt="orders" />
        </div>
        <span className="hidden md:block font-medium">Orders</span>
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.profile_icon} alt="users" />
        </div>
        <span className="hidden md:block font-medium">Users</span>
      </NavLink>

      <NavLink
        to="/manufacturer/add"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.add_icon} alt="add" />
        </div>
        <span className="hidden md:block font-medium">Add Manufacturer</span>
      </NavLink>

      <NavLink
        to="/manufacturer/list"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-[#bfa980]/20 text-[#4b3a2f]' : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#bfa980]/50 transition-all duration-200">
          <img className="w-4 h-4" src={assets.order_icon} alt="list" />
        </div>
        <span className="hidden md:block font-medium">List Manufacturer</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
