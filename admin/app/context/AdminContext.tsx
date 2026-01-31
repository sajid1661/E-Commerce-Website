'use client';

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext<any>(null);

export const AdminContextProvider = (props: React.PropsWithChildren<{}>) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [token, setToken] = useState('');

  useEffect(() => {
    // Only access localStorage on the client side
    const storedToken = localStorage.getItem('token') || '';
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const value = {
    token,
    setToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;