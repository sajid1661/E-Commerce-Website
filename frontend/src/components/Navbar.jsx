import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible,setVisible]=useState(false);
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems,darkMode,toggleDarkMode} = useContext(ShopContext);

  const logout=()=>{
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    
  }
  return (
    <div className="flex items-center justify-between py-5 font-medium transition-colors bg-primary text-primary">
      <Link to='/'> <img src={assets.logo} className="w-36" alt="logoPic" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm">
        <NavLink to="/" className="flex flex-col items-center gap-1 text-tertiary">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden bg-tertiary" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 text-tertiary">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden bg-tertiary" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 text-tertiary">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden bg-tertiary" />
        </NavLink>
        <NavLink to="contact" className="flex flex-col items-center gap-1 text-tertiary">
          <p>CONTANT</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden bg-tertiary" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:opacity-70 transition-opacity bg-secondary"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        <img onClick={()=>setShowSearch(true)} className="w-5 cursor-pointer" src={assets.search_icon} alt="Search_Icon" />
        <div className="group relative">
            <img onClick={()=> token ? null : navigate('/login')}  className="w-5 cursor-pointer" src={assets.profile_icon} alt="Pro_Icon" />
            {
              token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 rounded bg-secondary text-secondary">
                    <p className="cursor-pointer hover:opacity-70">My Profile</p>
                    <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:opacity-70">Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:opacity-70">Logout</p>
                </div>
            </div>
            }
            
        </div>
        <Link to="/cart" className="relative">
        <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" /> 
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 aspect-square rounded-full text-[8px] bg-text-inverted">{getCartCount()}</p>
         </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="Menu-pic" className="w-4 cursor-pointer sm:hidden" /> {/* sm:hidden means hide this element on small screens (640px and wider).  */}
      </div>
      {/* Sidebar menu for small screen */}

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-primary ${visible ? 'w-full' : 'w-0'}`}>
          <div className="flex flex-col text-secondary">
            <div onClick={()=> setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer ">
              <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
              <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border-t-color" to="/">HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border-t-color" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border-t-color" to="/about">ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border-t-color" to="/contact">CONTACT</NavLink>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
