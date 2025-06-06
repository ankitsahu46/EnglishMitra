import React from "react";

const OfTheDayBar = ({ type }: { type: string }) => {
  const text = type === "word" ? "Word of the day" : type === "phrasalVerb" ? "Phrase of the day" : "Idiom of the day";
  
  return (
    <div className="w-full flex justify-start">
      <div className="bg-white px-3 py-1 rounded-full w-fit border border-gray-900/10 shadow-xs">
        <p className="font-bold text-teal-green-400 px-0.5 select-none">{text}</p>
      </div>
    </div>
  );
};

export default OfTheDayBar;
