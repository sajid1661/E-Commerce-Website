'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminContext } from './context/AdminContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function Home() {
  const { token } = useContext(AdminContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/add'); // or default page
    }
  }, [token, router]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === '' ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <p>Welcome to Admin Panel</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}