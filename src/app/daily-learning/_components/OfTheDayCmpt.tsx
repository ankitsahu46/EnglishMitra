import React from "react";
import WordExampleImg from "./WordExampleImg";
import VolumeBtn from "./VolumeBtn";
import OfTheDayBar from "./OfTheDayBar";
import FavWordBtn from "./FavWordBtn";
import {
  OfTheDayComponentProps,
  EntryOfTheDayData,
  WordOfTheDayData,
  EntryType,
} from "@/types";
import { getEntryContent, getWordContent } from "@/utils";

// const exampleImage = "https://res.cloudinary.com/dlpzgtx35/image/upload/v1721513769/expr1si1gj17njodqy2k.jpg";
const capitalize = (text: string | undefined) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

const OfTheDayComponent = ({ data, type }: OfTheDayComponentProps) => {
  const exampleImage = type === "word" ? "/pic1.jpg" : "/pic2.jpg";
  const content =
    type === "word"
      ? getWordContent(data as WordOfTheDayData)
      : getEntryContent(data as EntryOfTheDayData, type as EntryType);
  const senseLabel = "senseLabel" in content ? content.senseLabel : null;

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16">
        <OfTheDayBar type={type} />
        <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-md:w-full">
          {exampleImage && <WordExampleImg imgSrc={exampleImage} />}
          <div
            className={`col-span-3 lg:bg-white lg:border lg:border-gray-900/10 lg:border-l-transparent lg:shadow-lg lg:rounded-r-lg max-md:w-full py-6 ${
              !exampleImage && "rounded-lg"
            }`}
          >
            <div className="flex justify-between items-center w-full px-5">
              <div className="flex flex-col items-start">
                <p className="text-3xl font-semibold text-gray-900/80">
                  {capitalize(content.text)}
                </p>
                <span className="block text-teal-green-600/90 italic text-sm">
                  {content.partOfSpeech}
                </span>

                <span className="block text-teal-green-600/90 italic text-sm">
                  {senseLabel && (
                    <span>
                      {senseLabel.map((sense, idx) => (
                        <span key={idx}>
                          {sense}
                          {idx < senseLabel.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex">
                <VolumeBtn audioUrl={content.audio} />
                <FavWordBtn />
              </div>
            </div>
            <div className="mt-1 pt-2 px-5">
              <div className="pt-2 border-t border-gray-300" />
              <p className="text-lg font-medium drop-shadow-xs text-gray-800/80 max-h-[50px] overflow-y-scroll">
                {content.definition}
              </p>
              <p className="mt-3  text-gray-800/90 italic pb-1">
                {content.example}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfTheDayComponent;
