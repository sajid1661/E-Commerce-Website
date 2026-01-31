'use client';

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext<any>(null);

export const AdminContextProvider = (props: React.PropsWithChildren<{}>) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
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