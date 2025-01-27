"use client";

import Image from "next/image";

export default function HeroVariations() {
  const backgroundImage = "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

  const heroes = [
    // Variation 1: Fullscreen Hero with Modern Gradient Overlay
    <section key="1" className="relative w-full h-screen">
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
    </section>,

    // Variation 2: Hero with Split Content Layout
    <section key="2" className="relative w-full h-[600px] grid grid-cols-2 items-center">
      <div className="relative h-full">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover opacity-50"
        />
      </div>
      <div className="flex flex-col justify-center px-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Unleash Your Inner Explorer
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Step into the adventure of a lifetime with stunning scenery and unique experiences.
        </p>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          Learn More
        </button>
      </div>
    </section>,

    // Variation 3: Minimalist Centered Hero with Subtle Overlay
    <section key="3" className="relative w-full h-[500px] flex items-center justify-center bg-black bg-opacity-50">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to Adventure
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Every journey begins with a single step.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </section>,

    // Variation 4: Hero with Centered Cards
    <section key="4" className="relative w-full h-[600px] flex flex-col justify-center items-center bg-gradient-to-t from-gray-900 via-transparent to-gray-900">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-white mb-10">
          Discover New Experiences
        </h1>
        <div className="flex gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[250px]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mountains</h3>
            <p className="text-gray-600">Breathtaking views await you.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-[250px]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Beaches</h3>
            <p className="text-gray-600">Relax by the pristine waters.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-[250px]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Deserts</h3>
            <p className="text-gray-600">Feel the magic of the sands.</p>
          </div>
        </div>
      </div>
    </section>,

    // Variation 5: Hero with Modern Video Background
    <section key="5" className="relative w-full h-[500px]">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/sample-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Your Next Adventure Awaits
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Explore the world, one destination at a time.
        </p>
        <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600">
          Explore Now
        </button>
      </div>
    </section>,
  ];

  return <div>{heroes}</div>;
}
