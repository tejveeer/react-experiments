import React, { useState, useEffect, useRef } from "react";

const Experiment = () => {
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative h-64 overflow-y-scroll" ref={scrollRef}>
      <div className="p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Content {i + 1}</p>
        ))}
      </div>
      <div className={`fixed bottom-0 left-0 w-full text-center bg-gray-800 text-white p-2 ${isBottom ? 'hidden' : ''}`}>
        Scroll for more
      </div>
    </div>
  );
};

export default Experiment;
