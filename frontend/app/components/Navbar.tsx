'use client';

import React, { useContext, useState } from 'react';
import { assets } from '../../src/assets/assets'; // Adjust path
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShopContext } from '../../src/context/ShopContext'; // Adjust path

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
  const router = useRouter();

  const logout = () => {
    router.push('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link href="/">
        <img src={assets.logo} className="w-36" alt="logoPic" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <Link href="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search_Icon"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : router.push('/login'))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Pro_Icon"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => router.push('/orders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link href="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu-pic"
          className="w-4 cursor-pointer sm:hidden"
        />
      </div>
      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <Link href="/" onClick={() => setVisible(false)} className="py-2 pl-6 border">
            HOME
          </Link>
          <Link href="/collection" onClick={() => setVisible(false)} className="py-2 pl-6 border">
            COLLECTION
          </Link>
          <Link href="/about" onClick={() => setVisible(false)} className="py-2 pl-6 border">
            ABOUT
          </Link>
          <Link href="/contact" onClick={() => setVisible(false)} className="py-2 pl-6 border">
            CONTACT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;