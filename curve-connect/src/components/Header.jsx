"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="
      w-full 
      px-8 py-6
      bg-blue-800 
      fixed top-0 left-0 
    ">
      <div className="flex items-center">
        <Image 
          src="/kpmg-curve-logo-no-background.png" 
          alt="Logo"
          width={50} 
          height={40} 
          className="h-auto w-auto"
        />
      </div>
    </header>
  );
}

