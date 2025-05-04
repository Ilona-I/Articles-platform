'use client';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header><div className="navbar">
        
         <a href="/">Main</a>
          <a href="/articles">Articles</a>
          {localStorage.getItem("userId") ? (
            <button onClick={() => {
          localStorage.removeItem("userId");
          window.location.reload();
            }}>Logout</button>
          ) : (
            <>
          <button onClick={() => window.location.href = "/logIn"}>Log In</button>
          <button onClick={() => window.location.href = "/signUp"}>Sign Up</button>
            </>
          )}
        
          </div>
        </header>
        <div className="main">
               {children}
        </div>
       
      </body>
    </html>
  );
}
