import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-2">
          <Image
            src="/kpmg-curve-logo-no-background.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <p className="text-sm text-white/80 italic">
          &copy; © 2025 KPMG LLP, a UK limited liability partnership and a
          member firm of the KPMG global organisation of independent member
          firms affiliated with KPMG International Limited, a private English
          company limited by guarantee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

