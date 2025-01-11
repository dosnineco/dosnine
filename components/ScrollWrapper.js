import React, { useRef } from 'react';

export default function ScrollWrapper({ children }) {
  const containerRef = useRef(null);

  const handleScrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child, { handleScrollToSection, index })
      )}
    </div>
  );
}
