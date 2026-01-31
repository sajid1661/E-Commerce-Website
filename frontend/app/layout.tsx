'use client';

import './globals.css';
import ShopContextProvider from './context/ShopContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>E-Commerce Website</title>
        <meta name="description" content="Modern e-commerce platform" />
      </head>
      <body>
        <ShopContextProvider>
          {children}
        </ShopContextProvider>
      </body>
    </html>
  );
}