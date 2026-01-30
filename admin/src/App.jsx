import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('adminDarkMode') === 'true'
  );

  useEffect(()=>{
     localStorage.setItem ('token',token);
  },[token])

  useEffect(() => {
    localStorage.setItem('adminDarkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <ToastContainer />
      {token === "" ?
        <Login setToken={setToken} />
      :
        <div>
          <Navbar setToken={setToken} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          
          <hr className="dark:border-gray-700" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 dark:text-gray-300 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default App;
