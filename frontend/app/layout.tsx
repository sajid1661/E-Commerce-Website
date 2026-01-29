'use client';

import type { Metadata } from 'next';
import './globals.css';
import ShopContextProvider from './context/ShopContext';

export const metadata: Metadata = {
  title: 'E-Commerce Website',
  description: 'Modern e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ShopContextProvider>
          {children}
        </ShopContextProvider>
      </body>
    </html>
  );
}