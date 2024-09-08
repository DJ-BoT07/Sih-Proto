"use client";
import { useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-[#030303] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Image src={"/favicon.ico"} alt="logo" width={40} height={48} className="filter invert"/>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href={"/"} className="text-white hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
                    Home
                  </Link>
                  <Link href={"/dashboard"} className="text-white hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
                    Dashboard
                  </Link>
                  <Link href={"/404"} className="text-white hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
                    404
                  </Link>
                  <Button className="bg-white text-black px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold rounded-md">Login</Button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href={"/"} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:font-bold transition-all">
                  Home
                </Link>
                <Link href={"/dashboard"} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:font-bold transition-all">
                  Dashboard
                </Link>
                <Link href={"/404"} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:font-bold transition-all">
                  404
                </Link>
                <Button className="bg-white text-black px-3 py-2 mt-2 w-full text-base font-bold rounded-md">Login</Button>
              </div>
            </div>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
