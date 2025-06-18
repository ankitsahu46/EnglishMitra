import TryAgainBtn from "./OfTheDayComponents/TryAgainBtn";

export const SearchErrorMessage = ({
  message,
  query,
}: {
  message: string;
  query: string;
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
    </div>
  );
};
