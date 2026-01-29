'use client';

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Navbar: React.FC = () => {
  const { setToken } = useContext(AdminContext) || {};

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
      <button
        onClick={() => setToken?.('')}
        className='bg-gray-600 hover:bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;