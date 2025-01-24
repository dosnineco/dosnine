import React, { useEffect } from "react";

const CalendlyEmbed = ({ url }) => {
  useEffect(() => {
    // Dynamically load the Calendly widget script
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    script.async = true; // Ensure the script loads asynchronously
    head.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      head.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{
        height: "900px", // Fixing the height property
        width: "100%",   // Fixing the width property
      }}
    ></div>
  );
};

export default CalendlyEmbed;
