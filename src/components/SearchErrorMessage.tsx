import { Pill, TryAgainBtn } from "@/components";

export const SearchErrorMessage = ({
  message,
  query,
  suggestions,
}: {
  message: string;
  query: string;
  suggestions?: string[];
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-b from-gray-50 to-gray-100 animate-in fade-in">
      <span className="text-5xl">🚫</span>
      <span className="text-xl font-bold text-gray-700 drop-shadow">
        Oops! Something went wrong
      </span>
      <span className="text-base text-gray-500 font-semibold">
        {message} for{" "}
        <span>
          <i>
            <b>&quot;{query}&quot;</b>
          </i>
        </span>
      </span>

      <TryAgainBtn />
      <span className="text-xs text-gray-400 mt-2">
        If the problem persists, please check your internet connection or try a
        different search.
      </span>

      {/* Suggestions when the expression can not be found */}
      {Array.isArray(suggestions) && suggestions.length > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="flex flex-wrap text-center justify-center max-w-[50vw] space-y-2 space-x-2">
            <span className="text-md font-semibold text-gray-400">
              Suggestions:
            </span>{" "}
            {Array.isArray(suggestions) &&
              suggestions.map((sgt, i) => {
                return (
                  <Pill
                    key={sgt + i}
                    link={`/search-expression?query=${sgt}`}
                    item={sgt}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
// import TryAgainBtn from "./ExpressionCardComponents/TryAgainBtn";

// export const SearchErrorMessage = ({
//   message,
//   query,
// }: {
//   message: string;
//   query: string;
// }) => {
//   return (
//     <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-b from-gray-50 to-gray-100 animate-in fade-in">
//       <span className="text-5xl">🚫</span>
//       <span className="text-xl font-bold text-gray-700 drop-shadow">
//         Oops! Something went wrong
//       </span>
//       <span className="text-base text-gray-500 font-semibold">
//         {message} for{" "}
//         <span>
//           <i>
//             <b>&quot;{query}&quot;</b>
//           </i>
//         </span>
//       </span>

//       <TryAgainBtn />
//       <span className="text-xs text-gray-400 mt-2">
//         If the problem persists, please check your internet connection or try a
//         different search.
//       </span>
//     </div>
//   );
// };
