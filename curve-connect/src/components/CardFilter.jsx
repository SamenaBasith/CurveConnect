"use client";

export default function CardFilter({ options = [], selected, onChange }) {
  return (
    <div className="mb-4 w-full flex flex-col items-center">
      {/* Buttons for medium screens and up */}
      <div className="hidden sm:flex flex-wrap gap-2 justify-center w-full">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-lg font-medium text-center
              ${selected === option ? "bg-blue-600 text-white" : "bg-blue-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Dropdown for mobile */}
      <div className="sm:hidden w-full">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 text-blue-800"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
      </div>
    </div>
  );
}



