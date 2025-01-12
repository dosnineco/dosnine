import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const CallOrText = () => {
  return (
    <section className="items-center justify-center py-10 px-6 sm:px-8 lg:px-12 text-center">
           <div className="flex flex-col items-center  text-white ">
        <div className="flex items-center justify-center text-white text-4xl font-bold">
          {/* <FaPhoneAlt className=" animate-ping	" /> */}
          <a className="text-6xl	text-white text-base	" href="tel:18763369045">(1876) 336-9045</a>
        </div>
      </div>
      <h2 className="text-base font-bold text-white ">
        Call or Text Us Today!
      </h2>
 

    </section>
  );
};

export default CallOrText;
