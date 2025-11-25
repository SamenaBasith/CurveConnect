"use client";

export default function CardFilter({ options = [], selected, onChange }) {
  return (
    <div className="flex gap-2 mb-10">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-6 py-2 rounded-lg font-medium ${
            selected === option
              ? "bg-blue-600 text-white"
              : "bg-blue-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

