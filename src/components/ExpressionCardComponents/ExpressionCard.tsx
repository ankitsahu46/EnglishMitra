"use client";

import { ContentBlock, EntryImage } from "@/components";
import { ExpressionCardProps } from "@/types";

export const ExpressionCard = ({
  def,
  commonData,
  idx,
}: ExpressionCardProps) => {
  const { text, phonetic, audio, synonyms: groupedSynonyms, antonyms: groupedAntonyms } = commonData;
  return (
    <div className="flex flex-col lg:grid grid-cols-5 bg-transparent max-md:bg-white max-md:border max-md:border-gray-900/10 max-md:shadow-lg rounded-lg max-sm:w-full">
      <EntryImage images={def.images ?? []} idx={idx} />
      <ContentBlock content={{ text, phonetic, audio, groupedSynonyms, groupedAntonyms, ...def }} />
    </div>
  );
};
