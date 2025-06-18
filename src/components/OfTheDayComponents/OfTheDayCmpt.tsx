// import React from "react";
// // import EntryImage from "./EntryImage";
// import EntryTypeBadgeBar from "./EntryTypeBadgeBar";
// // import FavWordBtn from "./FavWordBtn";
// // import VolumeBtn from "./VolumeBtn";
// import { capitalizeFirstLetter, formatApiTextToHtml, getEntryContent, getWordContent } from "@/utils";
// import {
//   OfTheDayComponentProps,
//   EntryOfTheDayData,
//   WordOfTheDayData,
//   EntryType,
// } from "@/types";


// // Example utility function (server-side)
// export async function getExampleImageUrl(text: string): Promise<string | null> {
//   const url = `${text}`;
//   const res = await fetch(url);

//   if (!res.ok) return null;
//   const data = await res.json();
//   // Get the first image's regular URL
//   return data || null;
// }

// // const getExampleImageUrl = (word: string) =>
// //   `https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;

// const OfTheDayComponent = async ({ data, type }: OfTheDayComponentProps) => {
//   const content =
//     type === "word"
//       ? getWordContent(data as WordOfTheDayData)
//       : getEntryContent(data as EntryOfTheDayData, type as EntryType);

//   const senseLabel = "senseLabel" in content ? content.senseLabel : null;
//   const entryImage = null;
//   // const entryImage = await getExampleImageUrl("letting go") || null;  // const entryImage = await getUnsplashImageUrl("interrupting someone" || content.example || "english");
 
//   return (
//     <>
//       <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16">
//         <EntryTypeBadgeBar type={type} />
//         <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-md:w-full">
//           {/* {entryImage && <EntryImage imgSrc={entryImage} />} */}
//           <div
//             className={`col-span-3 lg:bg-white lg:border lg:border-gray-900/10 lg:border-l-transparent lg:shadow-lg lg:rounded-r-lg max-md:w-full py-6 ${
//               !entryImage && "rounded-lg"
//             }`}
//           >
//             <div className="flex justify-between items-center w-full px-5">
//               <div className="flex flex-col items-start">
//                 <p className="text-3xl font-semibold text-gray-900/80">
//                   {capitalizeFirstLetter(content.text)}
//                 </p>
//                 <span className="block text-teal-green-600/90 italic text-sm">
//                   {content.partOfSpeech}
//                 </span>

//                 {/* sense label */}
//                 <span className="block text-teal-green-600/90 italic text-sm">
//                   {senseLabel && (
//                     <span>
//                       {senseLabel.map((sense, idx) => (
//                         <span key={idx}>
//                           {sense}
//                           {idx < senseLabel.length - 1 && ", "}
//                         </span>
//                       ))}
//                     </span>
//                   )}
//                 </span>
//               </div>
//               <div className="flex">
//                 {/* <VolumeBtn audioUrl={content.audio} /> */}
//                 {/* <FavWordBtn /> */}
//               </div>
//             </div>
//             <div className="mt-1 pt-2 px-5">
//               <div className="pt-2 border-t border-gray-300" />
//               <p
//                 className="text-lg font-medium drop-shadow-xs text-gray-800/80 max-h-[50px] overflow-y-scroll"
//                 dangerouslySetInnerHTML={{
//                   __html: formatApiTextToHtml(content.definition),
//                 }}
//               />
//               <p
//                 className="mt-3  text-gray-800/90 pb-1"
//                 dangerouslySetInnerHTML={{
//                   __html: formatApiTextToHtml(content.example),
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OfTheDayComponent;















//image search using unsplash API

import React from "react";
import EntryImage from "./EntryImage";
import EntryTypeBadgeBar from "./EntryTypeBadgeBar";
// import FavWordBtn from "./FavWordBtn";
// import VolumeBtn from "./VolumeBtn";
import { capitalizeFirstLetter, formatApiTextToHtml, getEntryContent, getWordContent } from "@/utils";
import {
  OfTheDayComponentProps,
  EntryOfTheDayData,
  WordOfTheDayData,
  EntryType,
} from "@/types";


// Example utility function (server-side)
export async function getUnsplashImageUrl(word: string): Promise<string | null> {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  // Get the first image's regular URL
  return data.results?.[0]?.urls?.regular || null;
}

// const getUnsplashImageUrl = (word: string) =>
//   `https://api.unsplash.com/search/photos?query=${encodeURIComponent(word)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;

const OfTheDayComponent = async ({ data, type }: OfTheDayComponentProps) => {
  const content =
    type === "word"
      ? getWordContent(data as WordOfTheDayData)
      : getEntryContent(data as EntryOfTheDayData, type as EntryType);

  const senseLabel = "senseLabel" in content ? content.senseLabel : null;

  const entryImage = await getUnsplashImageUrl("letting go");
  // const entryImage = await getUnsplashImageUrl("interrupting someone" || content.example || "english");
 
  return (
    <>
      <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16">
        <EntryTypeBadgeBar type={type} />
        <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-md:w-full">
          {entryImage && <EntryImage imgSrc={entryImage} />}
          <div
            className={`col-span-3 lg:bg-white lg:border lg:border-gray-900/10 lg:border-l-transparent lg:shadow-lg lg:rounded-r-lg max-md:w-full py-6 ${
              !entryImage && "rounded-lg"
            }`}
          >
            <div className="flex justify-between items-center w-full px-5">
              <div className="flex flex-col items-start">
                <p className="text-3xl font-semibold text-gray-900/80">
                  {capitalizeFirstLetter(content.text)}
                </p>
                <span className="block text-teal-green-600/90 italic text-sm">
                  {content.partOfSpeech}
                </span>

                {/* sense label */}
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
                {/* <VolumeBtn audioUrl={content.audio} /> */}
                {/* <FavWordBtn /> */}
              </div>
            </div>
            <div className="mt-1 pt-2 px-5">
              <div className="pt-2 border-t border-gray-300" />
              <p
                className="text-lg font-medium drop-shadow-xs text-gray-800/80 max-h-[50px] overflow-y-scroll"
                dangerouslySetInnerHTML={{
                  __html: formatApiTextToHtml(content.definition),
                }}
              />
              <p
                className="mt-3  text-gray-800/90 pb-1"
                dangerouslySetInnerHTML={{
                  __html: formatApiTextToHtml(content.example),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfTheDayComponent;

