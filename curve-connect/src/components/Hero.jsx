"use client";
import Image from "next/image";
import "../../public/curve_connect_logo.png";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="
      bg-gradient-to-r from-[#02a4d3] to-[#4c00b0]
      py-15 
      text-center
    ">
      <Image
        src="/curve_connect_logo.png"
        alt="Curve Connect Logo"
        width={300}
        height={200}
        className="mx-auto mt-15"
      />

      <p className="mt-3 text-lg md:text-xl text-white/90 italic" >
        Share, Connect & Celebrate
      </p>
       <div className="mt-10">
      <Button href="/send-card">
        Send a Card
      </Button>
    </div>
    </section>
  );
}