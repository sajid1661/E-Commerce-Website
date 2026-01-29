import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}