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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              <div className="flex p-4 items-center justify-between bg-secondary shadow-sm bg-[#020202]">
        <Image src={"/favicon.ico"} alt="logo" width={50} height={60} className="filter invert"/>
        
        <ul className="hidden md:flex gap-6 text-white items-center">
          <Link href={"/"} className="hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
            Home
          </Link>
          <Link href={"/dashboard"} className="hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
            Dashboard
          </Link>
          <Link href={"/404"} className="hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-110">
            404
          </Link>
          <Button className="bg-white text-black px-6 font-bold py-5 rounded-md">Login</Button>
        </ul>
      </div>
        {children}
      </body>
    </html>
  );
}
