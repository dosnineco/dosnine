import { useState, useEffect } from "react";

const SalePopup = () => {
  const prices = [
    { price: "$49.50", duration: "quarterly" },
    { price: "$98", duration: "6 months" },
    { price: "$178", duration: "yearly" },
    { price: "$356", duration: "2 years" },
  ];

  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const [secondsAgo, setSecondsAgo] = useState(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setCurrentPriceIndex((prevIndex) => (prevIndex + 1) % prices.length);
    }, 5000); // Change price every 5 seconds

    const secondsInterval = setInterval(() => {
      setSecondsAgo((prevSeconds) => prevSeconds + 122);
    }, 5000); // Increment seconds every 5 seconds

    return () => {
      clearInterval(priceInterval);
      clearInterval(secondsInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 right-5 bg-orange-100 shadow-lg rounded-lg p-2 flex items-center space-x-2 h-12">
      <div className="text-sm flex-1 truncate">
        <h2 className="font-bold text-gray-800 truncate">
          New sale of Dosnine Template Website
        </h2>
        <p className="text-gray-600 truncate">
          For Service Businesses for <span className="font-semibold text-blue-600">{prices[currentPriceIndex].price}</span>
        </p>
        <p className="text-xs text-gray-500 truncate">{prices[currentPriceIndex].duration}</p>
        <p className="text-gray-500 text-xs truncate">{secondsAgo} sec ago</p>
      </div>
      <button
        className="text-gray-500 hover:text-gray-800 text-sm focus:outline-none"
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button>
    </div>
  );
};

export default SalePopup;
