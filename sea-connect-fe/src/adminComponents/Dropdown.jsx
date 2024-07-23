import { useState } from "react";

const Dropdown = ({ value, label, setValue, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    setValue(option);
    setShowOptions(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <label htmlFor="select" className="font-semibold block py-2">
        {label}
      </label>

      <div className="relative">
        <div className="h-10 bg-white flex border border-gray-200 rounded items-center">
          <input
            value={value.toUpperCase()}
            name="select"
            id="select"
            className="px-4 appearance-none outline-none text-gray-800 w-full"
            readOnly
            onClick={() => setShowOptions(!showOptions)}
          />
        </div>

        {showOptions && (
          <div className="absolute z-30 rounded shadow bg-white overflow-hidden flex flex-col w-full mt-1 border border-gray-200">
            {options.map((option, index) => (
              <div key={index} className="cursor-pointer group">
                <button
                  className={`block p-2 border-transparent w-full text-left border-l-4 ${
                    value === option
                      ? "border-blue-600 bg-gray-100"
                      : "group-hover:border-blue-600 group-hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
