import { Pill } from "@/components";

interface SynonymAntonymBoxProps {
  content: string[];
  type: string;
}

export const SynonymAntonymBox = ({
  content,
  type,
}: SynonymAntonymBoxProps) => {
  return (
    <div className="flex items-center gap-2 hidden-scrollbar overflow-x-auto">
      <span className="text-sm font-semibold text-gray-400">
        {type === "synonyms" ? "synonyms: " : "antonyms: "}
      </span>
      <div className="gap-3 flex">
        {content && content.length > 0
          ? content.map((item: string) => (
              <Pill
                key={item}
                link={`/search-expression?query=${item}`}
                item={item}
              />
            ))
          : null}
      </div>
    </div>
  );
};
