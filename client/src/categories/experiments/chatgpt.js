import React, { useState } from "react";

const MyComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Option 1");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative">
        <div
          onClick={toggleOptions}
          className="cursor-pointer rounded-md bg-blue-500 p-4 text-white"
        >
          {selectedOption}
        </div>

        {showOptions && (
          <div className="absolute left-1/2 top-[120%] -translate-x-1/2 rounded-md bg-gray-100 p-4 shadow-lg">
            <ul className="space-y-2">
              <li
                onClick={() => handleOptionClick("Option 1")}
                className="cursor-pointer rounded-md p-2 hover:bg-blue-200"
              >
                Option 1
              </li>
              <li
                onClick={() => handleOptionClick("Option 2")}
                className="cursor-pointer rounded-md p-2 hover:bg-blue-200"
              >
                Option 2
              </li>
              <li
                onClick={() => handleOptionClick("Option 3")}
                className="cursor-pointer rounded-md p-2 hover:bg-blue-200"
              >
                Option 3
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComponent;
