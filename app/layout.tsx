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
        <nav>
      
         <a href="/">Main</a>
          <a href="/articles">Articles</a>
          <div className="menu2">
          {localStorage.getItem("userId") ? (
            <div>
              <div className="user_info">
                {localStorage.getItem("username")}
              </div>
            <button className="btn info" onClick={() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          window.location.reload();
            }}>Logout</button>
          </div>) : (
            <>
          <button className="btn info" onClick={() => window.location.href = "/logIn"}>Log In</button>
          <button className="btn info" onClick={() => window.location.href = "/signUp"}>Sign Up</button>
            </>
          )}
        </div></nav>
          </div>
        </header>
        <div className="main">
               {children}
        </div>
       
      </body>
    </html>
  );
}
