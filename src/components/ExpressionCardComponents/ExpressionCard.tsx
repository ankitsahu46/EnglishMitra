import {
  getEntryContent,
  getWordContent,
} from "@/utils";
import {
  OfTheDayComponentProps,
  EntryOfTheDayData,
  WordOfTheDayData,
  EntryType,
} from "@/types";
import {
  ContentBlock,
  EntryImage,
  EntryTextBadgeBar,
} from "@/components";

export const ExpressionCard = async ({ data, type, isOfTheDay=false }: OfTheDayComponentProps) => {
  const content =
    type === "word"
      ? getWordContent(data as WordOfTheDayData)
      : getEntryContent(data as EntryOfTheDayData, type as EntryType );
  
  return (
    <>
      <div className="flex flex-col items-center gap-2 px-8 md:px-12 lg:px-16">
        <EntryTextBadgeBar type={type} isOfTheDay={isOfTheDay} />
        <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-sm:w-full">
          <EntryImage content={content} type={type}/>
          <ContentBlock content={content} />
        </div>
      </div>
    </>
  );
}