import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Example if using Inter
// import { GeistSans } from 'geist/font/sans'; // Likely unused, causing error
// import { GeistMono } from 'geist/font/mono'; // Likely unused, causing error
import './globals.css'; // Your global styles

// const inter = Inter({ subsets: ['latin'] }); // Example

export const metadata: Metadata = {
  title: '🎭 The Digital Liberation Exhibit',
  description: 'A story of control vs. creativity, of walls vs. bridges.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
        If using GeistSans: <body className={GeistSans.className}> 
        If using Inter: <body className={inter.className}>
        Otherwise, just <body> is fine if fonts are handled entirely by globals.css
      */}
      <body> 
        {children}
      </body>
    </html>
  );
}