import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
    const location=useLocation();
    const [visible,setVisible]=useState(false);
    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location])
  return showSearch && visible ? (
    <div className="text-center border-t-color border-b-color bg-secondary">
      <div className="inline-flex items-center justify-center px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 border-color-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm text-primary"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="Search-icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Cross-Icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
