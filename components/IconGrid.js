// components/IconGrid.js
import React from "react";

const services = [
  { id: 1, icon: "🔧", label: "Plumber" },
  { id: 2, icon: "✂️", label: "Hairdresser" },
  { id: 3, icon: "💇", label: "Barber" },
  { id: 4, icon: "📷", label: "Photographer" },
  { id: 5, icon: "🧹", label: "Cleaner" },
  { id: 6, icon: "🚚", label: "Mover" },
  { id: 7, icon: "🍳", label: "Chef" },
  { id: 8, icon: "🖌️", label: "Painter" },
  { id: 9, icon: "⚡", label: "Electrician" },
  { id: 10, icon: "🏋️", label: "Personal Trainer" },
  { id: 11, icon: "🎨", label: "Graphic Designer" },
  { id: 12, icon: "💻", label: "IT Support" },
  { id: 13, icon: "📦", label: "Courier" },
  { id: 14, icon: "🛠️", label: "Handyman" },
  { id: 15, icon: "🚗", label: "Mechanic" },
  { id: 16, icon: "🌱", label: "Gardener" },
  { id: 17, icon: "🏠", label: "Home Inspector" },
  { id: 18, icon: "🩺", label: "Health Consultant" },
  { id: 19, icon: "🎶", label: "Music Teacher" },
  { id: 20, icon: "📚", label: "Tutor" },
  { id: 21, icon: "🐕", label: "Pet Groomer" },
  { id: 22, icon: "🚿", label: "Car Washer" },
  { id: 23, icon: "🎥", label: "Videographer" },
  { id: 24, icon: "🛏️", label: "Interior Designer" },
  { id: 25, icon: "🛒", label: "Personal Shopper" },
  { id: 26, icon: "🕹️", label: "Tech Setup" },
  { id: 27, icon: "📞", label: "Call Center Agent" },
  { id: 28, icon: "🎂", label: "Event Planner" },
  { id: 29, icon: "🧵", label: "Tailor" },
  { id: 30, icon: "💼", label: "Consultant" },
  { id: 31, icon: "🧑‍⚕️", label: "Caregiver" },
  { id: 32, icon: "📋", label: "Administrative Assistant" },
];

const IconGrid = () => {
  return (
    <div className="bg-gray-50 p-2 mt-4 mb-4 min-h-screen flex flex-col items-center justify-center">
              {/* <p className="text-3xl font-bold text-gray-900" >  For these service-based businesses</p> */}

      <div className="flex sm:flex-row  sm:pr-20  sm:pl-20 flex-wrap gap-1 p-2 bg-white  rounded-lg">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-center items-center flex-col items-center p-2 bg-gray-100 rounded-md hover:shadow-lg hover:bg-gray-200 transition"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <div className="text-sm font-small text-gray-700">{service.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconGrid;
