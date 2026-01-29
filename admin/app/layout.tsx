'use client';

import { AdminContextProvider } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminContextProvider>
          {children}
          <ToastContainer />
        </AdminContextProvider>
      </body>
    </html>
  );
}