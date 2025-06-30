import { capitalizeFirstLetter } from "@/utils";
import Link from "next/link";

export const Pill = ({ link, item }: { link: string, item: string }) => {
  return (
    <Link
      href={link}
      className="py-1 px-3 text-xs text-gray-700 rounded-full bg-teal-100 hover:bg-teal-200 transition-colors duration-200 border-[0.5px] border-gray-300 cursor-pointer"
      key={item}
    >
      <span className="whitespace-nowrap w-auto max-h-min">
        {capitalizeFirstLetter(item)}
      </span>
    </Link>
  );
};
