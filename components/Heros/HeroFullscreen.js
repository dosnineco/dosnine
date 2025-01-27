"use client";

import Image from "next/image";

// Hero 1: Fullscreen Hero with Modern Gradient Overlay
export default function  HeroFullscreen() {
  const backgroundImage = "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";
  return (
    <section className="relative w-full h-screen">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black">
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl font-extrabold text-white mb-4">
            EXPLORE NEW HORIZONS
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Discover breathtaking destinations around the globe.
          </p>
          <button className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-600">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}