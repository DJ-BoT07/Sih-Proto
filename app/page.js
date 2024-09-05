import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Content from "./component/Content";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex p-4 items-center justify-between bg-secondary shadow-sm bg-[#0a0606]">
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
      <Content />
    </div>
  );
}
