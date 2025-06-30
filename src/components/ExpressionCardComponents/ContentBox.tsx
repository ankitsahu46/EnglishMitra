import { capitalizeFirstLetter, formatApiTextToHtml } from "@/utils";
import { SynonymAntonymBox } from "./SynonymAntonymBox";
import { ContentBlockProps } from "@/types";
import { VolumeBtn, FavExpressionBtn } from "@/components";

export const ContentBlock = ({ content }: { content: ContentBlockProps }) => {
  const senseLabel = "senseLabel" in content ? content.senseLabel : null;

  return (
    <div
      className={`col-span-3 lg:bg-white lg:border lg:border-gray-900/10 lg:border-l-transparent lg:shadow-lg lg:rounded-r-lg max-md:w-full py-6 px-5 max-h-[70vh] ${
        !content.example && "rounded-lg"
      }`}
    >
      {/* Word Heading and Labels */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start">
          <p className="text-3xl font-semibold text-gray-900/80">
            {capitalizeFirstLetter(content.text)}
          </p>
          <span className="block text-teal-green-600/90 italic text-sm">
            {content.partOfSpeech}
          </span>

          {/* sense label */}
          <span className="block text-teal-green-600/90 italic text-sm">
            {senseLabel && <span>{senseLabel.join(", ")}</span>}
          </span>
        </div>

        <div className="flex">
          <VolumeBtn audioUrl={content.audio} />
          <FavExpressionBtn />
        </div>
      </div>

      {/* Definitions and Example */}
      <div className="mt-1 pt-2">
        <div className="pt-2 border-t border-gray-300" />
        <p
          className="text-lg font-medium text-gray-800/80 max-h-[100px] overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstLetter(
              formatApiTextToHtml(content.definition)
            ),
          }}
        />
        <p
          className="mt-3 text-gray-800/90 pb-1 max-h-[100px] overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: capitalizeFirstLetter(formatApiTextToHtml(content.example)),
          }}
        />
      </div>
      
      {/* Synonyms and Antonyms */}
      <div className="flex flex-col self gap-2 mt-10">
        {Array.isArray(content?.synonyms) && content?.synonyms?.length > 0 && (
          <SynonymAntonymBox type={"synonyms"} content={content.synonyms} />
        )}
        {Array.isArray(content?.antonyms) && content?.antonyms?.length > 0 && (
          <SynonymAntonymBox type={"antonyms"} content={content.antonyms} />
        )}
      </div>
    </div>
  );
};