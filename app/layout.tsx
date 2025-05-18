import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'The Digital Liberation Exhibit', // You can set a default title here
  description: 'A story of control vs. creativity, of walls vs. bridges.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* If using a Next/font, the className might be on the body: <body className={inter.className}> */}
      <body> 
        {children}
      </body>
    </html>
  )
}
